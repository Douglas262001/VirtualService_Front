import { SubtractSquare } from "@phosphor-icons/react";
import LancarPedidoWindow from "./lancarpedido";
import { useState } from "react";
import { Bell, ArrowsClockwise } from "phosphor-react";
import GroupTagWindow from "./agruparcomandas";
import { useRegister } from "context/register/RegisterContext";

const ComandasHeader = () => {
  const [isLancarPedidoOpen, setIsLancarPedidoOpen] = useState(false);
  const [isGroupTagOpen, setIsGroupTagOpen] = useState(false);
  const {setRefetchComandas } = useRegister();
  const handleClickLancarPedido = () => {
    setIsLancarPedidoOpen(true);
  };

  const handleClickAgruparComandas = () => {
    setIsGroupTagOpen(true);
  };

  const handleClickRefresh = () => {
    setRefetchComandas(true);
  };

  return (
    <div className="h-16 bg-[#27272a] mb-5 ml-8 mr-12 rounded-md flex justify-right items-center p-4">
      <h2 className="text-2xl"></h2>
      <div className="flex gap-2">
        <button onClick={handleClickAgruparComandas} className="btn btn-info h-3 w-[24vh]">
          Agrupar comandas <SubtractSquare size={24} />
        </button>
          <GroupTagWindow
           isOpen={isGroupTagOpen}
           setIsOpen={setIsGroupTagOpen}
          />
        <button onClick={handleClickLancarPedido} className="btn btn-info h-3 w-[20vh]">
          Lançar pedido <Bell size={24} />
        </button>
        <button onClick={handleClickRefresh} className="btn btn-info h-3 w-[8vh]">
          <ArrowsClockwise size={24} />
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
