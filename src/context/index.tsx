import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";

import { AuthProvider } from "./auth";

type AppProviderType = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderType) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
