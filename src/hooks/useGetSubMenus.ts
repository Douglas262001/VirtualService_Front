import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";
import { SubMenuType } from "types/SubMenuType";

const useGetSubMenus = () => {
  return useQuery(["getSubMenus"], getSubMenus());
};

const getSubMenus = () => {
  return (): Promise<SubMenuType[]> =>
    api.get(`SubMenu/Listar`).then(({ data }) =>
      data.body.map((submenu: SubMenuType) => ({
        id: submenu.id,
        nome: submenu.nome,
        descricao: submenu.descricao,
      }))
    );
};

export default useGetSubMenus;
