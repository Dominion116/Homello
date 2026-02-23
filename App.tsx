// App.tsx
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingNavigator from './src/navigation/OnboardingNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter_18pt-Regular': require('./assets/fonts/Inter_18pt-Regular.ttf'),
    'Inter_18pt-Medium': require('./assets/fonts/Inter_18pt-Medium.ttf'),
    'Inter_18pt-SemiBold': require('./assets/fonts/Inter_18pt-SemiBold.ttf'),
    'Inter_18pt-Bold': require('./assets/fonts/Inter_18pt-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return <View />;

  return (
    <NavigationContainer>
      <OnboardingNavigator />
    </NavigationContainer>
  );
}