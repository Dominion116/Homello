// src/screens/onboarding/EnterOTPScreen.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EnterOTPScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Main container */}
      <View style={[
        styles.mainContainer,
        {
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 24,
        }
      ]}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 32,
  },
});