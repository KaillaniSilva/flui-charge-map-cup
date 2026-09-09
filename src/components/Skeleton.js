import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { useTheme } from '../theme';
import { useReduceMotion } from '../utils/useReduceMotion';

/**
 * Bloco de carregamento (shimmer). Motion design para estados de loading.
 * Com "Reduzir movimento", vira um bloco estatico com opacidade fixa.
 */
export default function Skeleton({ width = '100%', height = 16, radius = 8, style }) {
  const theme = useTheme();
  const reduceMotion = useReduceMotion();
  const base = { width, height, borderRadius: radius, backgroundColor: theme.surfaceMuted };

  if (reduceMotion) {
    return <View style={[base, { opacity: 0.6 }, style]} accessibilityElementsHidden />;
  }

  return (
    <MotiView
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[base, style]}
      from={{ opacity: 0.35 }}
      animate={{ opacity: 0.85 }}
      transition={{ loop: true, type: 'timing', duration: 850, repeatReverse: true }}
    />
  );
}
