import GenericTable from "@components/base/GenericTable";
import GenericWindow from "@components/base/GenericWindow";
import { PedidoItemsSearchType } from "types/Pedido";

type OrderItemsWindowProps = {
  numeroPedido: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  items: PedidoItemsSearchType[];
};

const OrderItemsWindow = ({
  numeroPedido,
  isOpen,
  setIsOpen,
  items,
}: OrderItemsWindowProps) => {
  return (
    <>
      <GenericWindow
        title={`Pedido nº ${numeroPedido}`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <GenericTable
          values={items}
          columns={["nome", "quantidade", "valor", "total", "pago"]}
        />
      </GenericWindow>
    </>
  );
};

export default OrderItemsWindow;
