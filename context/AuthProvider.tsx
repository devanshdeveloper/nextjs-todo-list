"use client";

import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth/cordova";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, createContext, useContext } from "react";
import { useState, useEffect } from "react";

type statusType = "unauthenticated" | "loading" | "authenticated";

type AuthContextType = {
  user: User | null;
  status: statusType;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  status: "loading",
});

export default function AuthProvider({ children }: AuthProviderProps) {
  // hooks
  const router = useRouter();
  const pathname = usePathname();

  // state
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<statusType>("loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setStatus("authenticated");
        pathname === "/login" && router.push("/");
      } else {
        setStatus("unauthenticated");
        router.push("/login");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, status }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
