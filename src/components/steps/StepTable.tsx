import GenericLoading from "@components/base/GenericLoading";
import GenericTable from "@components/base/GenericTable";
import useFilterData from "@hooks/useFilterData";
import useGetSteps from "@hooks/useGetSteps";
import { useState } from "react";
// import StepsWindow from "./AcommodationWindow";
import { PencilSimple, TrashSimple } from "phosphor-react";
import StepWindow from "./StepWindow";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { queryClient } from "@utils/queryClient";
import { toast } from "sonner";

type Props = {
  searchText?: string;
  reload?: boolean;
};

type StepsType = {
  id?: number;
  nome: string;
  multipla: "Sim" | "Não";
};

const StepsTable = ({ searchText }: Props) => {
  const { data: steps, error, isLoading } = useGetSteps();

  const filteredSteps = useFilterData(steps, searchText);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [codigoEtapa, setCodigoEtapa] = useState<number | undefined>();

  const mutationDelete = useMutation(
    (s?: number) => api.put(`Etapa/RemoverEtapa/${s}`),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getSteps"]);
        toast.success("Etapa exluída com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao excluir etapa");
      },
    }
  );

  const handleDeleteStep = (id?: number) => async () => {
    if (!id) return;

    const confirmDelete = confirm("Deseja realmente excluir esta etapa?");

    if (!confirmDelete) return;

    mutationDelete.mutate(id);
  };

  if (isLoading) return <GenericLoading size={60} />;
  if (error) return <div>ERRO</div>;
  if (!steps?.length) return <div>Não existem etapas cadastradas</div>;

  const tableValuesWithIcons = (filteredSteps ?? steps).map(
    (step: StepsType) => ({
      Editar: (
        <PencilSimple
          onClick={() => {
            setCodigoEtapa(step.id);
            setIsOpen(true);
          }}
          className="cursor-pointer"
          size={24}
        />
      ),
      ...step,
      Excluir: (
        <TrashSimple
          onClick={handleDeleteStep(step.id)}
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
      <StepWindow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        codigoEtapa={codigoEtapa}
        setCodigoEtapa={setCodigoEtapa}
      />
    </>
  );
};

export default StepsTable;
