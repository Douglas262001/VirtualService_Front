import useGetOrders from "@hooks/useGetOrders";
import useFilterData from "../../hooks/useFilterData";
import GenericLoading from "../base/GenericLoading";
import GenericTable from "../base/GenericTable";
import { ListNumbers, Printer, Swap } from "phosphor-react";
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
    [StatusPedido.Finalizado]: "tag-status-fila-finalizado",
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
      Alterar: (
        <Swap
          size={24}
          className="cursor-pointer"
          onClick={() => {
            setCodigoPedido(order.id);
            setCodigoStatus(order.codigoStatus);
            setIsOpenStatus(true);
          }}
        />
      ),
      Status: <TagStatus status={order.codigoStatus} />,
      ...order,
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
          "Imprimir",
          "Alterar",
          "Status",
          "id",
          "numero",
          "valor",
          "data/hora",
          "Itens",
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
