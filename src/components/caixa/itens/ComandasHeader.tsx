import { SubtractSquare } from "@phosphor-icons/react";

const ComandasHeader = () => {
  return (
    <div className="h-16 bg-[#27272a] mb-5  ml-8 mr-12 rounded-md flex justify-between items-center p-4">
      <h2 className="text-2xl">Comandas</h2>
      <button className="btn btn-info h-2">
        Agrupar comandas <SubtractSquare size={24} />
      </button>
      <button className="btn btn-info h-2">
        Lançar pedido <SubtractSquare size={24} />
      </button>
    </div>
  );
};

export default ComandasHeader;
