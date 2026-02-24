import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/onboarding/SplashScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import SignInScreen from '../screens/onboarding/SignInScreen';
import CreateAccountScreen from '../screens/onboarding/CreateAccountScreen';
import EnterOTPScreen from '../screens/onboarding/EnterOTPScreen';
import GoalScreen from '../screens/onboarding/GoalScreen';
import PreferencesScreen from '../screens/onboarding/PreferencesScreen';
import LocationPickerScreen from '../screens/onboarding/LocationPickerScreen';

const Stack = createStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="EnterOTP" component={EnterOTPScreen} />
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
      <Stack.Screen name="LocationPicker" component={LocationPickerScreen}/>
    </Stack.Navigator>
  );
}