import React, { useEffect } from 'react';
import { Modal, View, ScrollView, Pressable, AccessibilityInfo } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import Text from './Text';
import FilterChip from './FilterChip';
import AnimatedPressable from './AnimatedPressable';
import { useTheme } from '../theme';
import { useFilters } from '../context/FiltersContext';
import { useReduceMotion } from '../utils/useReduceMotion';
import {
  CONNECTOR_OPTIONS,
  POWER_OPTIONS,
  AMENITY_OPTIONS,
  HOURS_OPTIONS,
  countActiveFilters,
} from '../data/filters';

/**
 * Bottom sheet de filtros (Etapa 2 - filtros funcionais + motion design).
 * Anima com mola (spring) na entrada/saida; sem animacao com "Reduzir movimento".
 * Ao aplicar, anuncia a quantidade de resultados para leitores de tela.
 */
export default function FilterSheet({ visible, onClose, resultCount }) {
  const theme = useTheme();
  const reduceMotion = useReduceMotion();
  const { filters, dispatch } = useFilters();

  useEffect(() => {
    if (visible) {
      AccessibilityInfo.announceForAccessibility?.('Filtros abertos');
    }
  }, [visible]);

  const Section = ({ title, children }) => (
    <View style={{ gap: 10, marginBottom: 22 }}>
      <Text variant="label" muted heading>
        {title.toUpperCase()}
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{children}</View>
    </View>
  );

  const active = countActiveFilters(filters);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: theme.overlay }}>
        <Pressable
          style={{ flex: 1 }}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Fechar filtros"
        />

        <AnimatePresence>
          {visible && (
            <MotiView
              key="sheet"
              from={reduceMotion ? { translateY: 0 } : { translateY: 600 }}
              animate={{ translateY: 0 }}
              exit={reduceMotion ? { translateY: 0 } : { translateY: 600 }}
              transition={{ type: 'spring', damping: 18, stiffness: 180 }}
              style={{
                backgroundColor: theme.bgElevated,
                borderTopLeftRadius: theme.radius.xl,
                borderTopRightRadius: theme.radius.xl,
                paddingHorizontal: theme.spacing(5),
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(8),
                maxHeight: '86%',
                ...theme.shadow.sheet,
              }}
            >
              <View style={{ alignItems: 'center', marginBottom: 12 }}>
                <View style={{ width: 44, height: 5, borderRadius: 3, backgroundColor: theme.border }} />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 18,
                }}
              >
                <Text variant="title" heading>
                  Filtros
                </Text>
                <AnimatedPressable
                  onPress={onClose}
                  accessibilityRole="button"
                  accessibilityLabel="Fechar"
                  style={{ padding: 8 }}
                >
                  <Ionicons name="close" size={24} color={theme.text} />
                </AnimatedPressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Section title="Tipo de conector">
                  {CONNECTOR_OPTIONS.map((o) => (
                    <FilterChip
                      key={o.id}
                      label={o.label}
                      selected={filters.connectors.includes(o.id)}
                      onPress={() => dispatch({ type: 'toggleConnector', id: o.id })}
                    />
                  ))}
                </Section>

                <Section title="Potencia minima">
                  {POWER_OPTIONS.map((o) => (
                    <FilterChip
                      key={o.id}
                      label={o.label}
                      selected={filters.power === o.id}
                      onPress={() => dispatch({ type: 'setPower', id: o.id })}
                    />
                  ))}
                </Section>

                <Section title="Comodidades proximas">
                  {AMENITY_OPTIONS.map((o) => (
                    <FilterChip
                      key={o.id}
                      icon={`${o.icon}-outline`}
                      label={o.label}
                      selected={filters.amenities.includes(o.id)}
                      onPress={() => dispatch({ type: 'toggleAmenity', id: o.id })}
                    />
                  ))}
                </Section>

                <Section title="Horario de funcionamento">
                  {HOURS_OPTIONS.map((o) => (
                    <FilterChip
                      key={o.id}
                      label={o.label}
                      selected={filters.hours === o.id}
                      onPress={() => dispatch({ type: 'setHours', id: o.id })}
                    />
                  ))}
                </Section>

                <Section title="Disponibilidade">
                  <FilterChip
                    icon="flash-outline"
                    label="Somente com tomada livre"
                    selected={filters.onlyAvailable}
                    onPress={() => dispatch({ type: 'toggleOnlyAvailable' })}
                  />
                </Section>
              </ScrollView>

              <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
                <AnimatedPressable
                  onPress={() => dispatch({ type: 'resetAll' })}
                  disabled={active === 0}
                  accessibilityRole="button"
                  accessibilityLabel="Limpar filtros"
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    borderRadius: theme.radius.pill,
                    borderWidth: 1.5,
                    borderColor: theme.border,
                    alignItems: 'center',
                  }}
                >
                  <Text variant="bodyStrong">Limpar</Text>
                </AnimatedPressable>

                <AnimatedPressable
                  onPress={() => {
                    AccessibilityInfo.announceForAccessibility?.(
                      `${resultCount} pontos encontrados`
                    );
                    onClose();
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={`Ver ${resultCount} resultados`}
                  style={{
                    flex: 1,
                    paddingVertical: 15,
                    borderRadius: theme.radius.pill,
                    backgroundColor: theme.brand,
                    alignItems: 'center',
                  }}
                >
                  <Text variant="bodyStrong" style={{ color: theme.onBrand }}>
                    Ver {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
                  </Text>
                </AnimatedPressable>
              </View>
            </MotiView>
          )}
        </AnimatePresence>
      </View>
    </Modal>
  );
}
