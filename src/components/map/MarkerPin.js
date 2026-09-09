import React, { useEffect, useRef } from 'react';
import { Animated, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '../Text';
import { useTheme } from '../../theme';
import { pointSummary } from '../../data/chargingPoints';
import { useReduceMotion } from '../../utils/useReduceMotion';

const TONE = { free: 'statusFree', busy: 'statusBusy', offline: 'statusOffline' };

/**
 * Marcador do mapa. Marcadores diferenciados por:
 *  - cor = status (livre / ocupado / offline)
 *  - icone raio preenchido = ponto com carga rapida (DC)
 *  - selecionado = pulso animado + elevacao
 */
export default function MarkerPin({ point, selected, onPress }) {
  const theme = useTheme();
  const reduceMotion = useReduceMotion();
  const pulse = useRef(new Animated.Value(0)).current;
  const s = pointSummary(point);
  const color = theme[TONE[point.status] ?? 'statusOffline'];

  useEffect(() => {
    if (selected && !reduceMotion) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: true }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }
    pulse.setValue(0);
  }, [selected, reduceMotion, pulse]);

  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.6, 2.2] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] });

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      accessibilityLabel={`${point.name}. ${s.available} de ${s.totalGuns} tomadas livres. Ate ${s.maxKw} quilowatts.`}
      accessibilityHint="Seleciona o ponto e mostra o resumo"
      hitSlop={10}
      style={{ alignItems: 'center' }}
    >
      {selected && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 4,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: color,
            transform: [{ scale: ringScale }],
            opacity: ringOpacity,
          }}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingVertical: 5,
          paddingHorizontal: 9,
          borderRadius: 999,
          backgroundColor: selected ? color : theme.bgElevated,
          borderWidth: 2,
          borderColor: color,
          transform: [{ scale: selected ? 1.08 : 1 }],
          ...theme.shadow.card,
        }}
      >
        <Ionicons
          name={point.hasFastCharge ? 'flash' : 'battery-charging-outline'}
          size={14}
          color={selected ? theme.onBrand : color}
        />
        <Text
          variant="caption"
          style={{ color: selected ? theme.onBrand : theme.text, fontWeight: '700' }}
        >
          {s.maxKw}kW
        </Text>
      </View>
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: 5,
          borderRightWidth: 5,
          borderTopWidth: 7,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: color,
          marginTop: -1,
        }}
      />
    </Pressable>
  );
}
