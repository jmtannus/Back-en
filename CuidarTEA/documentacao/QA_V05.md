# QA V05 — animatic funcional

## Status

**VISUAL POLISH 01 implementado e aprovado no QA automatizado. Aguardando revisão visual humana. Não aprovado como master final.**

Ambiente usado: Chromium headless, viewport 1920 × 1080, reprodução local por `file://`, sem rede e sem áudio.

## Resultados

| Verificação obrigatória | Resultado | Evidência / observação |
|---|---|---|
| Reproduzir os 55 s completos | PASSOU | Reprodução final, após todas as correções, detectou o retorno de 55 → 0 em 55.000 ms; quadro seguinte em 0,059 s. |
| Timeline real | PASSOU | 19 IDs vistos na ordem A01, M01–M03, R01–R04, T01–T03, C01–C03, D01–D03, N01 e F01. |
| Cada crop | PASSOU NO ANIMATIC / REVISÃO HUMANA | Quadros-chave e hero moments inspecionados em 1920 × 1080. Mobile corrigido para largura integral; modal R03 completo; C01 em tela cheia; D02 com apoio pequeno; telas vazias ausentes. |
| Leitura dos títulos | PASSOU | Rótulo de perfil e título ficam acima do produto; não houve clipping no viewport 1920 × 1080. |
| Cortes acidentais | PASSOU NO ANIMATIC | Componentes focais permanecem inteiros nos quadros amostrados. Ajuste fino ainda depende do monitor real. |
| Rede sobre dados | PASSOU | Rede renderizada atrás das superfícies; não cruza captura, tabela, indicador ou QR. |
| Distinção de perfis | PASSOU | Família usa mobile; Recepção, Terapeuta, Coordenação e Administrador têm rótulos persistentes e conteúdo próprio. |
| Mobile + desktop no mesmo universo | PASSOU | Mesmo Brand Stage, bordas, curvas e tratamento de entrada; N01 reúne um desktop protagonista e um mobile de apoio. |
| Loop 55 → 0 | PASSOU TECNICAMENTE / REVISÃO HUMANA | Não há preto, flash ou vazio. De 54,4 a 55 s a estrutura da abertura reaparece; avaliar suavidade assistindo em tela real. |
| Console sem erros | PASSOU | Zero `console.error`, zero `pageerror`; todas as imagens retornaram `naturalWidth > 0`. |

## QA técnico complementar

- Timeline varrida em passos de 0,05 s: soma mínima das opacidades = **1**, sem quadro vazio.
- Máximo de **duas cenas** simultâneas, somente nos crossfades.
- Reprodução final encontrou os 19 IDs na ordem correta e retornou ao início em 55.000 ms.
- Zero recursos externos: todas as requisições são locais por `file://`.
- Zero elementos `<audio>` ou `<video>`.
- Controles verificados: setas avançam/recuam, Espaço controla reprodução e H oculta a interface de revisão.
- Escalonamento verificado em 1366 × 768, 1920 × 1080 e 3840 × 2160, preservando o canvas 16:9.
## Verificação do QR

O painel do QR e a imagem interna mantiveram coordenadas idênticas entre 50,5 s e 54,2 s:

- painel: x 1230, y 225, 480 × 530 px;
- QR: x 1264, y 259, 412 × 412 px;
- transformação: matriz identidade nos dois instantes.

Isso confirma pelo menos 3,7 s medidos entre amostras e uma janela programada imóvel de **50,4 a 54,4 s**, totalizando 4 s. A partir de 54,4 s, o conteúdo do fechamento desaparece para preparar a abertura. O painel de QR não recebe linha de rede por cima.

O teste automatizado comprova estabilidade visual e carregamento do SVG, mas não comprova o destino. Escanear com um telefone físico no monitor do evento antes de qualquer master.

## Ajustes feitos durante o QA

O primeiro teste detectou que a regra geral de saída deslocava o fechamento verticalmente a partir de 54,1 s. Isso movia o QR antes de completar a janela imóvel. F01 recebeu uma exceção: o contêiner permanece fixo, e somente a costura interna atua nos últimos 0,6 s. O teste foi repetido e confirmou coordenadas idênticas.

A comparação inicial da costura também revelou que a abertura herdava um deslocamento de entrada e que o contêiner F01 ainda recebia o fade geral. Ambos foram removidos da costura. O movimento dos pontos passou a ser periódico em 55 s. A diferença média absoluta entre capturas de 54,999 s e 0,001 s, desconsiderando a barra de progresso, ficou em aproximadamente **0,06 por canal numa escala de 0–255**; a diferença residual corresponde ao intervalo de 0,002 s entre as amostras.
A revisão em resolução cheia encontrou que a regra de dimensionamento das imagens estava restrita aos frames desktop. M01–M03 eram exibidos no tamanho natural e cortados pela moldura. A regra foi generalizada para todas as capturas; o card, o botão e a largura do mobile passaram a aparecer integralmente. Os push-ins de R01 e C01 também foram reforçados para melhorar a leitura depois do WIDE.

## Desvios relevantes da Camera Library

- **M01, M02 e M03:** o crop vertical foi aberto e o zoom interno removido. Foi um desvio necessário: aplicar literalmente a janela estreita cortava componentes no eixo horizontal. A moldura e a posição vertical continuam conduzindo a câmera.
- **R01:** mantém o WIDE completo, mas usa push-in mais forte no fim para aproximar a Agenda de hoje.
- **C01:** mantém a nova captura em tela cheia como WIDE real; a escala final foi ampliada para tornar resumo e gráfico reconhecíveis.
- **R03:** o foco foi deslocado para a direita e calibrado pelo modal inteiro; a área escurecida da tela anterior permanece apenas como contexto capturado.
- **D02:** o apoio de exportação entra somente na segunda metade e fica menor que o crop sugerido para preservar sua resolução.
- **F01:** não recebe o movimento geral de saída. A transição acontece internamente para garantir quatro segundos de QR imóvel e continuidade com A01.

## Privacidade

Máscaras CSS não destrutivas foram aplicadas em R04, T01, C02 e C03 sobre áreas de nomes. Não houve alteração dos screenshots. Nenhum telefone, CPF ou documento é destacado pelo enquadramento principal.

Pendência: conferir em tela cheia se o desfoque é suficiente sem prejudicar a leitura da estrutura das tabelas. Se a base de demonstração for formalmente confirmada como fictícia, as máscaras podem ser recalibradas no acabamento.

## Pontos de revisão humana

1. Assistir os 55 segundos sem usar o scrub e avaliar se o ritmo parece calmo.
2. Conferir se M03, T02 e T03 têm tempo suficiente para serem percebidos como hero moments.
3. Avaliar a escala das interfaces entre 2 e 4 metros de distância.
4. Confirmar que as máscaras de privacidade são discretas e suficientes.
5. Comparar fallback Segoe UI com Bricolage Grotesque/Figtree antes do acabamento.
6. Escanear o QR em celular físico e confirmar o destino.
7. Julgar a transição 54,4–55–0 em reprodução contínua.
8. C03 permanece como “Clínica e equipe” nesta rodada; C05 não foi usado.

## Limites desta validação

Não houve teste no monitor físico do evento, validação do destino do QR, aprovação de privacidade pela equipe nem revisão de marca final. Os quadros de QA foram produzidos somente em diretório temporário para inspeção interna; nenhum vídeo ou master foi exportado.





## VISUAL POLISH 01 — QA de 23/09/2026

Esta rodada substitui, para avaliação atual, as observações visuais do animatic inicial registradas acima. O snapshot anterior permanece em `_snapshots/animatic_01`.

### Resultado da revisão obrigatória

| Item | Resultado | Evidência |
|---|---|---|
| M01 | PASSOU | Device em entrada progressiva, home completa e legível; saudação, perfil, pergunta e opções de humor reconhecíveis. |
| M02 | PASSOU | Mesmo device, sem reset; escala maior e menu de seções inteiro. |
| M03 | PASSOU | Ápice do bloco mobile; device em escala 1,50, parcialmente fora à direita, pan interno até −10% e hero hold. |
| R01 | PASSOU | Visão geral em frame 1,555:1, preenchido edge-to-edge, abaixo da safe area. |
| R03 | PASSOU | Modal completo e foco editorial preservado. |
| T02 | PASSOU | Push-in mais forte do desktop, com voz/IA reconhecíveis. |
| T03 | PASSOU | PTS amplo, estável e reconhecível como hero. |
| C01 | PASSOU | `01_coordenacao_indicadores_tela-cheia.jpg` permanece como WIDE principal, sem letterbox. |
| D02 | PASSOU | Relatório principal e apoio de exportação mantêm hierarquia. |
| N01 | PASSOU | Desktop e mobile reconhecíveis, com rede mais presente atrás das interfaces. |
| F01 | PASSOU | Símbolo oficial, assinatura e QR em composição estável. |

### QA técnico repetido

- **55 segundos / 19 shots:** reprodução em tempo real completou um ciclo e observou A01, M01–M03, R01–R04, T01–T03, C01–C03, D01–D03, N01 e F01 na ordem correta.
- **Timeline determinística:** permanece baseada no tempo corrente e em `requestAnimationFrame`; a API local `window.standLoopV05` foi adicionada apenas para inspeção e seek de QA.
- **Quadros vazios:** varredura em passos de 0,1 s não encontrou amostras sem cena ativa.
- **Transições:** máximo de duas cenas simultâneas nos crossfades.
- **Console:** zero `pageerror` e zero mensagens `console.error`.
- **Assets:** nenhuma imagem com `naturalWidth = 0`, nenhuma requisição externa e nenhuma falha de carregamento.
- **Escala:** canvas preservado em 1366 × 768, 1920 × 1080 e 3840 × 2160.
- **QR:** painel em x 1230, y 225, 480 × 530 px e imagem em x 1264, y 259, 412 × 412 px tanto em 50,5 s quanto em 54,2 s. Janela imóvel programada: 50,0–54,4 s.
- **Costura:** diferença média absoluta entre 54,999 s e 0,001 s = **0,0021 por canal** numa escala de 0–255; sem preto, flash ou salto perceptível.
- **Rede:** curvas, pulsos e nós usam somente ciclos inteiros sobre a fase global de 55 s. O layer permanece atrás de copy e interfaces.
- **Privacidade:** máscaras continuam presentes em R04, T01, C02 e C03.
- **C03:** permanece `Clínica e equipe`, usando `03_coordenacao/04_coordenacao_minha_clinica.jpg`. C05 não foi usado.

### Motion Spec M01–M03

A trajetória aprovada foi implementada com o device-base 360 × 736 px e os keyframes de posição, escala e rotação descritos em `ANALISE_REFERENCIAS_MOTION_V05.md`. O hardware é uma única instância persistente; apenas as três camadas internas de UI fazem crossfade.

Único ajuste temporal: a captura de M03 conclui o crossfade em 9,08 s, cerca de 0,07 s antes do limite indicado de 9,15 s. O ajuste elimina dupla exposição no início do push-in e não muda posição, escala, rotação, pan, hold ou pull-out da Motion Spec.

### Marca e mockup

Não foi encontrado mockup frontal local autorizado. O hardware CSS foi refinado com borda de 8 px, raio menor, detalhe lateral discreto e sombra com profundidade. Nenhum asset externo foi buscado ou baixado.

O master disponível é RGB e possui fundo branco. O asset oficial `03_ASSETS_EVENTO/logo/logo.png` é o símbolo isolado com transparência real e foi usado como brand bug e nas composições de abertura/fechamento. Nenhum arquivo de marca foi alterado.

### Pendências humanas após o Visual Polish 01

1. Assistir o ciclo completo no navegador e decidir se a amplitude máxima de M03 está confortável na distância real do stand.
2. Confirmar se o símbolo isolado é suficiente no fechamento ou se será fornecido um lockup oficial transparente.
3. Avaliar legibilidade das capturas no monitor físico, especialmente R01, C01 e D02.
4. Conferir as máscaras de privacidade em tela real.
5. Escanear o QR com telefone físico e validar o destino.
6. Aprovar ritmo, composição, marca e costura antes de qualquer acabamento ou renderização.

### Ajuste de fundo após Visual Polish 01

O Brand Stage foi recalibrado a partir da referência visual enviada pelo usuário: azul chapado `#214eaa`, massa ciano superior, forma laranja no canto direito, onda inferior `#3d90c0` e curva teal. A captura de referência não foi usada como wallpaper porque contém logo, tipografia e controles; a geometria foi reconstruída em CSS e mantém o movimento periódico de 55 s.

Após o ajuste: zero erros de console, zero imagens ausentes e diferença média da costura 54,999 → 0,001 s de **0,0020 por canal**.
