import GenericTable from "@components/base/GenericTable";
import SearchField from "@components/base/SearchField";
import { Tab } from "@headlessui/react";
import { Plus, TrashSimple } from "phosphor-react";
import * as React from "react";
import { toast } from "sonner";
import { CategoriaItemSearchType } from "types/Categoria";
import { ProdutoSearchType } from "types/Produto";

type StepProductPanelType = {
  produto: ProdutoSearchType;
  setProduto: React.Dispatch<ProdutoSearchType>;
  produtos: ProdutoSearchType[];
  itensSelecionados: CategoriaItemSearchType[];
  setItensSelecionados: React.Dispatch<CategoriaItemSearchType[]>;
  isTipoProdutoProduto: boolean;
};

const CategoryItemsTab = ({
  produto,
  setProduto,
  produtos,
  itensSelecionados,
  setItensSelecionados,
  isTipoProdutoProduto,
}: StepProductPanelType) => {
  const handleClickAdiconar = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (produto.id === 0) return toast.error("Selecione unm produto!");

    if (itensSelecionados.some((c) => c.codigoProduto === produto.id))
      return toast.error("Produto já adicionado!");

    setItensSelecionados([
      ...itensSelecionados,
      { codigoProduto: produto.id, nome: produto.nome },
    ]);
    setProduto({ id: 0, nome: "" });
  };
  return (
    <Tab.Panel>
      <div className="w-full flex flex-col">
        <div className="w-full flex gap-2 mb-6">
          <div className=" flex flex-col">
            <span className="label-text">Produto</span>
            <SearchField
              data={produtos}
              value={produto}
              setValue={setProduto}
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
          values={itensSelecionados.map((p) => ({
            ...p,
            excluir: (
              <TrashSimple
                className="cursor-pointer text-red-500"
                onClick={() =>
                  setItensSelecionados(
                    itensSelecionados.filter(
                      (item) => item.codigoProduto !== p.codigoProduto
                    )
                  )
                }
              />
            ),
          }))}
          columns={["codigoProduto", "nome", "excluir"]}
        />
      </div>
    </Tab.Panel>
  );
};

export default CategoryItemsTab;
