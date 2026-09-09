import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from './Text';
import AnimatedPressable from './AnimatedPressable';
import { useTheme } from '../theme';

/**
 * Chip selecionavel usado nos filtros de busca.
 * Acessibilidade: accessibilityRole "button" + accessibilityState.selected,
 * para que leitores de tela anunciem "selecionado".
 */
export default function FilterChip({ label, selected, onPress, icon }) {
  const theme = useTheme();
  return (
    <AnimatedPressable
      onPress={onPress}
      scaleTo={0.94}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      accessibilityLabel={label}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 9,
        paddingHorizontal: 14,
        minHeight: 40,
        borderRadius: theme.radius.pill,
        backgroundColor: selected ? theme.brand : theme.surface,
        borderWidth: 1.5,
        borderColor: selected ? theme.brand : theme.border,
      }}
    >
      {icon && (
        <Ionicons
          name={selected ? icon.replace('-outline', '') : icon}
          size={15}
          color={selected ? theme.onBrand : theme.textMuted}
        />
      )}
      <Text
        variant="label"
        style={{ color: selected ? theme.onBrand : theme.text }}
      >
        {label}
      </Text>
      {selected && <Ionicons name="checkmark" size={15} color={theme.onBrand} />}
    </AnimatedPressable>
  );
}
