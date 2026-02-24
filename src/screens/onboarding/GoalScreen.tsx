import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

type GoalOption = 'buy' | 'sell' | 'looking';

export default function GoalScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<GoalOption>('buy');

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Navigation */}
      <View style={[styles.navigation, { paddingTop: insets.top + 8 }]}>

        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Feather name="chevron-left" size={20} color="#0D0D0D" />
        </TouchableOpacity>

        {/* Navigation texts */}
        <View style={styles.navTexts}>
          <Text style={styles.stepIndicator}>Step 2 of 3</Text>
          <Text style={styles.skipText}>Skip</Text>
        </View>

      </View>

      {/* Main container */}
      <View style={styles.mainContainer}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>What you wanna do?</Text>
          <Text style={styles.subtitle}>
            Choose your main objective. You can always do more later.
          </Text>
        </View>

        {/* Options container */}
        <View style={styles.optionsContainer}>

          {/* Buy a house */}
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setSelected('buy')}
            activeOpacity={0.8}
          >
            <View style={styles.iconFrame}>
              <Image
                source={require('../../../assets/images/Frame001.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.optionText}>Buy a house</Text>
            <View style={[styles.radio, selected === 'buy' && styles.radioSelected]}>
              {selected === 'buy' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>

          {/* Sell a house */}
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setSelected('sell')}
            activeOpacity={0.8}
          >
            <View style={styles.iconFrame}>
              <Image
                source={require('../../../assets/images/Frame002.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.optionText}>Sell a house</Text>
            <View style={[styles.radio, selected === 'sell' && styles.radioSelected]}>
              {selected === 'sell' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>

          {/* Just looking */}
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setSelected('looking')}
            activeOpacity={0.8}
          >
            <View style={styles.iconFrame}>
              <Image
                source={require('../../../assets/images/Frame003.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.optionText}>Just looking</Text>
            <View style={[styles.radio, selected === 'looking' && styles.radioSelected]}>
              {selected === 'looking' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>

        </View>

        {/* Continue button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('LocationPermission')}
            activeOpacity={0.9}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
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

  /* Navigation */
  navigation: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTexts: {
    flex: 1,
    height: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepIndicator: {
    width: 81,
    height: 19,
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: -0.32,
    textAlignVertical: 'center',
  },
  skipText: {
    width: 33,
    height: 19,
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: -0.32,
    textAlign: 'center',
    color: '#0039FF',
  },

  /* Main container */
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 32,
  },

  /* Header */
  header: {
    width: '100%',
    height: 89,
    gap: 8,
  },
  title: {
    width: '100%',
    height: 39,
    fontFamily: 'Inter_28pt-SemiBold',
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: -0.32,
    color: '#000000',
    textAlignVertical: 'center',
  },
  subtitle: {
    width: '100%',
    height: 42,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.28,
    color: '#000000',
    opacity: 0.6,
    textAlignVertical: 'center',
  },

  /* Options container */
  optionsContainer: {
    width: '100%',
    
    gap: 10,
  },
  optionButton: {
    width: '100%',
    height: 84,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    paddingTop: 12,
    paddingRight: 24,
    paddingBottom: 12,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  iconFrame: {
    width: 44,
    height: 44,
    borderRadius: 99,
    backgroundColor: 'rgba(30,30,30,0.1)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  optionText: {
    flex: 1,
    height: 19,
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.32,
    color: '#000000',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#0039FF',
    backgroundColor: '#0039FF',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
    backgroundColor: '#FFFFFF',
  },

  /* Footer */
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  continueButton: {
    width: '100%',
    height: 60,
    borderRadius: 20,
    backgroundColor: '#0039FF',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.32,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});