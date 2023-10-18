import ButtonCancel from "@components/base/ButtonCancel";
import ButtonSave from "@components/base/ButtonSave";
import GenericWindow from "@components/base/GenericWindow";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { queryClient } from "@utils/queryClient";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { MenuType } from "types/MenuType";
import * as yup from "yup";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  menu?: MenuType | null;
  setMenu?: React.Dispatch<MenuType | null>;
};

type TagFormType = {
    id?: number;
    descricao: string;
};

const formSchema = yup.object({
    descricao: yup.string().required("Você precisa informar o campo descricao"),
});

const MenuWindow = ({ isOpen, setIsOpen, menu, setMenu }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TagFormType>({
    resolver: yupResolver(formSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!menu) return;

    setValue("id", menu.id);
    setValue("descricao", menu.descricao);
  }, [menu]);

  const mutationCreate = useMutation(
    (s: MenuType) => api.post(`Menu/Novo`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getMenus"]);
        toast.success("Menu cadastrado com sucesso!");
        setIsLoading(false);
        setIsOpen(false);
        limparCampos();
      },
      onError: (error: any) => {
        setIsLoading(false);

        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const mutationUpdate = useMutation(
    (s: MenuType) => {
      return api.put(`Menu/Salvar`, s);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getMenus"]);
        setIsLoading(false);
        toast.success("Menu alterado com sucesso!");
        setIsOpen(false);
        limparCampos();
      },
      onError: (error: any) => {
        setIsLoading(false);
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const onSubmit: SubmitHandler<MenuType> = (data) => {
    setIsLoading(true);
    if (data.id) {
      mutationUpdate.mutate(data);
      return;
    }
    mutationCreate.mutate(data);
  };

  const handleCancel = () => {
    setIsOpen(false);
    limparCampos();
  };

  const limparCampos = () => {
    setMenu && setMenu(null);
    setValue("id", 0);
    setValue("descricao", "");
  };

  return (
    <GenericWindow title="Menu" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col">
              <span className="label-text">Descricao</span>
              <input
                type="string"
                placeholder="Descricao menu"
                className="input input-bordered w-full mb-3"
                {...register("descricao", {
                  shouldUnregister: true,
                  value: menu?.descricao ?? "",
                })}
              />
            </div>
            <p className="text-red-500">{errors.descricao?.message}</p>
          </div>
          <div className="modal-action">
            <ButtonCancel type="button" onClick={handleCancel} />
            <ButtonSave isLoading={isLoading} type="submit" />
          </div>
        </div>
      </form>
    </GenericWindow>
  );
};

export default MenuWindow;
