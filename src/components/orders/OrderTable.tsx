import useGetOrders from "@hooks/useGetOrders";
import useFilterData from "../../hooks/useFilterData";
import GenericLoading from "../base/GenericLoading";
import GenericTable from "../base/GenericTable";
import { ProdutoType } from "types/Produto";
import { Printer } from "phosphor-react";

type Props = {
  searchText?: string;
};

const OrderTable = ({ searchText }: Props) => {
  const { data: orders, error, isLoading } = useGetOrders();
  const filteredOrders = useFilterData(orders, searchText);

  if (isLoading) return <GenericLoading size={60} />;
  if (error) return <div>ERRO</div>;
  if (!orders?.length) return <div>SEM DADOS</div>;

  const tableValuesWithIcons = (filteredOrders ?? orders).map(
    (order: ProdutoType) => ({
      Imprimir: (
        <Printer
          onClick={() => {
            console.log("Imprimir");
          }}
          className="cursor-pointer text-yellow-400"
          size={24}
        />
      ),
      ...order,
    })
  );

  return (
    <GenericTable
      values={tableValuesWithIcons}
      columns={Object.keys(tableValuesWithIcons[0])}
    />
  );
};

export default OrderTable;
