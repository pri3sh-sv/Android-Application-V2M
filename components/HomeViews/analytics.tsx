import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { YStack } from "tamagui";
import AnalyticsCard from "@/components/HomeViews/analytics-star";
import { TelemetryData, useTelemetryStore } from "@/store/use-telemetry-store";

/**
 * Computes a rating based on a given percentage and an array of thresholds.
 *
 * This function iterates through the provided array of thresholds, checking
 * if the input `percentage` exceeds each threshold's limit. If a match is
 * found, the corresponding rating is returned. If no threshold is exceeded,
 * a default rating of 5 is returned.
 *
 * @param {number} percentage - The percentage value used to compute the rating.
 * @param {[number, number][]} thresholds - An array of threshold pairs, where
 * each pair consists of a limit (number) and its corresponding rating (number).
 * The thresholds are expected to be sorted in descending order of limit values
 * for correct computation.
 *
 * @returns {number} The computed rating based on the input percentage and
 * provided thresholds. Defaults to 5 if no thresholds are exceeded.
 */
const computeRating = (percentage: number, thresholds: [number, number][]): number => {
    for (const [limit, rating] of thresholds) {
        if (percentage > limit) return rating;
    }
    return 5;
};

/**
 * Calculates the driver ratings based on telemetry data history.
 *
 * @param {TelemetryData[]} history - An array of telemetry data objects representing historical driving behavior.
 * @returns {Object} An object containing calculated ratings for speed, braking, acceleration, and cornering.
 *                   Each rating is a number from 1 to 5, where 1 represents the most optimal behavior and 5 the least optimal.
 */
const calculateRatings = (history: TelemetryData[]) => {
    if (history.length === 0) return { speed: 5, braking: 5, acceleration: 5, cornering: 5 };

    const totalPoints = history.length;
    let speedOver40 = 0, brakeCount = 0, highThrottleCount = 0, aggressiveSteeringCount = 0;

    history.forEach(entry => {
        if (entry.speed_kmh > 40) speedOver40++;
        if (entry.brake === 1) brakeCount++;
        if (entry.throttle > 0.8 && entry.speed_kmh > 20) highThrottleCount++;
        if (Math.abs(entry.steer) > 0.5) aggressiveSteeringCount++;
    });

    return {
        speed: computeRating(speedOver40 / totalPoints, [[0.8, 1], [0.6, 2], [0.4, 3], [0.2, 4]]),
        braking: computeRating(brakeCount / totalPoints, [[0.6, 1], [0.4, 2], [0.3, 3], [0.1, 4]]),
        acceleration: computeRating(highThrottleCount / totalPoints, [[0.7, 1], [0.5, 2], [0.3, 3], [0.1, 4]]),
        cornering: computeRating(aggressiveSteeringCount / totalPoints, [[0.6, 1], [0.4, 2], [0.3, 3], [0.1, 4]]),
    };
};

/**
 * Converts a time string in the format "HH:MM:SS" to a Unix timestamp.
 *
 * @param {string} time - A string representing time in the "HH:MM:SS" format.
 * @returns {number} The corresponding timestamp in milliseconds.
 */
const parseTimeToTimestamp = (time: string): number => {
    const now = new Date();
    const [hours, minutes, seconds] = time.split(":").map(Number);
    now.setHours(hours, minutes, seconds, 0);
    return now.getTime();
};

/**
 * Analytics component tracks and analyzes telemetry data to compute ratings
 * for various driving parameters such as speed, braking, acceleration, and cornering.
 *
 * This component utilizes telemetry data in real-time, maintaining a rolling
 * 2-minute history of data for its calculations. It provides a visual representation
 * of these ratings using a set of analytics cards.
 *
 * Dependencies:
 * - useTelemetryStore: A custom hook for accessing telemetry data.
 * - useRef: React hook for persisting a reference to telemetry data history.
 * - useEffect: React hook for applying updates whenever telemetry data changes.
 *
 * Core Features:
 * - Processes telemetry data and maintains a history of the last 2 minutes.
 * - Converts timestamps for comparing and filtering recent data.
 * - Computes ratings for driving parameters using telemetry data.
 * - Displays these ratings using the AnalyticsCard component.
 *
 * Returns:
 * A scrollable view containing analytics cards displaying ratings for speed, braking,
 * acceleration, and cornering.
 */
const Analytics = () => {
    const { data } = useTelemetryStore();
    const historyRef = useRef<TelemetryData[]>([]);

    useEffect(() => {
        if (!data) return;

        // Convert time string to timestamp
        const now = parseTimeToTimestamp(data.time);
        historyRef.current.push({ ...data });

        // Keep only last 2 minutes of data
        historyRef.current = historyRef.current.filter(entry => now - parseTimeToTimestamp(entry.time) <= 120000);
    }, [data]);

    const ratings = calculateRatings(historyRef.current);

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
            <YStack>
                <AnalyticsCard label="Speed" rating={ratings.speed} />
                <AnalyticsCard label="Braking" rating={ratings.braking} />
                <AnalyticsCard label="Acceleration" rating={ratings.acceleration} />
                <AnalyticsCard label="Cornering" rating={ratings.cornering} />
            </YStack>
        </ScrollView>
    );
};

export default Analytics;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        paddingTop: "2%",
    },
});
