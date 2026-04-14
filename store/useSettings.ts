import { create } from "zustand";

export const useSettings = create((set) => ({
  theme: "light",
  language: "english",
  toggleTheme: () =>
    set((s: any) => ({
      theme: s.theme === "light" ? "dark" : "light"
    })),
}));