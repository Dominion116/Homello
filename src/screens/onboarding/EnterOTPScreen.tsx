// src/screens/onboarding/EnterOTPScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import Divider from '../../components/Divider';

export default function EnterOTPScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 4) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Main container */}
      <View style={[
        styles.mainContainer,
        {
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 24,
        }
      ]}>

        {/* Top content */}
        <View style={styles.topContent}>
          <Text style={styles.eyebrow}>Verify your email</Text>
          <View style={styles.headerComponent}>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>
              We have sent you an otp for verification on your email address{' '}
              <Text style={styles.subtitleBold}>example@mapldesign.co</Text>
            </Text>
          </View>
        </View>

        {/* Form content */}
        <View style={styles.formContent}>

          {/* Fields container */}
          <View style={styles.fieldsContainer}>

            {/* OTP fields container */}
            <View style={styles.otpFieldsContainer}>

              {/* OTP input container — 5 boxes */}
              <View style={styles.otpInputContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => { inputs.current[index] = ref; }}
                    style={[
                      styles.otpBox,
                      digit ? styles.otpBoxFilled : styles.otpBoxEmpty,
                    ]}
                    value={digit}
                    onChangeText={(text) => handleChange(text.slice(-1), index)}
                    onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                  />
                ))}
              </View>

              {/* Resend row */}
              <View style={styles.resendRow}>
                <Text style={styles.resendTimer}>
                  Resend in <Text style={styles.resendTimerBold}>1:59</Text>
                </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.resendOTP}>Resend OTP</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>

          {/* Spacer */}
          <View style={{ flex: 1 }} />

          {/* Bottom frame */}
          <View style={styles.bottomFrame}>
            <Button
              label="Continue"
              onPress={() => navigation.navigate('Goal')}
              variant="primary"
              style={{ alignItems: 'center' }}
            />

            <Divider label="Don't have an account?" />

            <Button
              label="Create Account"
              onPress={() => navigation.navigate('CreateAccount')}
              variant="secondary"
              style={{ alignItems: 'center' }}
            />
          </View>

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
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 32,
  },
  topContent: {
    width: 335,
    height: 135,
    gap: 16,
  },
  eyebrow: {
    width: 335,
    height: 21,
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.28,
    textAlign: 'center',
    color: '#0D0D0D',
  },
  headerComponent: {
    width: 335,
    height: 98,
    gap: 8,
  },
  title: {
    width: 335,
    height: 48,
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 40,
    lineHeight: 40,
    letterSpacing: -0.4,
    textAlign: 'center',
    color: '#0D0D0D',
  },
  subtitle: {
    width: 335,
    height: 42,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.28,
    textAlign: 'center',
    color: '#0D0D0D',
    opacity: 0.6,
  },
  subtitleBold: {
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.28,
    color: '#0D0D0D',
  },
  formContent: {
    width: 335,
    flex: 1,
    gap: 16,
  },
  fieldsContainer: {
    width: 335,
    gap: 16,
  },
  otpFieldsContainer: {
    width: 335,
    gap: 16,
  },
  otpInputContainer: {
    width: 335,
    height: 60,
    flexDirection: 'row',
    gap: 10,
  },
  otpBox: {
    flex: 1,
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 20,
    color: '#0D0D0D',
  },
  otpBoxEmpty: {
    borderColor: 'rgba(0,0,0,0.10)',
    backgroundColor: '#FFFFFF',
  },
  otpBoxFilled: {
    borderColor: '#0039FF',
    backgroundColor: '#FFFFFF',
  },
  resendRow: {
    width: 335,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resendTimer: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    color: '#0D0D0D',
    opacity: 0.5,
    letterSpacing: -0.28,
  },
  resendTimerBold: {
    fontFamily: 'Inter_18pt-Bold',
    color: '#0D0D0D',
    opacity: 1,
  },
  resendOTP: {
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 14,
    color: '#0039FF',
    letterSpacing: -0.28,
  },
  bottomFrame: {
    width: 335,
    gap: 16,
  },
});