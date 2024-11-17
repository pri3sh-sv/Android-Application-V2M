import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SizableText, XStack } from "tamagui";
import StationComponent from "@/components/ChargeViews/StationComponent";
import StatusComponent from "@/components/ChargeViews/StatusComponent";

const Charge = () => {
    const [tab, setTab] = React.useState<"status" | "station">("status");

    const handleChangeTab = (selectedTab: "status" | "station") => {
        setTab(selectedTab);
    };

    const renderContent = () => {
        if (tab === "status") return <StatusComponent />;
        if (tab === "station") return <StationComponent />;
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[
                    'rgb(0,0,0)',
                    'rgb(0,0,0)',
                    'rgba(20,20,20,0.84)',
                    'rgba(21,18,18,0.76)',
                ]}
                style={styles.background}
            />
            <View style={styles.header}>
                <XStack
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    onPress={() => handleChangeTab("status")}
                >
                    <SizableText
                        size={"$7"}
                        color={tab === "status" ? "white" : "grey"}
                        style={[tab === "status" && styles.glow]}
                    >
                        Status
                    </SizableText>
                </XStack>
                <XStack
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    onPress={() => handleChangeTab("station")}
                >
                    <SizableText
                        size={"$7"}
                        color={tab === "station" ? "white" : "grey"}
                        style={[tab === "station" && styles.glow]}
                    >
                        Station
                    </SizableText>
                </XStack>
            </View>

            <View style={styles.contentContainer}>{renderContent()}</View>
        </View>
    );
};

export default Charge;

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
    header: {
        marginTop: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "6%",
        position: "absolute",
        top: 5,
        zIndex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
    glow: {
        textShadowColor: "rgba(255, 255, 255, 0.8)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    contentContainer: {
        marginTop: "10%", // Space below header
        flex: 1,
    },
});
