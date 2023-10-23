import TopBar from "@components/layout/TopBar";
import Sidebar from "@components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { PrivateProvider } from "context/private";

export const Layout = () => {
  return (
    <PrivateProvider>
      <section className="flex  h-screen">
        <Toaster position="top-center" richColors />
        <Sidebar />
        <div className="w-full">
          <TopBar />
          <Outlet />
        </div>
      </section>
    </PrivateProvider>
  );
};
