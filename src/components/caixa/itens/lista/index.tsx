import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import api from "@utils/api";
import { useRegister } from "context/register/RegisterContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ItensComanda, ItensComandaSearch } from "types/Caixa";

const ListaItens = () => {
  const { codigoComanda } = useRegister();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (codigoComanda === 0) return;

    buscarItensComanda();
  }, [codigoComanda]);

  const [itensComanda, setItensComanda] = useState<ItensComandaSearch[]>([]);
  const [itensSelecionados, setItensSelecionados] = useState<number[]>([]);

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

  if (isLoading) return <GenericLoading />;

  if (!itensComanda.length)
    return <p className="text-center text-[#303030]">Nenhum item encontrado</p>;

  const handleChangeCheckbox = (id: number) => {
    setItensSelecionados((prev) => {
      if (prev.some((p) => p === id)) {
        return prev.filter((p) => p !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <GenericTable
      values={itensComanda?.map((item) => ({
        "": (
          <input
            type="checkbox"
            className="checkbox"
            onChange={() => handleChangeCheckbox(item.id)}
            checked={itensSelecionados.some((p) => p === item.id)}
          />
        ),
        ...item,
      }))}
      columns={["", "nome", "qntd", "valor", "total", "pago"]}
    />
  );
};

export default ListaItens;
