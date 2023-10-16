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
    QrCode,
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
      description: "Caixa",
      icon: ShoppingCart,
      path: "/caixa",
    },
    {
      id: 3,
      description: "Pedidos",
      icon: Bell,
      path: "/orders",
    },
    {
      id: 4,
      description: "Menus",
      icon: AppWindow,
      path: "/menus",
    },
    {
      id: 5,
      description: "Submenus",
      icon: List,
      path: "/submenus",
    },
    {
      id: 6,
      description: "Categorias",
      icon: SquaresFour,
      path: "/categories",
    },
    {
      id: 7,
      description: "Produtos",
      icon: Cube,
      path: "/products",
    },
    {
      id: 8,
      description: "Etapas",
      icon: ListChecks,
      path: "/steps",
    },
    {
      id: 9,
      description: "Acomodações",
      icon: Ticket,
      path: "/accommodations",
    },
    {
      id: 10,
      description: "Mesas",
      icon: Vignette,
      path: "/tables",
    },
    {
      id: 11,
      description: "Comandas",
      icon: QrCode,
      path: "/tables",
    }
  ];
  
  export default SidebarData;
  