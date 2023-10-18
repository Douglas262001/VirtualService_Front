import * as React from "react";

type IRegisterContext = {
  codigoComanda: number;
  setCodigoComanda: React.Dispatch<React.SetStateAction<number>>;
};

const RegisterContext = React.createContext<IRegisterContext | null>(null);

export const useRegister = () => {
  const context = React.useContext(RegisterContext);

  if (!context) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return context;
};

export const ResgisterContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [codigoComanda, setCodigoComanda] = React.useState<number>(0);

  return (
    <RegisterContext.Provider
      value={{
        codigoComanda,
        setCodigoComanda,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
