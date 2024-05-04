import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export const useStore = create(
  persist<Store>(
    (set, get) => ({
      isLoggedIn: false,
      setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
    }),
    { name: "Login Status" }
  )
);
