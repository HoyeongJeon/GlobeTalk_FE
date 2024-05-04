import { create } from "zustand";

interface recommendedUserStore {
  id: number;
  imageUrl: string;
  introduce: string;
  language: string[];
  major: string;
  nickname: string;
  state: string;
  setUserInfo: (user: recommendedUserStore) => void;
  clearUserInfo: () => void;
}

export const useRecommendedUserStore = create<recommendedUserStore>((set) => ({
  id: 0,
  imageUrl: "",
  introduce: "",
  language: [],
  major: "",
  nickname: "",
  state: "",
  setUserInfo: (user) => set(user),
  clearUserInfo: () =>
    set({
      id: 0,
      imageUrl: "",
      introduce: "",
      language: [],
      major: "",
      nickname: "",
      state: "",
    }),
}));
