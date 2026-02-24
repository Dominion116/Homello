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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={20} color="#0D0D0D" />
        </TouchableOpacity>

        {/* Navigation texts */}
        <View style={styles.navTexts}>
          <Text style={styles.stepIndicator}>Step 2 of 3</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LocationPermission')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main container */}
      <View style={[styles.mainContainer, { paddingBottom: insets.bottom + 24 }]}>
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
            style={[
              styles.optionButton,
              selected === 'buy' && styles.optionButtonSelected,
            ]}
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
            style={[
              styles.optionButton,
              selected === 'sell' && styles.optionButtonSelected,
            ]}
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
            style={[
              styles.optionButton,
              selected === 'looking' && styles.optionButtonSelected,
            ]}
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
            onPress={() => navigation.navigate('Preferences')}
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
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTexts: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepIndicator: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: '#0D0D0D',
  },
  skipText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: '#0039FF',
  },
  /* Main container */
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  /* Header */
  header: {
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Inter_28pt-semibold',
    fontSize: 35,
    lineHeight: 40,
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
  },
  /* Options container */
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    width: '100%',
    height: 80,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#F2F2F2',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  optionButtonSelected: {
    backgroundColor: '#FFFFFF',
  },
  iconFrame: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  optionText: {
    flex: 1,
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: '#000000',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#0039FF',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0039FF',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  continueButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    backgroundColor: '#0039FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0039FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});