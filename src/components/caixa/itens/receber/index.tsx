import { useRegister } from "context/register/RegisterContext";
import { Gear } from "phosphor-react";
import { useEffect } from "react";

const ReceberCaixaGeral = () => {
  const { caixaGeral, buscarCaixaGeral, setClicouComanda, clicouComanda } =
    useRegister();
  useEffect(() => {
    if (!clicouComanda) return;

    buscarCaixaGeral();
    setClicouComanda(false);
  }, [clicouComanda]);

  return (
    <div className="w-full flex justify-between mt-3">
      <div className=" bg-zinc-700 flex flex-col rounded-md p-5 min-w-[19vw] text-base">
        <Gear weight="fill" />
        <div className="flex justify-between ">
          <div>Subtotal:</div>
          {caixaGeral?.valorTotalItem}
        </div>
        <div className="flex justify-between">
          <div>Taxa de serviço:</div>
          {caixaGeral?.valorTaxaServico}
        </div>
        <div className="flex justify-between">
          <div>Desconto:</div>
          {caixaGeral?.valorDesconto}
        </div>
      </div>
    </div>
  );
};

export default ReceberCaixaGeral;
