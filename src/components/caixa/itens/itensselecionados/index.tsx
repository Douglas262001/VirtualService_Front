import { useRegister } from "context/register/RegisterContext";

const ItensSelecionados = () => {
  const { totalSelecionados, caixaGeral } = useRegister();
  return (
    <div className="mt-2 text-sm">
      Total selecionados
      <div className="bg-zinc-700 flex flex-col rounded-md min-w-[17vw] p-5 text-base lg:p-2">
        {`R$${totalSelecionados}`}
      </div>
      Valor pago
      <div className="bg-zinc-700 flex flex-col rounded-md min-w-[17vw] p-5 text-base lg:p-2">
        {`R$${caixaGeral.valorTotalJaPago}`}
      </div>
    </div>
  );
};

export default ItensSelecionados;
