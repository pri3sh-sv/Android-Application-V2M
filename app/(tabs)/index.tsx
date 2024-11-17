import React, {useState} from "react";
import {Text, View, StyleSheet, Image} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import CarSelectionComponent from "@/components/CarSelection";
import {Button, H1, H3, H4, XStack, YStack} from "tamagui";
import Vehicle from "@/components/HomeViews/vehicle";
import Controls from "@/components/HomeViews/controls";
import Analytics from "@/components/HomeViews/analytics";

const Page = () => {
    const [activeTab, setActiveTab] = useState<"vehicle"|"controls"|"analytics">("controls");
    const [val, setVal] = useState('tesla')

    const handleTabChange = (tab : "vehicle"|"controls"|"analytics") => {
        setActiveTab(tab);
    }

    const renderTabContent = (val:string) => {
        switch (activeTab) {
            case "vehicle":
                return <Vehicle val={val}/>
            case "controls":
                return <Controls/>
            case "analytics":
                return <Analytics/>
            default:
                return null;
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[
                    'rgb(0,0,0)', // Darker near the top
                    'rgb(0,0,0)', // Slightly lighter towards the center
                    'rgba(20,20,20,0.84)', // Even lighter
                    'rgba(21,18,18,0.76)', // Light grey near the bottom
                ]}
                style={styles.background}
            />
            <YStack flex={1}>
                <YStack flex={1} justifyContent="flex-start" padding={"3%"}>
                    <CarSelectionComponent value={val} setValue={setVal}/>
                    <Image
                        source={require("../../assets/images/car.png")}
                        style={{ width: "90%", height: "70%", alignSelf: "center", marginTop:"auto"}}
                    />
                </YStack>

                <YStack flex={1} justifyContent={"flex-start"} padding={"3%"}>
                    <XStack width={"max-content"} height={"10%"} justifyContent={"space-around"} marginTop={"8%"} >
                        <Button
                            flex={1}
                            backgroundColor="transparent"
                            borderWidth={0}
                            borderBottomWidth={2}
                            borderColor={activeTab === "vehicle" ? "#fff" : "#aaa"}
                            onPress={() => handleTabChange("vehicle")}
                        >
                            <H3 color={activeTab === "vehicle" ? "#fff" : "#aaa"} textAlign="center">
                                Vehicle
                            </H3>
                        </Button>

                        <Button
                            flex={1}
                            backgroundColor="transparent"
                            borderWidth={0}
                            borderBottomWidth={2}
                            borderColor={activeTab === "controls" ? "#fff" : "#aaa"}
                            onPress={() => handleTabChange("controls")}
                        >
                            <H3 color={activeTab === "controls" ? "#fff" : "#aaa"} textAlign="center">
                                Controls
                            </H3>
                        </Button>

                        <Button
                            flex={1}
                            backgroundColor="transparent"
                            borderWidth={0}
                            borderBottomWidth={2}
                            borderColor={activeTab === "analytics" ? "#fff" : "#aaa"}
                            onPress={() => handleTabChange("analytics")}
                        >
                            <H3 color={activeTab === "analytics" ? "#fff" : "#aaa"} textAlign="center">
                                Analytics
                            </H3>
                        </Button>
                    </XStack>
                    <YStack flex={1}>
                        {renderTabContent(val)}
                    </YStack>
                </YStack>

            </YStack>
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 1800,
    },
})