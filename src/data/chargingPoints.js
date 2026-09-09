/**
 * Dados SIMULADOS de pontos de recarga (Etapas 1 e 2).
 * Regiao: Av. Paulista e entorno, Sao Paulo - SP.
 *
 * Nada aqui vem de API real. Coordenadas sao plausiveis mas ficticias.
 * `photoColors` gera blocos de gradiente na ficha (sem depender de rede).
 */

const week = (open, close) => ({
  0: { open, close }, 1: { open, close }, 2: { open, close },
  3: { open, close }, 4: { open, close }, 5: { open, close }, 6: { open, close },
});

export const CHARGING_POINTS = [
  {
    id: 'flui-001',
    name: 'Flui Hub Paulista',
    operator: 'Flui Energia',
    status: 'free', // free | busy | offline
    rating: 4.8,
    reviewsCount: 214,
    address: 'Av. Paulista, 1578 - Bela Vista',
    neighborhood: 'Bela Vista',
    latitude: -23.5613,
    longitude: -46.6559,
    distanceKm: 0.4,
    hasFastCharge: true,
    wheelchairAccessible: true,
    photoColors: [['#0BA87A', '#052E23'], ['#38BDF8', '#0EA5E9']],
    chargers: [
      { id: 'c1', kind: 'DC', connectorId: 'ccs2', connectorLabel: 'CCS2', powerKw: 150, count: 4, available: 3, pricePerKwh: 2.19 },
      { id: 'c2', kind: 'DC', connectorId: 'chademo', connectorLabel: 'CHAdeMO', powerKw: 50, count: 1, available: 1, pricePerKwh: 2.09 },
      { id: 'c3', kind: 'AC', connectorId: 'type2', connectorLabel: 'Type 2', powerKw: 22, count: 6, available: 5, pricePerKwh: 1.45 },
    ],
    hours: { is24h: true, week: week('00:00', '23:59') },
    lowTraffic: ['05:00 - 08:00', '13:30 - 16:00', '22:00 - 00:00'],
    amenities: ['cafe', 'restroom', 'wifi', 'shopping', 'parking'],
    about:
      'Hub urbano da Flui no coracao da Paulista. Cobertura, area de espera climatizada e energia 100% de fontes renovaveis certificadas.',
  },
  {
    id: 'flui-002',
    name: 'EcoCharge Consolacao',
    operator: 'EcoCharge',
    status: 'busy',
    rating: 4.3,
    reviewsCount: 98,
    address: 'R. da Consolacao, 2200 - Consolacao',
    neighborhood: 'Consolacao',
    latitude: -23.5548,
    longitude: -46.6608,
    distanceKm: 0.9,
    hasFastCharge: true,
    wheelchairAccessible: true,
    photoColors: [['#7C5CFF', '#052E23'], ['#12E29A', '#0BA87A']],
    chargers: [
      { id: 'c1', kind: 'DC', connectorId: 'ccs2', connectorLabel: 'CCS2', powerKw: 350, count: 2, available: 0, pricePerKwh: 2.65 },
      { id: 'c2', kind: 'AC', connectorId: 'type2', connectorLabel: 'Type 2', powerKw: 11, count: 4, available: 2, pricePerKwh: 1.39 },
    ],
    hours: { is24h: false, week: week('06:00', '23:00') },
    lowTraffic: ['06:00 - 07:30', '14:00 - 16:30'],
    amenities: ['cafe', 'restroom', 'food', 'wifi'],
    about:
      'Estacao com dois carregadores ultrarrapidos de 350 kW ideais para quem tem pouco tempo. Integrada a uma cafeteria parceira.',
  },
  {
    id: 'flui-003',
    name: 'Shopping Cidade SP - G2',
    operator: 'VoltMall',
    status: 'free',
    rating: 4.6,
    reviewsCount: 340,
    address: 'Av. Paulista, 1230 - Subsolo G2',
    neighborhood: 'Bela Vista',
    latitude: -23.5661,
    longitude: -46.6512,
    distanceKm: 1.3,
    hasFastCharge: false,
    wheelchairAccessible: true,
    photoColors: [['#38BDF8', '#052E23'], ['#0BA87A', '#12E29A']],
    chargers: [
      { id: 'c1', kind: 'AC', connectorId: 'type2', connectorLabel: 'Type 2', powerKw: 22, count: 10, available: 7, pricePerKwh: 1.25 },
    ],
    hours: { is24h: false, week: week('10:00', '22:00') },
    lowTraffic: ['10:00 - 12:00', '15:00 - 17:00'],
    amenities: ['shopping', 'food', 'restroom', 'wifi', 'market', 'playground', 'parking'],
    about:
      'Vagas de recarga no estacionamento coberto do shopping. Otimo para recarga lenta enquanto faz compras ou assiste a um filme.',
  },
  {
    id: 'flui-004',
    name: 'Posto Verde Trianon',
    operator: 'Rede Verde',
    status: 'free',
    rating: 4.1,
    reviewsCount: 62,
    address: 'Al. Santos, 1500 - Cerqueira Cesar',
    neighborhood: 'Cerqueira Cesar',
    latitude: -23.5637,
    longitude: -46.6486,
    distanceKm: 1.6,
    hasFastCharge: true,
    wheelchairAccessible: false,
    photoColors: [['#0EA5E9', '#052E23'], ['#12C46B', '#0BA87A']],
    chargers: [
      { id: 'c1', kind: 'DC', connectorId: 'ccs2', connectorLabel: 'CCS2', powerKw: 60, count: 2, available: 2, pricePerKwh: 2.10 },
      { id: 'c2', kind: 'DC', connectorId: 'chademo', connectorLabel: 'CHAdeMO', powerKw: 60, count: 1, available: 1, pricePerKwh: 2.10 },
      { id: 'c3', kind: 'AC', connectorId: 'type2', connectorLabel: 'Type 2', powerKw: 7, count: 2, available: 2, pricePerKwh: 1.30 },
    ],
    hours: { is24h: true, week: week('00:00', '23:59') },
    lowTraffic: ['02:00 - 05:00', '13:00 - 15:00'],
    amenities: ['restroom', 'market'],
    about:
      'Posto de combustivel tradicional que adaptou parte das ilhas para recarga eletrica. Conveniencia 24h no local.',
  },
  {
    id: 'flui-005',
    name: 'Flui Corner Augusta',
    operator: 'Flui Energia',
    status: 'offline',
    rating: 4.0,
    reviewsCount: 45,
    address: 'R. Augusta, 900 - Consolacao',
    neighborhood: 'Consolacao',
    latitude: -23.5522,
    longitude: -46.6555,
    distanceKm: 1.1,
    hasFastCharge: false,
    wheelchairAccessible: true,
    photoColors: [['#8A968F', '#052E23'], ['#4B5A53', '#0E3D30']],
    chargers: [
      { id: 'c1', kind: 'AC', connectorId: 'type2', connectorLabel: 'Type 2', powerKw: 22, count: 3, available: 0, pricePerKwh: 1.49 },
    ],
    hours: { is24h: false, week: week('07:00', '22:00') },
    lowTraffic: ['07:00 - 09:00'],
    amenities: ['cafe', 'wifi'],
    about:
      'Ponto de rua compacto. No momento em manutencao programada - previsao de retorno em 48h (dado simulado).',
  },
  {
    id: 'flui-006',
    name: 'Parque Mirante Recarga',
    operator: 'CleanGrid',
    status: 'free',
    rating: 4.9,
    reviewsCount: 176,
    address: 'Av. Brg. Luis Antonio, 4000 - Jardim Paulista',
    neighborhood: 'Jardim Paulista',
    latitude: -23.5709,
    longitude: -46.6529,
    distanceKm: 2.2,
    hasFastCharge: true,
    wheelchairAccessible: true,
    photoColors: [['#12E29A', '#052E23'], ['#38BDF8', '#0BA87A']],
    chargers: [
      { id: 'c1', kind: 'DC', connectorId: 'ccs2', connectorLabel: 'CCS2', powerKw: 180, count: 3, available: 2, pricePerKwh: 2.35 },
      { id: 'c2', kind: 'DC', connectorId: 'tesla', connectorLabel: 'Tesla (NACS)', powerKw: 250, count: 4, available: 4, pricePerKwh: 2.40 },
      { id: 'c3', kind: 'AC', connectorId: 'type2', connectorLabel: 'Type 2', powerKw: 22, count: 4, available: 3, pricePerKwh: 1.40 },
    ],
    hours: { is24h: false, week: week('05:00', '23:00') },
    lowTraffic: ['05:00 - 07:00', '14:00 - 16:00', '21:00 - 23:00'],
    amenities: ['cafe', 'restroom', 'wifi', 'food', 'playground', 'parking'],
    about:
      'Estacao ao lado de area verde, com pergolado solar que cobre as vagas e alimenta parte da demanda durante o dia.',
  },
  {
    id: 'flui-007',
    name: 'Bela Vista Fast Point',
    operator: 'EcoCharge',
    status: 'busy',
    rating: 3.9,
    reviewsCount: 51,
    address: 'R. Treze de Maio, 1800 - Bela Vista',
    neighborhood: 'Bela Vista',
    latitude: -23.5679,
    longitude: -46.6437,
    distanceKm: 2.0,
    hasFastCharge: true,
    wheelchairAccessible: false,
    photoColors: [['#F5A524', '#052E23'], ['#0EA5E9', '#0BA87A']],
    chargers: [
      { id: 'c1', kind: 'DC', connectorId: 'ccs2', connectorLabel: 'CCS2', powerKw: 120, count: 2, available: 0, pricePerKwh: 2.55 },
      { id: 'c2', kind: 'DC', connectorId: 'gbt', connectorLabel: 'GB/T', powerKw: 90, count: 1, available: 1, pricePerKwh: 2.30 },
    ],
    hours: { is24h: false, week: week('06:00', '00:00') },
    lowTraffic: ['06:00 - 08:00', '15:00 - 17:00'],
    amenities: ['restroom', 'cafe'],
    about:
      'Foco em carga rapida para aplicativos de mobilidade. Costuma ter fila nos horarios de pico da noite.',
  },
  {
    id: 'flui-008',
    name: 'Higienopolis Charge Center',
    operator: 'VoltMall',
    status: 'free',
    rating: 4.5,
    reviewsCount: 129,
    address: 'Av. Higienopolis, 618 - Higienopolis',
    neighborhood: 'Higienopolis',
    latitude: -23.5468,
    longitude: -46.6553,
    distanceKm: 2.6,
    hasFastCharge: true,
    wheelchairAccessible: true,
    photoColors: [['#0BA87A', '#0E3D30'], ['#7C5CFF', '#052E23']],
    chargers: [
      { id: 'c1', kind: 'DC', connectorId: 'ccs2', connectorLabel: 'CCS2', powerKw: 150, count: 3, available: 3, pricePerKwh: 2.29 },
      { id: 'c2', kind: 'AC', connectorId: 'type2', connectorLabel: 'Type 2', powerKw: 22, count: 8, available: 6, pricePerKwh: 1.35 },
    ],
    hours: { is24h: false, week: week('08:00', '23:00') },
    lowTraffic: ['08:00 - 10:00', '14:00 - 16:00'],
    amenities: ['shopping', 'food', 'restroom', 'wifi', 'market', 'parking'],
    about:
      'Vagas no subsolo de um centro comercial de bairro. Boa opcao de recarga tranquila longe do fluxo da Paulista.',
  },
  {
    id: 'flui-009',
    name: 'Estacao Metro Brigadeiro',
    operator: 'Rede Verde',
    status: 'free',
    rating: 4.2,
    reviewsCount: 73,
    address: 'Av. Paulista, 900 - Bela Vista',
    neighborhood: 'Bela Vista',
    latitude: -23.5714,
    longitude: -46.6469,
    distanceKm: 1.8,
    hasFastCharge: false,
    wheelchairAccessible: true,
    photoColors: [['#38BDF8', '#0BA87A'], ['#12E29A', '#0E3D30']],
    chargers: [
      { id: 'c1', kind: 'AC', connectorId: 'type2', connectorLabel: 'Type 2', powerKw: 11, count: 6, available: 5, pricePerKwh: 1.28 },
    ],
    hours: { is24h: false, week: week('05:00', '00:00') },
    lowTraffic: ['05:00 - 06:30', '10:00 - 12:00', '22:00 - 00:00'],
    amenities: ['restroom', 'wifi'],
    about:
      'Integracao com o transporte publico: deixe o carro carregando e siga de metro. Tarifa reduzida fora de pico.',
  },
  {
    id: 'flui-010',
    name: 'Jardins Premium Charging',
    operator: 'CleanGrid',
    status: 'free',
    rating: 4.7,
    reviewsCount: 205,
    address: 'R. Oscar Freire, 700 - Jardim Paulista',
    neighborhood: 'Jardim Paulista',
    latitude: -23.5629,
    longitude: -46.6702,
    distanceKm: 2.4,
    hasFastCharge: true,
    wheelchairAccessible: true,
    photoColors: [['#12E29A', '#0BA87A'], ['#052E23', '#0E3D30']],
    chargers: [
      { id: 'c1', kind: 'DC', connectorId: 'ccs2', connectorLabel: 'CCS2', powerKw: 200, count: 2, available: 1, pricePerKwh: 2.49 },
      { id: 'c2', kind: 'DC', connectorId: 'tesla', connectorLabel: 'Tesla (NACS)', powerKw: 250, count: 2, available: 2, pricePerKwh: 2.55 },
      { id: 'c3', kind: 'AC', connectorId: 'type2', connectorLabel: 'Type 2', powerKw: 22, count: 3, available: 3, pricePerKwh: 1.55 },
    ],
    hours: { is24h: false, week: week('09:00', '21:00') },
    lowTraffic: ['09:00 - 11:00', '15:00 - 17:00'],
    amenities: ['cafe', 'restroom', 'wifi', 'food', 'shopping', 'parking'],
    about:
      'Lounge de recarga com area de trabalho, cafe de especialidade e valet. Publico premium, ambiente silencioso.',
  },
];

export function getPointById(id) {
  return CHARGING_POINTS.find((p) => p.id === id);
}

export const STATUS_META = {
  free: { label: 'Disponivel', tone: 'statusFree' },
  busy: { label: 'Ocupado', tone: 'statusBusy' },
  offline: { label: 'Fora de servico', tone: 'statusOffline' },
};

/** Resumo rapido usado nos cards e marcadores. */
export function pointSummary(p) {
  const maxKw = Math.max(...p.chargers.map((c) => c.powerKw));
  const totalGuns = p.chargers.reduce((s, c) => s + c.count, 0);
  const available = p.chargers.reduce((s, c) => s + c.available, 0);
  const connectors = [...new Set(p.chargers.map((c) => c.connectorLabel))];
  return { maxKw, totalGuns, available, connectors };
}
