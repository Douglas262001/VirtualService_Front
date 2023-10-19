import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import useFilterData from "@hooks/useFilterData";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { queryClient } from "@utils/queryClient";
import { toast } from "sonner";
import useGetCategories from "@hooks/useGetCategories";
import { useState } from "react";
import { CategoriaSearchType } from "types/Categoria";
import CategoryWindow from "./CategoryWindow";
import Swal from "sweetalert2";
// import { useState } from "react";
// import SubmenuWindow from "./SubmenuWindow";

type Props = {
  searchText?: string;
};

const CategoryTable = ({ searchText }: Props) => {
  const { data: categories, error, isLoading } = useGetCategories();

  const filteredCategories = useFilterData(categories, searchText);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [codigoCategoria, setCodigoCategoria] = useState<number>();

  const mutationDelete = useMutation(
    (s?: number) => api.delete(`SubMenu_Categoria/Deletar/${s}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getCategories"]);
        toast.success("Categoria excluída com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao excluir categoria");
      },
    }
  );

  const handleDeleteCategory = (id?: number) => async () => {
    if (!id) return;

    Swal.fire({
      title: 'Confirmação',
      text: "Deseja realmente excluir esta categoria?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      iconColor: '#ef4444',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, excluir!',
      background: '#333',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        mutationDelete.mutate(id);
      }
    })
  };

  if (isLoading) return <GenericLoading size={60} />;
  if (error) return <div>ERRO</div>;
  if (!categories?.length) return <div>Não existem categorias cadastradas</div>;

  const tableValuesWithIcons = (filteredCategories ?? categories).map(
    (category: CategoriaSearchType) => ({
      Editar: (
        <PencilSimple
          onClick={() => {
            setCodigoCategoria(category.id);
            setIsOpen(true);
          }}
          className="cursor-pointer"
          size={24}
        />
      ),
      ...category,
      Excluir: (
        <TrashSimple
          onClick={handleDeleteCategory(category.id)}
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
      <CategoryWindow
        codigoCategoria={codigoCategoria}
        setCodigoCategoria={setCodigoCategoria}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default CategoryTable;
