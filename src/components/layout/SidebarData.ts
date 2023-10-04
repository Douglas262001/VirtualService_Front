import {
  ChartLineUp,
  Bell,
  ClipboardText,
  Kanban,
  ShoppingCart,
  AppWindow,
  Ticket,
} from "phosphor-react";

type SidebarDataType = {
  id: number;
  description: string;
  path: string;
  icon: any;
};

const SidebarData: SidebarDataType[] = [
  // {
  //   id: 1,
  //   description: "Início",
  //   icon: House,
  //   path: "/home",
  // },
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
    description: "Vendas",
    icon: ShoppingCart,
    path: "/subjects",
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
];

export default SidebarData;
