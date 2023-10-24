import { SubtractSquare } from "@phosphor-icons/react";
import LancarPedidoWindow from "./lancarpedido";
import { useState } from "react";
import { Bell } from "phosphor-react";
import GroupTagWindow from "./agruparcomandas";

const ComandasHeader = () => {
  const [isLancarPedidoOpen, setIsLancarPedidoOpen] = useState(false);
  const [isGroupTagOpen, setIsGroupTagOpen] = useState(false);
  const handleClickLancarPedido = () => {
    setIsGroupTagOpen(true);
  };

  const handleClickAgruparComandas = () => {
    setIsGroupTagOpen(true);
  };

  return (
    <div className="h-16 bg-[#27272a] mb-5 ml-8 mr-12 rounded-md flex justify-between items-center p-4">
      <h2 className="text-2xl">Comandas</h2>
      <div className="flex gap-2">
        <button onClick={handleClickAgruparComandas} className="btn btn-info h-2">
          Agrupar comandas <SubtractSquare size={24} />
          <GroupTagWindow
           isOpen={isGroupTagOpen}
           setIsOpen={setIsGroupTagOpen}
          />
        </button>
        <button onClick={handleClickLancarPedido} className="btn btn-info h-2">
          Lançar pedido <Bell size={24} />
        </button>
        <LancarPedidoWindow
          isOpen={isLancarPedidoOpen}
          setIsOpen={setIsLancarPedidoOpen}
        />
      </div>
    </div>
  );
};

export default ComandasHeader;
