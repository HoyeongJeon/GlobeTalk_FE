import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  isLoggedIn: boolean;
  id: string;
  setIsLoggedIn: (value: boolean) => void;
  setUserId: (value: string) => void;
}

export const useStore = create(
  persist<Store>(
    (set, get) => ({
      isLoggedIn: false,
      id: "",
      setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
      setUserId: (value: string) => set({ id: value }),
    }),
    { name: "Login Status" }
  )
);
