import React, {useState} from "react";
import {Adapt, FontSizeTokens, getFontSize, H3, H4, Select, SelectProps, Sheet, XStack, YStack} from 'tamagui'
import {Check, ChevronDown, ChevronUp} from "@tamagui/lucide-icons";
import {LinearGradient} from 'tamagui/linear-gradient'
import {Image, Pressable} from "react-native";
import {useTelemetryStore} from "@/store/use-telemetry-store";
import {calculateCarRange} from "@/utils/range-calculator";

interface SelectDemoItemProps extends SelectProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const items = [
    {name: "TESLA", percentage: "73%", km: "510 KM", dValue:.73},
]

interface CarSelectionComponentProps {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * CarSelectionComponent renders a user interface that allows selecting a car
 * and displays the battery status and estimated range of the selected car.
 *
 * @param {CarSelectionComponentProps} props - The props used to initialize the component.
 * @param {string} props.value - The currently selected car model.
 * @param {Function} props.setValue - The function used to update the selected car model.
 *
 * @returns {JSX.Element} A component that enables car selection and displays related telemetry data.
 */
const CarSelectionComponent = ({value, setValue}: CarSelectionComponentProps) => {
    // const [val, setVal] = useState('tesla')
    const { data } = useTelemetryStore();

    const selectedCar = items.find((item) => item.name.toLowerCase() === value.toLowerCase());

    return (
        <XStack justifyContent={"space-between"} width={"100%"} height={"28%"}>
            <YStack width={"40%"} height={"100%"}>
                <SelectDemoItem value={value} setValue={setValue}/>
                <XStack width={"max-content"} height={"max-content"} justifyContent={"space-between"}
                        alignItems={"center"}>
                    <XStack alignItems="center">
                        <Image
                            source={require("../assets/images/battery.png")}
                            style={{width: 60, height: 60}}
                        />
                        <H3 color={"whitesmoke"} marginLeft={8}>
                            {data?.battery_percentage+" % "}
                        </H3>
                    </XStack>
                    <H4 color={"whitesmoke"}>| {(calculateCarRange(data?.battery_percentage || 100, 600).toFixed(2))+" KM"}</H4>
                </XStack>
            </YStack>
            <Pressable
                onPress={() => {
                    console.log("Settings Pressed");
                }}>
                <Image
                    source={require("../assets/images/settings.png")}
                    style={{width: 60, height: 60}}
                />
            </Pressable>


        </XStack>

    );
};

export function SelectDemoItem({value, setValue, ...props}: SelectDemoItemProps) {

    return (
        <Select value={value} onValueChange={setValue} disablePreventBodyScroll {...props}>
            <Select.Trigger width="max-content" size={"$5"} iconAfter={<ChevronDown color={"whitesmoke"} size={"$2"}/>}
                            backgroundColor='rgba(0, 0, 0, 0.9)' borderWidth={0} borderBottomWidth={1}
                            borderBottomColor={"whitesmoke"}>
                <Select.Value placeholder="Something" color='whitesmoke' size={"$6"}/>
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
                <Sheet
                    native={!!props.native}
                    modal
                    dismissOnSnapToBottom
                    animationConfig={{
                        type: 'spring',
                        damping: 20,
                        mass: 1.2,
                        stiffness: 250,
                    }}
                >
                    <Sheet.Frame>
                        <Sheet.ScrollView>
                            <Adapt.Contents/>
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{opacity: 0}}
                        exitStyle={{opacity: 0}}
                    />
                </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
                <Select.ScrollUpButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack zIndex={10}>
                        <ChevronUp size={20}/>
                    </YStack>
                    <LinearGradient
                        start={[0, 0]}
                        end={[0, 1]}
                        fullscreen
                        colors={['$background', 'transparent']}
                        borderRadius="$4"
                    />
                </Select.ScrollUpButton>

                <Select.Viewport
                    // to do animations:
                    // animation="quick"
                    // animateOnly={['transform', 'opacity']}
                    // enterStyle={{ o: 0, y: -10 }}
                    // exitStyle={{ o: 0, y: 10 }}
                    minWidth={200}
                >
                    <Select.Group>
                        <Select.Label>My Cars</Select.Label>
                        {items.map((item, i) => (
                            <Select.Item index={i} key={item.name} value={item.name.toLowerCase()}>
                                <Select.ItemText>{item.name}</Select.ItemText>
                                <Select.ItemIndicator marginLeft="auto">
                                    <Check size={16}/>
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Group>
                    {/* Native gets an extra icon */}
                    {props.native && (
                        <YStack
                            position="absolute"
                            right={0}
                            top={0}
                            bottom={0}
                            alignItems="center"
                            justifyContent="center"
                            width={'$4'}
                            pointerEvents="none"
                        >
                            <ChevronDown
                                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
                            />
                        </YStack>
                    )}
                </Select.Viewport>

                <Select.ScrollDownButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack zIndex={10}>
                        <ChevronDown size={20}/>
                    </YStack>
                    <LinearGradient
                        start={[0, 0]}
                        end={[0, 1]}
                        fullscreen
                        colors={['transparent', '$background']}
                        borderRadius="$4"
                    />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select>
    )
}

export default CarSelectionComponent;
