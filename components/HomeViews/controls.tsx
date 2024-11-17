import React from "react";
import {View, Text, Pressable, StyleSheet, Image} from "react-native";

const Controls = () => {
    return (
        <>
            <View style={styles.container}>
                {/* Top Control Buttons */}
                <View style={styles.topButtonsContainer}>
                    <Pressable style={styles.lockButton}>
                        <Image source={require("../../assets/images/lock.png")}
                               style={{width:40,height:40}}/>
                        <Text style={styles.labelText}>Lock</Text>
                    </Pressable>

                    <Pressable style={styles.startButton}>
                        <Image source={require("../../assets/images/poweron.png")}
                               style={{width:55,height:55}}/>
                        <Text style={styles.bigLabelText}>Start</Text>
                    </Pressable>

                    <Pressable style={styles.lockButton}>
                        <Image source={require("../../assets/images/unlock.png")}
                               style={{width:40,height:40}}/>
                        <Text style={styles.labelText}>Unlock</Text>
                    </Pressable>
                </View>

                {/* Lower Options */}
                <View style={styles.lowerOptionsContainer}>
                    <Pressable style={styles.lowerButton}>
                        <Image source={require("../../assets/images/window.png")}
                               style={{width:55,height:55}}/>
                        <Text style={styles.bigLabelText}>Windows & Lights</Text>
                    </Pressable>

                    <Pressable style={styles.lowerButton}>
                        <Image source={require("../../assets/images/fan.png")}
                               style={{width:65,height:65}}/>
                        <Text style={styles.bigLabelText}>Climate</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    topButtonsContainer: {
        flex: 1,
        paddingTop: 35,
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "80%",
        marginBottom: 20,
    },
    lockButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(33,33,33)",
        width: 120,
        height: 120,
        borderRadius: 65,
        margin: 10,
        elevation: 3
    },
    startButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(33,33,33)",
        width: 150,
        height: 150,
        borderRadius: 75,
        elevation: 5
    },
    labelText: {
        color: "white",
        fontSize: 15,
        marginTop: 5,
        textAlign: "center",
    },
    bigLabelText: {
        color: "white",
        fontSize: 20,
        marginTop: 5,
        textAlign: "center",
    },
    lowerOptionsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },
    lowerButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(58,58,58)",
        width: 250,
        height: 130,
        borderRadius: 30,
        margin: 10,
        elevation:3
    }
});

export default Controls;
