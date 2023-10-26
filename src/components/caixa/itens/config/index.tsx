import ButtonCancel from "@components/base/ButtonCancel";
import ButtonSave from "@components/base/ButtonSave";
import GenericWindow from "@components/base/GenericWindow";
import SearchField from "@components/base/SearchField";
import { EnumType, getArray } from "@utils/enums";
import { useRegister } from "context/register/RegisterContext";
import { useState } from "react";
import { toast } from "sonner";
// import Swal from "sweetalert2";
import { EnumTipoDesconto, TipoDesconto } from "types/Caixa";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ItensConfig = ({ isOpen, setIsOpen }: Props) => {
  const { caixaGeral, calcular } = useRegister();
  const getTipoDesconto: () => EnumType = () => {
    if (caixaGeral.calculaDescontoPorPercentual) {
      return (
        getArray(EnumTipoDesconto).find(
          (item) => item.identificador === TipoDesconto.Percentual
        ) || getArray(EnumTipoDesconto)[0]
      );
    }

    return (
      getArray(EnumTipoDesconto).find(
        (item) => item.identificador === TipoDesconto.Valor
      ) || getArray(EnumTipoDesconto)[0]
    );
  };

  const getTaxaServico = () => {
    if (caixaGeral.calculaTaxaServicoPorPercentual) {
      return (
        getArray(EnumTipoDesconto).find(
          (item) => item.identificador === TipoDesconto.Percentual
        ) || getArray(EnumTipoDesconto)[0]
      );
    }

    return (
      getArray(EnumTipoDesconto).find(
        (item) => item.identificador === TipoDesconto.Valor
      ) || getArray(EnumTipoDesconto)[0]
    );
  };

  const tipoTaxaServicoDefault = getTaxaServico();

  const descontoDefault = caixaGeral.calculaDescontoPorPercentual
    ? caixaGeral.percDesconto
    : caixaGeral.valorDesconto;
  const taxaServicoDefault = caixaGeral.calculaTaxaServicoPorPercentual
    ? caixaGeral.percTaxaServico
    : caixaGeral.valorTaxaServico;

  const tipoDescontoDefault = getTipoDesconto();
  const [tipoDesconto, setTipoDesconto] =
    useState<EnumType>(tipoDescontoDefault);
  const [tipoDescontoTaxa, setTipoDescontoTaxa] = useState<EnumType>(
    tipoTaxaServicoDefault
  );
  const [desconto, setDesconto] = useState<number>(descontoDefault);
  const [taxa, setTaxa] = useState<number>(taxaServicoDefault);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await calcular({
        ...caixaGeral,
        calculaDescontoPorPercentual:
          tipoDesconto.identificador === TipoDesconto.Percentual,
        calculaTaxaServicoPorPercentual:
          tipoDescontoTaxa.identificador === TipoDesconto.Percentual,
        percDesconto:
          tipoDesconto.identificador === TipoDesconto.Percentual ? desconto : 0,
        valorDesconto:
          tipoDesconto.identificador === TipoDesconto.Valor ? desconto : 0,
        percTaxaServico:
          tipoDescontoTaxa.identificador === TipoDesconto.Percentual ? taxa : 0,
        valorTaxaServico:
          tipoDescontoTaxa.identificador === TipoDesconto.Valor ? taxa : 0,
      });

      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    }
  };

  const handleClickCancelar = () => {
    setIsOpen(false);
  };

  return (
    <GenericWindow title="Config" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onSubmitForm} className="form-control">
        <div className="flex gap-2 items-center mb-2 w-full">
          <div className="flex flex-col">
            <span className="label-text">Tipo desc.</span>
            <div className="flex items-center">
              <SearchField
                value={tipoDesconto}
                setValue={setTipoDesconto}
                data={getArray(EnumTipoDesconto)}
                displayValue="value"
                valueField="identificador"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <span className="label-text">Desconto</span>
            <div className="flex items-center">
              <input
                className="input input-bordered w-full"
                type="number"
                min="0"
                step={0.01}
                value={desconto}
                onChange={(e) => setDesconto(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center mb-2 w-full">
          <div className="flex flex-col">
            <span className="label-text">Tipo desc. taxa</span>
            <div className="flex items-center">
              <SearchField
                value={tipoDescontoTaxa}
                setValue={setTipoDescontoTaxa}
                data={getArray(EnumTipoDesconto)}
                displayValue="value"
                valueField="identificador"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <span className="label-text">Taxa</span>
            <div className="flex items-center">
              <input
                className="input input-bordered w-full"
                type="number"
                min="0"
                step={0.01}
                value={taxa}
                onChange={(e) => setTaxa(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="modal-action">
          <ButtonCancel type="button" onClick={handleClickCancelar} />
          <ButtonSave type="submit" />
        </div>
      </form>
    </GenericWindow>
  );
};

export default ItensConfig;
