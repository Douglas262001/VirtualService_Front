/* eslint-disable no-debugger */
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

type EtapaFormType = {
  id?: number;
  descricao: string;
  multiplaEscolha?: boolean;
  itemCadastrado?: boolean;
};

interface IStepProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  step?: EtapaFormType;
}

type ProdutoServicoEtapaItem = {
  id: number;
  nome: string;
  tipo: number;
  urlImagem: string;
  valor: number;
};

const formSchema = yup.object({
  descricao: yup.string().required("Você precisa informar o campo descrição"),
});

const StepWindow = ({ isOpen, setIsOpen, step }: IStepProps) => {
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
          descricao: step?.descricao ?? "",
        }
      : {},
  });

  const {
    register: registerItem,
    handleSubmit: handleSubmitItem,
    reset: resetItem,
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

  if (step) {
    setValue("id", step.id);
  }

  const mutationCreate = useMutation(
    (s: Etapa) => api.post(`Etapa/NovaEtapa`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getSteps"]);
        setEtapasItens([]);
        setIsOpen(false);
        toast.success("Etapa cadastrada com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );
  /* 
  const mutationUpdate = useMutation(
    (s: EtapaFormType) => {
      return api.put(`Etapa/Salvar`, s);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getSteps"]);
        setIsOpen(false);
        toast.success("Etapa alterada com sucesso!");
        reset({
          descricao: "",
        });
      },
    }
  );
 */
  const onSubmit: SubmitHandler<EtapaFormType> = async (data) => {
    // if (data.id) {
    //   mutationUpdate.mutate(data);
    //   return;
    // }

    const etapa: Etapa = {
      descricao: data.descricao,
      multiplaEscolha: data.multiplaEscolha ?? false,
      etapaItems: etapasItens,
    };

    mutationCreate.mutate(etapa);
  };

  const handleClickAdicioanr = (etapaItem: EtapaItem) => {
    if (!etapaItem.descricao && !itemCadastrado)
      return toast.error("Preencha o campo descrição do item");
    const newItem = {
      ...etapaItem,
      itemCadastrado: false,
    };
    setEtapasItens([...etapasItens, newItem]);
    resetItem({
      descricao: "",
      valor: 0,
    });
  };

  return (
    <GenericWindow title="Etapa" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <div className="flex w-full items-center">
            <div className="w-full flex flex-col">
              <span className="label-text">Descrição</span>
              <input
                type="text"
                placeholder="Escreva aqui sua descrição"
                className="input input-bordered w-full mb-4"
                {...register("descricao", {
                  shouldUnregister: true,
                  value: step?.descricao ?? "",
                })}
              />
              <p className="text-red-500">{errors.descricao?.message}</p>
            </div>
            <div className="flex gap-3 ml-4 w-64">
              <span className="label-text">Múltipla escolha</span>
              <input
                type="checkbox"
                className="checkbox"
                {...register("multiplaEscolha", {
                  shouldUnregister: true,
                  value: step?.multiplaEscolha ?? false,
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
                  <span className="label-text">Descrição</span>
                  <input
                    type="text"
                    placeholder="Descrição do item"
                    className="input input-bordered w-full mb-4"
                    required={!itemCadastrado}
                    {...registerItem("descricao")}
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
            <button
              type="button"
              onClick={handleSubmitItem((data) => handleClickAdicioanr(data))}
              className="btn btn-accent"
            >
              Adicionar
            </button>
          </div>
          <GenericTable values={etapasItens} columns={["descricao", "valor"]} />
        </div>
        <div className="modal-action">
          <button
            type="submit"
            className="btn btn-error"
            onClick={() => {
              reset({
                descricao: "",
                multiplaEscolha: false,
              });
              setIsOpen(false);
            }}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-success">
            Salvar
          </button>
        </div>
      </form>
    </GenericWindow>
  );
};

export default StepWindow;
