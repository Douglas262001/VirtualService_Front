import GenericTable from "@components/base/GenericTable";
import SearchField from "@components/base/SearchField";
import { Plus, TrashSimple } from "phosphor-react";
import React from "react";
import { toast } from "sonner";
import { EtapaSearch } from "types/Etapa";

type StepProductPanelType = {
  etapa: EtapaSearch;
  setEtapa: React.Dispatch<EtapaSearch>;
  etapas: EtapaSearch[];
  etapasSelecionadas: EtapaSearch[];
  setEtapasSelecionadas: React.Dispatch<EtapaSearch[]>;
};

const Steps = ({
  etapa,
  setEtapa,
  etapas,
  etapasSelecionadas,
  setEtapasSelecionadas,
}: StepProductPanelType) => {
  const handleClickAdiconar = () => {
    if (etapa.id === 0) return toast.error("Selecione uma etapa!");

    if (etapasSelecionadas.some((c) => c.id === etapa.id))
      return toast.error("Etapa já adicionada!");

    setEtapasSelecionadas([...etapasSelecionadas, etapa]);
  };
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex gap-2 mb-6">
        <div className=" flex flex-col">
          <span className="label-text">Etapa</span>
          <SearchField
            data={etapas}
            value={etapa}
            setValue={setEtapa}
            displayValue="nome"
            valueField="id"
            optionsHeight="5"
          />
        </div>
        <button
          onClick={handleClickAdiconar}
          type="button"
          className="btn btn-info mt-5"
        >
          Adicionar
          <Plus size={24} />
        </button>
      </div>
      <GenericTable
        values={etapasSelecionadas.map((p) => ({
          ...p,
          excluir: (
            <TrashSimple
              className="cursor-pointer text-red-500"
              onClick={() =>
                setEtapasSelecionadas(
                  etapasSelecionadas.filter((item) => item.id !== p.id)
                )
              }
            />
          ),
        }))}
        columns={["id", "nome", "excluir"]}
      />
    </div>
  );
};

export default Steps;
