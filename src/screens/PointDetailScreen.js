import React from 'react';
import { View, Animated, AccessibilityInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';

import Text from '../components/Text';
import AnimatedPressable from '../components/AnimatedPressable';
import StatusDot from '../components/StatusDot';
import RatingStars from '../components/RatingStars';
import ConnectorBadge from '../components/ConnectorBadge';
import AmenityChip from '../components/AmenityChip';
import PhotoBlock from '../components/PhotoBlock';
import { useTheme } from '../theme';
import { getPointById, pointSummary } from '../data/chargingPoints';
import { isOpenNow } from '../data/filters';
import { useReduceMotion } from '../utils/useReduceMotion';

const WEEKDAYS = ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

function Section({ title, icon, children, delay = 0, reduceMotion }) {
  const theme = useTheme();
  return (
    <MotiView
      from={reduceMotion ? undefined : { opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 320, delay }}
      style={{ marginTop: 24, gap: 12 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Ionicons name={icon} size={18} color={theme.brand} />
        <Text variant="headline" heading>
          {title}
        </Text>
      </View>
      {children}
    </MotiView>
  );
}

export default function PointDetailScreen({ route, navigation }) {
  const theme = useTheme();
  const reduceMotion = useReduceMotion();
  const point = getPointById(route.params?.id);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  if (!point) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.bg }}>
        <Text variant="headline">Ponto nao encontrado</Text>
        <AnimatedPressable onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
          <Text style={{ color: theme.brand }}>Voltar</Text>
        </AnimatedPressable>
      </SafeAreaView>
    );
  }

  const s = pointSummary(point);
  const openNow = isOpenNow(point);
  const todayIdx = new Date().getDay();

  const headerScale = scrollY.interpolate({
    inputRange: [-120, 0],
    outputRange: [1.35, 1],
    extrapolateRight: 'clamp',
  });

  const fakeAction = (msg) => AccessibilityInfo.announceForAccessibility?.(msg);

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar style="light" />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Cabecalho com "foto" */}
        <Animated.View style={{ transform: [{ scale: reduceMotion ? 1 : headerScale }] }}>
          <PhotoBlock
            colors={point.photoColors[0]}
            height={230}
            icon={point.hasFastCharge ? 'flash' : 'battery-charging'}
          />
        </Animated.View>

        <View style={{ paddingHorizontal: 20, marginTop: -28 }}>
          <View
            style={{
              backgroundColor: theme.surface,
              borderRadius: theme.radius.xl,
              padding: 18,
              borderWidth: 1,
              borderColor: theme.border,
              ...theme.shadow.card,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text variant="title" heading>
                  {point.name}
                </Text>
                <Text variant="caption" muted style={{ marginTop: 2 }}>
                  {point.operator}
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: theme.radius.pill,
                  backgroundColor: point.hasFastCharge ? theme.accent : theme.surfaceMuted,
                  alignSelf: 'flex-start',
                }}
              >
                <Text
                  variant="caption"
                  style={{ color: point.hasFastCharge ? '#fff' : theme.textMuted, fontWeight: '700' }}
                >
                  {point.hasFastCharge ? 'CARGA RAPIDA' : 'CARGA AC'}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 12, flexWrap: 'wrap' }}>
              <StatusDot status={point.status} />
              <RatingStars value={point.rating} count={point.reviewsCount} />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="navigate-outline" size={13} color={theme.textMuted} />
                <Text variant="caption" muted>
                  {point.distanceKm.toFixed(1)} km
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 }}>
              <Ionicons name="location-outline" size={15} color={theme.textMuted} />
              <Text variant="body" muted style={{ flex: 1 }}>
                {point.address}
              </Text>
            </View>

            {/* Resumo em numeros */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 16,
                borderRadius: theme.radius.md,
                backgroundColor: theme.surfaceMuted,
                overflow: 'hidden',
              }}
            >
              {[
                { v: `${s.available}/${s.totalGuns}`, l: 'tomadas livres' },
                { v: `${s.maxKw} kW`, l: 'potencia max.' },
                { v: openNow ? 'Aberto' : 'Fechado', l: 'agora' },
              ].map((cell, i) => (
                <View
                  key={cell.l}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    alignItems: 'center',
                    borderLeftWidth: i === 0 ? 0 : 1,
                    borderLeftColor: theme.border,
                  }}
                >
                  <Text variant="bodyStrong">{cell.v}</Text>
                  <Text variant="caption" muted>
                    {cell.l}
                  </Text>
                </View>
              ))}
            </View>

            {/* Acoes */}
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
              <AnimatedPressable
                onPress={() => fakeAction('Rota iniciada (simulacao)')}
                accessibilityRole="button"
                accessibilityLabel="Como chegar"
                accessibilityHint="Acao simulada nesta etapa"
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  gap: 8,
                  paddingVertical: 13,
                  borderRadius: theme.radius.pill,
                  backgroundColor: theme.brand,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="navigate" size={17} color={theme.onBrand} />
                <Text variant="bodyStrong" style={{ color: theme.onBrand }}>
                  Como chegar
                </Text>
              </AnimatedPressable>
              <AnimatedPressable
                onPress={() => fakeAction('Link copiado (simulacao)')}
                accessibilityRole="button"
                accessibilityLabel="Compartilhar ponto"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: theme.radius.pill,
                  borderWidth: 1.5,
                  borderColor: theme.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="share-social-outline" size={19} color={theme.text} />
              </AnimatedPressable>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {/* Carregadores e conectores */}
          <Section title="Carregadores e conectores" icon="hardware-chip-outline" delay={reduceMotion ? 0 : 60} reduceMotion={reduceMotion}>
            {point.chargers.map((c) => (
              <ConnectorBadge key={c.id} charger={c} />
            ))}
            <Text variant="caption" muted>
              {s.connectors.join(' - ')}
            </Text>
          </Section>

          {/* Horarios */}
          <Section title="Horario de funcionamento" icon="time-outline" delay={reduceMotion ? 0 : 120} reduceMotion={reduceMotion}>
            {point.hours.is24h ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  padding: 12,
                  borderRadius: theme.radius.md,
                  backgroundColor: theme.surfaceMuted,
                }}
              >
                <Ionicons name="infinite" size={18} color={theme.brand} />
                <Text variant="bodyStrong">Aberto 24 horas, todos os dias</Text>
              </View>
            ) : (
              <View style={{ borderRadius: theme.radius.md, backgroundColor: theme.surfaceMuted, overflow: 'hidden' }}>
                {WEEKDAYS.map((d, i) => {
                  const slot = point.hours.week[i];
                  const today = i === todayIdx;
                  return (
                    <View
                      key={d}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                        paddingHorizontal: 14,
                        backgroundColor: today ? theme.surface : 'transparent',
                      }}
                    >
                      <Text variant={today ? 'bodyStrong' : 'body'} muted={!today}>
                        {d} {today ? '(hoje)' : ''}
                      </Text>
                      <Text variant={today ? 'bodyStrong' : 'body'} muted={!today}>
                        {slot ? `${slot.open} - ${slot.close}` : 'Fechado'}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </Section>

          {/* Periodos de menor movimento */}
          <Section title="Periodos de menor movimento" icon="trending-down-outline" delay={reduceMotion ? 0 : 180} reduceMotion={reduceMotion}>
            <Text variant="body" muted>
              Melhores janelas para carregar sem fila (estimativa com base no historico simulado):
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {point.lowTraffic.map((slot) => (
                <View
                  key={slot}
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
                  accessible
                  accessibilityLabel={`Menor movimento entre ${slot}`}
                >
                  <Ionicons name="time-outline" size={14} color={theme.brand} />
                  <Text variant="label">{slot}</Text>
                </View>
              ))}
            </View>
          </Section>

          {/* Comodidades */}
          <Section title="Comodidades proximas" icon="sparkles-outline" delay={reduceMotion ? 0 : 240} reduceMotion={reduceMotion}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {point.amenities.map((a) => (
                <AmenityChip key={a} id={a} />
              ))}
            </View>
          </Section>

          {/* Acessibilidade do local */}
          <Section title="Acessibilidade do local" icon="accessibility-outline" delay={reduceMotion ? 0 : 300} reduceMotion={reduceMotion}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                padding: 12,
                borderRadius: theme.radius.md,
                backgroundColor: theme.surfaceMuted,
              }}
            >
              <Ionicons
                name={point.wheelchairAccessible ? 'checkmark-circle' : 'close-circle'}
                size={20}
                color={point.wheelchairAccessible ? theme.statusFree : theme.statusOffline}
              />
              <Text variant="body" style={{ flex: 1 }}>
                {point.wheelchairAccessible
                  ? 'Vaga de recarga acessivel para cadeirante e piso nivelado.'
                  : 'Sem vaga de recarga acessivel sinalizada neste ponto.'}
              </Text>
            </View>
          </Section>

          {/* Sobre */}
          <Section title="Sobre o ponto" icon="information-circle-outline" delay={reduceMotion ? 0 : 360} reduceMotion={reduceMotion}>
            <Text variant="body" muted>
              {point.about}
            </Text>
          </Section>
        </View>
      </Animated.ScrollView>

      {/* Botao voltar flutuante */}
      <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0 }}>
        <AnimatedPressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          style={{
            margin: 16,
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: theme.overlay,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </AnimatedPressable>
      </SafeAreaView>
    </View>
  );
}
