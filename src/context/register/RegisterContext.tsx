import api from "@utils/api";
import * as React from "react";
import { CaixaGeral } from "types/Caixa";

type IRegisterContext = {
  codigoComanda: number;
  setCodigoComanda: React.Dispatch<React.SetStateAction<number>>;
  numeroComanda: number;
  setNumeroComanda: React.Dispatch<React.SetStateAction<number>>;
  setCaixaGeral: React.Dispatch<React.SetStateAction<CaixaGeral>>;
  caixaGeral: CaixaGeral;
  calcular: (dto: CalculadorDto) => Promise<number>;
  refetchComandas: boolean;
  setRefetchComandas: React.Dispatch<React.SetStateAction<boolean>>;
};

type CalculadorDto = {
  valorTotalItem: number;
  calculaDescontoPorPercentual: boolean;
  percDesconto: number;
  valorDesconto: number;
  calculaTaxaServicoPorPercentual: boolean;
  percTaxaServico: number;
  valorTaxaServico: number;
  dividirEmQuantasPessoas: number;
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
  const [refetchComandas, setRefetchComandas] = React.useState<boolean>(false);
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
    garcom: "",
    cliente: "",
  });

  const calcular = async (dto: CalculadorDto) => {
    const response = await api.post("Caixa/CalculadoraCaixa", dto);

    return response.data.body;
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
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
