import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";

export type ProductType = {
  id: number;
  nome: string;
  descricao: string;
  urlImagem?: string;
  valor: number;
};

const useGetProducts = () => {
  return useQuery(["getProducts"], getProducts());
};

const getProducts = () => {
  return (): Promise<ProductType[]> =>
    api.get(`ProdutoServico/Listar`).then(({ data }) =>
      data.body.map((product: ProductType) => ({
        id: product.id,
        nome: product.nome,
        valor: product.valor,
      }))
    );
};

export default useGetProducts;
