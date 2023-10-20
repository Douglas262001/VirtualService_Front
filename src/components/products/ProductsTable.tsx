import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import useFilterData from "@hooks/useFilterData";
import { useState } from "react";
// import StepsWindow from "./AcommodationWindow";
import { PencilSimple, TrashSimple } from "phosphor-react";
// import StepWindow from "./StepWindow";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { queryClient } from "@utils/queryClient";
import { toast } from "sonner";
import useGetProducts from "@hooks/useGetProducts";
import ProductsWindow from "./ProductsWindow";
import Swal from "sweetalert2";

type Props = {
  searchText?: string;
  reload?: boolean;
};

type ProductsType = {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
};

const ProductsTable = ({ searchText }: Props) => {
  const { data: steps, error, isLoading } = useGetProducts();

  const filteredProducts = useFilterData(steps, searchText);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [codigoProduto, setCodigoProduto] = useState<number | undefined>();

  const mutationDelete = useMutation(
    (s?: number) => api.delete(`ProdutoServico/Deletar/${s}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getProducts"]);
        toast.success("Produto excluído com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const handleDeleteProduct = (id?: number) => async () => {
    if (!id) return;

    Swal.fire({
      title: 'Confirmação',
      text: "Deseja realmente excluir este produto?",
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
  if (!steps?.length) return <div>Não existem produtos cadastradas</div>;

  const tableValuesWithIcons = (filteredProducts ?? steps).map(
    (step: ProductsType) => ({
      Editar: (
        <PencilSimple
          onClick={() => {
            setCodigoProduto(step.id);
            setIsOpen(true);
          }}
          className="cursor-pointer"
          size={24}
        />
      ),
      ...step,
      Excluir: (
        <TrashSimple
          onClick={handleDeleteProduct(step.id)}
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
      <ProductsWindow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        codigoProduto={codigoProduto}
        setCodigoProduto={setCodigoProduto}
      />
    </>
  );
};

export default ProductsTable;
