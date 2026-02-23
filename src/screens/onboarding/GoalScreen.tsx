import React from 'react';
import { View, Text } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';

export default function GoalScreen() {
  return (
    <ScreenWrapper>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>GoalScreen</Text>
      </View>
    </ScreenWrapper>
  );
}
