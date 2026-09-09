import React from 'react';
import MapCanvas from './MapCanvas';

/**
 * react-native-maps nao roda no Expo Web. No web caimos no mapa proprio,
 * garantindo que o prototipo abra em qualquer ambiente.
 */
export default function GoogleMapView(props) {
  return <MapCanvas {...props} />;
}
