import React from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {H3, H5, XStack, YStack} from "tamagui";
import { FontAwesome } from "@expo/vector-icons";

interface CardProps {
    label: string;
    rating: number; // Number of stars to display
}

const AnalyticsCard: React.FC<CardProps> = ({ label, rating }) => {
    return (
        <LinearGradient
            colors={["#111111", "#333333"]} // Adjust gradient colors for the card background
            start={[0, 0]}
            end={[1, 1]}
            style={{
                flex: 1,
                borderRadius: 10,
                padding: 10,
                marginBottom: 12,
            }}
        >
            <YStack>
                <Text style={{ color: "white", fontSize: 16, marginBottom: 8 }}>
                    <H5 color={"white"}>{label}</H5>
                </Text>
                <XStack>
                    {/* Render stars */}
                    {[...Array(5)].map((_, index) => (
                        <FontAwesome
                            key={index}
                            name={index < rating ? "star" : "star-o"} // Filled or outlined star
                            size={18}
                            color="white"
                            style={{ marginRight: 4 }}
                        />
                    ))}
                </XStack>
            </YStack>
        </LinearGradient>
    );
};

export default AnalyticsCard;
