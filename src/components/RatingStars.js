import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from './Text';
import { useTheme } from '../theme';

/**
 * Exibicao de nota (somente leitura).
 * O sistema de avaliacao funcional NAO faz parte desta etapa - aqui e so
 * apresentacao do dado simulado.
 */
export default function RatingStars({ value = 0, count, size = 14 }) {
  const theme = useTheme();
  const full = Math.floor(value);
  const half = value - full >= 0.5;

  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
      accessible
      accessibilityLabel={`Avaliacao ${value.toFixed(1)} de 5${count != null ? `, ${count} avaliacoes` : ''}`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const name = i < full ? 'star' : i === full && half ? 'star-half' : 'star-outline';
        return <Ionicons key={i} name={name} size={size} color={theme.statusBusy} />;
      })}
      <Text variant="caption" muted style={{ marginLeft: 2 }}>
        {value.toFixed(1)}
        {count != null ? ` (${count})` : ''}
      </Text>
    </View>
  );
}
