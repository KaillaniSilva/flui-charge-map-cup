import React, { useMemo, useRef, useState } from 'react';
import { View, Animated, PanResponder, LayoutAnimation, Platform, UIManager } from 'react-native';
import Svg, { Line, Circle, Rect, G } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import MarkerPin from './MarkerPin';
import AnimatedPressable from '../AnimatedPressable';
import Text from '../Text';
import { useTheme } from '../../theme';
import { INITIAL_REGION } from '../../config';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Mapa proprio do Flui (fallback sem dependencia de chave de API).
 * Projeta lat/lon dos pontos simulados sobre uma malha viaria estilizada.
 * Suporta arrastar (pan) e zoom (+/-). Marcadores diferenciados por status.
 *
 * A integracao real com Google Maps vive em GoogleMapView.native.js e e
 * ativada por USE_GOOGLE_MAPS em src/config.js.
 */
export default function MapCanvas({ points, selectedId, onSelect, region = INITIAL_REGION }) {
  const theme = useTheme();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [zoom, setZoom] = useState(1);
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 4 || Math.abs(g.dy) > 4,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (_, g) => {
        pan.extractOffset();
      },
    })
  ).current;

  const project = useMemo(() => {
    const { w, h } = size;
    const latTop = region.latitude + region.latitudeDelta / 2;
    const lonLeft = region.longitude - region.longitudeDelta / 2;
    return (lat, lon) => ({
      x: ((lon - lonLeft) / region.longitudeDelta) * w * zoom - (w * (zoom - 1)) / 2,
      y: ((latTop - lat) / region.latitudeDelta) * h * zoom - (h * (zoom - 1)) / 2,
    });
  }, [size, zoom, region]);

  const changeZoom = (dir) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setZoom((z) => Math.min(2.4, Math.max(0.7, +(z + dir * 0.3).toFixed(2))));
  };

  const { w, h } = size;
  const grid = 7;

  return (
    <View
      style={{ flex: 1, overflow: 'hidden', backgroundColor: theme.mode === 'dark' ? '#08211A' : '#E6EFE9' }}
      onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={{ flex: 1, transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
      >
        {w > 0 && (
          <Svg width={w} height={h} style={{ position: 'absolute' }}>
            <Rect x={0} y={0} width={w} height={h} fill={theme.mode === 'dark' ? '#08211A' : '#E6EFE9'} />
            <G opacity={0.5}>
              {Array.from({ length: grid }).map((_, i) => (
                <Line
                  key={`v${i}`}
                  x1={(w / grid) * i}
                  y1={0}
                  x2={(w / grid) * i}
                  y2={h}
                  stroke={theme.mode === 'dark' ? '#123A2E' : '#CFE0D6'}
                  strokeWidth={i % 3 === 0 ? 6 : 2}
                />
              ))}
              {Array.from({ length: grid + 3 }).map((_, i) => (
                <Line
                  key={`hh${i}`}
                  x1={0}
                  y1={(h / (grid + 3)) * i}
                  x2={w}
                  y2={(h / (grid + 3)) * i}
                  stroke={theme.mode === 'dark' ? '#123A2E' : '#CFE0D6'}
                  strokeWidth={i % 3 === 0 ? 6 : 2}
                />
              ))}
              {/* "parque" decorativo */}
              <Circle cx={w * 0.72} cy={h * 0.28} r={Math.min(w, h) * 0.12} fill={theme.mode === 'dark' ? '#0E3327' : '#CDE8D5'} />
            </G>
          </Svg>
        )}

        {w > 0 &&
          points.map((p) => {
            const { x, y } = project(p.latitude, p.longitude);
            if (x < -60 || x > w + 60 || y < -60 || y > h + 60) return null;
            return (
              <View key={p.id} style={{ position: 'absolute', left: x - 30, top: y - 34, width: 60, alignItems: 'center' }}>
                <MarkerPin point={p} selected={p.id === selectedId} onPress={() => onSelect(p.id)} />
              </View>
            );
          })}
      </Animated.View>

      {/* Controles de zoom */}
      <View style={{ position: 'absolute', right: 14, bottom: 24, gap: 10 }}>
        {[
          { icon: 'add', dir: 1, label: 'Aproximar' },
          { icon: 'remove', dir: -1, label: 'Afastar' },
        ].map((b) => (
          <AnimatedPressable
            key={b.icon}
            onPress={() => changeZoom(b.dir)}
            accessibilityRole="button"
            accessibilityLabel={b.label}
            style={{
              width: 44,
              height: 44,
              borderRadius: theme.radius.md,
              backgroundColor: theme.bgElevated,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: theme.border,
              ...theme.shadow.card,
            }}
          >
            <Ionicons name={b.icon} size={22} color={theme.text} />
          </AnimatedPressable>
        ))}
      </View>

      <View
        style={{
          position: 'absolute',
          left: 14,
          bottom: 24,
          paddingVertical: 6,
          paddingHorizontal: 10,
          borderRadius: theme.radius.sm,
          backgroundColor: theme.overlay,
        }}
        accessibilityElementsHidden
      >
        <Text variant="caption" style={{ color: '#fff' }}>
          Mapa Flui - dados simulados
        </Text>
      </View>
    </View>
  );
}
