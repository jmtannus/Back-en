# Notas de implementação V05

## Estado da entrega

Esta é a **primeira implementação revisável**, em formato de animatic funcional. O loop tem 55 segundos, 19 shots e reprodução contínua sem áudio. Não é master, não foi exportado como vídeo e não deve ser tratado como acabamento final.

Arquivos de execução:

- `stand_loop_v05.html`
- `stand_loop_v05.css`
- `stand_loop_v05.js`

O HTML referencia os assets originais por caminho relativo. Nenhuma captura, marca ou QR foi copiado, editado ou sobrescrito.

## Como revisar

Abra `stand_loop_v05.html` em um navegador Chromium atual. A reprodução começa após o carregamento das imagens.

- **Espaço:** reproduzir/pausar.
- **Setas esquerda/direita:** voltar/avançar 1 segundo.
- **Shift + setas:** voltar/avançar 0,1 segundo.
- **H:** ocultar controles e indicação de revisão.
- **Tela cheia:** botão na barra inferior ou F11.
- **Tempo específico:** acrescente `?t=29.25` à URL para abrir pausado nesse instante.
- **Pausado no início:** use `?paused=1`.

Os controles e o selo “ANIMATIC PARA REVISÃO” não fazem parte de um futuro master.

## Arquitetura da timeline

A animação é determinística: o estado visual é calculado pelo tempo corrente, em vez de depender de uma cadeia de timers. Isso permite pausar, percorrer a timeline, abrir um segundo específico e conferir a costura do loop.

| Intervalo | Shots |
|---|---|
| 00–03 s | A01 |
| 03–12,5 s | M01, M02, M03 |
| 12,5–22,5 s | R01, R02, R03, R04 |
| 22,5–32,5 s | T01, T02, T03 |
| 32,5–40,5 s | C01, C02, C03 |
| 40,5–47 s | D01, D02, D03 |
| 47–50 s | N01 |
| 50–55 s | F01 |

As transições usam sobreposição curta de aproximadamente 0,38 s, incluída nas janelas aprovadas. Não há tempo extra fora dos 55 segundos.

## Implementação de câmera

Os crops percentuais da biblioteca foram convertidos em combinações de `object-position`, escala e pequenos deslocamentos. Nenhum arquivo raster foi recortado fisicamente.

Diferenças objetivas em relação ao ponto de partida da Camera Library:

1. M01, M02 e M03 preservam a largura completa da captura dentro da moldura. O crop vertical ficou menos agressivo que os percentuais iniciais, pois o zoom simultâneo nos dois eixos cortava títulos, cards e o botão do diário. A câmera ocorre pela continuidade da moldura e pela troca de região vertical.
2. R01 e C01 usam `object-fit: contain` no início para preservar o contexto WIDE completo. Seus push-ins foram ampliados durante o QA para que a interface se torne protagonista antes da saída.
3. R03 usa foco à direita e escala aproximada de 1,36–1,40 para manter o modal completo, sem pedaços competitivos da tela anterior.
4. T02 recebe a maior aproximação do desktop, mantendo o card de evolução e os controles visíveis.
5. D02 revela o crop de exportação apenas na segunda metade do shot, como um único apoio; ele não é ampliado para ocupar o quadro.
6. A rede fica atrás das superfícies de produto. Nos shots de interface, as linhas não podem atravessar dados porque possuem z-index inferior às capturas.
7. O fechamento não usa a saída vertical aplicada aos demais shots. Essa exceção mantém o QR exatamente imóvel de 50,4 s a 54,4 s.

## Privacidade

Foram adicionadas máscaras não destrutivas e discretas sobre regiões com listas de nomes em:

- R04 — Chegadas;
- T01 — Agenda do terapeuta;
- C02 — Supervisão;
- C03 — Clínica e equipe.

As máscaras usam desfoque leve e cobertura translúcida no HTML/CSS. Os screenshots originais permanecem intactos. Elas precisam de revisão humana porque o equilíbrio entre privacidade e leitura depende do monitor e da distância do stand.

## Tipografia

Bricolage Grotesque e Figtree não foram encontradas em `C:/Windows/Fonts` durante a implementação. O animatic usa pilhas locais, sem internet:

- títulos: Bricolage Grotesque, com fallback para Segoe UI e Arial;
- corpo: Figtree, com fallback para Segoe UI e Arial.

Nenhum arquivo de fonte foi baixado, incorporado ou redistribuído. O fallback atual é funcional, mas muda o desenho e as quebras de linha; a definição tipográfica fica para o acabamento após aprovação visual.

## Marca, QR e rede

O logo usado é `cuidartea_logo_master_v01.png`. O QR usa primeiro o SVG oficial e troca para PNG apenas se o SVG falhar. A margem branca faz parte do painel de QR e foi preservada.

A rede é um SVG de fundo com três curvas e onze pontos distribuídos nas margens; nove são a leitura conceitual principal e dois ajudam a continuidade fora do campo central. As linhas ganham presença na abertura e em N01, sem fluxo de dados, partículas ou movimento atravessando interfaces.

Nos últimos 0,6 s, uma cópia da estrutura gráfica da abertura entra enquanto marca e QR saem. A costura evita preto, flash e quadro vazio.

## Pendências deliberadas

- Aprovação visual dos 55 segundos completos.
- Ajuste fino dos crops após assistir em escala real.
- Decisão sobre as fontes finais.
- Confirmação dos dados demonstrativos e das máscaras de privacidade.
- Validação humana do destino e leitura do QR em celular físico.
- Polimento de easing, curvas, parallax e composição após aprovação.
- Remoção dos controles e selo apenas na etapa de acabamento/exportação.

Nenhum master foi renderizado ou exportado nesta etapa.


## VISUAL POLISH 01 — implementação aprovada para revisão

### Checkpoint

Antes das alterações, os cinco arquivos solicitados foram copiados para `_snapshots/animatic_01`:

- `stand_loop_v05.html`
- `stand_loop_v05.css`
- `stand_loop_v05.js`
- `QA_V05.md`
- `NOTAS_IMPLEMENTACAO_V05.md`

Nenhum asset foi duplicado no snapshot.

### Mobile persistente

M01, M02 e M03 agora compartilham uma única instância de `.phone-wrap`, medindo 360 × 736 px antes da escala. Três capturas oficiais ficam empilhadas no mesmo viewport e fazem crossfade enquanto o device continua sua trajetória.

A sequência implementa:

- M01: escala 0,60 → 0,88, rotação −5° → −1°, aproximação e hold da home completa;
- M02: continuidade até escala 1,13, menu inteiro e deslocamento progressivo à direita;
- M03: escala máxima 1,50, saída parcial do quadro, zoom interno 1,12, pan vertical −10%, hero hold e pull-out até escala 0,74 para R01.

A captura M03 conclui sua entrada em 9,08 s, 0,07 s antes do limite de 9,15 s da spec. Esse é o único desvio temporal relevante e elimina dupla exposição no início do push-in.

### Brand Stage

O fundo claro foi substituído por um campo azul profundo contínuo, com quatro massas orgânicas em cyan, teal, azul e laranja/amarelo. As massas usam parallax senoidal de 8–28 px e retornam ao mesmo estado de posição e velocidade em 55 s. O centro mantém contraste e espaço para copy e produto.

### Rede e constelação

A rede continua em SVG atrás das cenas e agora possui:

- drift individual de 6–14 px nos nós;
- respiração de raio e opacidade em harmônicos inteiros;
- três curvas estruturais com respiração lenta;
- três pulsos viajantes com uma, duas e três voltas exatas por ciclo;
- presença reforçada em A01 e N01.

Todos os movimentos derivam de `theta = 2π × t / 55`, portanto fecham matematicamente na costura.

### Marca

A inspeção dos arquivos oficiais confirmou:

- `cuidartea_logo_master_v01.png`: RGB, sem transparência;
- `logo.png` / `cuidartea_logo_simbolo_v01.png`: símbolo oficial RGBA com transparência.

O símbolo `03_ASSETS_EVENTO/logo/logo.png` passou a ser usado no brand bug, abertura e fechamento. O original não foi modificado. O cartão branco deixou de aparecer durante os blocos de produto.

### Hardware mobile

Não existe mockup frontal local autorizado no projeto. Nenhum arquivo externo foi procurado ou baixado. O mockup CSS foi refinado com moldura mais fina, raio contemporâneo, detalhe lateral discreto, notch menor e sombra de profundidade.

### Janelas desktop

Cada shot desktop recebeu um frame próprio baseado na proporção da captura original. As imagens usam `object-fit: cover`, preenchem a janela e não criam letterbox. Push-ins continuam não destrutivos por `transform` e `object-position`.

Os maiores frames foram reservados aos hero moments e às capturas horizontais. Títulos e subtítulos permanecem acima da faixa de produto.

### Continuidade e QA visual

- O badge de revisão foi removido do palco e movido para a barra de controles.
- A barra de progresso deixou de aparecer dentro do Brand Stage.
- M03 entrega R01 por pull-out e sobreposição curta.
- T02 e T03 mantêm hero moments com escala e hold.
- N01 reúne PTS desktop e home mobile no mesmo universo.
- C03 permanece `Clínica e equipe`; C05 não foi usado.
- QR e fechamento mantêm suas coordenadas durante mais de quatro segundos.

### Estado atual

O Visual Polish 01 passou no QA automatizado e está pronto para revisão humana no navegador. Continua sendo animatic: nenhum master, vídeo ou render final foi gerado.

### Ajuste de fundo aprovado por referência

O fundo do Visual Polish 01 foi substituído pela linguagem visual da imagem enviada: campo azul `#214eaa`, recorte ciano superior esquerdo, laranja superior direito, onda ciano inferior e arco teal. A imagem anexada serviu apenas como referência; não foi copiada para assets nem aplicada como wallpaper. As formas permanecem vetoriais/CSS e periódicas em 55 s.
