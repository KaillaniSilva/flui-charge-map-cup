# Charge Map Cup — Enterprise Challenge
## Flui · App mobile para o motorista de veículo elétrico
### Documento de entrega — Etapas 1 e 2

---

## 1. Integrantes do grupo

> Preencher com **nome completo em ordem alfabética** e **RM**. Grupo de 2 a 5 integrantes.

| # | Nome completo (ordem alfabética) | RM |
|---|----------------------------------|----|
| 1 | _[nome]_ | _[RM]_ |
| 2 | _[nome]_ | _[RM]_ |
| 3 | _[nome]_ | _[RM]_ |
| 4 | _[nome]_ | _[RM]_ |
| 5 | _[nome]_ | _[RM]_ |

---

## 2. Link do repositório público

**GitHub:** `https://github.com/<usuario>/flui-charge-map-cup`

> Substituir pelo link real após dar `git push`. O repositório contém todo o
> código do app (Expo/React Native), este documento e o README com instruções
> de execução.

Passos para publicar:

```bash
git add .
git commit -m "Flui - Charge Map Cup - Etapas 1 e 2"
git branch -M main
git remote add origin https://github.com/<usuario>/flui-charge-map-cup.git
git push -u origin main
```

---

## 3. Contextualização

O **Flui** é um aplicativo mobile pensado para o momento anterior à recarga: o
motorista de veículo elétrico precisa decidir **para onde ir**. Diferente de um
mapa genérico, o Flui organiza a informação em torno de três perguntas do
motorista:

1. **Onde tem ponto perto de mim?** → tela de **Mapa**
2. **Esse ponto serve pro meu carro e pro meu tempo?** → **Ficha do ponto**
3. **Qual ponto combina com o que eu preciso agora?** → **Busca com filtros**

A entrega está dividida conforme o desafio:

- **Etapa 1** — protótipo navegável, telas principais (mapa, ficha, busca),
  identidade visual aplicada, navegação funcional, dados simulados.
- **Etapa 2** — app funcional: mapa interativo integrável ao Google Maps, ficha
  rica com dados simulados, **filtros de busca funcionando** e **motion design**
  em transições, estados de carregamento e feedbacks.

O protótipo foi desenvolvido **em código** (React Native + Expo), roda em
Android, iOS e Web e está publicado em repositório público no GitHub.

---

## 4. Justificativa das tomadas de decisão

### 4.1 Plataforma: React Native + Expo
Escolhemos código em vez de Figma para já entregar uma base real e evolutiva
para as próximas etapas. O Expo permite rodar em Android, iOS e Web com um único
código e sem configuração nativa, o que facilita a avaliação da banca (basta
`npm install` + `npm start`).

### 4.2 Estrutura e hierarquia da informação
- **Navegação por abas** (Mapa e Buscar) porque são os dois modos de entrada do
  motorista; a **Ficha** é uma camada de profundidade acessível dos dois lados.
- Na **Ficha**, a informação foi ordenada pela urgência de decisão:
  status e números-chave primeiro (tomadas livres, potência máxima, aberto
  agora), depois **carregadores/conectores/potência/preço**, **horários**,
  **períodos de menor movimento**, **comodidades**, **acessibilidade do local**
  e, por último, o texto “sobre”.
- **Marcadores diferenciados**: cor = status (verde disponível, amarelo ocupado,
  cinza fora de serviço) e ícone de raio preenchido = carga rápida (DC). A
  potência máxima aparece no próprio marcador para decisão sem abrir a ficha.

### 4.3 Identidade visual (mobilidade elétrica + sustentabilidade)
- **Paleta** (`src/theme/colors.js`): verde “Volt” (`#12E29A`) para energia e
  movimento; verde “Floresta” profundo (`#052E23`) como base sólida e natureza;
  ciano “Charge” (`#38BDF8`) como destaque de carga rápida/tecnologia. Cores de
  status próprias. Tema **claro e escuro** completos, seguindo o SO.
- **Tipografia** (`src/theme/typography.js`): escala única (display → caption),
  títulos pesados e com tracking negativo (tom técnico e confiante), corpo em
  peso regular para leitura. Referência de design: Sora + Inter; no código
  usamos a fonte de sistema para manter o protótipo leve e offline.
- **Tom visual**: cantos generosos (raios 14–28), cartões com sombra suave,
  chips arredondados, ícones de linha (Ionicons), muito respiro. Passa
  leveza (“fluir”) e limpeza — coerente com energia limpa.

### 4.4 Google Maps com plano B
A integração real com o Google Maps (Etapa 2) está implementada em
`src/components/map/GoogleMapView.native.js` (`react-native-maps`,
`PROVIDER_GOOGLE`, estilo visual do Flui e marcadores por status). Como a chave
de API é pessoal e o Google Maps não roda no Expo Web, o app vem por padrão com
um **mapa próprio** (`MapCanvas`, em SVG, com pan/zoom e marcadores animados),
controlado pela flag `USE_GOOGLE_MAPS` em `src/config.js`. Assim o protótipo
**abre em qualquer ambiente** e a troca para o Google Maps é de uma linha.

### 4.5 Filtros funcionais compartilhados
Os filtros ficam num **contexto global** (`FiltersContext`) e são aplicados pela
mesma função (`applyFilters`) tanto no mapa quanto na busca — o que o motorista
filtra numa tela vale na outra. Filtros: conector, potência mínima, comodidades,
horário (com cálculo de “aberto agora”), disponibilidade e texto livre.

### 4.6 Motion design com propósito
As animações comunicam estado, não enfeitam: skeleton para carregamento, mola no
sheet e no card do ponto, entrada escalonada das listas, pulso no marcador
selecionado, parallax no header da ficha e feedback de escala em cada toque.
**Todas** consultam `useReduceMotion()` e são encurtadas/desligadas quando o
usuário ativa “Reduzir movimento”.

### 4.7 Solução disruptiva
- **Períodos de menor movimento** na ficha: o app não só mostra o ponto, ele
  sugere **quando** ir para evitar fila — decisão que os apps atuais não apoiam.
- **Marcador que já decide**: potência + status no pin reduzem toques.
- **Filtro único para mapa e busca**: o contexto do motorista viaja com ele.
- **Acessibilidade tratada como requisito de produto**, não como ajuste final
  (status por cor + texto, reduzir movimento, escala de fonte, contraste AA).

---

## 5. Recursos de acessibilidade presentes no app

| Recurso | Onde | Implementação |
|---|---|---|
| Rótulos para leitor de tela | Todos os controles | `accessibilityLabel`, `accessibilityHint`, `accessibilityRole` (`button`, `header`) |
| Estado anunciado | Chips de filtro, marcadores | `accessibilityState={{ selected }}` |
| Status sem depender de cor | Cards, ficha, mapa | `StatusDot` sempre com **texto** ao lado da cor; legenda do mapa descrita |
| Contraste AA | `src/theme/colors.js` | Pares texto/fundo ≥ 4.5:1 em tema claro e escuro |
| Tema claro/escuro | App inteiro | `useColorScheme()` → `ThemeProvider` |
| Escala de fonte do sistema | Todo texto | `allowFontScaling` ligado, `maxFontSizeMultiplier`, layouts flexíveis |
| Reduzir movimento | Todas as animações | `useReduceMotion()` (`AccessibilityInfo.isReduceMotionEnabled` + listener) |
| Alvo de toque ≥ 44×44 pt | Botões, chips, ícones | Altura mínima e `hitSlop` |
| Anúncios de contexto | Mapa e busca | `AccessibilityInfo.announceForAccessibility` com a contagem de resultados |
| Conteúdo decorativo oculto | Skeleton, malha do mapa | `accessibilityElementsHidden`, `importantForAccessibility` |
| Rótulos das abas | Navegação | `tabBarAccessibilityLabel` |
| Foco de leitura ordenado | Ficha | Seções em ordem lógica de decisão, com títulos `header` |
| Acessibilidade física do local | Ficha do ponto | Campo “Acessibilidade do local” (vaga acessível para cadeirante) |

---

## 6. Mapa de requisitos → onde está no projeto

| Requisito | Etapa | Arquivo(s) |
|---|---|---|
| Tela de mapa de pontos navegável | 1 | `src/screens/MapScreen.js` |
| Ficha detalhada do ponto | 1 | `src/screens/PointDetailScreen.js` |
| Tela de busca | 1 | `src/screens/SearchScreen.js` |
| Identidade visual (paleta/tipografia/tom) | 1 | `src/theme/*` |
| Navegação funcional entre telas | 1 | `src/navigation/RootNavigator.js` |
| Dados simulados | 1 | `src/data/chargingPoints.js` |
| Mapa interativo + Google Maps | 2 | `src/components/map/*`, `src/config.js` |
| Marcadores diferenciados | 2 | `src/components/map/MarkerPin.js` |
| Ficha: carregadores, conectores, potência, horários, menor movimento, comodidades | 2 | `src/screens/PointDetailScreen.js`, `src/components/ConnectorBadge.js` |
| Filtros funcionando (conector, potência, comodidades, horário) | 2 | `src/data/filters.js`, `src/context/FiltersContext.js`, `src/components/FilterSheet.js` |
| Motion design (transições, loading, feedback) | 2 | `src/components/*` (moti/reanimated), `RootNavigator.js` |
| Identidade visual consolidada | 2 | `src/theme/*` aplicado em todas as telas |

---

## 7. O que **não** faz parte desta entrega (conforme o desafio)

- Sistema de avaliação funcional (a nota é só exibição do dado simulado)
- Favoritos e histórico
- Vídeo-pitch
- Integração real com base de dados / APIs de terceiros (dados são simulados)
