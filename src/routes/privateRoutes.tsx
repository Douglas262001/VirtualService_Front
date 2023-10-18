import { Layout } from "@components/base/layout";
import Analytics from "@pages/analytics";
import Home from "@pages/home";
<<<<<<< Updated upstream
import Menus from "@pages/Menus";
=======
import Menus from "@components/Menus/MenuTable";
import Orders from "@pages/orders";
import Products from "@pages/products";
import Steps from "@pages/steps";
>>>>>>> Stashed changes
import Subject from "@pages/subject";
import Teacher from "@pages/teacher";

export const PrivateRoutes = () => {
  return {
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Home /> },
      { path: "/subjects", element: <Subject /> },
      { path: "/teachers", element: <Teacher /> },
      { path: "/menus", element: <Menus /> },
      { path: "/analytics", element: <Analytics /> },
    ],
  };
};
