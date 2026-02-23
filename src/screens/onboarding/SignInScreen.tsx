import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

const { width } = Dimensions.get('window');

export default function SignInScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Hero background image with gradient */}
      <ImageBackground
        source={require('../../../assets/images/house-hero.png')}
        style={styles.heroImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', '#FFFFFF']}
          style={styles.imageGradient}
        />
      </ImageBackground>

      {/* Main content overlaid */}
      <View style={[
        styles.content,
        {
          top: 60,
          paddingBottom: insets.bottom + 24,
        }
      ]}>

        {/* TOP CONTENT — header */}
        <View style={styles.topContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>
              Create a new account to get started exploring properties with ease
            </Text>
          </View>
        </View>

        {/* FRAME — input container + disclaimer */}
        <View style={styles.frame}>

          {/* Input container */}
          <View style={styles.inputContainer}>

            {/* Email input */}
            <TextInput
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              icon={
                <Feather name="at-sign" size={20} color="rgba(13,13,13,0.4)" />
              }
            />

            {/* Password input */}
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              icon={
                <Feather name="lock" size={20} color="rgba(13,13,13,0.4)" />
              }
              rightIcon={
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="rgba(13,13,13,0.4)"
                />
              }
              onRightIconPress={() => setShowPassword(!showPassword)}
            />

            {/* Forgot password */}
            <TouchableOpacity
              style={styles.forgotContainer}
              onPress={() => {}}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Sign In button */}
            <Button
              label="Sign In"
              onPress={() => {}}
              variant="primary"
            />

            {/* Don't have an account */}
            <Text style={styles.noAccount}>Don't have an account?</Text>

            {/* Create Account button */}
            <Button
              label="Create Account"
              onPress={() => navigation.navigate('CreateAccount')}
              variant="secondary"
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
    height: 315,
    justifyContent: 'flex-end',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  content: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 0,
    gap: 32,
    paddingTop: 16,
  },
  topContent: {
    width: 345,
    gap: 16,
  },
  header: {
    width: 345,
    gap: 8,
  },
  title: {
    width: 345,
    height: 48,
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 40,
    lineHeight: 40,
    letterSpacing: -0.4,
    textAlign: 'center',
    color: '#0D0D0D',
  },
  subtitle: {
    width: 345,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    lineHeight: 21,       // 150% of 14px
    letterSpacing: -0.28, // -2% of 14px
    textAlign: 'center',
    color: '#0D0D0D',
    opacity: 0.6,
  },
  frame: {
    width: 345,
    gap: 16,
  },
  inputContainer: {
    width: 345,
    gap: 16,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 14,
    color: '#0039FF',
    letterSpacing: -0.28,
  },
  noAccount: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    color: '#0D0D0D',
    opacity: 0.6,
    textAlign: 'center',
    letterSpacing: -0.28,
  },
  disclaimer: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.28,
    textAlign: 'center',
    color: '#0D0D0D',
    opacity: 0.6,
  },
  disclaimerLink: {
    color: '#0D0D0D',
    fontFamily: 'Inter_18pt-SemiBold',
    opacity: 1,
  },
});