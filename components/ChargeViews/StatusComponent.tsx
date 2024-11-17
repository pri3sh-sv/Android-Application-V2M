import React, {useState} from 'react';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import * as Progress from 'react-native-progress';
import {Button, H1, SizableText, Slider, SliderProps, Square, XStack, YStack} from 'tamagui';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const StatusComponent = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const [dateTime, setDateTime] = useState<string>("");

    const showDatePicker = () => {
        console.log("date picker visible");
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        console.log("date picker hidden");
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        console.warn("A date has been picked: ", date);
        setDateTime(date.toLocaleString());
        hideDatePicker();
    };

    return (
        <ScrollView>
            <YStack paddingTop={40} paddingHorizontal={20} alignItems="center">
                <Progress.Circle
                    size={360}
                    color={"green"}
                    showsText={false}
                    progress={0.87}
                    borderWidth={0}
                    unfilledColor={"rgb(58,57,57)"}
                    thickness={14}
                />
                <SizableText size={"$8"} color={"white"} paddingTop={35}>Charging In Progress / 510 KM</SizableText>
                <SizableText size={"$7"} color={"white"} paddingTop={10} fontWeight={"bold"}>Ready by 5:30 p.m.</SizableText>
                <XStack justifyContent={"center"} alignItems={"center"} paddingTop={20}>
                    <SizableText size={"$6"} color={"white"}>Updated Now  </SizableText>
                    <Image source={require("../../assets/images/refresh.png")} style={{width:20, height:20}}/>
                </XStack>
                <View style={styles.box}>
                    <XStack>
                        <Image source={require("../../assets/images/charge.png")}
                               style={{width:50,height:50}}/>
                        <SizableText size={"$9"} color={"white"}> Charge Settings</SizableText>
                    </XStack>
                    <View style={styles.innerBox}>
                        <SizableText size={"$9"} color={"white"} marginBottom={20}> Charge to</SizableText>
                        <SimpleSlider width="max-content" />
                        <XStack marginTop={10} justifyContent={"space-between"} alignItems={"center"}>
                            <SizableText size={"$6"} color={"whitesmoke"}>0</SizableText>
                            <SizableText size={"$6"} color={"whitesmoke"}>100</SizableText>
                        </XStack>
                        <XStack marginTop={20} justifyContent={"space-between"} alignItems={"center"} gap={30}>
                            <Button backgroundColor={"#1E1E1E"} flex={1} width={"max-content"} height={100} borderRadius={10} borderWidth={2} borderColor={"grey"} >
                                <SizableText size={"$9"} color={"whitesmoke"} fontWeight={"bold"}>Charge Now</SizableText>
                            </Button>
                            <Button backgroundColor={"#1E1E1E"} flex={1} width={"max-content"} height={100} borderRadius={10} flexDirection={"column"} onPress={showDatePicker}>
                                <SizableText size={"$8"} color={"whitesmoke"}>Charge At</SizableText>
                                <SizableText size={"$7"} color={"whitesmoke"}
                                             backgroundColor={"#5B5B5B"} borderRadius={10}
                                             width={"auto"}
                                             paddingHorizontal={10}
                                             paddingVertical={5}>
                                    {dateTime.length>0?dateTime:" -- -- "}</SizableText>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="datetime"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            </Button>
                        </XStack>
                    </View>
                </View>
            </YStack>
        </ScrollView>
    );
};

function SimpleSlider({ children, ...props }: SliderProps) {
    return (
        <Slider defaultValue={[50]} max={100} step={1} {...props}>
            <Slider.Track backgroundColor={"#5B5B5B"}>
                <Slider.TrackActive backgroundColor={"#5A7BFF"}/>
            </Slider.Track>
            <Slider.Thumb size="$3" index={0} circular borderWidth={0} backgroundColor={"#5A7BFF"} />
            {children}
        </Slider>
    )
}

export default StatusComponent;

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 100,
        fontWeight: "bold",
        color: "white",
    },
    box: {
        marginTop: 40,
        width: "100%",
        height: 360,
        padding: "4%",
        backgroundColor: "#2E2E2E",
        borderRadius: 20,
        shadowColor: "black",
        shadowOpacity: 0.7,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 10,
        elevation: 2
    },
    innerBox: {
        flexDirection: "column",
        marginTop: 10,
        padding: "2%"
    }
});
