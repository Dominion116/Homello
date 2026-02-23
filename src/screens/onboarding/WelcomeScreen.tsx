import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import SocialButton from '../../components/SocialButton';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Full screen background image - no white gaps */}
      <ImageBackground
        source={require('../../../assets/images/house-hero.png')}
        style={styles.heroImage}
        resizeMode="cover"
      >
        {/* White gradient fade at bottom of image */}
        <View style={styles.imageGradient} />
      </ImageBackground>

      {/* Content overlaid on top of image */}
      <View style={[styles.content, { paddingBottom: insets.bottom + 16 }]}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Homello</Text>
          <Text style={styles.subtitle}>
            Create a new account to get started exploring properties with ease
          </Text>
        </View>

        {/* Buttons + Disclaimer */}
        <View style={styles.actionsContainer}>
          <View style={styles.inputContainer}>

            <Button
              label="Sign In with Email"
              onPress={() => navigation.navigate('SignIn')}
              variant="primary"
            />
            <Button
              label="Create new account"
              onPress={() => navigation.navigate('CreateAccount')}
              variant="secondary"
            />
            <SocialButton
              label="Continue with Google"
              icon={require('../../../assets/images/googleicon.png')}
              onPress={() => {}}
            />
            <SocialButton
              label="Continue with Apple"
              icon={require('../../../assets/images/appleicon.png')}
              onPress={() => {}}
            />

          </View>

          {/* Disclaimer */}
          <Text style={styles.disclaimer}>
            By continuing you agree to our{' '}
            <Text style={styles.disclaimerLink}>Privacy Policy</Text>
            {' '}and{' '}
            <Text style={styles.disclaimerLink}>Terms and Conditions</Text>
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width,
    height: 377,
    justifyContent: 'flex-end',
  },
  imageGradient: {
    height: 80,
    // Fade from transparent to white at bottom of image
    backgroundColor: 'transparent',
    backgroundImage: undefined,
    // React Native doesn't support CSS gradients natively
    // so we layer white with decreasing opacity
    borderBottomWidth: 0,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: -40 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',   // push everything to bottom
    paddingHorizontal: 24,
    gap: 24,
  },
  header: {
    width: 280,
    alignSelf: 'center',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    width: 280,
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 40,
    lineHeight: 40,
    letterSpacing: -0.4,
    textAlign: 'center',
    color: '#0D0D0D',
  },
  subtitle: {
    width: 280,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.32,
    textAlign: 'center',
    color: '#0D0D0D',
    opacity: 0.6,
  },
  actionsContainer: {
    width: 345,
    alignSelf: 'center',
    gap: 24,
  },
  inputContainer: {
    width: 345,
    gap: 10,
  },
  disclaimer: {
    width: 345,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.28,
    textAlign: 'center',
    color: '#0D0D0D',
    opacity: 0.6,
  },
  disclaimerLink: {
    color: '#0D0D0D',      // ← #0D0D0D as requested
    opacity: 1,
    fontFamily: 'Inter_18pt-SemiBold',  // bold to distinguish links
  },
});