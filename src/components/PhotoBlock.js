import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

/**
 * "Foto" simulada do ponto de recarga (sem depender de rede).
 * Gradiente diagonal com a dupla de cores definida no dado simulado.
 */
export default function PhotoBlock({ colors = ['#0BA87A', '#052E23'], height = 200, icon = 'flash', style }) {
  const [a, b] = colors;
  return (
    <View style={[{ height, width: '100%', overflow: 'hidden' }, style]}>
      <Svg width="100%" height="100%">
        <Defs>
          <LinearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={a} />
            <Stop offset="1" stopColor={b} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#g)" />
        <Circle cx="82%" cy="26%" r="60" fill="#ffffff" opacity={0.08} />
        <Circle cx="20%" cy="88%" r="90" fill="#ffffff" opacity={0.06} />
      </Svg>
      <View style={[StyleSheet.absoluteFillObject, { alignItems: 'center', justifyContent: 'center' }]}>
        <Ionicons name={icon} size={44} color="rgba(255,255,255,0.35)" />
      </View>
    </View>
  );
}
