import { SubMenuType } from "./SubMenu";

export type MenuType = {
  id?: number;
  descricao: string;
  subMenus: MenuSubMenusType[];
};

export type MenuSubMenusType = {
  id?: number;
  codigoSubMenu: number;
  seq: number;
  subMenu?: SubMenuType;
};

export type SubMenuTableType = {
  id?: number;
  codigoSubMenu: number;
  seq: number;
  nome: string;
};
