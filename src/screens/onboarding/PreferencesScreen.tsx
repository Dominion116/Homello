import React from 'react';
import { View, Text } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';

export default function PreferencesScreen() {
  return (
    <ScreenWrapper>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>PreferencesScreen</Text>
      </View>
    </ScreenWrapper>
  );
}
