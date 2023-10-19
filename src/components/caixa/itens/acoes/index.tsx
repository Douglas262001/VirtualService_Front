import { Divide, Plus } from "phosphor-react";

const AcoesItens = () => {
  return (
    <div className="w-fuil bg-[#303030] rounded-md mt-2 flex p-3 gap-2 justify-between items-center">
      <div className="flex gap-2">
        <button className="btn btn-primary">
          Dividir
          <Divide size={24} />
        </button>
        <button className="btn btn-primary">
          Item não cadastrado <Plus size={24} />
        </button>
      </div>
      <span className="text-lg">Total: R$ 500,00</span>
    </div>
  );
};

export default AcoesItens;
