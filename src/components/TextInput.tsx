import React, { useState } from 'react';
import { View, TextInput as RNTextInput, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  icon: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  keyboardType?: 'default' | 'email-address';
};

export default function TextInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  icon,
  rightIcon,
  onRightIconPress,
  keyboardType = 'default',
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconLeft}>{icon}</View>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="rgba(13,13,13,0.4)"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {rightIcon && (
        <TouchableOpacity style={styles.iconRight} onPress={onRightIconPress}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 335,
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  iconLeft: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    color: '#0D0D0D',
    letterSpacing: -0.32,
  },
  iconRight: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});