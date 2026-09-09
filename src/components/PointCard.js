import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import Text from './Text';
import StatusDot from './StatusDot';
import RatingStars from './RatingStars';
import AnimatedPressable from './AnimatedPressable';
import { useTheme } from '../theme';
import { pointSummary } from '../data/chargingPoints';
import { useReduceMotion } from '../utils/useReduceMotion';

/**
 * Card de ponto de recarga usado nas listas (busca e preview do mapa).
 * Entra na tela com fade + slide escalonado (motion design); estatico
 * quando "Reduzir movimento" esta ativo.
 */
export default function PointCard({ point, index = 0, onPress, compact = false }) {
  const theme = useTheme();
  const reduceMotion = useReduceMotion();
  const s = pointSummary(point);

  return (
    <MotiView
      from={reduceMotion ? undefined : { opacity: 0, translateY: 14 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 320, delay: reduceMotion ? 0 : index * 60 }}
    >
      <AnimatedPressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${point.name}, ${point.neighborhood}. ${s.available} tomadas livres de ${s.totalGuns}. Ate ${s.maxKw} kilowatts. Avaliacao ${point.rating}. A ${point.distanceKm} quilometros.`}
        accessibilityHint="Abre a ficha completa do ponto"
        style={{
          flexDirection: 'row',
          gap: 14,
          padding: 14,
          borderRadius: theme.radius.lg,
          backgroundColor: theme.surface,
          borderWidth: 1,
          borderColor: theme.border,
          ...theme.shadow.card,
        }}
      >
        <View
          style={{
            width: compact ? 44 : 54,
            height: compact ? 44 : 54,
            borderRadius: theme.radius.md,
            backgroundColor: point.hasFastCharge ? theme.accent : theme.brand,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name={point.hasFastCharge ? 'flash' : 'battery-charging'} size={24} color={theme.onBrand} />
        </View>

        <View style={{ flex: 1, gap: 4 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
            <Text variant="headline" numberOfLines={1} style={{ flex: 1 }}>
              {point.name}
            </Text>
            <Text variant="label" muted>
              {point.distanceKm.toFixed(1)} km
            </Text>
          </View>

          <Text variant="caption" muted numberOfLines={1}>
            {point.operator} - {point.address}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4, flexWrap: 'wrap' }}>
            <StatusDot status={point.status} />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="flash-outline" size={13} color={theme.textMuted} />
              <Text variant="caption" muted>
                ate {s.maxKw} kW
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="power-outline" size={13} color={theme.textMuted} />
              <Text variant="caption" muted>
                {s.available}/{s.totalGuns} livres
              </Text>
            </View>
          </View>

          {!compact && (
            <View style={{ marginTop: 4 }}>
              <RatingStars value={point.rating} count={point.reviewsCount} />
            </View>
          )}
        </View>
      </AnimatedPressable>
    </MotiView>
  );
}
