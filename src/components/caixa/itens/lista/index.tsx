import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import api from "@utils/api";
import { useRegister } from "context/register/RegisterContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ItensComanda, ItensComandaSearch } from "types/Caixa";
import "./index.css";

const ListaItens = () => {
  const {
    codigoComanda,
    setCaixaGeral,
    caixaGeral,
    clicouComanda,
    setClicouComanda,
    setTotalSelecionados,
  } = useRegister();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!clicouComanda) return;

    buscarItensComanda();
    setItensSelecionados([]);
    setClicouComanda(false);
  }, [clicouComanda]);

  const [itensComanda, setItensComanda] = useState<ItensComandaSearch[]>([]);
  const [itensSelecionados, setItensSelecionados] = useState<number[]>([]);

  useEffect(() => {
    if (!itensSelecionados.length) return;

    setCaixaGeral({
      ...caixaGeral,
      codigosPedidosItens: [...itensSelecionados],
    });
  }, [itensSelecionados]);

  useEffect(() => {
    setTotalSelecionados(
      itensComanda
        .filter((item) => itensSelecionados.some((p) => p === item.id))
        .reduce((acc, cur) => acc + cur.total, 0)
    );
  }, [itensSelecionados]);

  const buscarItensComanda = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `Caixa/BuscarItensComanda/${codigoComanda}`
      );
      const itens: ItensComanda[] = response.data.body.items;

      const sortedItens = itens.sort((a, b) => {
        if (a.pago && !b.pago) return 1;
        if (!a.pago && b.pago) return -1;
        return 0;
      });

      setItensComanda(
        sortedItens.map((item) => ({
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
    <div className="h-[400px] lg:h-[300px] lg:text-sm	bg-zinc-700 rounded-lg border-4 border-zinc-700">
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
          Item: (
            <a title={item.nome} className="item-desc-grid">
              {item.nome}
            </a>
          ),
          ...item,
        }))}
        columns={["", "Item", "qntd", "valor", "total", "pago"]}
        activeColParam="pago"
        activeColValue="Sim"
      />
    </div>
  );
};

export default ListaItens;
