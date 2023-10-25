import TopBar from "@components/layout/TopBar";
import Sidebar from "@components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { PrivateProvider } from "context/private";
import Connector, { EnumAcaoHub } from "@utils/signalR";
import { useEffect } from "react";
export const Layout = () => {
    const { events } = Connector();
  
    useEffect(() => {
      events((acao: EnumAcaoHub) =>
        toast.success('Chamando garçom')
      );
    });

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
