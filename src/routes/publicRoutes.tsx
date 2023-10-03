import Login from "@pages/login";
import { Navigate } from "react-router-dom";

export const PublicRoutes = (token: boolean) => {
  return [
    {
      path: "/",
      element: token ? <Navigate to="/analytics" replace /> : <Login />,
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ];
};
