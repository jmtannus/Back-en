# Notas de produção — Stand Loop V02

## Preview

Abrir `stand_loop_v02.html` em Chrome ou Edge. O protótipo é local, autocontido e não depende de servidor, rede, áudio ou instalação. O player inicia somente após decodificar as 13 capturas e o logo; essa espera não conta nos 38 segundos. Se uma imagem falhar, a reprodução não inicia e a tela informa a falha. Para examinar um ponto exato sem reprodução, acrescentar `?t=22` ao caminho/URL do arquivo. Barra de espaço pausa; setas avançam/retrocedem um segundo; F alterna tela cheia; H oculta os controles.

## Duração e estrutura

1920 × 1080, 16:9, 38 segundos em loop contínuo. A timeline é determinística e pode ser inspecionada por tempo. Não foi exportado MP4 nesta entrega.

| Tempo | Conteúdo |
| --- | --- |
| 0–4 s | “9 pontos da rede. 1 plataforma.”, constelação incompleta se conectando. |
| 4–9 s | Recepção: visão geral, agenda, agendamento. |
| 9–15 s | Terapeuta: agenda, paciente/análise de IA, evolução diária e PTS. |
| 15–21 s | Coordenação: indicadores, supervisão do PTS, captação/anamneses. |
| 21–27 s | Administrador: indicadores, relatórios, PTS. |
| 27–33 s | Rede integrada, “20 segundos para registrar” e “0 dado digitado duas vezes”. |
| 33–38 s | Logo, “Humano. Claro. Conectado.”, CTA e área reservada ao QR. |

## Decisões de motion

O produto ocupa um único plano de 1760 × 830 px (aproximadamente 70% da área total, mais de 91% da largura) entre 4 e 27 segundos. As capturas alternam dentro desse plano contínuo, sem reproduzir cliques ou componentes falsos. Recepção e Terapeuta usam continuidade horizontal; Coordenação usa reveal vertical; Administrador usa focus/crossfade discreto para evitar repetição visual com o bloco anterior. O perfil é identificado fora da interface. As linhas ficam no perímetro durante o produto; depois os nós se reorganizam como metáfora editorial da rede. Um único “0” visual persiste da mensagem de 20 segundos para a de duplicidade. A marca aumenta no fechamento e conduz o retorno à abertura. A assinatura sai inteira, há uma breve pausa visual com a marca, e a mensagem inicial reaparece completa.

A cor azul `#00337f` foi observada no logo oficial. Ciano/teal e neutros seguem a direção pedida, com amarelo discreto como acento. Não há áudio, pessoas, HUD, hologramas ou partículas.

## Diferenças em relação à V01

A V01 tinha espaços reservados para telas profissional e municipal. A V02 usa 13 capturas oficiais organizadas para quatro perfis; o produto domina 23 dos 38 segundos. A sequência mudou para Recepção → Terapeuta → Coordenação → Administrador, seguida da rede integrada. A rede tornou-se uma transição periférica nas telas reais, assume a composição na integração e recua no fechamento para liberar a marca e o QR. O fechamento usa a assinatura “Humano. Claro. Conectado.” e reserva uma área limpa para o QR.

## Limitações para versão final

- O QR é apenas uma área reservada. Inserir código final após definir e testar o destino; a janela estável de leitura no fechamento é de cerca de 3,5 segundos e deve ser reavaliada para escaneamento real na TV do stand.
- As capturas têm resolução abaixo de 1920 × 1080 e podem suavizar na TV. A V02 preserva os arquivos e aplica apenas enquadramento no navegador; versões oficiais em maior resolução poderão substituí-las mediante atualização do manifesto.
- Alguns JPGs contêm nomes, horários e números visíveis no material oficial. Confirmar que estão liberados para exibição pública no evento antes do export final. Não houve edição nem substituição desses dados.
- A sequência rápida mostra identidade e estrutura das telas, sem pretender leitura completa de tabelas pequenas. Validar o preview na TV e à distância do stand.
- O conteúdo “Humano. Claro. Conectado.” e a abertura “9 pontos da rede. 1 plataforma.” seguem o briefing V02. As formulações alternativas dos PDFs seguem documentadas na pré-produção, que não foi sobrescrita.

## Verificação da V02

A verificação final cobre sintaxe JavaScript, referências de assets, dimensões do palco, duração e comparação SHA-256 das 13 cópias com seus originais. Nenhuma dependência foi instalada. A inspeção visual deve ser repetida na TV do stand antes do export final, principalmente para leitura à distância e tempo de escaneamento do QR.


## Revisão visual final

- **Legibilidade das telas:** visão geral, agenda, evolução, PTS, indicadores e relatórios foram examinados em capturas de 1920 × 1080. Cabeçalhos e organização são reconhecíveis. As tabelas de dados menores continuam dependentes de visualização próxima; o vídeo não as usa como mensagem principal.
- **Tamanho das interfaces:** o plano ocupa 1760 × 830 px, ou 70,45% do quadro. A captura domina os quatro blocos e permanece frontal.
- **Clareza dos blocos:** o nome do perfil e a seção aparecem fora da captura. Recepção, Terapeuta, Coordenação e Administrador têm sequências distintas e telas do perfil correspondente.
- **Suavidade:** um mesmo plano acompanha as trocas por continuity, reveal e focus discretos. A saída do produto dá origem à rede; o fechamento limpa a constelação, conserva a marca e devolve a composição inicial sem texto partido.
- **Equilíbrio:** a rede fica no perímetro enquanto as capturas estão presentes. No fechamento, suas linhas e nós somem antes da leitura da marca, assinatura e QR.
- **Leitura do fechamento:** marca, três palavras e CTA ficam estáveis antes da passagem final. A área do QR é opaca e livre de linhas.
