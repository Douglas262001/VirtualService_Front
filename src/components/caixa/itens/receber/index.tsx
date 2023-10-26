import { useRegister } from "context/register/RegisterContext";
import { Gear } from "phosphor-react";
import { useEffect, useState } from "react";
import ItensConfig from "../config";

const ReceberCaixaGeral = () => {
  const { caixaGeral, buscarCaixaGeral, setClicouComanda, clicouComanda } =
    useRegister();
  useEffect(() => {
    if (!clicouComanda) return;

    buscarCaixaGeral();
    setClicouComanda(false);
  }, [clicouComanda]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="w-full flex justify-between mt-3">
      <div className=" bg-zinc-700 flex flex-col rounded-md p-5 min-w-[19vw] text-base lg:p-2">
        <Gear weight="fill" onClick={() => setIsOpen(true)} className="cursor-pointer" />
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
      <ItensConfig isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ReceberCaixaGeral;
