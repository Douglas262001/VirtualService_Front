import { PencilSimple, TrashSimple } from "phosphor-react";
import { useState } from "react";
import useFilterData from "../../hooks/useFilterData";
import GenericLoading from "../base/GenericLoading";
import GenericTable from "../base/GenericTable";
import useGetTables from "@hooks/useGetTables";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";
import { toast } from "sonner";
import api from "@utils/api";
import TableWindow from "./TableWindow";
import Swal from "sweetalert2";

type Props = {
  searchText?: string;
  reload?: boolean;
};

const TableTable = ({ searchText }: Props) => {
  const { data: tables, error, isLoading } = useGetTables();
  const filteredTables = useFilterData(tables, searchText);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [codigoMesa, setCodigoMesa] = useState<number>();

  const mutationDelete = useMutation(
    (s?: number) => api.delete(`QuartoMesa/Deletar/${s}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getTables"]);
        toast.success("Mesa excluída com sucesso!");
      },
      onError: async (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  if (isLoading) return <GenericLoading size={60} />;
  if (error) return <div>ERRO</div>;
  if (!tables?.length) return <div>SEM DADOS</div>;

  const tableValuesWithIcons = (filteredTables ?? tables).map((table) => ({
    Editar: (
      <PencilSimple
        className="cursor-pointer"
        size={24}
        onClick={() => {
          setCodigoMesa(table.id);
          setIsOpen(true);
        }}
      />
    ),
    ...table,
    Excluir: (
      <TrashSimple
        onClick={() => deleteTable(table.id)}
        className="cursor-pointer text-red-500"
        size={24}
      />
    ),
  }));

  const deleteTable = (id?: number) => {
    if (!id) return;

    Swal.fire({
      title: 'Confirmação',
      text: "Deseja realmente excluir esta mesa?",
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

  return (
    <>
      <GenericTable
        values={tableValuesWithIcons}
        columns={Object.keys(tableValuesWithIcons[0])}
      />
      <TableWindow
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        codigoMesa={codigoMesa}
        setCodigoMesa={setCodigoMesa}
      />
    </>
  );
};

export default TableTable;
