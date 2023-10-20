import { useRegister } from "context/register/RegisterContext";
import { Divide, Plus } from "phosphor-react";

const AcoesItens = () => {
  const { caixaGeral } = useRegister();

  return (
    <div className="w-fuil bg-zinc-700 rounded-md mt-2 flex p-3 gap-2 justify-between items-center py-5	">
      <div className="flex gap-2">
        <button className="btn bg-sky-400 font-semibold text-zinc-900 text-base">
          Dividir
          <Divide size={24} />
        </button>
        <button className="btn btn-primary text-base">
          Item não cadastrado <Plus size={24} />
        </button>
      </div>
      <span className="text-4xl mx-10 font-semibold"> R${caixaGeral?.valorTotalReceber}</span>
    </div>
  );
};

export default AcoesItens;
