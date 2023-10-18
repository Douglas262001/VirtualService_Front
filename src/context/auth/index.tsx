import { useEffect, useState } from "react";
import { createContext } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import api from "@utils/api";
import { redirect } from "react-router-dom";
import { toast } from "sonner";

type SignInCredentials = {
  email: string;
  password: string;
};

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  setAuthorizationToken: (token: string | null) => void;
  getAuthorizationToken: () => string | null;
  token: string | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const { "yellowsoftware.token": token } = parseCookies();
    setToken(token);
    if (!token) {
      localStorage.clear();
      setToken(null);
    }
  }, []);

  function setAuthorizationToken(token: string | null) {
    api.defaults.headers["Authorization"] = token
      ? token.replace(/"/g, "")
      : null;
  }

  function getAuthorizationToken() {
    return localStorage.getItem("token");
  }

  function signOut() {
    destroyCookie(undefined, "yellowsoftware.token");
    setToken(null);
    redirect("/");
    setAuthorizationToken(null);
  }

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post("Login/Authenticate", {
      email,
      senha: password,
    });
    const { body, success } = response.data;

    if (!success) {
      toast.error("Email e/ou senha icorretos.");
    }

    const token = JSON.stringify(body.bearer);

    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
    setCookie(undefined, "yellowsoftware.token", token, {
      maxAge: 60 * 60,
      path: "/",
    });

    setAuthorizationToken(token);
    redirect("/analytics");
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        token,
        signOut,
        setAuthorizationToken,
        getAuthorizationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
