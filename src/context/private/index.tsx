import { createContext, useContext, useState } from "react";

interface PrivateContext {
  activeRouteId: number;
  setActiveRouteId: React.Dispatch<React.SetStateAction<number>>;
}

const PrivateContext = createContext<PrivateContext | null>(null);

export const usePrivate = () => {
  const context = useContext(PrivateContext);

  if (!context) {
    throw new Error("usePrivate must be used within a PrivateProvider");
  }
  return context;
};

export const PrivateProvider = ({ children }: React.PropsWithChildren) => {
  const [activeRouteId, setActiveRouteId] = useState<number>(0);

  return (
    <PrivateContext.Provider
      value={{
        activeRouteId,
        setActiveRouteId,
      }}
    >
      {children}
    </PrivateContext.Provider>
  );
};
