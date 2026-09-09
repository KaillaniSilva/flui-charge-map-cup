# Flui — Charge Map Cup (Enterprise Challenge)

App mobile para o motorista de veículo elétrico encontrar, avaliar e escolher
pontos de recarga. Este repositório cobre a **Etapa 1** (protótipo navegável,
identidade visual, telas principais) e a **Etapa 2** (app funcional, mapa
interativo, filtros de busca funcionando, motion design).

> Todos os dados de pontos de recarga são **simulados** (`src/data/chargingPoints.js`).

---

## Stack

- **React Native + Expo** (SDK 51)
- **React Navigation** (bottom tabs + native stack) — navegação entre telas
- **react-native-maps** (`PROVIDER_GOOGLE`) — integração com Google Maps (Etapa 2)
- **moti / react-native-reanimated** — motion design (transições, loading, feedback)
- **react-native-svg** — mapa próprio e blocos visuais

---

## Como rodar

```bash
npm install
npm start            # abre o Expo Dev Tools
# depois:  a = Android   |   i = iOS   |   w = Web
```

- **Celular:** instale o app **Expo Go** e escaneie o QR Code.
- **Web:** `npm run web` — abre no navegador (usa o mapa próprio do Flui).

### Mapa: dois modos

O arquivo [`src/config.js`](src/config.js) tem a flag `USE_GOOGLE_MAPS`:

| Valor | Comportamento |
|---|---|
| `false` (padrão) | Usa o **mapa próprio do Flui** (SVG + marcadores animados). Roda em Android, iOS e Web **sem chave de API** — ideal para avaliação imediata. |
| `true` | Usa **react-native-maps com Google Maps**, estilo visual do Flui, marcadores por status. Requer chave (abaixo). Não funciona no Expo Web. |

**Ativando o Google Maps real:**

1. Gere uma chave em <https://console.cloud.google.com/> (Maps SDK for Android/iOS).
2. Cole em `app.json` → `expo.android.config.googleMaps.apiKey`.
3. `cp .env.example .env` e preencha `GOOGLE_MAPS_API_KEY`.
4. Em `src/config.js`, `USE_GOOGLE_MAPS = true`.
5. `npx expo prebuild` + build de desenvolvimento (ou use um Dev Client).

A implementação já está pronta em
[`src/components/map/GoogleMapView.native.js`](src/components/map/GoogleMapView.native.js).

---

## Telas

| Tela | Arquivo | O que entrega |
|---|---|---|
| **Mapa** | `src/screens/MapScreen.js` | Mapa interativo, marcadores diferenciados por status/carga rápida, legenda, busca rápida, botão de filtros com badge, card do ponto selecionado (spring). |
| **Busca** | `src/screens/SearchScreen.js` | Campo de busca por texto, filtros rápidos, **sheet de filtros funcionais**, lista de resultados animada, estado vazio, contador anunciado a leitores de tela. |
| **Ficha do ponto** | `src/screens/PointDetailScreen.js` | Carregadores/conectores/potência/preço, horários (semana + hoje), períodos de menor movimento, comodidades próximas, acessibilidade do local, sobre. Header com parallax. |

Navegação: abas **Mapa ↔ Buscar**; ambas abrem a **Ficha** por stack. Da ficha
volta-se para a origem. Tocar num marcador → card → “Como chegar”/ficha.

---

## Filtros de busca (Etapa 2 — funcionais)

Definidos em `src/data/filters.js`, estado global em `src/context/FiltersContext.js`,
aplicados por `applyFilters()`:

- **Tipo de conector** (Type 2, CCS2, CHAdeMO, Tesla/NACS, GB/T) — multi-seleção
- **Potência mínima** (qualquer / 22 / 50 / 150 / 350 kW)
- **Comodidades** (café, banheiro, Wi-Fi, restaurante, compras, mercado, estacionamento, kids)
- **Horário** (qualquer / aberto agora / 24h) — `isOpenNow()` usa a agenda semanal
- **Somente com tomada livre**
- **Busca textual** por nome, rede, endereço e bairro

Os filtros valem para o **mapa** e para a **busca** ao mesmo tempo.

---

## Motion design (Etapa 2)

- Transições de tela: `slide_from_right` (stack) e `slide_from_bottom` (ficha)
- Sheet de filtros: entrada/saída com **mola** (`AnimatePresence` + spring)
- Card do ponto no mapa: spring de baixo para cima
- Listas: itens entram com fade + slide **escalonado**
- Loading: **skeleton shimmer** no mapa e na busca (`FAKE_LOADING_MS`)
- Feedback tátil visual: `AnimatedPressable` (escala com mola) em todo toque
- Marcador selecionado: **pulso** animado
- Header da ficha: efeito **parallax** no scroll
- **Tudo respeita “Reduzir movimento”** do SO (`src/utils/useReduceMotion.js`)

---

## Acessibilidade

Ver detalhamento em [`docs/ENTREGA.md`](docs/ENTREGA.md). Resumo:

- `accessibilityRole` / `accessibilityLabel` / `accessibilityHint` em todos os controles
- `accessibilityState.selected` nos chips de filtro e marcadores
- Contraste **AA** na paleta clara e escura; suporte a **tema claro/escuro** do SO
- Alvos de toque ≥ **44×44 pt**; `hitSlop` onde necessário
- **Escala de fonte** do sistema respeitada (`allowFontScaling`, layouts flexíveis)
- **Reduzir movimento**: encurta/desliga animações
- Status por **cor + texto** (nunca só cor)
- Anúncios via `AccessibilityInfo.announceForAccessibility` (contagem de resultados)
- Elementos decorativos ocultos para leitores de tela (`accessibilityElementsHidden`)

---

## Estrutura

```
App.js
app.json / babel.config.js
src/
  config.js                 flags do app (Google Maps on/off, região inicial)
  theme/                    paleta, tipografia, espaçamento, provider de tema
  data/                     pontos de recarga simulados + definição/lógica de filtros
  context/                  estado global dos filtros
  navigation/               tabs + stack
  components/               design system + mapa (MapCanvas, GoogleMapView, marcadores)
  screens/                  MapScreen, SearchScreen, PointDetailScreen
  utils/                    useReduceMotion
docs/
  ENTREGA.md                texto da entrega (integrantes, justificativas, acessibilidade)
  entrega.html              versão para exportar em PDF
```

---

## Entrega em PDF

O conteúdo exigido no PDF está em [`docs/ENTREGA.md`](docs/ENTREGA.md).
Para gerar o PDF: abra `docs/entrega.html` no navegador e use
**Imprimir → Salvar como PDF**, ou rode `npx md-to-pdf docs/ENTREGA.md`.
