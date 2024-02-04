import api from "@utils/api";
import * as React from "react";
import { CaixaGeral, ItensComanda, ItensComandaSearch } from "types/Caixa";

type IRegisterContext = {
  codigoComanda: number;
  setCodigoComanda: React.Dispatch<React.SetStateAction<number>>;
  numeroComanda: number;
  setNumeroComanda: React.Dispatch<React.SetStateAction<number>>;
  codigoTag: number;
  setCodigoTag: React.Dispatch<React.SetStateAction<number>>;
  setCaixaGeral: React.Dispatch<React.SetStateAction<CaixaGeral>>;
  caixaGeral: CaixaGeral;
  calcular: (dto: CalculadorDto) => Promise<unknown>;
  refetchComandas: boolean;
  setRefetchComandas: React.Dispatch<React.SetStateAction<boolean>>;
  buscarCaixaGeral: () => Promise<unknown>;
  clicouComanda: boolean;
  setClicouComanda: React.Dispatch<React.SetStateAction<boolean>>;
  totalSelecionados: number;
  setTotalSelecionados: React.Dispatch<React.SetStateAction<number>>;
  itensComanda: ItensComandaSearch[];
  setItensComanda: React.Dispatch<React.SetStateAction<ItensComandaSearch[]>>;
  filterNumeroComandaPorQuartoMesa : string;
  setFilterNumeroComandaPorQuartoMesa: React.Dispatch<React.SetStateAction<string>>;
};

type CalculadorDto = {
  calculaDescontoPorPercentual: boolean;
  percDesconto?: number;
  valorDesconto?: number;
  calculaTaxaServicoPorPercentual: boolean;
  percTaxaServico?: number;
  valorTaxaServico?: number;
  dividirEmQuantasPessoas: number;
  codigosPedidosItens: number[];
};

const RegisterContext = React.createContext<IRegisterContext | null>(null);

export const useRegister = () => {
  const context = React.useContext(RegisterContext);

  if (!context) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return context;
};

export const ResgisterContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [codigoComanda, setCodigoComanda] = React.useState<number>(0);
  const [numeroComanda, setNumeroComanda] = React.useState<number>(0);
  const [codigoTag, setCodigoTag] = React.useState<number>(0);
  const [refetchComandas, setRefetchComandas] = React.useState<boolean>(false);
  const [totalSelecionados, setTotalSelecionados] = React.useState<number>(0);
  const [filterNumeroComandaPorQuartoMesa, setFilterNumeroComandaPorQuartoMesa] = React.useState<string>("0");
  const [itensComanda, setItensComanda] = React.useState<ItensComandaSearch[]>(
    []
  );
  const [caixaGeral, setCaixaGeral] = React.useState<CaixaGeral>({
    calculaDescontoPorPercentual: false,
    calculaTaxaServicoPorPercentual: false,
    dividirEmQuantasPessoas: 1,
    percDesconto: 0,
    numeroQuartoMesa: "0",
    percTaxaServico: 0,
    valorDesconto: 0,
    valorTaxaServico: 0,
    valorTotalBruto: 0,
    valorTotalItem: 0,
    valorTotalReceber: 0,
    valorTotalReceberPorPessoa: 0,
    codigosPedidosItens: [],
    codigoComanda: 0,
    valorTotalJaPago: 0,
    garcom: "",
    cliente: "",
  });

  const [clicouComanda, setClicouComanda] = React.useState<boolean>(false);

  const calcular = (dto: CalculadorDto) => {
    return new Promise((resolve, reject) => {
      api
        .post("Caixa/CalculadoraCaixa", dto)
        .then((response) => {
          if (response.data.success) {
            setCaixaGeral({
              ...caixaGeral,
              calculaDescontoPorPercentual:
                response.data.body.calculaDescontoPorPercentual,
              calculaTaxaServicoPorPercentual:
                response.data.body.calculaTaxaServicoPorPercentual,
              dividirEmQuantasPessoas: Number(
                response.data.body.dividirEmQuantasPessoas
              ),
              valorTotalReceber: response.data.body.valorTotalReceber,
              percDesconto: response.data.body.percDesconto,
              percTaxaServico: response.data.body.percDesconto,
              valorDesconto: response.data.body.valorDesconto,
              valorTaxaServico: response.data.body.valorTaxaServico,
            });
            resolve(response.data);
          }
        })
        .catch((e: any) => {
          reject(e.response.data.reasonPhrase);
        });
    });
  };

  const buscarCaixaGeral = () => {
    return new Promise((resolve, reject) => {
      api.get(`Caixa/BuscarItensComanda/${codigoComanda}`).then((response) => {
        if (response.data.success) {
          setCaixaGeral({
            calculaDescontoPorPercentual:
              response.data.body.calculaDescontoPorPercentual,
            calculaTaxaServicoPorPercentual:
              response.data.body.calculaTaxaServicoPorPercentual,
            dividirEmQuantasPessoas: response.data.body.dividirEmQuantasPessoas,
            percDesconto: response.data.body.percDesconto,
            numeroQuartoMesa: response.data.body.numeroQuartoMesa,
            percTaxaServico: response.data.body.percTaxaServico,
            valorDesconto: response.data.body.valorDesconto,
            valorTaxaServico: response.data.body.valorTaxaServico,
            valorTotalBruto: response.data.body.valorTotalBruto,
            valorTotalItem: response.data.body.valorTotalItem,
            valorTotalReceber: response.data.body.valorTotalReceber,
            valorTotalJaPago: response.data.body.valorTotalJaPago,
            valorTotalReceberPorPessoa:
              response.data.body.valorTotalReceberPorPessoa,
            codigosPedidosItens: response.data.body.items.map(
              (p: ItensComanda) => p.id
            ),
            codigoComanda: codigoComanda,
            garcom: "",
            cliente: "",
          });

          const itens: ItensComanda[] = response.data.body.items;

          const sortedItens = itens.sort((a, b) => {
            if (a.pago && !b.pago) return 1;
            if (!a.pago && b.pago) return -1;
            return 0;
          });

          setItensComanda(
            sortedItens.map((item) => ({
              id: item.id,
              nome: item.nomeItem,
              valor: item.valorUn,
              qntd: item.qtd,
              total: item.valorTotal,
              pago: item.pago ? "Sim" : "Não",
            }))
          );
          resolve(response.data);
        }
      })
      .catch((e: any) => {
        reject(e.response.data.reasonPhrase);
      });
    });
  };

  return (
    <RegisterContext.Provider
      value={{
        codigoComanda,
        setCodigoComanda,
        numeroComanda,
        setNumeroComanda,
        calcular,
        setCaixaGeral,
        caixaGeral,
        refetchComandas,
        setRefetchComandas,
        buscarCaixaGeral,
        clicouComanda,
        setClicouComanda,
        totalSelecionados,
        setTotalSelecionados,
        codigoTag,
        setCodigoTag,
        itensComanda,
        setItensComanda,
        filterNumeroComandaPorQuartoMesa,
        setFilterNumeroComandaPorQuartoMesa
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
