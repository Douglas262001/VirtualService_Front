import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import useFilterData from "@hooks/useFilterData";
import useGetAccommodations from "@hooks/useGetAccommodations";
import { useEffect, useState } from "react";
import AccommodationWindow from "./AcommodationWindow";
import { PencilSimple, TrashSimple } from "phosphor-react";
import api from "@utils/api";
import { toast } from "sonner";
import { queryClient } from "@utils/queryClient";
import { useMutation } from "@tanstack/react-query";

type Props = {
  searchText?: string;
  reload?: boolean;
};

type AccommodationType = {
  id?: number;
  descricao: string;
};

const AccommodationTable = ({ searchText, reload }: Props) => {
  const {
    data: accommodations,
    error,
    isLoading,
    refetch,
  } = useGetAccommodations();

  const filteredAccommodations = useFilterData(accommodations, searchText);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<AccommodationType>();

  useEffect(() => {
    if (reload) refetch().then();
  }, [reload, refetch]);

  const mutationDelete = useMutation(
    (s?: number) => api.delete(`Acomodacao/DeletarArea/${s}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getAccommodations"]);
        toast.success("Acomodação exluída com sucesso!");
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

    const confirmDelete = confirm(
      "Tem certeza que deseja excluir esta acomodação?"
    );

    if (!confirmDelete) return;

    mutationDelete.mutate(id);
  };

  return (
    <>
      <GenericTable
        values={tableValuesWithIcons}
        columns={Object.keys(tableValuesWithIcons[0])}
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
