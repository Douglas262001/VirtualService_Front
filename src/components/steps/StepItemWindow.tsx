import GenericWindow from "@components/base/GenericWindow";
import * as yup from "yup";
import { useForm /* SubmitHandler */ } from "react-hook-form";
import { EtapaItem } from "types/Etapa";
import { yupResolver } from "@hookform/resolvers/yup";

type StepItemWindowProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  setEtapasItens: React.Dispatch<React.SetStateAction<EtapaItem[]>>;
  etapasItens: EtapaItem[];
};

const formSchema = yup.object({
  descricao: yup.string().required("Você precisa informar o campo descrição"),
});

const StepItemWindow = ({ isOpen, setIsOpen, setEtapasItens, etapasItens }: StepItemWindowProps) => {
  const {
    register,
    // handleSubmit,
    reset,
    // setValue,
    getValues,
    formState: { errors },
  } = useForm<EtapaItem>({
    resolver: yupResolver(formSchema),
    defaultValues: import.meta.env.DEV
      ? {
          descricao: /* step?.descricao ?? */ "",
        }
      : {},
  });

  const handleClickSalvar = () => {
    const etapaItem = getValues();
    const newItem = {
      ...etapaItem,
      itemCadastrado: false,
    };

    setEtapasItens([...etapasItens, newItem]);
    reset({
      descricao: "",
      valor: 0,
    });
    setIsOpen(false);
  };

  return (
    <GenericWindow isOpen={isOpen} setIsOpen={setIsOpen} title="Item">
      <div>
        <div className="flex flex-col">
          <div className="flex w-full items-center gap-2">
            <div className="w-full flex flex-col">
              <span className="label-text">Descrição</span>
              <input
                type="text"
                placeholder="Escreva aqui a descrição do item"
                className="input input-bordered w-full mb-4"
                {...register("descricao", {
                  shouldUnregister: true,
                  //   value: step?.descricao ?? "",
                })}
              />
              <p className="text-red-500">{errors.descricao?.message}</p>
            </div>
            <div className="w-full flex flex-col">
              <span className="label-text">Valor</span>
              <input
                type="number"
                placeholder="Escreva aqui o valor do item"
                className="input input-bordered w-full mb-4"
                {...register("valor", {
                  shouldUnregister: true,
                  //     value: step?.descricao ?? "",
                })}
              />
              {/* <p className="text-red-500">{errors.descricao?.message}</p> */}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-text">Item cadastrado</span>
            <input
              type="checkbox"
              className="checkbox"
              //   {...register("multiplaEscolha", {
              //     shouldUnregister: true,
              //     value: step?.multiplaEscolha ?? false,
              //   })}
            />
          </div>
        </div>
        <div className="modal-action">
          <button
            className="btn btn-error"
            onClick={() => {
              /*    reset({
                descricao: "",
                multiplaEscolha: false,
              }); */
              setIsOpen(false);
            }}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-success" onClick={handleClickSalvar}>
            Salvar
          </button>
        </div>
      </div>
    </GenericWindow>
  );
};

export default StepItemWindow;
