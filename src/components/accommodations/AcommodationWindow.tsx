import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";
import GenericWindow from "../base/GenericWindow";
import api from "@utils/api";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

type AccommodationFormType = {
  id?: number;
  descricao: string;
};

interface IAccommodationProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  accommodation?: AccommodationFormType;
}

const formSchema = yup.object({
  descricao: yup.string().required("Você precisa informar o campo descrição"),
});

const AccommodationWindow = ({
  isOpen,
  setIsOpen,
  accommodation,
}: IAccommodationProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AccommodationFormType>({
    resolver: yupResolver(formSchema),
    defaultValues: import.meta.env.DEV
      ? {
          descricao: accommodation?.descricao ?? "",
        }
      : {},
  });

  if (accommodation) {
    setValue("id", accommodation.id);
  }

  const mutationCreate = useMutation(
    (s: AccommodationFormType) => api.post(`Acomodacao/NovaArea`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getAccommodations"]);
        setIsOpen(false);
        toast.success("Acomodação cadastrada com sucesso!");
      },
    }
  );

  const mutationUpdate = useMutation(
    (s: AccommodationFormType) => {
      return api.post(`Acomodacao/AlterarArea`, s);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getAccommodations"]);
        setIsOpen(false);
        toast.success("Acomodação alterada com sucesso!");
        reset({
          descricao: "",
        });
      },
    }
  );

  const onSubmit: SubmitHandler<AccommodationFormType> = async (data) => {
    if (data.id) {
      mutationUpdate.mutate(data);
      return;
    }
    mutationCreate.mutate(data);
  };

  return (
    <GenericWindow title="Área" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <div className="w-full flex flex-col">
            <span className="label-text">Descrição</span>
            <input
              type="text"
              placeholder="Escreva aqui sua descrição"
              className="input input-bordered w-full mb-4"
              {...register("descricao", {
                shouldUnregister: true,
                value: accommodation?.descricao ?? "",
              })}
            />
          </div>
          <p className="text-red-500">{errors.descricao?.message}</p>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-error"
              onClick={() => {
                reset({
                  descricao: "",
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
        </div>
      </form>
    </GenericWindow>
  );
};

export default AccommodationWindow;
