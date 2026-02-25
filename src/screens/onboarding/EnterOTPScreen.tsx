import React, { useState, useRef, useEffect } from 'react';
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
import { API_BASE_URL } from '../../config/api';
import { useAuth } from '../../context/AuthContext';

export default function EnterOTPScreen({ navigation, route }: any) {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);
  const { completeSignupWithOtp } = useAuth();
  const email = route?.params?.email as string | undefined;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(119);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    // Auto-advance to next box
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleContinue = async () => {
    if (!email) {
      setError('Missing email from signup step.');
      return;
    }
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      await completeSignupWithOtp(email, code);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Goal' }],
      });
    } catch (e: any) {
      setError(e.message ?? 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || countdown > 0) return;
    setResendSuccess(false);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/resend-signup-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setOtp(['', '', '', '', '', '']);
        inputs.current[0]?.focus();
        setCountdown(119);
        setResendSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error ?? 'Failed to resend OTP');
      }
    } catch {
      setError('Network error. Please try again.');
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

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
              We sent a 6-digit code to{' '}
              <Text style={styles.subtitleBold}>{email ?? 'your email'}</Text>
            </Text>
          </View>
        </View>

        {/* Form content */}
        <View style={styles.formContent}>

          <View style={styles.fieldsContainer}>
            <View style={styles.otpFieldsContainer}>

              {/* 6 OTP boxes */}
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
                {countdown > 0 ? (
                  <Text style={styles.resendTimer}>
                    Resend in <Text style={styles.resendTimerBold}>{formatTime(countdown)}</Text>
                  </Text>
                ) : (
                  <Text style={styles.resendTimer}>Didn't receive the code?</Text>
                )}
                <TouchableOpacity onPress={handleResend} disabled={countdown > 0}>
                  <Text style={[styles.resendOTP, countdown > 0 && { opacity: 0.4 }]}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Resend success message */}
              {resendSuccess && (
                <Text style={{ color: 'green', textAlign: 'center', fontSize: 14 }}>
                  A new code has been sent to your email.
                </Text>
              )}

            </View>
          </View>

          <View style={{ flex: 1 }} />

          {/* Bottom frame */}
          <View style={styles.bottomFrame}>
            <Button
              label={loading ? 'Verifying...' : 'Continue'}
              onPress={handleContinue}
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

            {error ? (
              <Text style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>
                {error}
              </Text>
            ) : null}
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
    gap: 16,
  },
  eyebrow: {
    height: 21,
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.28,
    textAlign: 'center',
    color: '#0D0D0D',
  },
  headerComponent: {
    gap: 8,
  },
  title: {
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 45,
    lineHeight: 45,
    letterSpacing: -1,
    textAlign: 'center',
    color: '#0D0D0D',
  },
  subtitle: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.28,
    textAlign: 'center',
    color: '#0D0D0D',
    opacity: 0.6,
  },
  subtitleBold: {
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.28,
    color: '#0D0D0D',
  },
  formContent: {
    flex: 1,
    gap: 16,
  },
  fieldsContainer: {
    gap: 10,
  },
  otpFieldsContainer: {
    gap: 16,
  },
  otpInputContainer: {
    height: 60,
    flexDirection: 'row',
    gap: 8,
  },
  otpBox: {
    flex: 1,
    height: 60,
    borderRadius: 16,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resendTimer: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
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
    fontSize: 16,
    color: '#0039FF',
    letterSpacing: -0.28,
  },
  bottomFrame: {
    gap: 16,
  },
});
