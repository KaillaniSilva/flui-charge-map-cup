import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from './Text';
import { useTheme } from '../theme';

/** Chip informativo de conector (label + tipo AC/DC + potencia). */
export default function ConnectorBadge({ charger }) {
  const theme = useTheme();
  const isDC = charger.kind === 'DC';
  const tint = isDC ? theme.accent : theme.brand;

  return (
    <View
      accessible
      accessibilityLabel={`${charger.connectorLabel}, ${charger.kind}, ${charger.powerKw} kilowatts, ${charger.available} de ${charger.count} disponiveis`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: theme.radius.md,
        backgroundColor: theme.surfaceMuted,
        borderWidth: 1,
        borderColor: theme.border,
      }}
    >
      <Ionicons name={isDC ? 'flash' : 'battery-charging'} size={18} color={tint} />
      <View style={{ flex: 1 }}>
        <Text variant="bodyStrong">{charger.connectorLabel}</Text>
        <Text variant="caption" muted>
          {charger.kind} - {charger.powerKw} kW - {charger.count} tomada(s)
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text variant="mono" style={{ color: charger.available > 0 ? theme.statusFree : theme.statusOffline }}>
          {charger.available}/{charger.count}
        </Text>
        <Text variant="caption" muted>
          R$ {charger.pricePerKwh.toFixed(2)}/kWh
        </Text>
      </View>
    </View>
  );
}
