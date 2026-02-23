import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import Divider from '../../components/Divider';

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
      minHeight: '100%',
    },
  ]}
  showsVerticalScrollIndicator={false}
  keyboardShouldPersistTaps="handled"
>
        <View style={styles.mainContainer}>

          {/* TOP CONTENT */}
          <View style={styles.topSection}>
            
            <View style={styles.topContent}>
              <Text style={styles.eyebrow}>
                Let's get you onboard
              </Text>

              <View style={styles.header}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>
                  Create a new account to get started exploring properties with ease
                </Text>
              </View>
            </View>

            {/* INPUTS */}
            <View style={styles.inputFields}>
              <TextInput
                placeholder="Full name"
                value={fullName}
                onChangeText={setFullName}
                icon={<Feather name="user" size={20} color="rgba(13,13,13,0.4)" />}
              />

              <TextInput
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                icon={<Feather name="at-sign" size={20} color="rgba(13,13,13,0.4)" />}
              />

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

              <TouchableOpacity>
                <Text style={styles.forgotText}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* BOTTOM CONTENT */}
          <View>
            <View style={styles.buttonFrame}>
              <Button
                label="Create Account"
                onPress={() => navigation.navigate('EnterOTP')}
                variant="primary"
                style={{ alignItems: 'center' }}
              />

              <View style={styles.dividerRow}>
                <Divider />
                <Text style={styles.alreadyText}>
                  Already has an account?
                </Text>
                <Divider />
              </View>

              <Button
                label="Sign In"
                onPress={() => navigation.navigate('SignIn')}
                variant="secondary"
                style={{ alignItems: 'center' }}
              />
            </View>

            <Text style={styles.disclaimer}>
              By continuing you agree to our{' '}
              <Text style={styles.disclaimerLink}>
                Privacy Policy
              </Text>{' '}
              and{' '}
              <Text style={styles.disclaimerLink}>
                Terms and Conditions
              </Text>
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
  width: 335,
  flex: 1,
  justifyContent: 'space-between',
},

  /* TOP SECTION */
  topSection: {
    gap: 24,
  },
  topContent: {
    height: 140,                  
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyebrow: {
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: '#0D0D0D',
  },
  header: {
    gap: 8,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 45,
    lineHeight: 45,
    textAlign: 'center',
    color: '#0D0D0D',
  },
  subtitle: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#0D0D0D',
    opacity: 0.6,
  },

  /* INPUTS */
  inputFields: {
    gap: 10,
  },
  forgotText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    textAlign: 'center',
    color: '#0039FF',
  },

  /* BOTTOM SECTION */
  buttonFrame: {
    gap: 10,
    marginBottom: 10,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  alreadyText: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    color: '#0D0D0D',
    opacity: 0.5,
    textAlign: 'center',
    flexShrink: 1,
  },
  disclaimer: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.32,
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