import { useRegister } from "context/register/RegisterContext";
import ListaItens from "./lista";
import AcoesItens from "./acoes";
import { Placeholder } from "phosphor-react";
import ReceberCaixaGeral from "./receber";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";
import api from "@utils/api";
import Swal from "sweetalert2";

const ItensContainer = () => {
  const { caixaGeral, numeroComanda, setRefetchComandas } = useRegister();

  const handlePagar = () => async () => {
    mutationPagar.mutate(caixaGeral);
  };

  const mutationPagar = useMutation(
    (s: typeof caixaGeral) => {
      return api.post(`Caixa/Pagar`, s);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getMenus"]);
        Swal.fire({
          icon: "success",
          background: "#333",
          color: "#cccccc",
          iconColor: "#bef264",
          title: "Pedido pago com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        });
        setRefetchComandas(true);
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

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
      <div className="w-full bg-zinc-700 rounded-md mt-2 flex p-3 gap-2 justify-between items-center py-2 my-2">
        <h2 className="text-2xl font-bold mb-2 w-[50%]">
          Comanda {numeroComanda}
        </h2>
        <h2 className="text-2xl font-bold mb-2 w-[50%] lg:text-lg">
          Mesa {caixaGeral?.numeroQuartoMesa}
        </h2>
      </div>
      <div className="text-[#cccccc] max-h-96 itens-caixa">
        <ListaItens />
        <ReceberCaixaGeral />
        <AcoesItens />
        <div className="w-[100%] h-20 content-end	">
          <button
            onClick={handlePagar()}
            id="receber-e-finalizar"
            className="w-1/2 h-12 px-6 text-zinc-900 transition-colors duration-150 bg-lime-400 rounded-lg focus:shadow-outline hover:bg-lime-600 text-2xl font-semibold my-5 ml-[50%]
            xl:h-10 xl:px-1 xl:p-1 xl:text-lg xl:font-bold xl:my-3
            "
          >
            Receber e finalizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItensContainer;
