import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { YStack } from "tamagui";
import AnalyticsCard from "@/components/HomeViews/analytics-star";
import { TelemetryData, useTelemetryStore } from "@/store/use-telemetry-store";

const computeRating = (percentage: number, thresholds: [number, number][]): number => {
    for (const [limit, rating] of thresholds) {
        if (percentage > limit) return rating;
    }
    return 5;
};

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

const parseTimeToTimestamp = (time: string): number => {
    const now = new Date();
    const [hours, minutes, seconds] = time.split(":").map(Number);
    now.setHours(hours, minutes, seconds, 0);
    return now.getTime();
};

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
