import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

interface Props {
    isEmpty: boolean;
    text: string;
}

const DataWrapper = ({ isEmpty, text }: Props) => {
    if (isEmpty) {
        return (
            <View style={styles.container}>
                <LottieView
                    source={require("../assets/lottie/no-data.json")}
                    autoPlay
                    loop
                    style={styles.lottie}
                />
                <Text style={styles.text}>{text}</Text>
            </View>
        );
    }
    return null;
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        backgroundColor: "#1F2937", // gray-800
        width: "100%",
        height: "100%",
    },
    lottie: {
        width: 240,
        height: 240,
    },
    text: {
        fontSize: 24, // text-3xl
        color: "#ffffff", // white
        fontFamily: "Poppins-SemiBold", // font-psemibold
    },
});

export default DataWrapper;
