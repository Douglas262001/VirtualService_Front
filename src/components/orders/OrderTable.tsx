import useFilterData from "../../hooks/useFilterData";
import GenericLoading from "../base/GenericLoading";
import GenericTable from "../base/GenericTable";
import {
  ListNumbers,
  Printer,
  Package,
  Check,
  Hourglass,
  Timer,
  XCircle,
} from "phosphor-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";
import { toast } from "sonner";
import api from "@utils/api";
import {
  EnumStatusPedido,
  PedidoItemsSearchType,
  PedidoSearchType,
  PedidoType,
  StatusPedido,
} from "types/Pedido";
import { useEffect, useState } from "react";
import OrderItemsWindow from "./OrderItemsWindow";
import OrderStatusWindow from "./OrderStatusWindow";
import "./OrderTable.modules.css";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Props = {
  searchText?: string;
  dataInicial: string;
  dataFinal: string;
  pedidosAtivos: boolean;
};

type ImprimirDto = {
  codigoPedido: number;
  texto: string;
};

type Filter = {
  property: string;
  operator: string;
  value: any;
  and: boolean;
  not: boolean;
};

const TagStatus = ({ status }: { status: StatusPedido }) => {
  const colors = {
    [StatusPedido.FilaDePreparo]: "tag-status-fila-preparo",
    [StatusPedido.EmPreparo]: "tag-status-em-preparo",
    [StatusPedido.FilaDeEntrega]: "tag-status-fila-entrega",
    [StatusPedido.Finalizado]: "tag-status-finalizado",
    [StatusPedido.Cancelado]: "tag-status-cancelado",
  };

  return (
    <div
      className={`px-5 py-2 rounded text-black text-sm font-semibold ${colors[status]}`}
    >
      {EnumStatusPedido.get(status)}
    </div>
  );
};

const OrderTable = ({
  searchText,
  dataInicial,
  dataFinal,
  pedidosAtivos,
}: Props) => {
  const { pathname } = useLocation();
  const [orders, setOrders] = useState<PedidoSearchType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    listarPedidos();
  }, [dataInicial, dataFinal, pedidosAtivos]);

  const filteredOrders = useFilterData(orders, searchText);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenStatus, setIsOpenStatus] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<PedidoSearchType>();
  const [codigoStatus, setCodigoStatus] = useState<number>();
  const [codigoPedido, setCodigoPedido] = useState<number>(0);

  const colunas =
    pathname === "/orders"
      ? [
          "Itens",
          "Alterar",
          "id",
          "numero",
          "valor",
          "data/hora",
          "Status",
          "Imprimir",
        ]
      : ["Itens", "Alterar", "numero", "data/hora", "Status"];

  const listarPedidos = async () => {
    setIsLoading(true);

    const diaDataInicial = new Date(dataInicial).getDate();
    const novaDataInicial = new Date(
      new Date(dataInicial).setDate(diaDataInicial + 1)
    );

    const filters: Filter[] = [
      {
        property: "DataHoraPedido",
        operator: "greaterOrEqual",
        value: new Date(novaDataInicial.setHours(0, 0, 0, 0)),
        and: true,
        not: false,
      },
      {
        property: "DataHoraPedido",
        operator: "lessOrEqual",
        value: new Date(new Date(dataFinal).setHours(23, 59, 59, 999)),
        and: true,
        not: false,
      },
    ];

    if (pedidosAtivos)
      filters.push({
        property: "Status",
        operator: "in",
        value: [
          StatusPedido.EmPreparo,
          StatusPedido.FilaDePreparo,
          StatusPedido.FilaDeEntrega,
        ],
        and: true,
        not: false,
      });
    try {
      const response = await api.get(`Pedido/Listar`, {
        headers: {
          filters: JSON.stringify(filters),
        },
      });

      setOrders(
        response.data.body.map((pedido: PedidoType) => ({
          id: pedido.id,
          numero: pedido.numeroPedido,
          codigoStatus: pedido.status,
          valor: pedido.valorTotal,
          "data/hora": format(
            new Date(pedido.dataHoraPedido),
            "dd/MM/yyyy hh:mm:ss",
            { locale: ptBR }
          ),
          items: pedido.pedidoItems?.map((item) => ({
            nome: item.nomeItem,
            quantidade: item.qtd,
            valor: item.valorUn,
            total: item.valorTotal,
            pago: item.pago ? "Sim" : "Não",
          })),
        }))
      );
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const mutationImprimir = useMutation(
    (s?: ImprimirDto) => api.post(`Tenant/Imprimir`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getSteps"]);
        toast.success("Pedido impresso com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const mutateStatusOrder = useMutation(
    (s: AlterarPedidoDto) => api.put(`Pedido/Alterar/`, s),
    {
      onSuccess: async () => {
        listarPedidos();
        toast.success("Pedido alterado com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  if (isLoading) return <GenericLoading size={60} />;
  if (error) return <div>ERRO</div>;
  if (!orders?.length) return <div>SEM DADOS</div>;

  type AlterarPedidoDto = {
    codigoPedido: number;
    statusPedido: number;
  };

  const ColumnUpdateData = ({
    status,
    id,
  }: {
    status: StatusPedido;
    id?: number;
  }) => {
    return (
      <div className="update-order-column">
        <Timer
          weight="regular"
          onClick={() =>
            handleAlterarStatusPedido(status, StatusPedido.FilaDePreparo, id)
          }
          size={32}
          className={`${
            status === StatusPedido.FilaDePreparo
              ? "text-[#303030] rounded-md bg-yellow-400 pt-[2px]"
              : "text-stone-300 border border-stone-300 rounded-md hover:text-yellow-400 hover:border-yellow-400 pt-[2px]"
          } cursor-pointer`}
        />
        <Hourglass
          weight="regular"
          onClick={() =>
            handleAlterarStatusPedido(status, StatusPedido.EmPreparo, id)
          }
          size={32}
          className={`${
            status === StatusPedido.EmPreparo
              ? "text-[#303030] rounded-md bg-emerald-400"
              : "text-stone-3000 hover:text-emerald-400"
          } cursor-pointer`}
        />
        <Package
          weight="regular"
          size={32}
          onClick={() =>
            handleAlterarStatusPedido(status, StatusPedido.FilaDeEntrega, id)
          }
          className={`${
            status === StatusPedido.FilaDeEntrega
              ? "text-[#303030] rounded-md bg-sky-400"
              : "text-stone-300 rounded-md border border-stone-300 hover:text-sky-400 hover:border-sky-400"
          } cursor-pointer`}
        />
        <Check
          weight={`${status === StatusPedido.Finalizado ? "fill" : "thin"}`}
          size={32}
          onClick={() =>
            handleAlterarStatusPedido(status, StatusPedido.Finalizado, id)
          }
          className={`${
            status === StatusPedido.Finalizado
              ? "text-[#303030] bg-lime-400 rounded-md "
              : "text-stone-300 hover:text-lime-400 rounded-md border border-stone-300 hover:border-lime-400"
          } cursor-pointer`}
        />
        <XCircle
          weight={`${status === StatusPedido.Cancelado ? "fill" : "thin"}`}
          size={32}
          onClick={() =>
            handleAlterarStatusPedido(status, StatusPedido.Cancelado, id)
          }
          className={`${
            status === StatusPedido.Cancelado
              ? "text-[#303030] bg-red-500 rounded-md"
              : "text-stone-300 hover:text-red-500 rounded-md border border-stone-300 hover:border-red-500"
          } cursor-pointer`}
        />
      </div>
    );
  };

  const handleAlterarStatusPedido = (
    status: StatusPedido,
    statusColuna: StatusPedido,
    id?: number
  ) => {
    if (!id) return;

    if (status === statusColuna)
      return toast.error(
        `Pedido já está ${EnumStatusPedido.get(statusColuna)}`
      );

    Swal.fire({
      title: "Confirmação",
      text: `Deseja realmente alterar o status para ${EnumStatusPedido.get(
        statusColuna
      )}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      iconColor: "#fec80a",
      cancelButtonText: "Não",
      confirmButtonText: "Sim",
      background: "#333",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        const dto: AlterarPedidoDto = {
          codigoPedido: id,
          statusPedido: statusColuna,
        };

        mutateStatusOrder.mutate(dto);
      }
    });
  };

  const tableValuesWithIcons = (filteredOrders ?? orders).map(
    (order: PedidoSearchType) => ({
      Imprimir: (
        <Printer
          onClick={() => {
            mutationImprimir.mutate({ codigoPedido: order.id, texto: "" });
          }}
          className="cursor-pointer text-yellow-400"
          size={24}
        />
      ),

      Status: <TagStatus status={order.codigoStatus} />,
      ...order,
      Alterar: <ColumnUpdateData status={order.codigoStatus} id={order.id} />,
      Itens: (
        <ListNumbers
          onClick={() => {
            setSelectedOrder(order);
            setIsOpen(true);
          }}
          size={26}
          className="cursor-pointer"
        />
      ),
    })
  );

  return (
    <>
      <GenericTable values={tableValuesWithIcons} columns={colunas} />
      <OrderItemsWindow
        numeroPedido={selectedOrder?.numero as number}
        items={selectedOrder?.items as PedidoItemsSearchType[]}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <OrderStatusWindow
        codigoPedido={codigoPedido}
        setCodigoPedido={setCodigoPedido}
        codigoStatus={codigoStatus}
        setCodigoStatus={setCodigoStatus}
        isOpen={isOpenStatus}
        setIsOpen={setIsOpenStatus}
      />
    </>
  );
};

export default OrderTable;
