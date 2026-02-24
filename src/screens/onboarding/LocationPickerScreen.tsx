import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LocationPermission({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  const locations = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Austin, TX',
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
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= SECOND CONTAINER ================= */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.contentWrapper}>
        <View style={styles.topSection}>
          <Text style={styles.title}>Where would you like to live?</Text>

          <View style={styles.listWrapper}>
            {/* Search/input Container */}
            <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
              <TextInput
                style={[styles.inputText, { flex: 1 }]}
                placeholder="Select a location i.e New York"
                placeholderTextColor="rgba(0,0,0,0.6)"
                value={searchText}
                onChangeText={setSearchText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                returnKeyType="done"
              />
              <TouchableOpacity style={styles.iconContainer} activeOpacity={0.8}>
                <Feather name="crosshair" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Location List */}
            {!isFocused && (
              <View style={styles.locationList}>
              {locations.map((loc, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.locationItem}
                  activeOpacity={0.7}
                >
                  <Feather name="map-pin" size={20} color="#000000" />
                  <Text style={styles.locationText}>{loc}</Text>
                  <Feather
                    name="chevron-right"
                    size={20}
                    color="rgba(0,0,0,0.4)"
                  />
                </TouchableOpacity>
              ))}
            </View>
            )}
          </View>
        </View>

        {/* BOTTOM IMAGE AREA */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/locationimage.png')}
            style={styles.bottomImage}
          />
          <LinearGradient
            colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0)']}
            locations={[0, 0.3, 1]}
            style={styles.insetShadow}
          />
        </View>
        </View>
      </KeyboardAvoidingView>
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
    color: '#0D0D0D',
  },
  skipText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 18,
    color: '#0039FF',
  },

  /* ===== CONTENT WRAPPER ===== */
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    paddingTop: 8,
    paddingHorizontal: 20,
    gap: 24,
  },
  title: {
    fontFamily: 'Inter_28pt-semibold',
    fontSize: 35,
    lineHeight: 48,
    letterSpacing: -0.32,
    color: '#000000',
  },
  listWrapper: {
    gap: 8,
  },
  inputContainer: {
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 10,
  },
  inputContainerFocused: {
    borderColor: '#0039FF',
  },
  inputText: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    color: '#000000',
    opacity: 0.6,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#0039FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationList: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 8,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.16,
    shadowRadius: 40,
    elevation: 8,
  },
  locationItem: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 12,
  },
  locationText: {
    flex: 1,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    color: '#000000',
  },
  imageContainer: {
    width: '100%',
    height: 261,
  },
  bottomImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  insetShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
});
