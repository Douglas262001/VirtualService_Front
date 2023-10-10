import { Layout } from "@components/base/layout";
import Acommodations from "@pages/accommodations";
import Analytics from "@pages/analytics";
import Home from "@pages/home";
import Menus from "@pages/Menus";
import Subject from "@pages/subject";
import Teacher from "@pages/teacher";
import ComandaList from "@components/caixa/ComandaList"

export const PrivateRoutes = () => {
  return {
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Home /> },
      { path: "/subjects", element: <Subject /> },
      { path: "/teachers", element: <Teacher /> },
      { path: "/menus", element: <Menus /> },
      { path: "/analytics", element: <Analytics /> },
      { path: "/ComandaList", element: <ComandaList /> },
      { path: "/accommodations", element: <Acommodations /> },
    ],
  };
};
