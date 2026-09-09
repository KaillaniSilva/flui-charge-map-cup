import React from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '../theme';

/**
 * Texto do design system.
 * - variant mapeia para a escala tipografica.
 * - allowFontScaling permanece LIGADO (acessibilidade: respeita o tamanho
 *   de fonte do sistema). maxFontSizeMultiplier evita quebras extremas.
 */
export default function Text({
  variant = 'body',
  color,
  muted,
  center,
  style,
  children,
  heading,
  ...rest
}) {
  const theme = useTheme();
  const base = theme.type[variant] ?? theme.type.body;
  const resolvedColor = color ?? (muted ? theme.textMuted : theme.text);

  return (
    <RNText
      allowFontScaling
      maxFontSizeMultiplier={2}
      accessibilityRole={heading ? 'header' : undefined}
      style={[base, { color: resolvedColor }, center && { textAlign: 'center' }, style]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
