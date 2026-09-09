import React from 'react';
import MapCanvas from './MapCanvas';
import GoogleMapView from './GoogleMapView';
import { USE_GOOGLE_MAPS } from '../../config';

/**
 * Ponto unico de escolha do mapa.
 * USE_GOOGLE_MAPS controla se usamos a integracao com Google Maps
 * (react-native-maps) ou o mapa proprio do Flui.
 */
export default function MapContainer(props) {
  if (USE_GOOGLE_MAPS) return <GoogleMapView {...props} />;
  return <MapCanvas {...props} />;
}
