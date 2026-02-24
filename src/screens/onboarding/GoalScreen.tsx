import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GoalScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Navigation */}
      <View style={[styles.navigation, { paddingTop: insets.top + 8 }]}>

        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <View style={styles.chevronFrame}>
            <View style={styles.vector1} />
          </View>
        </TouchableOpacity>

        {/* Navigation texts */}
        <View style={styles.navTexts}>
          <Text style={styles.stepIndicator}>Step 2 of 3</Text>
          <Text style={styles.skipText}>Skip</Text>
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

  /* Navigation */
  navigation: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
},

  /* Back button */
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: '#000000',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronFrame: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vector1: {
    position: 'absolute',
    width: 6.25,
    height: 12.5,
    top: 3.75,
    left: 6.25,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: '#000000',
    transform: [{ rotate: '45deg' }],
  },

  /* Navigation texts */
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
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.32,
    textAlignVertical: 'center',
  },
  skipText: {
    width: 33,
    height: 19,
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.32,
    textAlign: 'center',
  },
});