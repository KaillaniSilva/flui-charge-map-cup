/**
 * Paleta do Flui.
 *
 * Conceito: mobilidade eletrica + sustentabilidade.
 *  - Verde "Volt" -> energia limpa, carga, movimento.
 *  - Verde "Floresta" profundo -> base solida, natureza, confianca.
 *  - Ciano "Charge" -> eletricidade, tecnologia, destaque de carga rapida.
 *
 * Todos os pares texto/fundo abaixo foram escolhidos para atingir
 * contraste minimo AA (>= 4.5:1 para texto normal).
 */

const palette = {
  volt: '#12E29A', // verde eletrico principal
  voltDark: '#0BA87A',
  forest: '#052E23', // verde profundo (fundo dark / headers)
  forestSoft: '#0E3D30',
  charge: '#38BDF8', // ciano de carga rapida (DC)
  chargeDeep: '#0EA5E9',

  // Status dos pontos de recarga
  statusFree: '#12C46B', // disponivel
  statusBusy: '#F5A524', // ocupado / fila
  statusOffline: '#8A968F', // fora de servico
  statusFast: '#7C5CFF', // ponto com carga ultrarrapida

  white: '#FFFFFF',
  black: '#04140F',
};

export const lightTheme = {
  mode: 'light',
  brand: palette.voltDark,
  brandStrong: palette.forest,
  accent: palette.chargeDeep,

  bg: '#F2F6F3',
  bgElevated: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceMuted: '#E8EFEA',
  border: '#D3DED7',

  text: '#08201A',
  textMuted: '#4B5A53',
  textInverse: '#FFFFFF',

  onBrand: '#04140F',

  ...statusFor('light'),
  overlay: 'rgba(4, 20, 15, 0.45)',
  palette,
};

export const darkTheme = {
  mode: 'dark',
  brand: palette.volt,
  brandStrong: palette.volt,
  accent: palette.charge,

  bg: '#061410',
  bgElevated: '#0E211B',
  surface: '#0E211B',
  surfaceMuted: '#153027',
  border: '#1E3A30',

  text: '#EAF4EF',
  textMuted: '#9DB4AA',
  textInverse: '#04140F',

  onBrand: '#04140F',

  ...statusFor('dark'),
  overlay: 'rgba(2, 10, 7, 0.6)',
  palette,
};

function statusFor() {
  return {
    statusFree: palette.statusFree,
    statusBusy: palette.statusBusy,
    statusOffline: palette.statusOffline,
    statusFast: palette.statusFast,
  };
}

export default palette;
