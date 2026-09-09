/**
 * Escala tipografica do Flui.
 *
 * Familia de referencia no design: "Sora" (titulos) + "Inter" (texto).
 * No codigo usamos a fonte de sistema (System) para manter o prototipo
 * leve e 100% offline; os pesos e tamanhos abaixo reproduzem a identidade.
 *
 * allowFontScaling e mantido LIGADO em todo o app (acessibilidade):
 * os tamanhos sao pontos-base e a UI se adapta ao aumento de fonte do SO.
 */
export const fontFamily = {
  regular: undefined, // System
  medium: undefined,
  bold: undefined,
};

export const type = {
  display: { fontSize: 30, lineHeight: 36, fontWeight: '800', letterSpacing: -0.5 },
  title: { fontSize: 22, lineHeight: 28, fontWeight: '800', letterSpacing: -0.3 },
  headline: { fontSize: 18, lineHeight: 24, fontWeight: '700' },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  bodyStrong: { fontSize: 15, lineHeight: 22, fontWeight: '600' },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '600', letterSpacing: 0.2 },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' },
  mono: { fontSize: 14, lineHeight: 20, fontWeight: '600', fontVariant: ['tabular-nums'] },
};
