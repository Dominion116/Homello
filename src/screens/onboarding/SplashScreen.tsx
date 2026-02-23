import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { fonts, fontSizes, letterSpacing } from '../../theme/typography';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/house-hero.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Dark overlay matching Figma */}
      <View style={styles.overlay} />

      {/* Centered title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Homello</Text>
      </View>

      {/* Home indicator area */}
      <View style={styles.homeIndicator}>
        <View style={styles.homeIndicatorPill} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.display,        // 40px from Figma
    color: colors.white,
    letterSpacing: letterSpacing.tight, // -1% from Figma
    lineHeight: fontSizes.display,      // 100% line height from Figma
  },
  homeIndicator: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  homeIndicatorPill: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.white,
    opacity: 0.3,
  },
});