import SearchField from "@components/base/SearchField";
import { EnumType, getArray } from "@utils/enums";
import React from "react";
import { EnumMedidaTempoPreparo, EnumTipoProdutoServico } from "types/Produto";
import { useFormContext } from "react-hook-form";

export type GeneralProductPanelType = {
  tipoProduto: EnumType;
  setTipoProduto: React.Dispatch<EnumType>;
  medidaTempoPreparo: EnumType;
  setMedidaTempoPreparo: React.Dispatch<EnumType>;
  isTipoProdutoProduto: boolean;
};

const General = ({
  tipoProduto,
  setTipoProduto,
  medidaTempoPreparo,
  setMedidaTempoPreparo,
  isTipoProdutoProduto,
}: GeneralProductPanelType) => {
  const { register } = useFormContext();

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex gap-2">
        <div className="w-full flex flex-col">
          <span className="label-text">Nome</span>
          <input
            type="text"
            placeholder="Nome do item"
            className="input input-bordered w-full mb-4"
            {...register("nome", {
              shouldUnregister: true,
            })}
          />
        </div>
        <div className="w-full flex flex-col">
          <span className="label-text">Tipo</span>
          <SearchField
            value={tipoProduto}
            setValue={setTipoProduto}
            data={getArray(EnumTipoProdutoServico)}
            valueField="identificador"
            displayValue="value"
          />
        </div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-full flex flex-col">
          <span className="label-text">Valor</span>
          <input
            type="number"
            placeholder="Valor do item"
            className="input input-bordered w-full mb-4"
            min={0}
            {...register("valor", {
              shouldUnregister: true,
            })}
          />
        </div>
        <div className="w-full flex flex-col">
          <span className="label-text">Serve quantas pessoas?</span>
          <input
            type="number"
            placeholder="Quantidade de pessoas"
            className="input input-bordered w-full mb-4"
            min={0}
            disabled={!isTipoProdutoProduto}
            {...register("serveQuantasPessoas", {
              shouldUnregister: true,
            })}
          />
        </div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-full flex flex-col">
          <span className="label-text">Tempo de preparo</span>
          <input
            type="number"
            placeholder="Tempo de preparo"
            className="input input-bordered w-full mb-4"
            min={0}
            disabled={!isTipoProdutoProduto}
            {...register("tempoPreparo", {
              shouldUnregister: true,
            })}
          />
        </div>
        <div className="w-full flex flex-col">
          <span className="label-text">Medida do tempo</span>
          <SearchField
            value={medidaTempoPreparo}
            setValue={setMedidaTempoPreparo}
            data={getArray(EnumMedidaTempoPreparo)}
            valueField="identificador"
            displayValue="value"
            disabled={!isTipoProdutoProduto}
          />
        </div>
      </div>

      <div className="w-full flex flex-col">
        <span className="label-text">Descrição</span>
        <textarea
          disabled={!isTipoProdutoProduto}
          className="input h-24"
          {...register("descricao", {
            shouldUnregister: true,
          })}
        ></textarea>
      </div>
    </div>
  );
};

export default General;
