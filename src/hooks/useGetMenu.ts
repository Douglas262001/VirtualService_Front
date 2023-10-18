import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";
import { MenuType } from "types/MenuType";

const useGetMenu = () => {
  return useQuery(["getMenus"], getMenus());
};

const getMenus = () => {
  return (): Promise<MenuType[]> =>
    api.get(`Menu/Listar`).then(({ data }) =>
      data.body.map((menu: MenuType) => ({
        id: menu.id,
        descricao: menu.descricao,
        subMenus: menu.subMenus?.map((item) => ({
          id: item.id,
          codigoSubMenu: item.codigoSubMenu,
          seq: item.seq,
        })),
      }))
    );
};

export default useGetMenu;
