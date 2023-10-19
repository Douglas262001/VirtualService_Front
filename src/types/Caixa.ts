export type ComandasAbertas = {
  id: number;
  numero: number;
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
