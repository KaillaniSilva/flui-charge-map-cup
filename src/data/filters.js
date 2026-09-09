/**
 * Definicoes dos filtros de busca (Etapa 2 - filtros funcionais).
 * Cada grupo descreve como a UI renderiza e como a funcao de filtragem aplica.
 */

export const CONNECTOR_OPTIONS = [
  { id: 'type2', label: 'Type 2', hint: 'AC - padrao europeu/BR' },
  { id: 'ccs2', label: 'CCS2', hint: 'DC - carga rapida' },
  { id: 'chademo', label: 'CHAdeMO', hint: 'DC - Nissan/Mitsubishi' },
  { id: 'tesla', label: 'Tesla (NACS)', hint: 'Supercharger' },
  { id: 'gbt', label: 'GB/T', hint: 'DC - veiculos chineses' },
];

export const POWER_OPTIONS = [
  { id: 'any', label: 'Qualquer', minKw: 0 },
  { id: 'p22', label: '22 kW+', minKw: 22 },
  { id: 'p50', label: '50 kW+', minKw: 50 },
  { id: 'p150', label: '150 kW+', minKw: 150 },
  { id: 'p350', label: '350 kW', minKw: 350 },
];

export const AMENITY_OPTIONS = [
  { id: 'cafe', label: 'Cafe', icon: 'cafe' },
  { id: 'restroom', label: 'Banheiro', icon: 'body' },
  { id: 'wifi', label: 'Wi-Fi', icon: 'wifi' },
  { id: 'food', label: 'Restaurante', icon: 'restaurant' },
  { id: 'shopping', label: 'Compras', icon: 'bag-handle' },
  { id: 'market', label: 'Mercado', icon: 'basket' },
  { id: 'parking', label: 'Estacionamento coberto', icon: 'car' },
  { id: 'playground', label: 'Espaco kids', icon: 'happy' },
];

export const HOURS_OPTIONS = [
  { id: 'any', label: 'Qualquer horario' },
  { id: 'open_now', label: 'Aberto agora' },
  { id: 'h24', label: '24 horas' },
];

export const DEFAULT_FILTERS = {
  query: '',
  connectors: [], // ids de CONNECTOR_OPTIONS
  power: 'any', // id de POWER_OPTIONS
  amenities: [], // ids de AMENITY_OPTIONS
  hours: 'any', // id de HOURS_OPTIONS
  onlyAvailable: false,
};

/** Conta quantos filtros estao ativos (para badge no botao de filtro). */
export function countActiveFilters(f) {
  let n = 0;
  if (f.connectors.length) n += 1;
  if (f.power !== 'any') n += 1;
  if (f.amenities.length) n += 1;
  if (f.hours !== 'any') n += 1;
  if (f.onlyAvailable) n += 1;
  return n;
}

/** Horario de funcionamento -> aberto agora? (schedule simples por dia da semana) */
export function isOpenNow(point, now = new Date()) {
  if (point.hours.is24h) return true;
  const day = now.getDay(); // 0 = domingo
  const slot = point.hours.week[day];
  if (!slot) return false;
  const minutes = now.getHours() * 60 + now.getMinutes();
  const [oh, om] = slot.open.split(':').map(Number);
  const [ch, cm] = slot.close.split(':').map(Number);
  return minutes >= oh * 60 + om && minutes <= ch * 60 + cm;
}

/**
 * Aplica todos os filtros a lista de pontos.
 * Retorna a lista filtrada, ja ordenada por distancia.
 */
export function applyFilters(points, f, now = new Date()) {
  const q = f.query.trim().toLowerCase();

  return points
    .filter((p) => {
      if (q) {
        const haystack = `${p.name} ${p.operator} ${p.address} ${p.neighborhood}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      if (f.onlyAvailable && p.status !== 'free') return false;

      if (f.connectors.length) {
        const pointConnectors = new Set(p.chargers.map((c) => c.connectorId));
        if (!f.connectors.some((id) => pointConnectors.has(id))) return false;
      }

      if (f.power !== 'any') {
        const min = POWER_OPTIONS.find((o) => o.id === f.power)?.minKw ?? 0;
        const maxKw = Math.max(...p.chargers.map((c) => c.powerKw));
        if (maxKw < min) return false;
      }

      if (f.amenities.length) {
        const set = new Set(p.amenities);
        if (!f.amenities.every((id) => set.has(id))) return false;
      }

      if (f.hours === 'h24' && !point24h(p)) return false;
      if (f.hours === 'open_now' && !isOpenNow(p, now)) return false;

      return true;
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

function point24h(p) {
  return p.hours.is24h === true;
}
