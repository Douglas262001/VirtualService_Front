import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";
import { EtapaItem } from "types/Etapa";

export type AccommodationType = {
  id: number;
  descricao: string;
  multiplaEscolha: boolean;
};

const useGetProductsTSteps = () => {
  return useQuery(["getProductsTSteps"], getProductsTSteps());
};

const getProductsTSteps = () => {
  return (): Promise<EtapaItem[]> =>
    api.get(`ProdutoServico/ListarItensEtapas`).then(({ data }) => data.body);
};

export default useGetProductsTSteps;
