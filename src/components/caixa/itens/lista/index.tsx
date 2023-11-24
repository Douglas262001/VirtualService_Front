import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { useRegister } from "context/register/RegisterContext";
import { TrashSimple } from "phosphor-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
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
    buscarCaixaGeral,
    itensComanda,
    // setItensComanda
  } = useRegister();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!clicouComanda) return;

    buscarCaixa();
    setItensSelecionados([]);
    setClicouComanda(false);
  }, [clicouComanda]);

  const buscarCaixa = async () => {
    try {
      setIsLoading(true);
      await buscarCaixaGeral();
    } catch (error: any) {
      toast.error(error);
    }
    finally{
      setIsLoading(false);
    }
  }
  // const [itensComanda, setItensComanda] = useState<ItensComandaSearch[]>([]);
  const [itensSelecionados, setItensSelecionados] = useState<number[]>([]);

  useEffect(() => {
    const novosItens = itensSelecionados.length > 0
      ? itensSelecionados
      : itensComanda
        .filter((p) => p.pago === "Não")
        .map((p) => p.id);

    setCaixaGeral({
      ...caixaGeral,
      codigosPedidosItens: [...novosItens],
    });
  }, [itensSelecionados]);

  useEffect(() => {
    0
    setTotalSelecionados(
      itensComanda
        .filter((item) => itensSelecionados.some((p) => p === item.id))
        .reduce((acc, cur) => acc + cur.total, 0)
    );
  }, [itensSelecionados]);

  const mutationDelete = useMutation(
    (s?: number) => api.delete(`Pedido/CancelarPedidoItem/${s}`),
    {
      onSuccess: async () => {
        toast.success("Item excluído com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  // const buscarItensComanda = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await api.get(
  //       `Caixa/BuscarItensComanda/${codigoComanda}`
  //     );

  //     const itens: ItensComanda[] = response.data.body.items;

  //     const sortedItens = itens.sort((a, b) => {
  //       if (a.pago && !b.pago) return 1;
  //       if (!a.pago && b.pago) return -1;
  //       return 0;
  //     });

  //     setItensComanda(
  //       sortedItens.map((item) => ({
  //         id: item.id,
  //         nome: item.nomeItem,
  //         valor: item.valorUn,
  //         qntd: item.qtd,
  //         total: item.valorTotal,
  //         pago: item.pago ? "Sim" : "Não",
  //       }))
  //     );
  //   } catch (error: any) {
  //     toast.error(error.response.data.reasonPhrase);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  if (isLoading)
    return (
      <div className="h-[300px] bg-zinc-700 rounded-lg border-4 border-zinc-700 justify-center flex">
        <GenericLoading />
      </div>
    );

  if (!itensComanda.length)
    return (
      <div className="h-[300px] bg-zinc-700 rounded-lg border-4 border-zinc-700 justify-center flex">
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

  const handleDeleteItemPedido = (item: ItensComandaSearch, id?: number) => async () => {
    if (!id) return;
    if (!item) return;

    if (itensComanda.length === 1) return toast.error("Não é possível remover pois a comanda só tem um item");
    if (item.pago === "Sim") return toast.error("Não é possível excluir item pago");


    Swal.fire({
      title: "Confirmação",
      text: "Deseja realmente excluir este item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      iconColor: "#ef4444",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, excluir!",
      background: "#333",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        mutationDelete.mutate(id);
        const $cardComanda = document.getElementById(
          `comanda-${codigoComanda}`
        );

        setTimeout(() => {
          $cardComanda && $cardComanda.click();
        }, 1000);
      }
    });
  }

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
          x: (
            <TrashSimple
              onClick={handleDeleteItemPedido(item, item.id)}
              size={24}
              className="cursor-pointer text-red-500"
            />
          ),
        }))}
        columns={["", "Item", "qntd", "valor", "total", "pago", "x"]}
        activeColParam="pago"
        activeColValue="Sim"
      />
    </div>
  );
};

export default ListaItens;
