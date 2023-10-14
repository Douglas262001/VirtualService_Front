import {
  ChartLineUp,
  Bell,
  ClipboardText,
  Kanban,
  ShoppingCart,
  AppWindow,
  Ticket,
  ListChecks,
  Cube,
  SquaresFour,
  Vignette,
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
    path: "/teachers",
  },
  {
    id: 3,
    description: "Reservas",
    icon: ClipboardText,
    path: "/teachers",
  },
  {
    id: 4,
    description: "Caixa",
    icon: ShoppingCart,
    path: "/caixa",
  },
  {
    id: 5,
    description: "Central",
    icon: Kanban,
    path: "/teachers",
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
];

export default SidebarData;
