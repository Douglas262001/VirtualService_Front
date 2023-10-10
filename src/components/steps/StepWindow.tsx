import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";
import GenericWindow from "../base/GenericWindow";
import api from "@utils/api";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Etapa, EtapaItem } from "types/Etapa";
import GenericTable from "@components/base/GenericTable";
import SearchField from "@components/base/SearchField";
import {
  PencilSimple,
  Plus,
  SelectionSlash,
  TrashSimple,
} from "phosphor-react";
import ButtonSave from "@components/base/ButtonSave";
import ButtonCancel from "@components/base/ButtonCancel";

type EtapaFormType = {
  id?: number;
  nome: string;
  multiplaEscolha?: boolean;
  itemCadastrado?: boolean;
  obrigatoria?: boolean;
};

interface IStepProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  codigoEtapa?: number;
  setCodigoEtapa?: React.Dispatch<number>;
}

type ProdutoServicoEtapaItem = {
  id: number;
  nome: string;
  tipo: number;
  urlImagem: string;
  valor: number;
};

const formSchema = yup.object({
  nome: yup.string().required("Você precisa informar o campo descrição"),
});

const StepWindow = ({
  isOpen,
  setIsOpen,
  codigoEtapa,
  setCodigoEtapa,
}: IStepProps) => {
  useEffect(() => {
    listarProdutosTipoEtapaItem();
  }, []);

  const listarProdutosTipoEtapaItem = async () => {
    try {
      const response = await api.get("ProdutoServico/ListarItensEtapas");

      setProdutosServicos(response.data.body);
    } catch (error: any) {
      console.log(error.response.data.reasonPhrase);
    }
  };

  useEffect(() => {
    if (!codigoEtapa) return;

    buscarEtapaPorId();
  }, [codigoEtapa]);

  const buscarEtapaPorId = async () => {
    try {
      const response = await api.get(`Etapa/BuscarEtapa/${codigoEtapa}`);
      const etapa: Etapa = response.data.body;

      setValue("nome", etapa.nome);
      setValue("multiplaEscolha", etapa.multiplaEscolha);
      setValue("obrigatoria", etapa.obrigatoria);
      setEtapasItens(etapa.etapaItems);
    } catch (error: any) {
      console.log(error.response.data.reasonPhrase);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EtapaFormType>({
    resolver: yupResolver(formSchema),
    defaultValues: import.meta.env.DEV
      ? {
          nome: "",
        }
      : {},
  });

  const {
    register: registerItem,
    handleSubmit: handleSubmitItem,
    reset: resetItem,
    setValue: setValueItem,
  } = useForm<EtapaItem>({});

  const [etapasItens, setEtapasItens] = useState<EtapaItem[]>([]);
  const [itemCadastrado, setItemCadastrado] = useState<boolean>(false);
  const [produtosServicos, setProdutosServicos] = useState<
    ProdutoServicoEtapaItem[]
  >([]);
  const [produtoServico, setProdutoServico] = useState<ProdutoServicoEtapaItem>(
    {
      id: 0,
      nome: "",
      tipo: 0,
      urlImagem: "",
      valor: 0,
    }
  );

  const [indexEditing, setIndexEditing] = useState<number | null>(null);

  const mutationCreate = useMutation(
    (s: Etapa) => api.post(`Etapa/NovaEtapa`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getSteps"]);
        setIsOpen(false);
        limparCampos();
        toast.success("Etapa cadastrada com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const mutationUpdate = useMutation(
    (s: Etapa) => {
      return api.put(`Etapa/Salvar`, s);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getSteps"]);
        setIsOpen(false);
        limparCampos();
        toast.success("Etapa alterada com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const onSubmit: SubmitHandler<EtapaFormType> = async (data) => {
    const etapa: Etapa = {
      id: codigoEtapa,
      nome: data.nome,
      multiplaEscolha: data.multiplaEscolha ?? false,
      obrigatoria: data.obrigatoria ?? false,
      etapaItems: etapasItens,
    };

    if (codigoEtapa) return mutationUpdate.mutate(etapa);

    mutationCreate.mutate(etapa);
  };

  const handleClickAdicioanr = (etapaItem: EtapaItem) => {
    if (!etapaItem.nome && !itemCadastrado)
      return toast.error("Preencha o campo nome do item");

    let newItem: EtapaItem;

    if (itemCadastrado) {
      newItem = {
        codigoEtapa: codigoEtapa,
        codigoProdutoServico: produtoServico.id,
        nome: produtoServico.nome,
        valor: produtoServico.valor,
        itemCadastrado: true,
      };
    } else {
      newItem = {
        ...etapaItem,
        valor: Number(etapaItem.valor),
        codigoEtapa: codigoEtapa,
        itemCadastrado: false,
      };
    }

    setEtapasItens([...etapasItens, newItem]);

    resetItem({
      nome: "",
      valor: 0,
    });
  };

  const handleClickEditar = (etapaItem: EtapaItem) => {
    const newItem = {
      ...etapaItem,
      valor: Number(etapaItem.valor),
      itemCadastrado: false,
    };

    const newEtapasItens = etapasItens.map((item, index) =>
      index === indexEditing ? { ...item, ...newItem } : item
    );

    setEtapasItens(newEtapasItens);

    setIndexEditing(null);

    resetItem({
      nome: "",
      valor: 0,
    });
  };

  const handleClickCancelar = () => {
    limparCampos();
    setIsOpen(false);
  };

  const limparCampos = () => {
    reset({
      nome: "",
      multiplaEscolha: false,
      obrigatoria: false,
    });
    resetItem({
      nome: "",
      valor: 0,
    });
    setProdutoServico({
      id: 0,
      nome: "",
      tipo: 0,
      urlImagem: "",
      valor: 0,
    });
    setItemCadastrado(false);
    setIndexEditing(null);
    setEtapasItens([]);
    setCodigoEtapa && setCodigoEtapa(0);
  };

  const handleClickEditarRow = (etapaItem: EtapaItem, index: number) => {
    setIndexEditing(index);
    setValueItem("nome", etapaItem.nome);
    setValueItem("valor", etapaItem.valor);
  };

  return (
    <GenericWindow title="Etapa" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <div className="flex w-full items-center">
            <div className="w-full flex flex-col">
              <span className="label-text">Nome</span>
              <input
                type="text"
                placeholder="Nome da etapa"
                className="input input-bordered w-full mb-4"
                {...register("nome", {
                  shouldUnregister: true,
                })}
              />
              <p className="text-red-500">{errors.nome?.message}</p>
            </div>
            <div className="flex gap-3 ml-4 w-64">
              <span className="label-text">Múltipla escolha</span>
              <input
                type="checkbox"
                className="checkbox"
                {...register("multiplaEscolha", {
                  shouldUnregister: true,
                })}
              />
            </div>
            <div className="flex gap-3 ml-4 w-64">
              <span className="label-text">Obrigatória</span>
              <input
                type="checkbox"
                className="checkbox"
                {...register("obrigatoria", {
                  shouldUnregister: true,
                })}
              />
            </div>
          </div>
          <span className="text-2xl">Itens</span>

          <div className="flex items-center gap-2 my-3">
            <span>Item cadastrado</span>
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setItemCadastrado(e.target.checked)
              }
            />
          </div>
          <div className="flex w-full items-center gap-2">
            {itemCadastrado ? (
              <>
                <SearchField
                  value={produtoServico}
                  setValue={setProdutoServico}
                  data={produtosServicos}
                  displayValue="nome"
                  valueField="id"
                />
              </>
            ) : (
              <>
                <div className="w-full flex flex-col">
                  <span className="label-text">Nome</span>
                  <input
                    type="text"
                    placeholder="Nome do item"
                    className="input input-bordered w-full mb-4"
                    {...registerItem("nome")}
                  />
                </div>
                <div className="w-full flex flex-col">
                  <span className="label-text">Valor</span>
                  <input
                    type="number"
                    min={0}
                    placeholder="Valor do item"
                    className="input input-bordered w-full mb-4"
                    {...registerItem("valor")}
                  />
                </div>
              </>
            )}
            {indexEditing !== null && !itemCadastrado ? (
              <button
                type="button"
                onClick={handleSubmitItem((data) => handleClickEditar(data))}
                className="btn btn-accent"
              >
                Editar
                <PencilSimple size={20} className="ml-2" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitItem((data) => handleClickAdicioanr(data))}
                className="btn btn-info"
              >
                Adicionar
                <Plus size={20} className="ml-2" />
              </button>
            )}
          </div>
          <GenericTable
            values={etapasItens.map((item, index) => ({
              editar: item.itemCadastrado ? (
                <SelectionSlash size={20} />
              ) : (
                <PencilSimple
                  className="cursor-pointer"
                  size={20}
                  onClick={() => handleClickEditarRow(item, index)}
                />
              ),
              nome: item.nome,
              valor: item.valor?.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              }),
              excluir: (
                <TrashSimple
                  onClick={() => {
                    setEtapasItens(etapasItens.filter((_, i) => i !== index));
                  }}
                  className="cursor-pointer text-red-500"
                  size={20}
                />
              ),
            }))}
            columns={["editar", "nome", "valor", "excluir"]}
          />
        </div>
        <div className="modal-action">
          <ButtonCancel type="button" onClick={handleClickCancelar} />
          <ButtonSave type="submit" />
        </div>
      </form>
    </GenericWindow>
  );
};

export default StepWindow;
