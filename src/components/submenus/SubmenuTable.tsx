import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import useFilterData from "@hooks/useFilterData";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { queryClient } from "@utils/queryClient";
import { toast } from "sonner";
import useGetSubMenus from "@hooks/useGetSubMenus";
import { SubMenuType } from "types/SubMenu";
import { useState } from "react";
import SubmenuWindow from "./SubmenuWindow";

type Props = {
  searchText?: string;
};

const SubmenuTable = ({ searchText }: Props) => {
  const { data: submenus, error, isLoading } = useGetSubMenus();

  const filteredSubmenus = useFilterData(submenus, searchText);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [submenu, setSubmenu] = useState<SubMenuType | null>(null);

  const mutationDelete = useMutation(
    (s?: number) => api.delete(`SubMenu/Deletar/${s}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getSubMenus"]);
        toast.success("Submenu excluído com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao excluir submenu");
      },
    }
  );

  const handleDeleteSubmenu = (id?: number) => async () => {
    if (!id) return;

    const confirmDelete = confirm("Deseja realmente excluir este submenu?");

    if (!confirmDelete) return;

    mutationDelete.mutate(id);
  };

  if (isLoading) return <GenericLoading size={60} />;
  if (error) return <div>ERRO</div>;
  if (!submenus?.length) return <div>Não existem submenus cadastrados</div>;

  const tableValuesWithIcons = (filteredSubmenus ?? submenus).map(
    (submenu: SubMenuType) => ({
      Editar: (
        <PencilSimple
          onClick={() => {
            setSubmenu(submenu);
            setIsOpen(true);
          }}
          className="cursor-pointer"
          size={24}
        />
      ),
      ...submenu,
      Excluir: (
        <TrashSimple
          onClick={handleDeleteSubmenu(submenu.id)}
          size={24}
          className="cursor-pointer text-red-500"
        />
      ),
    })
  );

  return (
    <>
      <GenericTable
        values={tableValuesWithIcons}
        columns={Object.keys(tableValuesWithIcons[0] || {})}
      />
      <SubmenuWindow
        subMenu={submenu}
        setSubMenu={setSubmenu}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default SubmenuTable;
