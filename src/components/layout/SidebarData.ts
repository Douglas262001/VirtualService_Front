import {
  ChartLineUp,
  Bell,
  ShoppingCart,
  AppWindow,
  Ticket,
  ListChecks,
  Cube,
  SquaresFour,
  Vignette,
  List,
} from "phosphor-react";

type SidebarDataType = {
  id: number;
  description: string;
  path: string;
  icon: any;
};

const SidebarData: SidebarDataType[] = [
  {
    id: 1,
    description: "Analytics",
    icon: ChartLineUp,
    path: "/analytics",
  },
  {
    id: 2,
    description: "Pedidos",
    icon: Bell,
    path: "/orders",
  },
  {
    id: 4,
    description: "Vendas",
    icon: ShoppingCart,
    path: "/subjects",
  },
  {
    id: 6,
    description: "Menus",
    icon: AppWindow,
    path: "/menus",
  },
  {
    id: 7,
    description: "Acomodações",
    icon: Ticket,
    path: "/accommodations",
  },
  {
    id: 8,
    description: "Etapas",
    icon: ListChecks,
    path: "/steps",
  },
  {
    id: 9,
    description: "Produtos",
    icon: Cube,
    path: "/products",
  },
  {
    id: 10,
    description: "Mesas",
    icon: Vignette,
    path: "/tables",
  },
  {
    id: 11,
    description: "Categorias",
    icon: SquaresFour,
    path: "/categories",
  },
  {
    id: 12,
    description: "Submenus",
    icon: List,
    path: "/submenus",
  },
];

export default SidebarData;
