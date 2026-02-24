import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface OnboardingHeaderProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onSkip?: () => void;
  showSkip?: boolean;
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  step,
  totalSteps,
  onBack,
  onSkip,
  showSkip = true,
}) => {
  return (
    <View style={styles.headerContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      {/* Status bar zone */}
      <View style={styles.statusBarZone} />

      {/* Navigation row */}
      <View style={styles.navRow}>
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Feather name="chevron-left" size={20} color="#0D0D0D" />
        </TouchableOpacity>

        {/* Step label */}
        <Text style={styles.stepLabel}>
          Step {step} of {totalSteps}
        </Text>

        {/* Skip button */}
        {showSkip && onSkip ? (
          <TouchableOpacity onPress={onSkip} activeOpacity={0.7}>
            <Text style={styles.skipLabel}>Skip</Text>
          </TouchableOpacity>
        ) : (
          /* Spacer to keep step label centered when skip is hidden */
          <View style={styles.skipSpacer} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: 393,
    height: 132,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  statusBarZone: {
    width: 393,
    height: 60,
  },
  navRow: {
    width: 393,
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(13,13,13,0.08)',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(13,13,13,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: '#0D0D0D',
    letterSpacing: -0.32,
  },
  skipLabel: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: '#0039FF',
    letterSpacing: -0.32,
  },
  skipSpacer: {
    width: 36,
  },
});

export default OnboardingHeader;