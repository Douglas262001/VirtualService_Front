import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import { PublicRoutes } from "./publicRoutes";
import useAuth from "@hooks/auth";

export default function Router() {
  const { token } = useAuth();

  const router = createBrowserRouter([
    token ? PrivateRoutes() : {},
    ...PublicRoutes(!!token),
  ]);

  return <RouterProvider router={router} />;
}
