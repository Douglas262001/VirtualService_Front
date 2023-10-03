import TopBar from "@components/layout/TopBar";
import Sidebar from "@components/layout/Sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <section className="flex  h-screen">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <Outlet />
      </div>
    </section>
  );
};
