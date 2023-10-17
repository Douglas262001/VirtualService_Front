import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";
import { CategoriaType } from "types/Categoria";

const useGetCategories = () => {
  return useQuery(["getCategories"], getCategories());
};

const getCategories = () => {
  return (): Promise<CategoriaType[]> =>
    api.get(`SubMenu_Categoria/Listar`).then(({ data }) =>
      data.body.map((categoria: CategoriaType) => ({
        id: categoria.id,
        nome: categoria.nome
      }))
    );
};

export default useGetCategories;
