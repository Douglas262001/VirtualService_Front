export type ProdutoType = {
  id?: number;
  tipo: TipoProduto;
  tempoPreparo: number;
  medidaTempoPreparo: MedidaTempoPreparo;
  serveQuantasPessoas: number;
  nome: string;
  valor: number;
  descricao?: string;
  base64Image?: string;
  codigosEtapas: number[];
};

enum TipoProduto {
  Produto = 0,
  // Servico = 1,  Descomentar posteriormente
  ItemEtapa = 2,
}

enum MedidaTempoPreparo {
  Minuto = 0,
  Hora = 1,
}

export const EnumTipoProdutoServico = new Map<number, string>([
  [TipoProduto.Produto, "Produto"],
  // [TipoProduto.Servico, "Serviço"],  Descomentar posteriormente
  [TipoProduto.ItemEtapa, "Item de Etapa"],
]);

export const EnumMedidaTempoPreparo = new Map<number, string>([
  [MedidaTempoPreparo.Hora, "Hora(s)"],
  [MedidaTempoPreparo.Minuto, "Minuto(s)"],
]);
