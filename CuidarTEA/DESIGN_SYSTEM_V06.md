# Design System — CuidarTEA Stand Loop V06

Este guia registra os elementos visuais usados pelo animatic V06 para permitir sua reprodução sem depender de decisões implícitas no código.

## Base visual

- Formato de composição: 1920 × 1080 px, escala responsiva no navegador.
- Fundo: azul profundo tecnológico, com gradiente, luz radial discreta e formas orgânicas móveis.
- Conceito: cuidado conectado. A rede é um elemento vivo de linhas, nós e pulsos; ela integra as cenas sem competir com a leitura da interface.
- Linguagem: tecnológica, humana e acolhedora. A referência é o refinamento de apresentações comerciais contemporâneas, sem reproduzir layouts, marcas ou tipografias de terceiros.

## Paleta

| Token | Cor | Uso |
| --- | --- | --- |
| `--blue` | `#1855A6` | azul de marca e detalhes |
| `--blue-deep` | `#0B2F70` | contraste profundo |
| `--blue-stage` | `#174D9D` | palco e gradiente base |
| `--cyan` | `#39BDE0` | linhas e brilho tecnológico |
| `--teal` | `#25B5AA` | massas orgânicas e acentos |
| `--mint` | `#91EADC` | labels e nós principais |
| `--yellow` | `#FFD15A` | pontos de atenção e CTA |
| `--orange` | `#FF9F36` | massa quente de abertura |
| `--ink` | `#10264D` | texto escuro em superfícies claras |
| `--muted-light` | `#D7E9F3` | subtítulos no fundo escuro |

## Tipografia

- Títulos: `Bricolage Grotesque`, com fallback `Segoe UI`, Arial, sans-serif. Letras grandes, peso forte, tracking negativo sutil.
- Texto e controles: `Figtree`, com fallback `Segoe UI`, Arial, sans-serif.
- Rótulos: caixa alta, peso 750 e espaçamento de `0.18em`.
- Espaçamento obrigatório nas cenas de produto: **35 px do rótulo ao título** e **16,5 px do título ao subtítulo**.

## Composição

- Rótulo de perfil: x=112, y=158 px.
- Título: x=112, y=198 px, máximo de 1040 px.
- Subtítulo: x=114, y=270 px, máximo de 820 px.
- Mobile: copy à esquerda e aparelho centralizado no lado direito, com espaço suficiente entre copy e device.
- Desktop: notebook em primeiro plano; as telas oficiais são exibidas dentro da tela do equipamento, com entrada lateral, push-in leve e pausa de leitura.
- Fechamento: logo oficial grande, CTA, QR legível, rede pulsante e elementos de luz discretos.

## Rede viva

- Seis linhas curvas em SVG, com espessuras entre 1,35 e 2,1 px.
- Seis pulsos com dash curto, alternando ciano, menta e amarelo claro.
- Nove nós com microdeslocamento e brilho respirado; os nós mais relevantes recebem menta ou amarelo.
- O movimento da rede continua por todo o filme; é mais presente na abertura, em Rede Integrada e no encerramento.

## Movimento

- Duração total: 55 s, sem áudio.
- Entradas e saídas: curvas suaves (`smoothstep`), sem cortes bruscos.
- Câmera: zoom pequeno e progressivo nas telas reais; dispositivos se movem antes da UI assumir a atenção.
- Dispositivo/UI: o aparelho é protagonista no início da sequência; em seguida, o enquadramento aproxima a interface para leitura.

## Recursos oficiais

- Logomarca: `stand_loop_v06/assets/CuidarTEA_Typography_Personal_Logo.svg`.
- QR: `stand_loop_v06/assets/brand/QR_CuidarTEA_Instagram.svg`.
- Telas de plataforma: `stand_loop_v06/assets/platform/`.
- Imagem humana tecnológica: `stand_loop_v06/assets/cuidartea_rede_humana_v06.png`.

O arquivo CSS é a fonte de implementação desses tokens e medidas: `stand_loop_v06/stand_loop_v06.css`.
