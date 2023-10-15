import GenericTable from "@components/base/GenericTable";
import SearchField from "@components/base/SearchField";
import { Plus, TrashSimple } from "phosphor-react";
import React from "react";
import { toast } from "sonner";
import { EtapaSearch } from "types/Etapa";
import { ProdutoEtapaSearchType } from "types/Produto";

type StepProductPanelType = {
  etapa: EtapaSearch;
  setEtapa: React.Dispatch<EtapaSearch>;
  etapas: EtapaSearch[];
  etapasSelecionadas: ProdutoEtapaSearchType[];
  setEtapasSelecionadas: React.Dispatch<ProdutoEtapaSearchType[]>;
  isTipoProdutoProduto: boolean;
};

const Steps = ({
  etapa,
  setEtapa,
  etapas,
  etapasSelecionadas,
  setEtapasSelecionadas,
  isTipoProdutoProduto,
}: StepProductPanelType) => {
  const handleClickAdiconar = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (etapa.id === 0) return toast.error("Selecione uma etapa!");

    if (etapasSelecionadas.some((c) => c.codigoEtapa === etapa.id))
      return toast.error("Etapa já adicionada!");

    setEtapasSelecionadas([
      ...etapasSelecionadas,
      { codigoEtapa: etapa.id, nome: etapa.nome },
    ]);
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
            optionsHeight="150"
            disabled={!isTipoProdutoProduto}
          />
        </div>
        <button
          onClick={handleClickAdiconar}
          type="button"
          className="btn btn-info mt-5"
          disabled={!isTipoProdutoProduto}
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
        columns={["codigoEtapa", "nome", "excluir"]}
      />
    </div>
  );
};

export default Steps;
