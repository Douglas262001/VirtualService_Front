import { Check } from "phosphor-react";

const ReceberItens = () => {
  return (
    <div className="w-full flex justify-between mt-2">
      <div className=" bg-[#303030] flex flex-col rounded-md p-3 min-w-[14vw]">
        <div className="flex justify-between">
          <div>Subtotal:</div>
          R$ 15,00
        </div>
        <div className="flex justify-between">
          <div>Taxa de serviço:</div>
          R$ 15,00
        </div>
        <div className="flex justify-between">
          <div>Desconto:</div>
          R$ 15,00
        </div>
      </div>
      <button className="btn">
        Receber e finalizar <Check size={24} />
      </button>
    </div>
  );
};

export default ReceberItens;
