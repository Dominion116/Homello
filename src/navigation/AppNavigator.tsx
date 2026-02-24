import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GoalScreen from '../screens/onboarding/GoalScreen';
import PreferenceScreen from '../screens/onboarding/PreferencesScreen';
import LocationPermission from '../screens/onboarding/LocationPickerScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="Preferences" component={PreferenceScreen} />
      <Stack.Screen name="LocationPicker" component={LocationPermission} />
    </Stack.Navigator>
  );
}

