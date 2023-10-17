import { Layout } from "@components/base/layout";
import Acommodations from "@pages/accommodations";
import Analytics from "@pages/analytics";
import Home from "@pages/home";
import Menus from "@pages/Menus";
import Orders from "@pages/orders";
import Products from "@pages/products";
import Steps from "@pages/steps";
import Subject from "@pages/subject";
import Submenus from "@pages/submenus";
import Tables from "@pages/table";
import Teacher from "@pages/teacher";
import Caixa from "@components/caixa/Caixa"
import Tags from "@pages/tags/Tags"

export const PrivateRoutes = () => {
  return {
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Home /> },
      { path: "/subjects", element: <Subject /> },
      { path: "/teachers", element: <Teacher /> },
      { path: "/menus", element: <Menus /> },
      { path: "/analytics", element: <Analytics /> },
      { path: "/caixa", element: <Caixa /> },
      { path: "/accommodations", element: <Acommodations /> },
      { path: "/steps", element: <Steps /> },
      { path: "/products", element: <Products /> },
      { path: "/tables", element: <Tables /> },
      { path: "/orders", element: <Orders /> },
      { path: "/submenus", element: <Submenus /> },
      { path: "/tags", element: <Tags /> },
    ],
  };
};
