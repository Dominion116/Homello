// src/theme/typography.ts
export const fonts = {
  regular: 'Inter_18pt-Regular',
  medium: 'Inter_18pt-Medium',
  semiBold: 'Inter_18pt-SemiBold',
  bold: 'Inter_18pt-Bold',
};

export const fontSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 22,
  xxl: 28,
  display: 40,
};

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

export const lineHeights = {
  tight: 1.0,  
  normal: 1.4,
  relaxed: 1.6,
};

export const letterSpacing = {
  tight: -0.4,   
  normal: 0,
  wide: 0.5,
};