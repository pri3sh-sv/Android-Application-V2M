import {Tabs} from "expo-router";
import React from "react";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#070707",
                    borderTopWidth: 0,
                    height: 80, // Increase Tab Bar height
                    paddingBottom: 10, // Add space for the content
                },
                tabBarActiveTintColor:"#fff",
                tabBarInactiveTintColor:"#aaa",
                tabBarLabelStyle: {
                    fontSize: 16,
                    fontFamily: "Inter_400Regular",  // Apply font to labels
                },
                tabBarIconStyle: {
                    marginBottom: 5,
                    fontFamily: "Inter_600SemiBold", // Apply font to icons
                },
                tabBarLabelPosition: "below-icon"
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="charge"
                options={{
                    title: "Charging",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="flash" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>

    )
}

export default TabLayout;