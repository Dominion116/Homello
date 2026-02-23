import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

type Props = {
  label: string;
  icon: ImageSourcePropType;
  onPress: () => void;
};

export default function SocialButton({ label, icon, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 335,
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
},
  icon: {
    width: 22,
    height: 22,
  },
  text: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: '#0D0D0D',
    letterSpacing: -0.32,
  },
});