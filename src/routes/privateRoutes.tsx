import { Layout } from "@components/base/layout";
import Analytics from "@pages/analytics";
import Home from "@pages/home";
import Menus from "@pages/Menus";
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
