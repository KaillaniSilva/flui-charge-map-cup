import React, { useEffect, useMemo, useState } from 'react';
import { View, TextInput, FlatList, AccessibilityInfo, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';

import Text from '../components/Text';
import AnimatedPressable from '../components/AnimatedPressable';
import PointCard from '../components/PointCard';
import FilterChip from '../components/FilterChip';
import FilterSheet from '../components/FilterSheet';
import Skeleton from '../components/Skeleton';
import { useTheme } from '../theme';
import { useFilters } from '../context/FiltersContext';
import { CHARGING_POINTS } from '../data/chargingPoints';
import { applyFilters, countActiveFilters } from '../data/filters';
import { FAKE_LOADING_MS } from '../config';

// Filtros rapidos exibidos como chips fixos acima da lista.
const QUICK = [
  { kind: 'available', label: 'Livre agora', icon: 'flash-outline' },
  { kind: 'connector', id: 'ccs2', label: 'CCS2', icon: 'flash-outline' },
  { kind: 'connector', id: 'type2', label: 'Type 2', icon: 'battery-charging-outline' },
  { kind: 'hours', id: 'h24', label: '24h', icon: 'time-outline' },
];

export default function SearchScreen({ navigation }) {
  const theme = useTheme();
  const { filters, dispatch } = useFilters();
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  const results = useMemo(() => applyFilters(CHARGING_POINTS, filters), [filters]);
  const activeCount = countActiveFilters(filters);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), FAKE_LOADING_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loading) {
      AccessibilityInfo.announceForAccessibility?.(
        `${results.length} ${results.length === 1 ? 'ponto encontrado' : 'pontos encontrados'}`
      );
    }
  }, [results.length, loading]);

  const isQuickOn = (q) => {
    if (q.kind === 'available') return filters.onlyAvailable;
    if (q.kind === 'connector') return filters.connectors.includes(q.id);
    if (q.kind === 'hours') return filters.hours === q.id;
    return false;
  };
  const toggleQuick = (q) => {
    if (q.kind === 'available') dispatch({ type: 'toggleOnlyAvailable' });
    else if (q.kind === 'connector') dispatch({ type: 'toggleConnector', id: q.id });
    else if (q.kind === 'hours')
      dispatch({ type: 'setHours', id: filters.hours === q.id ? 'any' : q.id });
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />

      <View style={{ paddingHorizontal: 16, paddingTop: 6, gap: 14 }}>
        <Text variant="title" heading>
          Buscar pontos
        </Text>

        {/* Campo de busca */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              height: 50,
              paddingHorizontal: 16,
              borderRadius: theme.radius.pill,
              backgroundColor: theme.surface,
              borderWidth: 1.5,
              borderColor: theme.border,
            }}
          >
            <Ionicons name="search" size={18} color={theme.textMuted} />
            <TextInput
              value={filters.query}
              onChangeText={(v) => dispatch({ type: 'setQuery', value: v })}
              placeholder="Endereco, bairro ou rede"
              placeholderTextColor={theme.textMuted}
              style={{ flex: 1, color: theme.text, fontSize: 15 }}
              returnKeyType="search"
              onSubmitEditing={() => Keyboard.dismiss()}
              accessibilityLabel="Campo de busca por endereco, bairro ou rede"
              clearButtonMode="while-editing"
            />
            {filters.query.length > 0 && (
              <AnimatedPressable
                onPress={() => dispatch({ type: 'setQuery', value: '' })}
                accessibilityRole="button"
                accessibilityLabel="Limpar busca"
                style={{ padding: 4 }}
              >
                <Ionicons name="close-circle" size={18} color={theme.textMuted} />
              </AnimatedPressable>
            )}
          </View>

          <AnimatedPressable
            onPress={() => setSheetOpen(true)}
            accessibilityRole="button"
            accessibilityLabel={`Abrir filtros${activeCount ? `, ${activeCount} ativos` : ''}`}
            style={{
              width: 50,
              height: 50,
              borderRadius: theme.radius.pill,
              backgroundColor: activeCount ? theme.brand : theme.surface,
              borderWidth: 1.5,
              borderColor: activeCount ? theme.brand : theme.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons
              name="options-outline"
              size={20}
              color={activeCount ? theme.onBrand : theme.text}
            />
          </AnimatedPressable>
        </View>

        {/* Filtros rapidos */}
        <FlatList
          horizontal
          data={QUICK}
          keyExtractor={(q) => q.kind + (q.id ?? '')}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingRight: 16 }}
          renderItem={({ item }) => (
            <FilterChip
              label={item.label}
              icon={item.icon}
              selected={isQuickOn(item)}
              onPress={() => toggleQuick(item)}
            />
          )}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="label" muted heading>
            {results.length} {results.length === 1 ? 'RESULTADO' : 'RESULTADOS'}
          </Text>
          {activeCount > 0 && (
            <AnimatedPressable
              onPress={() => dispatch({ type: 'resetAll' })}
              accessibilityRole="button"
              accessibilityLabel="Limpar todos os filtros"
            >
              <Text variant="label" style={{ color: theme.brand }}>
                Limpar filtros
              </Text>
            </AnimatedPressable>
          )}
        </View>
      </View>

      {loading ? (
        <View style={{ padding: 16, gap: 12 }}>
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} height={104} radius={20} />
          ))}
        </View>
      ) : results.length === 0 ? (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ alignItems: 'center', padding: 40, gap: 12, marginTop: 20 }}
        >
          <Ionicons name="sad-outline" size={44} color={theme.textMuted} />
          <Text variant="headline" center>
            Nenhum ponto com esses filtros
          </Text>
          <Text variant="body" muted center>
            Tente remover algum filtro ou ampliar a potencia minima.
          </Text>
          <AnimatedPressable
            onPress={() => dispatch({ type: 'resetAll' })}
            accessibilityRole="button"
            accessibilityLabel="Limpar filtros"
            style={{
              marginTop: 8,
              paddingVertical: 12,
              paddingHorizontal: 22,
              borderRadius: theme.radius.pill,
              backgroundColor: theme.brand,
            }}
          >
            <Text variant="bodyStrong" style={{ color: theme.onBrand }}>
              Limpar filtros
            </Text>
          </AnimatedPressable>
        </MotiView>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item, index }) => (
            <PointCard
              point={item}
              index={index}
              onPress={() => navigation.navigate('PointDetail', { id: item.id })}
            />
          )}
        />
      )}

      <FilterSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        resultCount={results.length}
      />
    </SafeAreaView>
  );
}
