import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import useFilterData from "@hooks/useFilterData";
import useGetAccommodations from "@hooks/useGetAccommodations";
// import { PencilSimple } from "phosphor-react";
import { useEffect, useState } from "react";
import AccommodationWindow from "./AcommodationWindow";
import { PencilSimple } from "phosphor-react";

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

  if (isLoading) return <GenericLoading size={60} />;
  if (error) return <div>ERRO</div>;
  if (!accommodations?.length)
    return <div>Não existem acomodações cadastradas</div>;

  const tableValuesWithIcons = (filteredAccommodations ?? accommodations).map(
    (accommodation) => ({
      "": <PencilSimple className="cursor-pointer" size={24} />,
      ...accommodation,
    })
  );

  return (
    <>
      <GenericTable
        // values={filteredAccommodations ?? accommodations}
        values={tableValuesWithIcons}
        // columns={Object.keys(tableValuesWithIcons[0])}
        onClickRow={(p) => {
          setSelectedAccommodation(p);
          setIsOpen(true);
        }}
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
