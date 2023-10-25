import { useRegister } from "context/register/RegisterContext";

const ItensSelecionados = () => {
  const { totalSelecionados } = useRegister();
  return (
    <div className="mt-4 text-lg">
      Total selecionados
      <div className="bg-zinc-700 flex flex-col rounded-md min-w-[10vw] p-5 text-lg lg:p-2">
        {`R$${totalSelecionados}`}
      </div>
    </div>
  );
};

export default ItensSelecionados;
