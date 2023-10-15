export type PedidoType = {
  valorTotal: number;
  numeroPedido: number;
  dataHoraPedido: Date;
};

export enum StatusPedido {
  Aberto = 0,
  Fechado = 1,
  EmAndamento = 2,
  Cancelado = 3,
}
