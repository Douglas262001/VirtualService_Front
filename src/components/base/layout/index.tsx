import TopBar from "@components/layout/TopBar";
import Sidebar from "@components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export const Layout = () => {
  return (
    <section className="flex  h-screen">
      <Toaster position="top-center" richColors />
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <Outlet />
      </div>
    </section>
  );
};