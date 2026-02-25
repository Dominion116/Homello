import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const propertyTypes = [
  'Single Family',
  'Condo',
  'Townhouse',
  'Multi-Family',
  'Lot/Land',
];

const propertyImages: Record<string, any> = {
  'Single Family': require('../../../assets/images/singlefamily.png'),
  'Condo': require('../../../assets/images/condo.png'),
  'Townhouse': require('../../../assets/images/Townhouse.png'),
  'Multi-Family': require('../../../assets/images/multi-family.png'),
  'Lot/Land': require('../../../assets/images/lot-land.png'),
};

export default function PreferenceScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ================= HEADER ================= */}
      <View style={[styles.navigation, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={20} color="#0D0D0D" />
        </TouchableOpacity>

        <View style={styles.navTexts}>
          <Text style={styles.stepIndicator}>Step 2 of 3</Text>
          <Text style={styles.skipText}>Skip</Text>
        </View>
      </View>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 123 }}
      >
        <View style={{ paddingTop: 20, paddingHorizontal: 24, gap: 32 }}>
          {/* Description */}
          <Text style={styles.description}>
            Tell us a little more about what you're looking for.
          </Text>

          <View style={{ gap: 24 }}>
            {/* ============ PRICE RANGE ============ */}
            <View style={{ gap: 16 }}>
              <Text style={styles.sectionTitle}>Price range</Text>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity style={styles.dropdownButton}>
                  <Text style={styles.dropdownText}>Minimum</Text>
                  <Feather name="chevron-down" size={18} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.dropdownButton}>
                  <Text style={styles.dropdownText}>Maximum</Text>
                  <Feather name="chevron-down" size={18} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* ============ PROPERTY TYPE ============ */}
            <View style={{ gap: 16 }}>
              <Text style={styles.sectionTitle}>Property type</Text>

              {[0, 2, 4].map((index) => (
                <View key={index} style={{ flexDirection: 'row', gap: 10 }}>
                  {propertyTypes.slice(index, index + 2).map((type) => {
                    const selected = selectedType === type;
                    const isAlone = propertyTypes.slice(index, index + 2).length === 1;

                    return (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.propertyButton,
                          selected && styles.propertySelected,
                          isAlone && { flex: 0, width: '48%' },
                        ]}
                        onPress={() => setSelectedType(type)}
                        activeOpacity={0.85}
                      >
                        <View style={styles.propertyInner}>
                          <Image
                            source={propertyImages[type]}
                            style={{ width: '100%', height: 74, borderRadius: 4 }}
                            resizeMode="cover"
                          />
                          <Text
                            style={[
                              styles.propertyText,
                              selected && { opacity: 1, color: '#FFFFFF' },
                            ]}
                          >
                            {type}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
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
          onPress={() => navigation.navigate('LocationPicker')}
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
    letterSpacing: -0.32,
  },
  skipText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 18,
    color: '#0039FF',
  },

  /* ===== DESCRIPTION ===== */
  description: {
    fontFamily: 'Inter_28pt-semibold',
    fontSize: 35,
    lineHeight: 38,
    letterSpacing: -0.32,
    color: '#000',
  },

  sectionTitle: {
    fontFamily: 'Inter_18pt-semibold',
    fontSize: 16,
    letterSpacing: -0.32,
    color: '#000',
  },

  /* ===== PRICE BUTTONS ===== */
  dropdownButton: {
    flex: 1,
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0000001A',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },

  dropdownText: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 1)',
  },

  /* ===== PROPERTY ===== */
  propertyButton: {
    flex: 1,
    height: 136,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0000001A',
    padding: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  propertySelected: {
    backgroundColor: '#000000',
    borderWidth: 0,
  },

  propertyInner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  propertyText: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.6,
    color: '#000',
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  continueText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    letterSpacing: -0.32,
    color: '#FFFFFF',
  },
});