import { Stack } from "expo-router";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import * as SplashScreen from "expo-splash-screen";
import { createTamagui,TamaguiProvider } from 'tamagui'
import defaultConfig from '@tamagui/config/v3'
import * as ScreenOrientation from 'expo-screen-orientation';
import {Image,View} from 'react-native';


const config = createTamagui(defaultConfig)

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const setOrientation = async () => {
      try {
        // Lock to portrait mode
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        console.log("Orientation successfully locked to portrait.");
      } catch (error) {
        console.log("Error setting orientation:", error);
      }
    };

    // Lock orientation to portrait mode
    setOrientation();

    // Show splash screen for 4 seconds and hide it
    const hideSplashScreen = async () => {
      if (loaded) {
        await SplashScreen.hideAsync();
        console.log("Splash screen hidden.");
      }
    };

    setTimeout(hideSplashScreen, 6000);

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
          <Image source={require('../assets/images/v2mlogo.png')} style={{ width: 200, height: 200 }} />
        </View>
    );
  }
  return (
      <TamaguiProvider config={config}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown : false}}></Stack.Screen>
        </Stack>
      </TamaguiProvider>
  );
}
