import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

interface ScreenWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarStyle?: 'dark-content' | 'light-content';
  statusBarBg?: string;
  homeIndicatorBg?: string;
}

/**
 * ScreenWrapper — wraps every screen with:
 *  • A fixed status bar zone (width: 393, height: 60) at the top
 *  • A fixed home indicator zone (width: 390, height: 21) at the bottom
 */
const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  backgroundColor = '#FFFFFF',
  statusBarStyle = 'dark-content',
  statusBarBg = '#FFFFFF',
  homeIndicatorBg = '#FFFFFF',
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBg}
        translucent={false}
      />

      {/* Fixed Status Bar Area */}
      <View style={[styles.statusBar, { backgroundColor: statusBarBg }]} />

      {/* Screen Content */}
      <View style={styles.content}>{children}</View>

      {/* Fixed Home Indicator Area */}
      <View style={[styles.homeIndicator, { backgroundColor: homeIndicatorBg }]}>
        <View style={styles.homeIndicatorPill} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    width: 393,
    height: 60,
    alignSelf: 'center',
    opacity: 1,
  },
  content: {
    flex: 1,
  },
  homeIndicator: {
    width: 390,
    height: 21,
    alignSelf: 'center',
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 1.5,
  },
  homeIndicatorPill: {
    width: 134,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#1A1D26',
    opacity: 0.2,
  },
});

export default ScreenWrapper;
