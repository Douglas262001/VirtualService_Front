import { useRegister } from "context/register/RegisterContext";
import ListaItens from "./lista";
import AcoesItens from "./acoes";
import { Placeholder } from "phosphor-react";
import ReceberItens from "./receber";

const ItensContainer = () => {
  const { numeroComanda } = useRegister();

  if (!numeroComanda)
    return (
      <div className="bg-[#fec80a] w-[50%] h-[97.5vh] rounded-md p-5 mr-2 flex flex-col text-[#303030] text-center justify-center text-3xl">
        <div className="flex flex-col gap-2 items-center">
          <div>Nenhuma comanda selecionada!</div>
          <Placeholder />
        </div>
      </div>
    );


  return (
    <div className="bg-[#fec80a] w-[50%] h-[97.5vh] rounded-md p-5 mr-2 flex flex-col text-[#303030]">
      <h2 className="text-2xl font-bold mb-2">Comanda nº {numeroComanda}</h2>
      <div className="text-[#cccccc] max-h-96 itens-caixa">
        <ListaItens/>
        <AcoesItens />
        <ReceberItens />
      </div>
    </div>
  );
};

export default ItensContainer;
