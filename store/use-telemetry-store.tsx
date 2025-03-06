import {create} from "zustand";

export interface TelemetryData {
    throttle: number;
    brake: number;
    steer: number;
    speed_kmh: number;
    battery_percentage: number;
    time: string;
    date: string;
    gear: number;
    direction: string;
}

interface TelemetryState {
    data: TelemetryData | null;
    setData: (data: TelemetryData) => void;
    clearData: () => void;
}

export const useTelemetryStore = create<TelemetryState>((set) => ({
    data: null,
    setData: (data: TelemetryData) => set({ data }),
    clearData: () => set({ data: null }),
}))