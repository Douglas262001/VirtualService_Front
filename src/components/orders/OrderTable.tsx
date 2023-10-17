import useGetOrders from "@hooks/useGetOrders";
import useFilterData from "../../hooks/useFilterData";
import GenericLoading from "../base/GenericLoading";
import GenericTable from "../base/GenericTable";
import { Printer } from "phosphor-react";
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

type Props = {
  searchText?: string;
};

type ImprimirDto = {
  codigoPedido: number;
};

const TagStatus = ({ status }: { status: StatusPedido }) => {
  const colors = {
    [StatusPedido.FilaDePreparo]: "bg-slate-400",
    [StatusPedido.EmPreparo]: "bg-blue-400",
    [StatusPedido.FilaDeEntrega]: "bg-yellow-200",
    [StatusPedido.Finalizado]: "bg-green-500",
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-black text-sm font-semibold ${colors[status]}`}
    >
      {EnumStatusPedido.get(status)}
    </span>
  );
};

const OrderTable = ({ searchText }: Props) => {
  const { data: orders, error, isLoading } = useGetOrders();
  const filteredOrders = useFilterData(orders, searchText);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<PedidoSearchType>();

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
            mutationImprimir.mutate({ codigoPedido: order.id });
          }}
          className="cursor-pointer text-yellow-400"
          size={24}
        />
      ),
      Status: <TagStatus status={order.codigoStatus} />,
      ...order,
    })
  );

  return (
    <>
      <GenericTable
        values={tableValuesWithIcons}
        columns={["Imprimir", "Status", "id", "numero", "valor", "data/hora"]}
        onClickRow={(p: PedidoSearchType) => {
          setSelectedOrder(p);
          setIsOpen(true);
        }}
      />
      <OrderItemsWindow
        numeroPedido={selectedOrder?.numero as number}
        items={selectedOrder?.items as PedidoItemsSearchType[]}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default OrderTable;
