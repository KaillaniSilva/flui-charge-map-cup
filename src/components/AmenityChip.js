import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from './Text';
import { useTheme } from '../theme';
import { AMENITY_OPTIONS } from '../data/filters';

const META = Object.fromEntries(AMENITY_OPTIONS.map((a) => [a.id, a]));

/** Chip de comodidade (icone + rotulo). Usado na ficha do ponto. */
export default function AmenityChip({ id }) {
  const theme = useTheme();
  const meta = META[id] ?? { label: id, icon: 'ellipse' };
  return (
    <View
      accessible
      accessibilityLabel={`Comodidade: ${meta.label}`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: theme.radius.pill,
        backgroundColor: theme.surfaceMuted,
        borderWidth: 1,
        borderColor: theme.border,
      }}
    >
      <Ionicons name={`${meta.icon}-outline`} size={15} color={theme.brand} />
      <Text variant="label">{meta.label}</Text>
    </View>
  );
}
