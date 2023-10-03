import { useEffect, useState } from "react";
import { createContext } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import api from "@utils/api";
import { redirect } from "react-router-dom";

type SignInCredentials = {
  email: string;
  password: string;
};

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
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
      setToken(null)
    }
  }, []);

  function signOut() {
    destroyCookie(undefined, "yellowsoftware.token");
    setToken(null);
    redirect('/');
    api.defaults.headers["Authorization"] = null;

  }

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post("Login/Authenticate", {
      email,
      senha: password,
    });
    const { body, success, reasonPhrase } = response.data;

    if (!success) {
      throw new Error(reasonPhrase);
    }
    const token = JSON.stringify(body);

    localStorage.setItem("token", JSON.stringify(token));
    setToken(token)
    setCookie(undefined, "yellowsoftware.token", token, {
      maxAge: 60 * 60,
      path: "/",
    });

    api.defaults.headers["Authorization"] = `${token}`;
    redirect("/analytics");
  }

  return (
    <AuthContext.Provider value={{ signIn, token, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
