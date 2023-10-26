export type ComandasAbertas = {
  id: number;
  numero: number;
  codigoTag: number;
};

export type CaixaGeral = {
  valorTotalItem: number;
  valorTotalReceber: number;
  valorTotalBruto: number;
  dividirEmQuantasPessoas: number;
  valorTotalReceberPorPessoa: number;
  calculaDescontoPorPercentual: boolean;
  numeroQuartoMesa: string;
  percDesconto: number;
  valorDesconto: number;
  calculaTaxaServicoPorPercentual: boolean;
  percTaxaServico: number;
  valorTaxaServico: number;
  garcom: string;
  cliente: string;
  codigoComanda: number;
  valorTotalJaPago: number;
  codigosPedidosItens: number[];
};

export type ItensComanda = {
  id: number;
  nomeItem: string;
  qtd: number;
  valorUn: number;
  valorTotal: number;
  pago: boolean;
};

export type ItensComandaSearch = {
  id: number;
  nome: string;
  qntd: number;
  valor: number;
  total: number;
  pago: "Sim" | "Não";
};

export enum TipoDesconto {
  Valor = 0,
  // Servico = 1,  Descomentar posteriormente
  Percentual = 1,
}

export const EnumTipoDesconto = new Map<number, string>([
  [TipoDesconto.Valor, "Valor"],
  [TipoDesconto.Percentual, "Percentual"],
]);
