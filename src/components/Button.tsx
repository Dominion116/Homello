import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
};

export default function Button({ label, onPress, variant = 'primary', style }: Props) {
  return (
    <TouchableOpacity
      style={[styles.base, variant === 'primary' ? styles.primary : styles.secondary, style]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={variant === 'primary' ? styles.primaryText : styles.secondaryText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 345,
    height: 60,
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
},
  primary: {
    backgroundColor: '#0039FF',
  },
  secondary: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  primaryText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: -0.32,
  },
  secondaryText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: '#0D0D0D',
    letterSpacing: -0.32,
  },
});