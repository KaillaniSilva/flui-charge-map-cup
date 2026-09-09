import React from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { INITIAL_REGION } from '../../config';
import { FLUI_MAP_STYLE } from './fluiMapStyle';

const TONE = { free: 'statusFree', busy: 'statusBusy', offline: 'statusOffline' };

/**
 * Integracao real com Google Maps (Etapa 2).
 * Ativada quando USE_GOOGLE_MAPS = true em src/config.js.
 * Requer chave em app.json > expo.android.config.googleMaps.apiKey (Android).
 * Aplica o estilo visual do Flui (FLUI_MAP_STYLE) e marcadores por status.
 */
export default function GoogleMapView({ points, selectedId, onSelect, region = INITIAL_REGION }) {
  const theme = useTheme();

  return (
    <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      initialRegion={region}
      customMapStyle={FLUI_MAP_STYLE}
      showsUserLocation
      showsMyLocationButton={false}
      toolbarEnabled={false}
    >
      {points.map((p) => {
        const color = theme[TONE[p.status] ?? 'statusOffline'];
        const active = p.id === selectedId;
        return (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.latitude, longitude: p.longitude }}
            onPress={() => onSelect(p.id)}
            tracksViewChanges={false}
            accessibilityLabel={`${p.name}, ${p.status}`}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                paddingVertical: 5,
                paddingHorizontal: 9,
                borderRadius: 999,
                backgroundColor: active ? color : theme.bgElevated,
                borderWidth: 2,
                borderColor: color,
              }}
            >
              <Ionicons
                name={p.hasFastCharge ? 'flash' : 'battery-charging-outline'}
                size={14}
                color={active ? theme.onBrand : color}
              />
            </View>
          </Marker>
        );
      })}
    </MapView>
  );
}
