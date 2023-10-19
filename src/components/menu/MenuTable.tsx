import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import useFilterData from "@hooks/useFilterData";
import {
  PencilSimple,
  TrashSimple,
// //   LockSimpleOpen,
// //   LockSimple,
// //   Clock,
} from "phosphor-react";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { queryClient } from "@utils/queryClient";
import { toast } from "sonner";
import useGetMenu from "@hooks/useGetMenu";
import { MenuType } from "types/MenuType";
import { useState } from "react";
import MenuWindow from "./MenuWindow";

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
        await queryClient.invalidateQueries(["getTags"]);
        toast.success("Menu excluído com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao excluir menu");
      },
    }
  );

  const handleDeleteMenu = (id?: number) => async () => {
    if (!id) return;

    const confirmDelete = confirm("Deseja realmente excluir este menu?");

    if (!confirmDelete) return;

    mutationDelete.mutate(id);
  };

//   const mutationDisableTag = useMutation(
//     (numero?: number) => api.put(`Tags/BloquearTag/${numero}`),
//     {
//       onSuccess: async () => {
//         await queryClient.invalidateQueries(["getTags"]);
//         toast.success("Comanda bloqueada com sucesso!");
//       },
//       onError: () => {
//         toast.error("Erro ao bloquear comanda");
//       },
//     }
//   );

//   const handleDisableTag = (numero?: number) => async () => {
//     if (!numero) return;

//     const confirmDelete = confirm("Deseja realmente bloquear esta comanda?");

//     if (!confirmDelete) return;

//     mutationDisableTag.mutate(numero);
//   };

//   const mutationActiveTag = useMutation(
//     (numero?: number) => api.put(`Tags/LiberarTag/${numero}`),
//     {
//       onSuccess: async () => {
//         await queryClient.invalidateQueries(["getTags"]);
//         toast.success("Comanda liberada com sucesso!");
//       },
//       onError: () => {
//         toast.error("Erro ao liberar comanda");
//       },
//     }
//   );

//   const handleActiveTag = (numero?: number) => async () => {
//     if (!numero) return;

//     mutationActiveTag.mutate(numero);
//   };

//   const handleInUse = () => async () => {
//     return toast.error("Comanda em uso");
//   };

//   const iconActiveInactive = (status: number, numero?: number) => {
//     switch (status) {
//       case 0:
//         return (
//           <LockSimpleOpen
//             onClick={handleActiveTag(numero)}
//             size={24}
//             className="cursor-pointer text-green-500"
//           />
//         );
//       case 1:
//         return (
//           <LockSimple
//             onClick={handleDisableTag(numero)}
//             size={24}
//             className="cursor-pointer text-red-500"
//           />
//         );
//       case 2:
//         return (
//           <Clock
//             onClick={handleInUse()}
//             size={24}
//             className="cursor-pointer text-yellow-500"
//           />
//         );
//     }
//   };

//   const Status = (status: number) =>{
//     switch (status) {
//       case 0:
//         return (
//           <div className="tag-bloqueada" >Bloqueada</div>
//         );
//       case 1:
//         return (
//           <div className="tag-liberada">Liberada</div>
//         );
//       case 2:
//         return (
//           <div className="tag-ocupada">Em uso</div>
//         );
//     }
//   }

  if (isLoading) return <GenericLoading size={60} />;
  if (error) return <div>ERRO</div>;
  if (!menus?.length) return <div>Não existem menus cadastrados</div>;

  const tableValuesWithIcons = (filteredMenus ?? menus).map((menu: MenuType) => ({
    // "Bloquear / Liberar": iconActiveInactive(tag.status, tag.numero),
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
      ...menu,
    //   Status: Status(tag.status),
    Excluir: (
      <TrashSimple
        onClick={handleDeleteMenu(menu.id)}
        size={24}
        className="cursor-pointer text-red-500"
      />
    ),
  }));

  return (
    <>
      <GenericTable
        values={tableValuesWithIcons}
        columns={Object.keys(tableValuesWithIcons[0] || {})}
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