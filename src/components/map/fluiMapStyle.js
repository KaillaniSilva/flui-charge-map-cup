/**
 * Estilo do Google Maps com a identidade Flui:
 * base esverdeada, agua em ciano, POIs discretos, foco nas vias.
 * Usado por GoogleMapView.native.js (customMapStyle).
 */
export const FLUI_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#eef4f0' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#3f5a4f' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#cde8d5' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#e3ede7' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#d5e7dd' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#a8dced' }] },
];
