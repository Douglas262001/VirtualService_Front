export type EtapaItem = {
  id?: number;
  codigoEtapa?: number;
  codigoProdutoServico?: number;
  nome: string;
  valor?: number;
  itemCadastrado?: boolean;
};

export type Etapa = {
  id?: number;
  nome: string;
  multiplaEscolha: boolean;
  etapaItems: EtapaItem[];
  obrigatoria: boolean;
};