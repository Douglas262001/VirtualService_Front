import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import useFilterData from "@hooks/useFilterData";
import useGetAccommodations from "@hooks/useGetAccommodations";
import { useState } from "react";
import AccommodationWindow from "./AcommodationWindow";
import { PencilSimple, TrashSimple } from "phosphor-react";
import api from "@utils/api";
import { toast } from "sonner";
import { queryClient } from "@utils/queryClient";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

type Props = {
  searchText?: string;
  reload?: boolean;
};

type AccommodationType = {
  id?: number;
  descricao: string;
};

const AccommodationTable = ({ searchText }: Props) => {
  const { data: accommodations, error, isLoading } = useGetAccommodations();

  const filteredAccommodations = useFilterData(accommodations, searchText);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<AccommodationType>();

  const mutationDelete = useMutation(
    (s?: number) => api.delete(`Area/Deletar/${s}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getAccommodations"]);
        toast.success("Acomodação excluída com sucesso!");
      },
    }
  );

  if (isLoading) return <GenericLoading size={60} />;
  if (error) return <div>ERRO</div>;
  if (!accommodations?.length)
    return <div>Não existem acomodações cadastradas</div>;

  const tableValuesWithIcons = (filteredAccommodations ?? accommodations).map(
    (accommodation: AccommodationType) => ({
      Editar: (
        <PencilSimple
          onClick={() => {
            setSelectedAccommodation(accommodation);
            setIsOpen(true);
          }}
          className="cursor-pointer"
          size={24}
        />
      ),
      ...accommodation,
      Excluir: (
        <TrashSimple
          onClick={() => deleteAccommodation(accommodation.id)}
          className="cursor-pointer text-red-500"
          size={24}
        />
      ),
    })
  );

  const deleteAccommodation = (id?: number) => {
    if (!id) return;

    Swal.fire({
      title: "Confirmação",
      text: "Tem certeza que deseja excluir esta acomodação?",
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

  return (
    <>
      <GenericTable
        values={tableValuesWithIcons || []}
        columns={Object.keys(tableValuesWithIcons[0] || {})}
      />
      <AccommodationWindow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        accommodation={selectedAccommodation}
      />
    </>
  );
};

export default AccommodationTable;
