import { create } from "zustand";

const currentTheme = localStorage.getItem("chat-theme") || "cupcake";

const useThemeStore = create((set) => ({
  theme: currentTheme,
  setTheme: (theme) => {
    set({ theme: theme });
    localStorage.setItem("chat-theme", theme);
  },
  initializeTheme: () => {
    if (typeof window !== "undefined") {
      set({ theme: currentTheme });
    }
  },
}));

export default useThemeStore;
