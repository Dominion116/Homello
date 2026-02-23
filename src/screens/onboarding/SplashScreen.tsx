
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
      source={require('../../../assets/images/house-hero.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Dark overlay matching Figma */}
      <View style={styles.overlay} />

      {/* Centered title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Homello</Text>
      </View>

      {/* Home indicator area
      <View style={styles.homeIndicator}>
        <View style={styles.homeIndicatorPill} />
      </View> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',  // ← was '#000', remove black
  },
  background: {
    flex: 1,
    width,
    height,
  },
  imageStyle: {
    transform: [{ translateX: 60 }],
    width: width + 60,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.30)',
  },
  titleContainer: {
    flex: 1,                    // ← use flex instead of absolute positioning
    alignItems: 'center',
    justifyContent: 'center',   // ← this centers it vertically
  },
  title: {
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 50,
    color: '#FFFFFF',
    letterSpacing: -0.3,
    lineHeight: 50,
    textAlign: 'center',        // ← centers horizontally
  },
  homeIndicator: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  pill: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});