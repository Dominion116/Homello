import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import SocialButton from '../../components/SocialButton';

const { width } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Hero image - 393x377 */}
      <ImageBackground
        source={require('../../../assets/images/house-hero.png')}
        style={styles.heroImage}
        imageStyle={styles.heroImageStyle}
        resizeMode="cover"
      />

      {/* White content area */}
      <View style={[styles.content, { paddingBottom: insets.bottom + 16 }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Homello</Text>
            <Text style={styles.subtitle}>
              Create a new account to get started exploring properties with ease
            </Text>
          </View>

          {/* Buttons + Disclaimer */}
          <View style={styles.actionsContainer}>

            {/* Input container - 4 buttons */}
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
        </ScrollView>
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
    width: 393,
    height: 377,
  },
  heroImageStyle: {
    transform: [{ translateX: 60 }],
    width: width + 60,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingTop: 24,
    alignItems: 'center',
    gap: 24,
  },
  header: {
    width: 280,
    alignItems: 'center',
    gap: 8,
  },
  title: {
    width: 280,
    height: 48,
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 40,
    lineHeight: 40,
    letterSpacing: -0.4,
    textAlign: 'center',
    color: '#0D0D0D',
  },
  subtitle: {
    width: 280,
    height: 48,
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
    gap: 24,
    alignSelf: 'center',
  },
  inputContainer: {
    width: 345,
    gap: 10,
  },
  disclaimer: {
    width: 345,
    height: 48,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.28,
    textAlign: 'center',
    color: '#0D0D0D',
    opacity: 0.6,
  },
  disclaimerLink: {
    color: '#0039FF',
    opacity: 1,
    textDecorationLine: 'underline',
  },
});