import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";

export type TableType = {
  id: number;
  codigoArea: number;
  capacidade: number;
  status: number;
  valor: number;
  numero: string;
};

const useGetTables = () => {
  return useQuery(["getTables"], getTables());
};

const getTables = () => {
  return (): Promise<TableType[]> =>
    api.get(`QuartoMesa/Listar`).then(({ data }) =>
      data.body.map((product: TableType) => ({
        id: product.id,
        numero: product.numero,
        capacidade: product.capacidade,
      }))
    );
};

export default useGetTables;
