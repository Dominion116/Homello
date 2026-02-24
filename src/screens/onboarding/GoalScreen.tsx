import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import OnboardingHeader from '../../components/OnboardingHeader';
import Button from '../../components/Button';

type GoalOption = 'buy' | 'sell' | 'looking';

interface OptionItem {
  id: GoalOption;
  label: string;
  icon: keyof typeof Feather.glyphMap;
}

const OPTIONS: OptionItem[] = [
  { id: 'buy',     label: 'Buy a house',   icon: 'home' },
  { id: 'sell',    label: 'Sell a house',  icon: 'tag' },
  { id: 'looking', label: 'Just looking',  icon: 'search' },
];

export default function GoalScreen({ navigation }: any) {
  const [selected, setSelected] = useState<GoalOption>('buy');

  return (
    <ScreenWrapper backgroundColor="#F5F5F5" statusBarBg="#FFFFFF" homeIndicatorBg="#F5F5F5">

      <OnboardingHeader
        step={2}
        totalSteps={3}
        onBack={() => navigation.goBack()}
        onSkip={() => navigation.navigate('LocationPermission')}
        showSkip
      />

      {/* Page content */}
      <View style={styles.content}>

        {/* Title block */}
        <View style={styles.titleBlock}>
          <Text style={styles.title}>What you wanna do?</Text>
          <Text style={styles.subtitle}>
            Choose your main objective. You can always do more later.
          </Text>
        </View>

        {/* Option cards */}
        <View style={styles.optionsList}>
          {OPTIONS.map((option) => {
            const isSelected = selected === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => setSelected(option.id)}
                activeOpacity={0.8}
              >
                {/* Icon container */}
                <View style={styles.iconContainer}>
                  <Feather
                    name={option.icon}
                    size={20}
                    color="#0D0D0D"
                  />
                </View>

                {/* Label */}
                <Text style={styles.optionLabel}>{option.label}</Text>

                {/* Radio button */}
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </View>

      {/* Continue button pinned to bottom */}
      <View style={styles.footer}>
        <Button
          label="Continue"
          onPress={() => navigation.navigate('LocationPermission')}
          variant="primary"
          style={{ alignItems: 'center' }}
        />
      </View>

    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 29,
    paddingTop: 32,
    gap: 24,
  },
  titleBlock: {
    gap: 6,
  },
  title: {
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: '#0D0D0D',
  },
  subtitle: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.32,
    color: '#0D0D0D',
    opacity: 0.5,
  },
  optionsList: {
    gap: 10,
  },
  optionCard: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: '#0039FF',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(13,13,13,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: {
    flex: 1,
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: '#0D0D0D',
    letterSpacing: -0.32,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: 'rgba(13,13,13,0.2)',
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
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 29,
    paddingBottom: 8,
  },
});