"use client";
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { api, auth } from "./api";

interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  avatar?: string;
  apartments?: any[];
  primaryApartment?: any;
}

interface AuthCtx {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!auth.getToken()) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const me = await api.me();
      setUser(me);
    } catch {
      setUser(null);
      auth.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (email: string, password: string) => {
    const { accessToken, refreshToken } = await api.login(email, password);
    auth.setTokens(accessToken, refreshToken);
    await refresh();
  };

  const logout = async () => {
    try { await api.logout(); } catch { /* ignore */ }
    auth.clear();
    setUser(null);
    window.location.href = "/login";
  };

  return <Ctx.Provider value={{ user, loading, login, logout, refresh }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
