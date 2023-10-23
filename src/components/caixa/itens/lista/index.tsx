import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import api from "@utils/api";
import { useRegister } from "context/register/RegisterContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ItensComanda, ItensComandaSearch } from "types/Caixa";

const ListaItens = () => {
  const { codigoComanda, setCaixaGeral, caixaGeral } = useRegister();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (codigoComanda === 0) return;

    buscarItensComanda();
    setItensSelecionados([]);
  }, [codigoComanda]);

  const [itensComanda, setItensComanda] = useState<ItensComandaSearch[]>([]);
  const [itensSelecionados, setItensSelecionados] = useState<number[]>([]);

  useEffect(() => {
    if (!itensSelecionados.length) return;

    setCaixaGeral({
      ...caixaGeral,
      codigosPedidosItens: [...itensSelecionados],
    });
  }, [itensSelecionados]);

  const buscarItensComanda = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `Caixa/BuscarItensComanda/${codigoComanda}`
      );
      const itens: ItensComanda[] = response.data.body.items;

      setItensComanda(
        itens.map((item) => ({
          id: item.id,
          nome: item.nomeItem,
          valor: item.valorUn,
          qntd: item.qtd,
          total: item.valorTotal,
          pago: item.pago ? "Sim" : "Não",
        }))
      );
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="h-[400px] bg-zinc-700 rounded-lg border-4 border-zinc-700 justify-center flex">
        <GenericLoading />
      </div>
    );

  if (!itensComanda.length)
    return (
      <div className="h-[400px] bg-zinc-700 rounded-lg border-4 border-zinc-700 justify-center flex">
        <p className="text-center text-[#ffff]">Nenhum item encontrado</p>
      </div>
    );
  const handleChangeCheckbox = async (id: number) => {
    setItensSelecionados((prev) => {
      if (prev.some((p) => p === id)) {
        return prev.filter((p) => p !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="h-[400px] bg-zinc-700 rounded-lg border-4 border-zinc-700">
      <GenericTable
        values={itensComanda?.map((item) => ({
          "": (
            <input
              type="checkbox"
              className="checkbox"
              disabled={item.pago === "Sim"}
              onChange={() => handleChangeCheckbox(item.id)}
              checked={itensSelecionados.some((p) => p === item.id)}
            />
          ),
          ...item,
        }))}
        columns={["", "nome", "qntd", "valor", "total", "pago"]}
        activeColParam="pago"
        activeColValue="Sim"
      />
    </div>
  );
};

export default ListaItens;
