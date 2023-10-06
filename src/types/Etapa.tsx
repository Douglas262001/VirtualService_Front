export type EtapaItem = {
  id?: number;
  codigoEtapa?: number;
  codigoProdutoServico?: number;
  descricao: string;
  valor?: number;
  itemCadastrado?: boolean;
};

export type Etapa = {
  id?: number;
  descricao: string;
  multiplaEscolha: boolean;
  etapaItems: EtapaItem[];
};
