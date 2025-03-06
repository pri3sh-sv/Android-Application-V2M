import { create } from "zustand";

type AppState = {
    wsConnection: boolean;
    setWsConnection: (status: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
    wsConnection: false, // Initial state
    setWsConnection: (status) => set({ wsConnection: status }),
}));