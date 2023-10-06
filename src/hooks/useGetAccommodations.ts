import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";

export type AccommodationType = {
  id: number;
  descricao: string;
};

const useGetAccommodations = () => {
  return useQuery(["getAccommodations"], getAccommodations());
};

const getAccommodations = () => {
  return (): Promise<AccommodationType[]> =>
    api
      .get(`Acomodacao/ListarAreas`)
      .then(({ data }) =>
        data.body?.map((item: any) => ({
          id: item.id,
          descricao: item.descricao,
        }))
      );
};

export default useGetAccommodations;
