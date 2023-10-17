import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";
import GenericWindow from "../base/GenericWindow";
import api from "@utils/api";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import SearchField from "@components/base/SearchField";
import ButtonSave from "@components/base/ButtonSave";
import ButtonCancel from "@components/base/ButtonCancel";
import { AccommodationType } from "@hooks/useGetAccommodations";
import { MesaType } from "types/QuartoMesa";

type MesaFormType = {
  id?: number;
  numero: string;
  capacidade: number;
};

interface ITableProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  codigoMesa?: number;
  setCodigoMesa?: React.Dispatch<number>;
}

const formSchema = yup.object({
  numero: yup.string().required("Você precisa informar o campo número"),
  capacidade: yup
    .number()
    .required("Você precisa informar o campo capacidade")
    .min(1, "A capacidade deve ser maior que 0"),
});

const TableWindow = ({
  isOpen,
  setIsOpen,
  codigoMesa,
  setCodigoMesa,
}: ITableProps) => {
  useEffect(() => {
    if (!isOpen || codigoMesa) return;

    listarAreas();
  }, [isOpen]);

  useEffect(() => {
    if (!codigoMesa) return;

    buscarMesaPorId();
  }, [codigoMesa]);

  const buscarMesaPorId = async () => {
    try {
      const response = await api.get(`QuartoMesa/Buscar/${codigoMesa}`);
      const mesa: MesaType = response.data.body;

      setValue("numero", mesa.numero);
      setValue("capacidade", mesa.capacidade);
      await setAreaPeloCodigo(mesa.codigoArea);
    } catch (error: any) {
      console.log(error.response.data.reasonPhrase);
    }
  };

  const listarAreas = async () => {
    try {
      const response = await api.get("Area/Listar");

      setAreas(response.data.body);
    } catch (error: any) {
      console.log(error.response.data.reasonPhrase);
    }
  };

  const setAreaPeloCodigo = async (codigoArea?: number) => {
    try {
      const response = await api.get("Area/Listar");

      setAreas(response.data.body);

      if (codigoArea) {
        const area = response.data.body.find(
          (a: MesaFormType) => a.id === codigoArea
        );

        if (!area) return;

        setArea(area);
      }
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
  } = useForm<MesaFormType>({
    resolver: yupResolver(formSchema),
    defaultValues: import.meta.env.DEV
      ? {
          numero: "",
        }
      : {},
  });

  const [areas, setAreas] = useState<AccommodationType[]>([]);
  const [area, setArea] = useState<AccommodationType>({
    id: 0,
    descricao: "",
  });

  const mutationCreate = useMutation(
    (s: MesaType) => api.post(`QuartoMesa/Inserir`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getTables"]);
        setIsOpen(false);
        limparCampos();
        toast.success("Mesa cadastrada com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const mutationUpdate = useMutation(
    (s: MesaType) => {
      return api.put(`QuartoMesa/Alterar`, s);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getTables"]);
        setIsOpen(false);
        limparCampos();
        toast.success("Mesa alterada com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const onSubmit: SubmitHandler<MesaFormType> = async (data) => {
    if (!area.id) return toast.error("Você precisa selecionar uma área");

    const mesa: MesaType = {
      id: codigoMesa,
      numero: data.numero,
      capacidade: data.capacidade,
      codigoArea: area.id,
    };

    if (codigoMesa) return mutationUpdate.mutate(mesa);

    mutationCreate.mutate(mesa);
  };

  const handleClickCancelar = () => {
    limparCampos();
    setIsOpen(false);
  };

  const limparCampos = () => {
    reset({
      numero: "",
      capacidade: 0,
    });
    setArea({
      id: 0,
      descricao: "",
    });
    setCodigoMesa && setCodigoMesa(0);
  };

  return (
    <GenericWindow title="Mesa" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className="flex w-full items-center gap-2">
            <div className="w-full flex flex-col">
              <span className="label-text">Número</span>
              <input
                type="text"
                placeholder="Número da mesa"
                className="input input-bordered w-full mb-4"
                {...register("numero", {
                  shouldUnregister: true,
                })}
              />
            </div>
            <div className="w-full flex flex-col">
              <span className="label-text">Capacidade</span>
              <input
                type="number"
                placeholder="Capacidade da mesa"
                min={1}
                pattern="\d*"
                className="input input-bordered w-full mb-4"
                {...register("capacidade", {
                  shouldUnregister: true,
                })}
              />
            </div>
          </div>
          <p className="text-red-500">{errors.numero?.message}</p>
          <div className="w-full flex flex-col">
            <span className="label-text">Área</span>
            <SearchField
              value={area}
              setValue={setArea}
              data={areas}
              displayValue="descricao"
              valueField="id"
              optionsHeight="80"
            />
          </div>
        </div>
        <div className="modal-action">
          <ButtonCancel type="button" onClick={handleClickCancelar} />
          <ButtonSave type="submit" />
        </div>
      </form>
    </GenericWindow>
  );
};

export default TableWindow;
