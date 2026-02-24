import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import OnboardingNavigator from './OnboardingNavigator';
import AppNavigator from './AppNavigator';
import { useAuth } from '../context/AuthContext';

export default function RootNavigator() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return user ? <AppNavigator /> : <OnboardingNavigator />;
}

