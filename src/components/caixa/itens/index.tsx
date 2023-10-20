import { useRegister } from "context/register/RegisterContext";
import ListaItens from "./lista";
import AcoesItens from "./acoes";
import { Check, Placeholder } from "phosphor-react";
import ReceberCaixaGeral from "./receber";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";
import api from "@utils/api";

const ItensContainer = () => {
  const { caixaGeral, numeroComanda } = useRegister();

  const handlePagar = () => async () => {
    mutationPagar.mutate(caixaGeral);
  };

  const mutationPagar= useMutation(
    (s: typeof caixaGeral) => {
      return api.post(`Caixa/Pagar`, s);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getMenus"]);
        toast.success("Pedido pago com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    });

  if (!numeroComanda)
    return (
      <div className="bg-zinc-800 w-[50%] h-[97.5vh] rounded-md p-5 mr-2 flex flex-col text-[#cccc] text-center justify-center text-3xl">
        <div className="flex flex-col gap-2 items-center">
          <div>Nenhuma comanda selecionada!</div>
          <Placeholder />
        </div>
      </div>
    );

  return (
    <div className="bg-zinc-800 w-[50%] h-[97.5vh] rounded-md p-5 mr-2 flex flex-col text-[#cccccc]">
      <h2 className="text-2xl font-bold mb-2">Comanda {numeroComanda}</h2>
      <div className="text-[#cccccc] max-h-96 itens-caixa">
        <ListaItens />
        <ReceberCaixaGeral />
        <AcoesItens />
        <div className="w-[100%] h-20 content-end	">
          <button onClick={handlePagar()} 
            className="w-1/2 h-12 px-6 text-zinc-900 transition-colors duration-150 bg-lime-400 rounded-lg focus:shadow-outline hover:bg-lime-600 text-2xl font-semibold my-5 ml-[50%]">
            Receber e finalizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItensContainer;
