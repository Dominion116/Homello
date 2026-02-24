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

export default function PreferenceScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const propertyTypes = [
    'Single Family',
    'Condo',
    'Townhouse',
    'Multi-Family',
    'Villa',
    'Apartment',
  ];

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
          <Text style={styles.stepIndicator}>Step 3 of 3</Text>
          <Text style={styles.skipText}>Skip</Text>
        </View>
      </View>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 140,
          paddingRight: 20,
          paddingBottom: 123,
          paddingLeft: 20,
          gap: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <Text style={styles.description}>
          Tell us a little more about what you’re looking for.
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

                  return (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.propertyButton,
                        selected && styles.propertySelected,
                      ]}
                      onPress={() => setSelectedType(type)}
                      activeOpacity={0.85}
                    >
                      <View style={styles.propertyInner}>
                        <Image
                          source={require('../../../assets/images/singlefamily.png')}
                          style={{ width: 64, height: 64 }}
                          resizeMode="contain"
                        />
                        <Text
                          style={[
                            styles.propertyText,
                            selected && { opacity: 1, color: '#0039FF' },
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
    letterSpacing: -0.32,
  },
  skipText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 18,
    color: '#0039FF',
  },

  /* ===== DESCRIPTION ===== */
  description: {
    width: 353,
    fontFamily: 'Inter_28pt-semibold',
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.32,
    color: '#000',
  },

  sectionTitle: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    letterSpacing: -0.32,
    color: '#000',
  },

  /* ===== PRICE BUTTONS ===== */
  dropdownButton: {
    width: 171.5,
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
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
  },

  /* ===== PROPERTY ===== */
  propertyButton: {
    width: 171.5,
    height: 136,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0000001A',
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 4,
    paddingLeft: 16,
    backgroundColor: '#FFFFFF',
  },

  propertySelected: {
    borderColor: '#0039FF',
    backgroundColor: '#F5F8FF',
  },

  propertyInner: {
    width: 139.5,
    height: 74,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
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