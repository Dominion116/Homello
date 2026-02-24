import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default function PreferencesScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ================= FIXED HEADER ================= */}
      <View style={[styles.navigation, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={20} color="#0D0D0D" />
        </TouchableOpacity>

        <View style={styles.navTexts}>
          <Text style={styles.stepIndicator}>Step 3 of 3</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Tell us a little more about what you’re looking for.
        </Text>

        <Text style={styles.sectionLabel}>Price range</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputBox}>
            <Text style={styles.inputPlaceholder}>Minimum</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputPlaceholder}>Maximum</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Property type</Text>
        <View style={styles.propertyGrid}>
          <View style={styles.propertyCard}>
            <Text>Single Family</Text>
          </View>
          <View style={[styles.propertyCard, styles.propertySelected]}>
            <Text style={{ color: '#FFFFFF' }}>Condo</Text>
          </View>
          <View style={styles.propertyCard}>
            <Text>Townhouse</Text>
          </View>
          <View style={styles.propertyCard}>
            <Text>Multi-Family</Text>
          </View>
        </View>
      </ScrollView>

      {/* ================= FIXED BOTTOM ================= */}
      <View
        style={[
          styles.bottomContainer,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.9}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* ===== HEADER ===== */
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepIndicator: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: -0.32,
  },
  skipText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: -0.32,
    color: '#0039FF',
  },

  /* ===== CONTENT ===== */
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Inter_28pt-semibold',
    fontSize: 28,
    lineHeight: 32,
    marginBottom: 24,
  },
  sectionLabel: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    marginBottom: 12,
    marginTop: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputBox: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  inputPlaceholder: {
    opacity: 0.6,
  },

  propertyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  propertyCard: {
    width: '48%',
    height: 80,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  propertySelected: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },

  /* ===== FIXED BOTTOM ===== */
  bottomContainer: {
    width: '100%',
    height: 121,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
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
    color: '#FFFFFF',
  },
});