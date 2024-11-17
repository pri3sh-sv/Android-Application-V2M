import React from "react";
import {ScrollView, StyleSheet, Text, View, Image} from "react-native";
import {Button, H5, SizableText, XStack, YStack} from "tamagui";
import * as Progress from 'react-native-progress';
import {items} from "@/components/CarSelection";

const Vehicle = ({val}:{val:string}) => {
    const selectedCar = items.find((item) => item.name.toLowerCase() === val.toLowerCase());
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 16 }}
        >
        <YStack flex={1} backgroundColor={"rgb(33,33,33)"} padding={"2%"} borderRadius={10} marginBottom={15}>
            <XStack justifyContent={"space-between"} marginBottom={"10"}>
                <XStack>
                    <Image source={require("../../assets/images/charge.png")}
                           style={{width:36,height:36}}/>
                    <SizableText size={"$7"} color={"white"}> Charging in Progress</SizableText>
                </XStack>
                <XStack>
                    <SizableText size={"$5"} color={"white"}>Updated Now  </SizableText>
                    <Image source={require("../../assets/images/refresh.png")} style={{width:20,height:20}}/>
                </XStack>
            </XStack>
            <YStack paddingTop={"1%"} paddingHorizontal={"4%"}>
                <XStack justifyContent={"space-between"} marginBottom={"15"}>
                    <SizableText size={"$7"} color={"white"}>{selectedCar?.percentage} | {selectedCar?.km}</SizableText>
                    <SizableText size={"$5"} color={"white"}>Ready by 5:30 p.m</SizableText>
                </XStack>
                <Progress.Bar progress={selectedCar?.dValue} width={639} color={"green"} unfilledColor={"rgb(58,57,57)"} borderWidth={0}/>
                <XStack justifyContent={"space-between"} marginTop={"10"}>
                    <SizableText size={"$5"} color={"white"}>0</SizableText>
                    <SizableText size={"$5"} color={"white"}>100</SizableText>
                </XStack>

            </YStack>
        </YStack>
        <YStack flex={1} backgroundColor={"rgb(33,33,33)"} padding={"2%"} borderRadius={10}>
            <XStack marginBottom={"10"}>
                <Image source={require("../../assets/images/vehical status.png")}
                       style={{width:36,height:36}}/>
                <SizableText size={"$7"} color={"white"}> Vehicle Status: Healthy</SizableText>
            </XStack>
            <XStack marginBottom={"5"}>
                <Image source={require("../../assets/images/pressure.png")}
                       style={{width:36,height:36}}/>
                <SizableText size={"$7"} color={"white"}> Pressure: Good</SizableText>
            </XStack>
            <XStack alignItems="baseline" justifyContent="flex-end" padding={"%"}>
                <Button backgroundColor={"rgb(58,57,57)"} ><SizableText size={"$6"} color={"whitesmoke"}>Schedule Service</SizableText></Button>
            </XStack>
        </YStack>
        </ScrollView>
    );
};

export default Vehicle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        paddingTop:"2%"
    }
})