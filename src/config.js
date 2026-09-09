/**
 * Configuracao de alto nivel do app.
 *
 * USE_GOOGLE_MAPS:
 *   false (padrao) -> usa o MapCanvas proprio (SVG + marcadores animados).
 *                     Roda em qualquer lugar (Android, iOS, Web) sem chave de API.
 *   true           -> usa react-native-maps com PROVIDER_GOOGLE e o estilo
 *                     visual do Flui. Requer chave do Google Maps em app.json
 *                     (Android) e nao funciona no Expo Web.
 *
 * Decisao de projeto (ver docs/ENTREGA.md): a integracao com Google Maps
 * esta implementada e pronta em src/components/map/GoogleMapView.native.js.
 * O modo padrao usa o mapa proprio para que a banca consiga rodar o
 * prototipo imediatamente, sem depender de credenciais.
 */
export const USE_GOOGLE_MAPS = false;

// Regiao inicial mostrada no mapa (Av. Paulista, Sao Paulo).
export const INITIAL_REGION = {
  latitude: -23.5613,
  longitude: -46.6565,
  latitudeDelta: 0.045,
  longitudeDelta: 0.045,
};

// Duracao (ms) do estado de carregamento simulado ao abrir o mapa/busca.
export const FAKE_LOADING_MS = 1100;
