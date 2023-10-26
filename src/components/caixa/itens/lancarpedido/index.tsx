import ButtonCancel from "@components/base/ButtonCancel";
import ButtonSave from "@components/base/ButtonSave";
import GenericTable from "@components/base/GenericTable";
import GenericWindow from "@components/base/GenericWindow";
import SearchField from "@components/base/SearchField";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { useRegister } from "context/register/RegisterContext";
import {
  Lock,
  PencilSimple,
  Placeholder,
  Plus,
  TrashSimple,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PedidoRapidoItemType, PedidoRapidoType } from "types/Pedido";
import { TagSearchType } from "types/TagType";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  codigoTag?: number;
};

type ProdutoServico = {
  id?: number;
  nome: string;
  valor: number;
};

const LancarPedidoWindow = ({ isOpen, setIsOpen, codigoTag }: Props) => {
  const { setRefetchComandas, codigoComanda } = useRegister();
  const [produtosServicos, setProdutosServicos] = useState<ProdutoServico[]>(
    []
  );
  const [produtoServico, setProdutoServico] = useState<ProdutoServico>({
    nome: "",
    valor: 0,
  });
  const [comanda, setComanda] = useState<TagSearchType>({
    id: 0,
    numero: "0",
    status: 0,
  });
  const [comandas, setComandas] = useState<TagSearchType[]>([]);
  const [pedidosItem, setPedidosItem] = useState<PedidoRapidoItemType[]>([]);
  const [nomeItem, setNomeItem] = useState<string>("");
  const [qtdItem, setQtdItem] = useState<number>(0);
  const [valorUnItem, setValorUnItem] = useState<number>(0);
  const [itemCadastrado, setItemCadastrado] = useState<boolean>(true);
  const [indexEditing, setIndexEditing] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    listarProdutosTipoEtapaItem();
    listarComandas();
  }, [isOpen]);

  useEffect(() => {
    if (!itemCadastrado) return;

    if (!produtoServico.id) return;

    setValorUnItem(produtoServico.valor);
  }, [produtoServico, itemCadastrado]);

  const mutation = useMutation(
    (s: PedidoRapidoType) => api.post(`Pedido/FazerPedidoRapido`, s),
    {
      onSuccess: async function () {
        limparCampos();
        toast.success("Pedido realizado com sucesso");
        setIsLoading(false);

        const $cardComanda = document.getElementById(
          `comanda-${codigoComanda}`
        );

        $cardComanda && $cardComanda.click();

        setRefetchComandas(true);
        setIsOpen(false);
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
        setIsLoading(false);
      },
    }
  );

  const listarProdutosTipoEtapaItem = async () => {
    try {
      const response = await api.get("ProdutoServico/Listar");

      setProdutosServicos(response.data.body);
    } catch (error: any) {
      console.log(error.response.data.reasonPhrase);
    }
  };

  const listarComandas = async () => {
    try {
      const response = await api.get("Tags/Listar");

      setComandas(response.data.body);
      if (codigoTag) {
        const tag = response.data.body.find(
          (tag: TagSearchType) => tag.id === codigoTag
        );

        if (tag) {
          setComanda(tag);
        }
      }
    } catch (error: any) {
      console.log(error.response.data.reasonPhrase);
    }
  };

  const handleClickAdicionar = () => {
    const pedidoItem: PedidoRapidoItemType = {
      codigoProdutoServico: itemCadastrado ? produtoServico.id : 0,
      nome: itemCadastrado ? produtoServico.nome : nomeItem,
      valorUn: valorUnItem,
      qtd: qtdItem,
    };

    if (!pedidoItem.nome.length)
      return toast.error("Nome do item não pode ser vazio");

    if (!pedidoItem.valorUn) return toast.error("Valor do item não pode ser 0");

    if (!pedidoItem.qtd)
      return toast.error("Quantidade do item não pode ser 0");

    setPedidosItem([...pedidosItem, pedidoItem]);

    setProdutoServico({ nome: "", valor: 0 });
    setNomeItem("");
    setQtdItem(0);
    setValorUnItem(0);
  };

  const handleClickEditar = () => {
    const newItem = {
      ...pedidosItem[indexEditing!],
      nome: nomeItem,
      valorUn: valorUnItem,
      qtd: qtdItem,
    };

    const newPedidosItem = pedidosItem.map((item, index) =>
      index === indexEditing ? { ...item, ...newItem } : item
    );

    setPedidosItem(newPedidosItem);
    setIndexEditing(null);
    setNomeItem("");
    setQtdItem(0);
    setValorUnItem(0);
  };

  const handleClickEditarRow = (item: PedidoRapidoItemType) => {
    setIndexEditing(pedidosItem.indexOf(item));
    setValorUnItem(item.valorUn);
    setQtdItem(item.qtd);
    setNomeItem(item.nome);
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comanda.id) return toast.error("Comanda não pode ser vazia");
    setIsLoading(true);
    const pedido: PedidoRapidoType = {
      codigoTag: comanda.id || 0,
      items: pedidosItem,
    };

    mutation.mutate(pedido);
  };

  const handleClickCancelar = () => {
    limparCampos();
    setIsOpen(false);
  };

  const limparCampos = () => {
    setProdutoServico({ nome: "", valor: 0 });
    setNomeItem("");
    setQtdItem(0);
    setValorUnItem(0);
    setPedidosItem([]);
  };

  return (
    <GenericWindow
      maxWidth="w-[50vw]"
      title="Lançar pedido"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <form className="form-control" onSubmit={onSubmitForm}>
        <div className="flex gap-2 items-center mb-2 w-full">
          <div className="flex flex-col">
            <span className="label-text">Comanda</span>
            <div className="flex items-center">
              <SearchField
                value={comanda}
                setValue={setComanda}
                data={comandas}
                displayValue="numero"
                valueField="id"
                optionsHeight="500"
                disabled={codigoTag !== undefined}
              />
              <Lock weight="fill"  className={`${codigoTag !== undefined ? "visible" : "invisible"}`}/>
            </div>
          </div>
          <span className="label-text">Item cadastrado</span>
          <input
            className="checkbox"
            type="checkbox"
            checked={itemCadastrado}
            onChange={() => setItemCadastrado(!itemCadastrado)}
          />
        </div>
        <div className="flex w-full items-center gap-2">
          <div className="flex flex-col">
            <span className="label-text">Produto</span>
            {!itemCadastrado || indexEditing !== null ? (
              <input
                type="text"
                className="input input-bordered"
                value={nomeItem}
                onChange={(e) => setNomeItem(e.target.value)}
              />
            ) : (
              <SearchField
                value={produtoServico}
                setValue={setProdutoServico}
                data={produtosServicos}
                displayValue="nome"
                valueField="id"
                optionsHeight="350"
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className="label-text">Quant.</span>
            <input
              type="number"
              className="input input-bordered"
              value={qtdItem}
              step={0.01}
              onChange={(e) => setQtdItem(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <span className="label-text">Valor</span>
            <input
              type="number"
              className="input input-bordered"
              value={valorUnItem}
              step={0.01}
              onChange={(e) => setValorUnItem(Number(e.target.value))}
            />
          </div>
        </div>
        {indexEditing !== null ? (
          <button
            className="btn btn-accent my-2"
            type="button"
            onClick={handleClickEditar}
          >
            Editar <PencilSimple className="ml-3" size={20} />
          </button>
        ) : (
          <button
            onClick={handleClickAdicionar}
            type="button"
            className="btn btn-info my-2"
          >
            Adicionar
            <Plus size={20} />
          </button>
        )}

        <div className="h-72">
          <GenericTable
            values={pedidosItem.map((item) => ({
              editar: !item.codigoProdutoServico ? (
                <PencilSimple
                  className="cursor-pointer"
                  size={20}
                  onClick={() => handleClickEditarRow(item)}
                />
              ) : (
                <Placeholder size={20} />
              ),
              nome: item.nome,
              valorUn: item.valorUn,
              qtd: item.qtd,
              excluir: (
                <TrashSimple
                  size={20}
                  className="text-red-500 cursor-pointer"
                  onClick={() => {
                    setPedidosItem(pedidosItem.filter((i) => i !== item));
                  }}
                />
              ),
            }))}
            columns={["editar", "nome", "valorUn", "qtd", "excluir"]}
          />
        </div>
        <div className="modal-action">
          <ButtonCancel type="button" onClick={handleClickCancelar} />
          <ButtonSave isLoading={isLoading} type="submit" />
        </div>
      </form>
    </GenericWindow>
  );
};

export default LancarPedidoWindow;
