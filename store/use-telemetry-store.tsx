import {create} from "zustand";

/**
 * Interface for representing telemetry data for a vehicle or system.
 *
 * This interface provides a structure for telemetry data, which typically includes information
 * about the vehicle's state, control inputs, and environmental attributes.
 *
 * Properties:
 * - throttle: The throttle percentage, representing the degree to which the acceleration is applied (0 to 100).
 * - brake: The brake percentage, representing the degree to which braking is applied (0 to 100).
 * - steer: The steering angle or input, typically represented as a value where negative indicates left and positive indicates right.
 * - speed_kmh: The current speed of the vehicle in kilometers per hour.
 * - battery_percentage: The remaining battery level as a percentage (0 to 100).
 * - time: The timestamp of the telemetry data, represented as a time format string.
 * - date: The date associated with the telemetry data, represented as a date format string.
 * - gear: The current gear of the vehicle, represented as a numeric value.
 * - direction: The direction the vehicle is moving, typically represented as a string (e.g., "forward", "reverse").
 */
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

/**
 * `useTelemetryStore` is a Zustand store that manages the telemetry state.
 *
 * The store maintains the following state:
 * - `data`: Represents the telemetry data, initially set to `null`.
 *
 * It provides the following state management methods:
 * - `setData`: Updates the `data` state with new telemetry data.
 * - `clearData`: Resets the `data` state back to `null`.
 *
 * This store is designed to centralize and manage telemetry data within an application.
 */
export const useTelemetryStore = create<TelemetryState>((set) => ({
    data: null,
    setData: (data: TelemetryData) => set({ data }),
    clearData: () => set({ data: null }),
}))