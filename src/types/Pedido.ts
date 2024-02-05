import { ComandaType } from "./Comanda";

export type PedidoType = {
  id?: number;
  status: StatusPedido;
  comanda: ComandaType;
  valorTotal: number;
  numeroPedido: number;
  dataHoraPedido: Date;
  pedidoItems: PedidoItemsType[];
};

export type PedidoSearchType = {
  id: number;
  numero: number;
  comanda: string;
  mesa: string;
  codigoStatus: StatusPedido;
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
  FilaDePreparo = 0,
  EmPreparo = 1,
  FilaDeEntrega = 2,
  Finalizado = 3,
  Cancelado = 4,
}

export const EnumStatusPedido = new Map<number, string>([
  [StatusPedido.FilaDePreparo, "Fila de Preparo"],
  [StatusPedido.EmPreparo, "Em Preparo"],
  [StatusPedido.FilaDeEntrega, "Fila de Entrega"],
  [StatusPedido.Finalizado, "Finalizado"],
  [StatusPedido.Cancelado, "Cancelado"],
]);

export type PedidoRapidoType = {
  codigoTag: number;
  items: PedidoRapidoItemType[];
};

export type PedidoRapidoItemType = {
  codigoProdutoServico?: number;
  nome: string;
  qtd: number;
  valorUn: number;
};
