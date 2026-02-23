// App.tsx
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import OnboardingNavigator from './src/navigation/OnboardingNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter_18pt-Regular': require('./src/assets/fonts/Inter_18pt-Regular.ttf'),
    'Inter_18pt-Medium': require('./src/assets/fonts/Inter_18pt-Medium.ttf'),
    'Inter_18pt-SemiBold': require('./src/assets/fonts/Inter_18pt-SemiBold.ttf'),
    'Inter_18pt-Bold': require('./src/assets/fonts/Inter_18pt-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return <View />;

  return <OnboardingNavigator />;
}