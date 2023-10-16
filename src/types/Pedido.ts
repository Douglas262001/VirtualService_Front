export type PedidoType = {
  id?: number;
  valorTotal: number;
  numeroPedido: number;
  dataHoraPedido: Date;
  pedidoItems: PedidoItemsType[];
};

export type PedidoSearchType = {
  id: number;
  numero: number;
  valor: number;
  "data/Hora": string;
  items: PedidoItemsSearchType[];
};

type PedidoItemsType = {
  nomeItem: string;
  qtd: number;
  valorUn: number;
  valorTotal: number;
  pago: boolean;
};

export type PedidoItemsSearchType = {
  nome: string;
  quantidade: number;
  valor: number;
  total: number;
  pago: "Sim" | "Não";
};

export enum StatusPedido {
  Aberto = 0,
  Fechado = 1,
  EmAndamento = 2,
  Cancelado = 3,
}
