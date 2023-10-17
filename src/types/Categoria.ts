import { ProdutoType } from "./Produto";

export type CategoriaType = {
  id: number;
  codigoSubMenu: number;
  nome: string;
  base64Imagem?: string;
  descricao?: string;
  urlImagem?: string;
  items: CategoriaItemType[];
};

export type CategoriaSearchType = {
  id: number;
  nome: string;
};

export type CategoriaItemType = {
  id?: number;
  codigoProdutoServico: number;
  codigoSubMenuCategoria?: number;
  ativo?: boolean;
  produtoServico?: ProdutoType;
};

export type CategoriaItemSearchType = {
  id?: number;
  codigoProduto: number;
  codigoSubMenuCategoria?: number;
  ativo?: boolean;
  nome: string;
};
