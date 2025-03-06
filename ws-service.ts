import { WS_URL } from "@/config";
import {TelemetryData, useTelemetryStore} from "@/store/use-telemetry-store";
import {useAppStore} from "@/store/use-app-store";

let socket: WebSocket | null = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = Infinity; // Set a limit if needed
const reconnectInterval = 3000; // 3 seconds

export const connectWebSocket = (): void => {
    const { setData } = useTelemetryStore.getState();

    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("WebSocket is already connected.");
        return;
    }

    console.log("Attempting to connect WebSocket...");
    socket = new WebSocket(WS_URL);

    socket.onopen = handleSocketOpen;
    socket.onclose = handleSocketClose;
    socket.onerror = handleSocketError;
    socket.onmessage = (event) => handleSocketMessage(event, setData);
};

export const closeSocket = (): void => {
    if (socket) {
        console.log("Closing WebSocket connection...");
        socket.onclose = null; // Prevent triggering reconnection
        socket.close();
        socket = null;
        useTelemetryStore.getState().clearData();
        useAppStore.getState().setWsConnection(false);
    } else {
        console.warn("WebSocket is already closed or not initialized.");
    }
};

const handleSocketOpen = (): void => {
    console.log("WebSocket connected successfully.");
    reconnectAttempts = 0;
    useAppStore.getState().setWsConnection(true);
};

const handleSocketClose = (): void => {
    console.log("WebSocket disconnected.");
    useAppStore.getState().setWsConnection(false);

    if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        console.log(`Reconnecting in ${reconnectInterval / 1000} seconds...`);
        setTimeout(connectWebSocket, reconnectInterval);
    } else {
        console.warn("Max reconnect attempts reached. Stopping reconnection.");
    }
};

const handleSocketError = (error: Event): void => {
    console.error("WebSocket encountered an error:", error);
    if (socket) socket.close(); // Close the socket to trigger reconnection
};

const handleSocketMessage = (
    event: MessageEvent,
    setData: (data: TelemetryData) => void
): void => {
    try {
        const data: TelemetryData = JSON.parse(event.data);
        setData(data);
    } catch (error) {
        console.error("Failed to parse telemetry data:", error);
    }
};
