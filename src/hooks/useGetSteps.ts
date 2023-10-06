import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";

export type AccommodationType = {
  id: number;
  descricao: string;
  multiplaEscolha: boolean;
};

const useGetSteps = () => {
  return useQuery(["getSteps"], getSteps());
};

const getSteps = () => {
  return (): Promise<AccommodationType[]> =>
    api.get(`Etapa/Listar`).then(({ data }) =>
      data.body?.map((item: any) => ({
        id: item.id,
        descricao: item.descricao,
        multipla: item.multiplaEscolha ? "Sim" : "Não",
      }))
    );
};

export default useGetSteps;
