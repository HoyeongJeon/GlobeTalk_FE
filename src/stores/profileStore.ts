import { create } from "zustand";

interface profileStore {
  Profile: {
    imageUrl: string;
    nickname: string;
    introduce: string;
    language: string[];
    major: string;
    state: string;
  };
  country: string;
  setProfile: (profile: profileStore) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<profileStore>((set) => ({
  Profile: {
    imageUrl: "",
    nickname: "",
    introduce: "",
    language: [],
    major: "",
    state: "",
  },
  country: "",
  setProfile: (profile) => set(profile),
  clearProfile: () =>
    set({
      Profile: {
        imageUrl: "",
        nickname: "",
        introduce: "",
        language: [],
        major: "",
        state: "",
      },
      country: "",
    }),
}));
