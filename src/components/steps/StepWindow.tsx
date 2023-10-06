/* eslint-disable no-debugger */
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";
import GenericWindow from "../base/GenericWindow";
import api from "@utils/api";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useState } from "react";
import { Etapa, EtapaItem } from "types/Etapa";
import GenericTable from "@components/base/GenericTable";

type EtapaFormType = {
  id?: number;
  descricao: string;
  multiplaEscolha?: boolean;
};

interface IStepProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  step?: EtapaFormType;
}

const formSchema = yup.object({
  descricao: yup.string().required("Você precisa informar o campo descrição"),
});

const formItemSchema = yup.object({
  descricao: yup.string().required("Você precisa informar o campo descrição"),
});

const StepWindow = ({ isOpen, setIsOpen, step }: IStepProps) => {
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
    formState: { errors: errorsItem },
  } = useForm<EtapaItem>({
    resolver: yupResolver(formItemSchema),
  });

  const [etapasItens, setEtapasItens] = useState<EtapaItem[]>([]);

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
          <div className="flex w-full items-center gap-2">
            <div className="w-full flex flex-col">
              <span className="label-text">Descrição</span>
              <input
                type="text"
                placeholder="Descrição do item"
                className="input input-bordered w-full mb-4"
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
            <button
              type="button"
              onClick={handleSubmitItem((data) => handleClickAdicioanr(data))}
              className="btn btn-accent"
            >
              Adicionar
            </button>
          </div>
          <p className="text-red-500">{errorsItem.descricao?.message}</p>
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
