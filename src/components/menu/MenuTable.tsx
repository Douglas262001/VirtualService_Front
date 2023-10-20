import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import useFilterData from "@hooks/useFilterData";
import {
  PencilSimple,
  ToggleLeft,
  ToggleRight,
  TrashSimple,
} from "phosphor-react";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { queryClient } from "@utils/queryClient";
import { toast } from "sonner";
import useGetMenu from "@hooks/useGetMenu";
import { MenuType } from "types/MenuType";
import { useState } from "react";
import MenuWindow from "./MenuWindow";
import Swal from "sweetalert2";

type Props = {
  searchText?: string;
};

const MenuTable = ({ searchText }: Props) => {
  const { data: menus, error, isLoading } = useGetMenu();

  const filteredMenus = useFilterData(menus, searchText);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menu, setMenu] = useState<MenuType | null>(null);

  const mutationDelete = useMutation(
    (s?: number) => api.delete(`Menu/Excluir/${s}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getMenus"]);
        toast.success("Menu excluído com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const mutationUsar = useMutation((s?: number) => api.put(`Menu/Usar/${s}`), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["getMenus"]);

      toast.success("Menu alterado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.response.data.reasonPhrase);
    },
  });

  const mutationPararUsar = useMutation(
    (s?: number) => api.put(`Menu/PararDeUsar/${s}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getMenus"]);

        toast.success("Menu alterado com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const handleDeleteMenu = (id?: number) => async () => {
    if (!id) return;

    Swal.fire({
      title: "Confirmação",
      text: "Deseja realmente excluir este menu?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      iconColor: "#ef4444",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, excluir!",
      background: "#333",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        mutationDelete.mutate(id);
      }
    });
  };

  if (isLoading) return <GenericLoading size={60} />;
  if (error) return <div>ERRO</div>;
  if (!menus?.length) return <div>Não existem menus cadastrados</div>;

  const tableValuesWithIcons = (filteredMenus ?? menus).map(
    (menu: MenuType) => ({
      Editar: (
        <PencilSimple
          onClick={() => {
            setMenu(menu);
            setIsOpen(true);
          }}
          className="cursor-pointer"
          size={24}
        />
      ),
      "usar/parar": menu.usar ? (
        <ToggleRight
          weight="fill"
          size={40}
          onClick={() => mutationPararUsar.mutate(menu.id)}
          className="text-green-600 cursor-pointer"
        />
      ) : (
        <ToggleLeft
          weight="fill"
          size={40}
          onClick={() => mutationUsar.mutate(menu.id)}
          className="text-red-600 cursor-pointer"
        />
      ),
      ...menu,
      excluir: (
        <TrashSimple
          onClick={handleDeleteMenu(menu.id)}
          size={32}
          className="cursor-pointer text-red-500"
        />
      ),
    })
  );

  return (
    <>
      <GenericTable
        values={tableValuesWithIcons}
        columns={["Editar", "usar/parar", "id", "descricao", "excluir"]}
      />
      <MenuWindow
        menu={menu}
        setMenu={setMenu}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default MenuTable;
