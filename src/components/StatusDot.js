import React from 'react';
import { View } from 'react-native';
import Text from './Text';
import { useTheme } from '../theme';
import { STATUS_META } from '../data/chargingPoints';

/** Indicador de status do ponto (cor + rotulo textual, nao so cor -> acessivel). */
export default function StatusDot({ status, showLabel = true, size = 10 }) {
  const theme = useTheme();
  const meta = STATUS_META[status] ?? STATUS_META.offline;
  const tone = theme[meta.tone];

  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
      accessible
      accessibilityLabel={`Status: ${meta.label}`}
    >
      <View style={{ width: size, height: size, borderRadius: size, backgroundColor: tone }} />
      {showLabel && (
        <Text variant="label" style={{ color: tone }}>
          {meta.label}
        </Text>
      )}
    </View>
  );
}
