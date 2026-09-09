import React, { useEffect, useMemo, useState } from 'react';
import { View, AccessibilityInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MotiView, AnimatePresence } from 'moti';
import { Ionicons } from '@expo/vector-icons';

import Text from '../components/Text';
import AnimatedPressable from '../components/AnimatedPressable';
import MapContainer from '../components/map/MapContainer';
import PointCard from '../components/PointCard';
import FilterSheet from '../components/FilterSheet';
import Skeleton from '../components/Skeleton';
import { useTheme } from '../theme';
import { useFilters } from '../context/FiltersContext';
import { CHARGING_POINTS } from '../data/chargingPoints';
import { applyFilters, countActiveFilters } from '../data/filters';
import { FAKE_LOADING_MS } from '../config';
import { useReduceMotion } from '../utils/useReduceMotion';

const LEGEND = [
  { tone: 'statusFree', label: 'Disponivel' },
  { tone: 'statusBusy', label: 'Ocupado' },
  { tone: 'statusOffline', label: 'Fora de servico' },
];

export default function MapScreen({ navigation }) {
  const theme = useTheme();
  const reduceMotion = useReduceMotion();
  const { filters } = useFilters();
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const results = useMemo(() => applyFilters(CHARGING_POINTS, filters), [filters]);
  const activeCount = countActiveFilters(filters);
  const selected = results.find((p) => p.id === selectedId);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), FAKE_LOADING_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loading) {
      AccessibilityInfo.announceForAccessibility?.(
        `${results.length} pontos de recarga no mapa`
      );
    }
  }, [results.length, loading]);

  useEffect(() => {
    if (selectedId && !results.some((p) => p.id === selectedId)) setSelectedId(null);
  }, [results, selectedId]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />

      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={{ flex: 1, padding: 20, gap: 12, backgroundColor: theme.surfaceMuted }}>
            <Skeleton height={180} radius={16} />
            <Skeleton height={70} radius={14} />
            <Skeleton height={70} radius={14} />
            <Skeleton width="60%" height={70} radius={14} />
          </View>
        ) : (
          <MapContainer points={results} selectedId={selectedId} onSelect={setSelectedId} />
        )}
      </View>

      {/* Barra superior: busca + filtro */}
      <SafeAreaView edges={['top']} style={{ position: 'absolute', left: 0, right: 0, top: 0 }}>
        <View style={{ paddingHorizontal: 16, paddingTop: 8, flexDirection: 'row', gap: 10 }}>
          <AnimatedPressable
            onPress={() => navigation.navigate('Buscar')}
            accessibilityRole="button"
            accessibilityLabel="Abrir busca de pontos de recarga"
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              height: 48,
              paddingHorizontal: 16,
              borderRadius: theme.radius.pill,
              backgroundColor: theme.bgElevated,
              borderWidth: 1,
              borderColor: theme.border,
              ...theme.shadow.card,
            }}
          >
            <Ionicons name="search" size={18} color={theme.textMuted} />
            <Text variant="body" muted>
              Buscar endereco, bairro ou rede
            </Text>
          </AnimatedPressable>

          <AnimatedPressable
            onPress={() => setSheetOpen(true)}
            accessibilityRole="button"
            accessibilityLabel={`Filtros${activeCount ? `, ${activeCount} ativos` : ''}`}
            style={{
              width: 48,
              height: 48,
              borderRadius: theme.radius.pill,
              backgroundColor: activeCount ? theme.brand : theme.bgElevated,
              borderWidth: 1,
              borderColor: activeCount ? theme.brand : theme.border,
              alignItems: 'center',
              justifyContent: 'center',
              ...theme.shadow.card,
            }}
          >
            <Ionicons
              name="options-outline"
              size={20}
              color={activeCount ? theme.onBrand : theme.text}
            />
            {activeCount > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: -2,
                  right: -2,
                  minWidth: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor: theme.accent,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 4,
                }}
              >
                <Text variant="caption" style={{ color: '#fff', fontWeight: '800' }}>
                  {activeCount}
                </Text>
              </View>
            )}
          </AnimatedPressable>
        </View>

        {/* Legenda dos marcadores */}
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 16,
            flexDirection: 'row',
            gap: 14,
            alignSelf: 'flex-start',
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: theme.radius.md,
            backgroundColor: theme.bgElevated,
            borderWidth: 1,
            borderColor: theme.border,
          }}
          accessibilityLabel="Legenda: verde disponivel, amarelo ocupado, cinza fora de servico"
        >
          {LEGEND.map((l) => (
            <View key={l.tone} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View style={{ width: 9, height: 9, borderRadius: 9, backgroundColor: theme[l.tone] }} />
              <Text variant="caption" muted>
                {l.label}
              </Text>
            </View>
          ))}
        </View>
      </SafeAreaView>

      {/* Card do ponto selecionado */}
      <AnimatePresence>
        {selected && (
          <MotiView
            key={selected.id}
            from={reduceMotion ? { opacity: 1 } : { opacity: 0, translateY: 120 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, translateY: 120 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
          >
            <SafeAreaView edges={['bottom']} style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
              <PointCard
                point={selected}
                onPress={() => navigation.navigate('PointDetail', { id: selected.id })}
              />
            </SafeAreaView>
          </MotiView>
        )}
      </AnimatePresence>

      <FilterSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        resultCount={results.length}
      />
    </View>
  );
}
