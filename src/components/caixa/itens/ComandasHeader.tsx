import { SubtractSquare } from "@phosphor-icons/react";
import LancarPedidoWindow from "./lancarpedido";
import { useState } from "react";

const ComandasHeader = () => {
  const [isLancarPedidoOpen, setIsLancarPedidoOpen] = useState(false);
  const handleClickLancarPedido = () => {
    setIsLancarPedidoOpen(true);
  };

  return (
    <div className="h-16 bg-[#27272a] mb-5  ml-8 mr-12 rounded-md flex justify-between items-center p-4">
      <h2 className="text-2xl">Comandas</h2>
      <button className="btn btn-info h-2">
        Agrupar comandas <SubtractSquare size={24} />
      </button>
      <button onClick={handleClickLancarPedido} className="btn btn-info h-2">
        Lançar pedido <SubtractSquare size={24} />
      </button>
      <LancarPedidoWindow
        isOpen={isLancarPedidoOpen}
        setIsOpen={setIsLancarPedidoOpen}
      />
    </div>
  );
};

export default ComandasHeader;
