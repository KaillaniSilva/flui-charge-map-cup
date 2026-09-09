import React, { useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { useReduceMotion } from '../utils/useReduceMotion';

/**
 * Pressable com feedback de escala (motion design + feedback tatil visual).
 * Respeita "Reduzir movimento": quando ativo, nao anima a escala.
 * Garante area de toque minima de 44x44 via hitSlop quando necessario.
 */
export default function AnimatedPressable({
  children,
  style,
  onPress,
  scaleTo = 0.96,
  disabled,
  hitSlop = 8,
  ...rest
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const reduceMotion = useReduceMotion();

  const animate = (to) => {
    if (reduceMotion) return;
    Animated.spring(scale, {
      toValue: to,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  return (
    <Pressable
      onPressIn={() => animate(scaleTo)}
      onPressOut={() => animate(1)}
      onPress={onPress}
      disabled={disabled}
      hitSlop={hitSlop}
      {...rest}
    >
      <Animated.View style={[style, { transform: [{ scale }], opacity: disabled ? 0.5 : 1 }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
