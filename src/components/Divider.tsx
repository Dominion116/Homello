import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Divider() {
  return (
    <View style={styles.divider} />
  );
}

const styles = StyleSheet.create({
  divider: {
    width: 90,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignSelf: 'center',
  },
});