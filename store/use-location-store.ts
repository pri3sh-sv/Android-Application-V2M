import {create} from "zustand";

type LocationState = {
    location: { latitude: number; longitude: number } | null;
    setLocation: (lat: number, lng: number) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
    location: null,
    setLocation: (lat, lng) => set({ location: { latitude: lat, longitude: lng } }),
}));
