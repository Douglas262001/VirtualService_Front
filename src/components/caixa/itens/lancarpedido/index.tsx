import GenericWindow from "@components/base/GenericWindow";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LancarPedidoWindow = ({ isOpen, setIsOpen }: Props) => {
  return (
    <GenericWindow title="Lançar pedido" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form></form>
    </GenericWindow>
  );
};

export default LancarPedidoWindow;
