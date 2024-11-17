import React from "react";
import {Text, View, ScrollView, StyleSheet} from "react-native";
import {XStack, YStack} from "tamagui";
import AnalyticsCard from "@/components/HomeViews/analytics-star";

const Analytics = () => {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 16 }}
        >
            <YStack>
                <AnalyticsCard label="Phone Use" rating={5} />
                <AnalyticsCard label="Speed" rating={4} />
                <AnalyticsCard label="Braking" rating={3} />
                <AnalyticsCard label="Acceleration" rating={4} />
                <AnalyticsCard label="Cornering" rating={2} />
            </YStack>
        </ScrollView>
    );
};

export default Analytics;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        paddingTop:"2%"
    }
})