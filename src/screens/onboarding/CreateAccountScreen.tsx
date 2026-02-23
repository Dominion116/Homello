import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import Divider from '../../components/Divider';

const { width } = Dimensions.get('window');

export default function CreateAccountScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 60,
            paddingBottom: insets.bottom + 24,
          }
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Main container */}
        <View style={styles.mainContainer}>

          {/* TOP CONTENT */}
          <View style={styles.topContent}>

            {/* Subtitle — "Let's get you onboard" */}
            <Text style={styles.eyebrow}>Let's get you onboard</Text>

            {/* Header — title + subtitle */}
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Create a new account to get started exploring properties with ease
              </Text>
            </View>

          </View>

          {/* FRAME */}
          <View style={styles.frame}>

            {/* Input container */}
            <View style={styles.inputContainer}>

              {/* Input fields */}
              <View style={styles.inputFields}>

                {/* Input field group */}
                <View style={styles.inputField}>

                  {/* Full name */}
                  <TextInput
                    placeholder="Full name"
                    value={fullName}
                    onChangeText={setFullName}
                    icon={<Feather name="user" size={20} color="rgba(13,13,13,0.4)" />}
                  />

                  {/* Email */}
                  <TextInput
                    placeholder="Email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    icon={<Feather name="at-sign" size={20} color="rgba(13,13,13,0.4)" />}
                  />

                  {/* Password */}
                  <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    icon={<Feather name="lock" size={20} color="rgba(13,13,13,0.4)" />}
                    rightIcon={
                      <Feather
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color="rgba(13,13,13,0.4)"
                      />
                    }
                    onRightIconPress={() => setShowPassword(!showPassword)}
                  />

                </View>

                {/* Forgot password */}
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>

              </View>

              {/* Frame — Create Account btn + divider + Sign In btn */}
              <View style={styles.buttonFrame}>

                <Button
                  label="Create Account"
                  onPress={() => navigation.navigate('EnterOTP')}
                  variant="primary"
                />

                <View style={styles.dividerRow}>
                  <Divider />
                  <Text style={styles.alreadyText}>Already have an account?</Text>
                  <Divider />
                </View>

                <Button
                  label="Sign In"
                  onPress={() => navigation.navigate('SignIn')}
                  variant="secondary"
                />

              </View>

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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  mainContainer: {
    width: 345,
    gap: 32,
  },
  topContent: {
    width: 345,
    gap: 16,
    alignItems: 'center',
  },
  eyebrow: {
    width: 345,
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 14,
    lineHeight: 21,       // 150%
    letterSpacing: -0.28, // -2%
    textAlign: 'center',
    color: '#0D0D0D',
  },
  header: {
    width: 345,
    gap: 8,
    alignItems: 'center',
  },
  title: {
    width: 345,
    height: 48,
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 40,
    lineHeight: 40,       // 100%
    letterSpacing: -0.4,  // -1%
    textAlign: 'center',
    color: '#0D0D0D',
  },
  subtitle: {
    width: 345,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    lineHeight: 21,       // 150%
    letterSpacing: -0.28, // -2%
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
    justifyContent: 'space-between',
    gap: 24,
  },
  inputFields: {
    width: 345,
    gap: 14,
  },
  inputField: {
    width: 345,
    gap: 10,
  },
  forgotText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 14,
    lineHeight: 14,       // 100%
    letterSpacing: -0.28, // -2%
    textAlign: 'center',
    color: '#0039FF',
    width: 345,
  },
  buttonFrame: {
    width: 345,
    gap: 16,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 345,
    gap: 12,
  },
  alreadyText: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    color: '#0D0D0D',
    opacity: 0.5,
    letterSpacing: -0.28,
    textAlign: 'center',
    flexShrink: 1,
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