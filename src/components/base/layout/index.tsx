import TopBar from "@components/layout/TopBar";
import Sidebar from "@components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { PrivateProvider } from "context/private";
import Connector from "@utils/signalR";
import { useEffect } from "react";
import { notificationHandler } from "@utils/notifications";
export const Layout = () => {
  const { events } = Connector();

  useEffect(() => {
    events((data) => {
      notificationHandler(data);
    });
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
