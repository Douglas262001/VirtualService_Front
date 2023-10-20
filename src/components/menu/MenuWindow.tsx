import ButtonCancel from "@components/base/ButtonCancel";
import ButtonSave from "@components/base/ButtonSave";
import GenericTable from "@components/base/GenericTable";
import GenericWindow from "@components/base/GenericWindow";
import SearchField from "@components/base/SearchField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { queryClient } from "@utils/queryClient";
import { CaretDown, CaretUp, Plus, TrashSimple } from "phosphor-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { MenuSubMenusType, MenuType, SubMenuTableType } from "types/MenuType";
import { SubMenuType } from "types/SubMenu";
import * as yup from "yup";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  menu?: MenuType | null;
  setMenu?: React.Dispatch<MenuType | null>;
};

type MenuFormType = {
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
  } = useForm<MenuFormType>({
    resolver: yupResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subMenus, setSubMenus] = useState<SubMenuType[]>([]);
  const [subMenu, setSubMenu] = useState<SubMenuType>({
    id: 0,
    nome: "",
    descricao: "",
  });

  const [subMenusSelecionados, setSubMenusSelecionados] = useState<
    SubMenuTableType[]
  >([]);

  useEffect(() => {
    if (!isOpen) return;

    buscarSubMenus();
  }, [isOpen]);

  useEffect(() => {
    if (!menu) return;

    setValue("id", menu.id);
    setValue("descricao", menu.descricao);

    buscarMenu();
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

  const buscarMenu = async () => {
    try {
      const { data } = await api.get(`Menu/Buscar/${menu?.id}`);

      setSubMenusSelecionados(
        data.body.subMenus
          .map((p: MenuSubMenusType) => ({
            id: p.id,
            codigoSubMenu: p.codigoSubMenu,
            seq: p.seq,
            nome: p.subMenu?.nome || "",
          }))
          .sort((a: SubMenuTableType, b: SubMenuTableType) => a.seq - b.seq)
      );
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    }
  };

  const onSubmit: SubmitHandler<MenuFormType> = (data) => {
    setIsLoading(true);
    const menu: MenuType = {
      ...data,
      subMenus: subMenusSelecionados.map((p) => ({
        id: p.id,
        codigoSubMenu: p.codigoSubMenu,
        seq: p.seq,
      })),
    };

    if (menu.id) return mutationUpdate.mutate(menu);

    mutationCreate.mutate(menu);
  };

  const buscarSubMenus = async () => {
    try {
      const { data } = await api.get(`SubMenu/Listar`);

      setSubMenus(data.body);
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    }
  };

  const handleClickAdicionarSubMenu = () => {
    if (subMenusSelecionados.some((p) => p.codigoSubMenu === subMenu.id))
      return toast.error("Submenu já adicionado!");

    setSubMenusSelecionados([
      ...subMenusSelecionados,
      {
        codigoSubMenu: subMenu.id || 0,
        seq: subMenusSelecionados.length + 1,
        nome: subMenu.nome,
      },
    ]);

    setSubMenu({ id: 0, nome: "", descricao: "" });
  };

  const handleClickAumentar = (seq: number) => {
    if (seq === 1) return toast.error("Não é possível aumentar sequência");

    const novoArray = subMenusSelecionados.map((p) => {
      if (p.seq === seq) return { ...p, seq: p.seq - 1 };
      if (p.seq === seq - 1) return { ...p, seq: p.seq + 1 };

      return p;
    });

    const sortedArray = novoArray.sort((a, b) => a.seq - b.seq);

    setSubMenusSelecionados(sortedArray);
  };

  const handleClickDiminuir = (seq: number) => {
    if (seq === subMenusSelecionados.length)
      return toast.error("Não é possível diminuir sequência");

    const novoArray = subMenusSelecionados.map((p) => {
      if (p.seq === seq) return { ...p, seq: p.seq + 1 };
      if (p.seq === seq + 1) return { ...p, seq: p.seq - 1 };

      return p;
    });

    const sortedArray = novoArray.sort((a, b) => a.seq - b.seq);

    setSubMenusSelecionados(sortedArray);
  };

  const handleCancel = () => {
    setIsOpen(false);
    limparCampos();
  };

  const limparCampos = () => {
    setMenu && setMenu(null);
    setValue("id", 0);
    setValue("descricao", "");
    setSubMenusSelecionados([]);
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
          <span className="text-xl">Submenus</span>
          <div className="flex w-full gap-2 mb-3">
            <SearchField
              value={subMenu}
              setValue={setSubMenu}
              data={subMenus}
              displayValue="nome"
              valueField="id"
            />
            <button
              className="btn btn-info"
              type="button"
              onClick={handleClickAdicionarSubMenu}
              disabled={subMenu.id === 0}
            >
              <Plus className="mr-2" /> Adicionar
            </button>
          </div>
          <div className="h-72">
            <GenericTable
              values={subMenusSelecionados.map((submenu) => ({
                aumentar: (
                  <CaretUp
                    weight="fill"
                    onClick={() => handleClickAumentar(submenu.seq)}
                    className="cursor-pointer"
                    size={24}
                  />
                ),
                diminuir: (
                  <CaretDown
                    weight="fill"
                    onClick={() => handleClickDiminuir(submenu.seq)}
                    className="cursor-pointer"
                    size={24}
                  />
                ),
                ...submenu,
                excluir: (
                  <TrashSimple
                    onClick={() => {
                      setSubMenusSelecionados(
                        subMenusSelecionados
                          .filter(
                            (p) => p.codigoSubMenu !== submenu.codigoSubMenu
                          )
                          .sort((a, b) => a.seq - b.seq)
                          .map((p, i) => ({ ...p, seq: i + 1 }))
                      );
                    }}
                    className="cursor-pointer text-red-500"
                  />
                ),
              }))}
              columns={[
                "aumentar",
                "diminuir",
                "seq",
                "codigoSubMenu",
                "nome",
                "excluir",
              ]}
            />
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
