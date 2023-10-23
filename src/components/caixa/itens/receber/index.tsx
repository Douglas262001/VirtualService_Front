import api from "@utils/api";
import { useRegister } from "context/register/RegisterContext";
import { Gear } from "phosphor-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { ItensComanda } from "types/Caixa";

const ReceberCaixaGeral = () => {
  const { codigoComanda, setCaixaGeral, caixaGeral } = useRegister();
  useEffect(() => {
    if (codigoComanda === 0) return;

    buscarCaixaGeral();
  }, [codigoComanda]);

  const buscarCaixaGeral = async () => {
    try {
      const response = await api.get(
        `Caixa/BuscarItensComanda/${codigoComanda}`
      );

      setCaixaGeral({
        calculaDescontoPorPercentual: response.data.body.calculaDescontoPorPercentual,
        calculaTaxaServicoPorPercentual: response.data.body.calculaTaxaServicoPorPercentual,
        dividirEmQuantasPessoas: response.data.body.dividirEmQuantasPessoas,
        percDesconto: response.data.body.percDesconto,
        numeroQuartoMesa: response.data.body.numeroQuartoMesa,
        percTaxaServico: response.data.body.percTaxaServico,
        valorDesconto: response.data.body.valorDesconto,
        valorTaxaServico: response.data.body.valorTaxaServico,
        valorTotalBruto: response.data.body.valorTotalBruto,
        valorTotalItem: response.data.body.valorTotalItem,
        valorTotalReceber: response.data.body.valorTotalReceber,
        valorTotalReceberPorPessoa: response.data.body.valorTotalReceberPorPessoa,
        codigosPedidosItens: response.data.body.items.map((p: ItensComanda) => (p.id)),
        codigoComanda: codigoComanda,
        garcom: "",
        cliente: ""
      });
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    }
  };  

  return (
    <div className="w-full flex justify-between mt-3">
      <div className=" bg-zinc-700 flex flex-col rounded-md p-5 min-w-[19vw] text-base">
      <Gear weight="fill"/>
        <div className="flex justify-between ">
          <div>Subtotal:</div>
          {caixaGeral?.valorTotalItem}
        </div>
        <div className="flex justify-between">
          <div>Taxa de serviço:</div>
          {caixaGeral?.valorTaxaServico}
        </div>
        <div className="flex justify-between">
          <div>Desconto:</div>
          {caixaGeral?.valorDesconto}
        </div>
      </div>
    </div>
  );
};

export default ReceberCaixaGeral;
