import { useRegister } from "context/register/RegisterContext";
import { Gear } from "phosphor-react";
import { useState } from "react";
import ItensConfig from "../config";

const ReceberCaixaGeral = () => {
  const { caixaGeral } =
    useRegister();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="w-full flex justify-between mt-3">
      <div className=" bg-zinc-700 flex flex-col rounded-md p-5 min-w-[19vw] text-base lg:p-2">
        <Gear weight="fill" onClick={() => setIsOpen(true)} className="cursor-pointer" />
        <div className="flex justify-between ">
          <div>Subtotal:</div>
          {caixaGeral?.valorTotalItem.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        </div>
        <div className="flex justify-between">
          <div>Valor taxa de serviço:</div>
          {caixaGeral?.valorTaxaServico.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        </div>
        <div className="flex justify-between">
          <div>Valor Desconto:</div>
          {caixaGeral?.valorDesconto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        </div>
      </div>
      <ItensConfig isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ReceberCaixaGeral;
