import useGetOrders from "@hooks/useGetOrders";
import useFilterData from "../../hooks/useFilterData";
import GenericLoading from "../base/GenericLoading";
import GenericTable from "../base/GenericTable";
import { ListNumbers, Printer, Package, Check, Hourglass, Timer, XCircle } from "phosphor-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";
import { toast } from "sonner";
import api from "@utils/api";
import {
  EnumStatusPedido,
  PedidoItemsSearchType,
  PedidoSearchType,
  StatusPedido,
} from "types/Pedido";
import { useState } from "react";
import OrderItemsWindow from "./OrderItemsWindow";
import OrderStatusWindow from "./OrderStatusWindow";
import "./OrderTable.modules.css"
import Swal from "sweetalert2";

type Props = {
  searchText?: string;
};

type ImprimirDto = {
  codigoPedido: number;
  texto: string;
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

const OrderTable = ({ searchText }: Props) => {
  const { data: orders, error, isLoading } = useGetOrders();
  const filteredOrders = useFilterData(orders, searchText);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenStatus, setIsOpenStatus] = useState<boolean>(false);

  const [selectedOrder, setSelectedOrder] = useState<PedidoSearchType>();
  const [codigoStatus, setCodigoStatus] = useState<number>();
  const [codigoPedido, setCodigoPedido] = useState<number>(0);

  const mutationImprimir = useMutation(
    (s?: ImprimirDto) => api.post(`Tenant/Imprimir`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getSteps"]);
        toast.success("Pedido impresso com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao imprimir pedido");
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

  const ColumnUpdateData = ({ status, id }: { status: StatusPedido, id?: number }) => {

    return (<div className="update-order-column">
      <Timer weight={`${status === 0 ? "fill" : "thin"}`} onClick={handlePreparationQueue(status, id)} className={`${status === 0 ? "text-yellow-400" : "text-stone-300 hover:text-yellow-400"} cursor-pointer`} />
      <Hourglass weight={`${status === 1 ? "fill" : "thin"}`} onClick={handleInPreparation(status, id)} className={`${status === 1 ? "text-emerald-400" : "text-stone-3000 hover:text-emerald-400"} cursor-pointer`} />
      <Package weight={`${status === 2 ? "fill" : "thin"}`} onClick={handleDeliverQueue(status, id)} className={`${status === 2 ? "text-sky-400" : "text-stone-300 hover:text-sky-400"} cursor-pointer`} />
      <Check weight={`${status === 3 ? "fill" : "thin"}`} onClick={handleOrderFinished(status, id)} className={`${status === 3 ? "text-lime-400" : "text-stone-300 hover:text-lime-400"} cursor-pointer`} />
      <XCircle weight={`${status === 4 ? "fill" : "thin"}`} onClick={handleOrderCancelar(status, id)} className={`${status === 4 ? "text-red-600" : "text-stone-300 hover:text-red-600"} cursor-pointer`} />
    </div>)
  }

  const handlePreparationQueue = (status: StatusPedido, id?: number) => async () => {
    if (!id) return;

    if (status === 0) {
      return toast.error("Pedido já está em fila de preparo.");
    }

    Swal.fire({
      title: 'Confirmação',
      text: `Deseja realmente alterar o status para "Em fila de preparo"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      iconColor: '#ef4444',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, alterar!',
      background: '#333',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        const dto: AlterarPedidoDto = {
          codigoPedido: id,
          statusPedido: 0
        };
  
        mutateStatusOrder.mutate(dto);
      }
    })
  };

  const handleInPreparation = (status: StatusPedido, id?: number) => async () => {
    if (!id) return;

    if (status === 1) {
      return toast.error("Pedido já está em preparo.");
    }

    Swal.fire({
      title: 'Confirmação',
      text: `Deseja realmente alterar o status para "Em preparo"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      iconColor: '#ef4444',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, alterar!',
      background: '#333',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        const dto: AlterarPedidoDto = {
          codigoPedido: id,
          statusPedido: 1
        };

        mutateStatusOrder.mutate(dto);
      }
    })
  };

  const handleDeliverQueue = (status: StatusPedido, id?: number) => async () => {
    if (!id) return;

    if (status === 2) {
      return toast.error("Pedido já está em fila de entrega.");
    }

    Swal.fire({
      title: 'Confirmação',
      text: `Deseja realmente alterar o status para "Fila de entrega"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      iconColor: '#ef4444',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, alterar!',
      background: '#333',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        const dto: AlterarPedidoDto = {
          codigoPedido: id,
          statusPedido: 2
        };

        mutateStatusOrder.mutate(dto);
      }
    })
  };

  const handleOrderFinished = (status: StatusPedido, id?: number) => async () => {
    if (!id) return;

    if (status === 3) {
      return toast.error("Pedido já está finalizado.");
    }

    Swal.fire({
      title: 'Confirmação',
      text: `Deseja realmente alterar o status para "Finalizado"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      iconColor: '#ef4444',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, alterar!',
      background: '#333',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        const dto: AlterarPedidoDto = {
          codigoPedido: id,
          statusPedido: 3
        };

        mutateStatusOrder.mutate(dto);
      }
    })
  };

  const handleOrderCancelar = (status: StatusPedido, id?: number) => async () => {
    if (!id) return;

    if (status === 4) {
      return toast.error("Pedido já está cancelado.");
    }
    Swal.fire({
      title: 'Confirmação',
      text: `Deseja realmente cancelar o pedido?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      iconColor: '#ef4444',
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim',
      background: '#333',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        const dto: AlterarPedidoDto = {
          codigoPedido: id,
          statusPedido: 4
        };

        mutateStatusOrder.mutate(dto);
      }
    })
  };

  const mutateStatusOrder = useMutation(
    (s: AlterarPedidoDto) => api.put(`Pedido/Alterar/`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getOrders"]);
        toast.success("Pedido alterado com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );


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
      <GenericTable
        values={tableValuesWithIcons}
        columns={[
          "Itens",
          "Alterar",
          "id",
          "numero",
          "valor",
          "data/hora",
          "Status",
          "Imprimir",
        ]}
      />
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
