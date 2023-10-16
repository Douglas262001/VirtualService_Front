import useGetOrders from "@hooks/useGetOrders";
import useFilterData from "../../hooks/useFilterData";
import GenericLoading from "../base/GenericLoading";
import GenericTable from "../base/GenericTable";
import { Printer } from "phosphor-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";
import { toast } from "sonner";
import api from "@utils/api";
import { PedidoItemsSearchType, PedidoSearchType } from "types/Pedido";
import { useState } from "react";
import OrderItemsWindow from "./OrderItemsWindow";

type Props = {
  searchText?: string;
};

type ImprimirDto = {
  codigoPedido: number;
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
      ...order,
    })
  );

  return (
    <>
      <GenericTable
        values={tableValuesWithIcons}
        columns={["Imprimir", "id", "numero", "valor", "data/hora"]}
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
