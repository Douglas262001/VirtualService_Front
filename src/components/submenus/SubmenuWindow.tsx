import ButtonCancel from "@components/base/ButtonCancel";
import ButtonSave from "@components/base/ButtonSave";
import GenericWindow from "@components/base/GenericWindow";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { queryClient } from "@utils/queryClient";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { SubMenuType } from "types/SubMenu";
import * as yup from "yup";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  subMenu?: SubMenuType | null;
  setSubMenu?: React.Dispatch<SubMenuType | null>;
};

const formSchema = yup.object({
  nome: yup.string().required("Você precisa informar o campo nome"),
});

const SubmenuWindow = ({ isOpen, setIsOpen, subMenu, setSubMenu }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubMenuType>({
    resolver: yupResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!subMenu) return;

    setValue("id", subMenu.id);
    setValue("nome", subMenu.nome);
    setValue("descricao", subMenu.descricao);
  }, [subMenu]);

  const mutationCreate = useMutation(
    (s: SubMenuType) => api.post(`SubMenu/Inserir`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getSubMenus"]);
        toast.success("Submenu cadastrado com sucesso!");
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
    (s: SubMenuType) => {
      return api.put(`SubMenu/Alterar`, s);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getSubMenus"]);
        setIsLoading(false);
        toast.success("Submenu alterado com sucesso!");
        setIsOpen(false);
        limparCampos();
      },
      onError: (error: any) => {
        setIsLoading(false);
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const onSubmit: SubmitHandler<SubMenuType> = (data) => {
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
    setSubMenu && setSubMenu(null);
    setValue("id", 0);
    setValue("nome", "");
    setValue("descricao", "");
  };

  return (
    <GenericWindow title="Submenus" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col">
              <span className="label-text">Nome</span>
              <input
                type="text"
                placeholder="Nome do submenu"
                className="input input-bordered w-full mb-4"
                {...register("nome", {
                  shouldUnregister: true,
                  value: subMenu?.nome ?? "",
                })}
              />
            </div>
            <p className="text-red-500">{errors.nome?.message}</p>
            <div className="w-full flex flex-col">
              <span className="label-text">Descrição</span>
              <textarea
                placeholder="Descrição do submenu"
                className="input h-24"
                {...register("descricao", {
                  shouldUnregister: true,
                  value: subMenu?.descricao ?? "",
                })}
              ></textarea>
            </div>
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

export default SubmenuWindow;
