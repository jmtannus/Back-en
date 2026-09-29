# Reconstrução da V06

Este pacote contém o necessário para abrir, revisar e reconstruir o animatic V06.

## Estrutura

- `stand_loop_v06/`: HTML, CSS, JavaScript e todos os assets carregados pelo animatic.
- `documentacao/`: direção, roteiro, câmera, inventário de assets, análise de referências, notas de implementação e QA da base V05 que levou à V06.
- `DESIGN_SYSTEM_V06.md`: tokens, composição, tipografia e regras visuais consolidadas da V06.

## Execução local

1. Abra `stand_loop_v06/index.html` em um navegador moderno, ou sirva a pasta por um servidor estático.
2. Use os controles na parte inferior para reproduzir, pausar, reiniciar ou navegar pelos 55 segundos.
3. Não há etapa de renderização de master neste pacote.

## Dependências

O animatic não depende de NPM, build ou servidores de aplicação. Os caminhos são relativos e os seguintes arquivos devem permanecer juntos:

- `index.html`, `stand_loop_v06.html`, `stand_loop_v06.css`, `stand_loop_v06.js`;
- toda a pasta `assets/`.

## Regras editoriais preservadas

- 19 cenas e duração de 55 segundos.
- C03 permanece como **Clínica e equipe**.
- As telas vazias não ocupam papel de hero.
- `04_admin_pts.jpg` representa visão consolidada/relatório associado a planos terapêuticos, não prontuário individual.
- Os nove portais são: Família, Professor, Professor AEE, Escola, Clínica, UBS, CRAS, Regulação e Gestor.
- A marca usada é o SVG oficial incluído neste repositório.

## Validação registrada

A cópia portátil foi aberta em navegador antes da publicação: 55 segundos, 19 cenas, nenhuma imagem quebrada e nenhum erro de console. A Vercel está conectada a este repositório para novas publicações.
