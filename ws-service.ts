import { WS_URL } from "@/config";
import {TelemetryData, useTelemetryStore} from "@/store/use-telemetry-store";
import {useAppStore} from "@/store/use-app-store";

let socket: WebSocket | null = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = Infinity; // Set a limit if needed
const reconnectInterval = 3000; // 3 seconds

/**
 * Establishes a WebSocket connection if not already open.
 * Sets up event listeners for WebSocket lifecycle events such as open, close, error, and message.
 * Utilizes a telemetry store's state setter to manage incoming data from the WebSocket.
 * Does nothing if an active WebSocket connection already exists.
 *
 * Events:
 * - `onopen`: Triggered when the WebSocket connection is successfully opened.
 * - `onclose`: Triggered when the WebSocket connection is closed.
 * - `onerror`: Triggered on any WebSocket error.
 * - `onmessage`: Processes incoming WebSocket messages and forwards the data to the store's state.
 *
 * No return value.
 */
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

/**
 * Closes the WebSocket connection if it is initialized. Ensures that reconnection is not triggered,
 * clears any associated data from the telemetry store, and updates the application state to reflect
 * the closed connection. Displays warnings if the WebSocket is already closed or uninitialized.
 */
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

/**
 * Handles the event when the WebSocket connection is successfully opened.
 * This function performs the following actions:
 * - Logs a confirmation message to indicate a successful WebSocket connection.
 * - Resets the counter for reconnection attempts to 0.
 * - Updates the application state to reflect the active WebSocket connection status.
 */
const handleSocketOpen = (): void => {
    console.log("WebSocket connected successfully.");
    reconnectAttempts = 0;
    useAppStore.getState().setWsConnection(true);
};

/**
 * Handles the closure of a WebSocket connection.
 *
 * This function logs the disconnection event, updates the application state to reflect the
 * WebSocket disconnection, and attempts to reconnect to the WebSocket server. Reconnection
 * continues until the defined maximum number of reconnection attempts is reached, with a
 * delay between each attempt. If the maximum attempts are exceeded, the reconnection process
 * is stopped.
 */
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

/**
 * A function to handle WebSocket errors.
 * Logs the WebSocket error to the console and attempts to close the socket,
 * triggering a reconnection if applicable.
 *
 * @param {Event} error - The error event object associated with the WebSocket error.
 * @returns {void}
 */
const handleSocketError = (error: Event): void => {
    console.error("WebSocket encountered an error:", error);
    if (socket) socket.close(); // Close the socket to trigger reconnection
};

/**
 * Handles incoming WebSocket messages by parsing the message data
 * and updating the state with the parsed telemetry data.
 *
 * @param {MessageEvent} event - The WebSocket message event containing the data.
 * @param {function} setData - A callback function for setting the parsed telemetry data.
 *                             This function should take a single argument of type TelemetryData.
 * @returns {void}
 *
 * @throws Will log an error message to the console if the message data cannot be parsed as JSON.
 */
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
