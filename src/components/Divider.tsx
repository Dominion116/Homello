import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  label?: string;
};

export default function Divider({ label }: Props) {
  if (label) {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.line} />
        <Text style={styles.label}>{label}</Text>
        <View style={styles.line} />
      </View>
    );
  }

  return (
    <View style={styles.divider} />
  );
}

const styles = StyleSheet.create({
  // Simple divider (no label)
  divider: {
    width: 90,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignSelf: 'center',
  },
  // Horizontal divider with label
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 335,
    gap: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  label: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    color: '#0D0D0D',
    opacity: 0.4,
    letterSpacing: -0.32,
  },
});