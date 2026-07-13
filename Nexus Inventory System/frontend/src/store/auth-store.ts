import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  login: (tokens: { access: string; refresh: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      login: (tokens) => set({ accessToken: tokens.access, refreshToken: tokens.refresh }),
      logout: () => set({ accessToken: null, refreshToken: null })
    }),
    { name: "nexus-auth" }
  )
);
