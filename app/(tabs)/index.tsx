import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CarSelectionComponent from "@/components/CarSelection";
import { Button, H3, XStack, YStack } from "tamagui";
import Vehicle from "@/components/HomeViews/vehicle";
import Controls from "@/components/HomeViews/controls";
import Analytics from "@/components/HomeViews/analytics";
import { useAppStore } from "@/store/use-app-store";
import { useTelemetryStore } from "@/store/use-telemetry-store";
import { closeSocket, connectWebSocket } from "@/ws-service";
import DataWrapper from "@/components/data-wrapper";

const Page = () => {
    const { data } = useTelemetryStore();
    const { wsConnection: isConnected } = useAppStore();

    const [activeTab, setActiveTab] = useState<"vehicle" | "controls" | "analytics">("controls");
    const [val, setVal] = useState("tesla");

    // Ensure WebSocket connection
    useEffect(() => {
        connectWebSocket();
        return () => {
            closeSocket();
        };
    }, []);

    const handleTabChange = (tab: "vehicle" | "controls" | "analytics") => {
        setActiveTab(tab);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "vehicle":
                return <Vehicle val={val} />;
            case "controls":
                return <Controls />;
            case "analytics":
                return <Analytics />;
            default:
                return null;
        }
    };

    // **New function to prevent early returns breaking hooks**
    const renderContent = () => {
        if (!isConnected) return <DataWrapper isEmpty={true} text={"Connecting to Server..."} />;
        if (!data) return <DataWrapper isEmpty={true} text={"Connected to Server, waiting for data..."} />;
        return (
            <>
                <YStack flex={1} justifyContent="flex-start" padding={"3%"}>
                    <CarSelectionComponent value={val} setValue={setVal} />
                    <Image
                        source={require("../../assets/images/car.png")}
                        style={{ width: "90%", height: "70%", alignSelf: "center", marginTop: "auto" }}
                    />
                </YStack>

                <YStack flex={1} justifyContent={"flex-start"} padding={"3%"}>
                    <XStack width={"100%"} height={"10%"} justifyContent={"space-around"} marginTop={"8%"}>
                        {["vehicle", "controls", "analytics"].map((tab) => (
                            <Button
                                key={tab}
                                flex={1}
                                backgroundColor="transparent"
                                borderWidth={0}
                                borderBottomWidth={2}
                                borderColor={activeTab === tab ? "#fff" : "#aaa"}
                                onPress={() => handleTabChange(tab as "vehicle" | "controls" | "analytics")}
                            >
                                <H3 color={activeTab === tab ? "#fff" : "#aaa"} textAlign="center">
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </H3>
                            </Button>
                        ))}
                    </XStack>
                    <YStack flex={1}>{renderTabContent()}</YStack>
                </YStack>
            </>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[
                    "rgb(0,0,0)", // Darker near the top
                    "rgb(0,0,0)", // Slightly lighter towards the center
                    "rgba(20,20,20,0.84)", // Even lighter
                    "rgba(21,18,18,0.76)", // Light grey near the bottom
                ]}
                style={styles.background}
            />
            <YStack flex={1}>{renderContent()}</YStack>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 1800,
    },
});
