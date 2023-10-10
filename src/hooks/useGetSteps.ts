import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";

export type StepType = {
  id: number;
  nome: string;
  multiplaEscolha: boolean;
};

const useGetSteps = () => {
  return useQuery(["getSteps"], getSteps());
};

const getSteps = () => {
  return (): Promise<StepType[]> =>
    api.get(`Etapa/Listar`).then(({ data }) =>
      data.body?.map((item: any) => ({
        id: item.id,
        nome: item.nome,
        multipla: item.multiplaEscolha ? "Sim" : "Não",
      }))
    );
};

export default useGetSteps;
