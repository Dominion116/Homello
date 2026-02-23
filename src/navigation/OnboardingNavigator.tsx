import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from '../screens/onboarding/SplashScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import SignInScreen from '../screens/onboarding/SignInScreen';
import CreateAccountScreen from '../screens/onboarding/CreateAccountScreen';
import EnterOTPScreen from '../screens/onboarding/EnterOTPScreen';
import GoalScreen from '../screens/onboarding/GoalScreen';
import PreferencesScreen from '../screens/onboarding/PreferencesScreen';
import LocationPickerScreen from '../screens/onboarding/LocationPickerScreen';
import LocationPermission from '../screens/onboarding/LocationPermission';

export type OnboardingStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  SignIn: undefined;
  CreateAccount: undefined;
  EnterOTP: undefined;
  Goal: undefined;
  Preferences: undefined;
  LocationPicker: undefined;
  LocationPermission: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="EnterOTP" component={EnterOTPScreen} />
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
      <Stack.Screen name="LocationPicker" component={LocationPickerScreen} />
      <Stack.Screen name="LocationPermission" component={LocationPermission} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
