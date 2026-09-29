/* CuidarTEA Stand Loop V06 — VISUAL POLISH 01, 55 s, sem áudio. */
'use strict';

(() => {
  const DURATION = 55;
  const OFFICIAL = 'assets/platform/';
  const BRAND = 'assets/brand/';
  const $ = (id) => document.getElementById(id);
  const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const mix = (a, b, p) => a + (b - a) * p;
  const smooth = (p) => { p = clamp(p); return p * p * p * (p * (p * 6 - 15) + 10); };
  const between = (x, a, b) => smooth((x - a) / (b - a));

  const shots = [
    { id:'A01', start:0, dur:3, kind:'opening', profile:'CuidarTEA', title:'9 pontos da rede.', subtitle:'1 plataforma.' },
    { id:'M01', start:3, dur:3.25, kind:'mobile', profile:'Família', title:'Como está hoje?', subtitle:'A experiência começa com a família.', image:'05_mobile_familia/01_mobile_home_humor.jpeg', pos:[50,28] },
    { id:'M02', start:6.25, dur:2.75, kind:'mobile', profile:'Família', title:'Todas as seções', subtitle:'Cada recurso no seu lugar.', image:'05_mobile_familia/02_mobile_menu_secoes.jpeg', pos:[50,58] },
    { id:'M03', start:9, dur:3.5, kind:'mobile', profile:'Família', title:'Diário por voz', subtitle:'Registre sem digitar.', image:'05_mobile_familia/03_mobile_diario_voz_ia.jpeg', pos:[50,22] },
    { id:'R01', start:12.5, dur:2.75, kind:'desktop', profile:'Recepção', title:'A operação do dia', subtitle:'Da visão geral à agenda.', image:'01_recepcao/01_recepcao_visao_geral.jpg', pos:[55,52], zoom:[1.0,1.08], frame:[570,330,1140,733] },
    { id:'R02', start:15.25, dur:2.25, kind:'desktop', profile:'Recepção', title:'Agenda por salas', subtitle:'Horários e espaços organizados.', image:'01_recepcao/03_recepcao_agenda_salas.jpg', pos:[57,55], zoom:[1.0,1.06], pan:[-1.2,0], frame:[530,340,1120,710] },
    { id:'R03', start:17.5, dur:2.75, kind:'desktop', profile:'Recepção', title:'Agendamento', subtitle:'O modal completo, no momento certo.', image:'01_recepcao/04_recepcao_modal_agendamento.jpg', pos:[70,50], zoom:[1.0,1.10], frame:[590,330,1100,699] },
    { id:'R04', start:20.25, dur:2.25, kind:'desktop', profile:'Recepção', title:'Chegadas de hoje', subtitle:'Acompanhamento claro da recepção.', image:'01_recepcao/05_recepcao_chegadas_hoje.jpg', pos:[60,34], zoom:[1.0,1.07], mask:{x:15,y:30,w:31,h:42}, frame:[500,330,1150,732] },
    { id:'T01', start:22.5, dur:2.75, kind:'desktop', profile:'Terapeuta', title:'Agenda e atendimento', subtitle:'O cuidado parte do contexto certo.', image:'02_terapeuta/01_terapeuta_agenda.jpg', pos:[60,60], zoom:[1.0,1.08], pan:[-1,0], mask:{x:16,y:45,w:30,h:28}, frame:[640,330,990,708] },
    { id:'T02', start:25.25, dur:4, kind:'desktop', profile:'Terapeuta', title:'Evolução diária', subtitle:'Voz e IA como apoio ao registro.', image:'02_terapeuta/03_terapeuta_evolucao_ia.jpg', pos:[62,58], zoom:[1.02,1.18], frame:[610,320,1035,735] },
    { id:'T03', start:29.25, dur:3.25, kind:'desktop', profile:'Terapeuta', title:'Plano Terapêutico Singular', subtitle:'O plano ganha espaço para ser reconhecido.', image:'02_terapeuta/05_terapeuta_pts.jpg', pos:[62,52], zoom:[1.0,1.07], frame:[300,340,1320,740] },
    { id:'C01', start:32.5, dur:3, kind:'desktop', profile:'Coordenação', title:'Visão ampla', subtitle:'Indicadores em contexto.', image:'03_coordenacao/01_coordenacao_indicadores_tela-cheia.jpg', pos:[52,46], zoom:[1.0,1.08], frame:[590,330,1040,723] },
    { id:'C02', start:35.5, dur:2.5, kind:'desktop', profile:'Coordenação', title:'Supervisão', subtitle:'Acompanhamento da equipe.', image:'03_coordenacao/02_coordenacao_supervisao.jpg', pos:[58,34], zoom:[1.0,1.07], mask:{x:18,y:29,w:34,h:43}, frame:[350,350,1240,707] },
    { id:'C03', start:38, dur:2.5, kind:'desktop', profile:'Coordenação', title:'Clínica e equipe', subtitle:'Uma visão organizada dos profissionais.', image:'03_coordenacao/04_coordenacao_minha_clinica.jpg', pos:[59,32], zoom:[1.0,1.07], pan:[0,-1], mask:{x:17,y:32,w:34,h:40}, frame:[500,340,1120,707] },
    { id:'D01', start:40.5, dur:2, kind:'desktop', profile:'Administrador', title:'Indicadores da clínica', subtitle:'A gestão começa pela visão do conjunto.', image:'04_administrador/01_admin_indicadores.jpg', pos:[58,34], zoom:[1.0,1.07], frame:[610,330,1020,720] },
    { id:'D02', start:42.5, dur:2.5, kind:'desktop', profile:'Administrador', title:'Relatórios e exportação', subtitle:'Contexto primeiro. Ação em detalhe.', image:'04_administrador/02_admin_relatorios.jpg', pos:[58,31], zoom:[1.0,1.06], support:'04_administrador/03_admin_exportacao.jpg', frame:[530,330,1020,718] },
    { id:'D03', start:45, dur:2, kind:'desktop', profile:'Administrador', title:'Visão consolidada', subtitle:'Relatório relacionado aos planos terapêuticos.', image:'04_administrador/04_admin_pts.jpg', pos:[58,56], zoom:[1.0,1.06], frame:[680,340,930,695] },
    { id:'N01', start:47, dur:3, kind:'network', profile:'Rede integrada', title:'Uma rede. Uma visão.', subtitle:'Família e clínica no mesmo universo visual.' },
    { id:'F01', start:50, dur:5, kind:'closing', profile:'CuidarTEA', title:'Inclusão é amor em ação!', subtitle:'@cuidartea.oficial' }
  ];

  const sceneLayer = $('sceneLayer');
  const sceneById = new Map();

  function header(shot) {
    return `<div class="eyebrow">${shot.profile}</div>
      <h2 class="scene-title">${shot.title}</h2>
      <p class="scene-subtitle">${shot.subtitle}</p>`;
  }

  function capture(src, alt, pos = [50,50], zoom = [1,1], fit = 'cover') {
    const img = document.createElement('img');
    img.className = 'capture';
    img.src = `${OFFICIAL}${src}`;
    img.alt = alt;
    img.loading = 'eager';
    img.decoding = 'async';
    img.style.setProperty('--pos-x', `${pos[0]}%`);
    img.style.setProperty('--pos-y', `${pos[1]}%`);
    img.style.setProperty('--zoom', zoom[0]);
    img.style.objectFit = fit;
    return img;
  }

  function addPrivacyMask(screen, mask) {
    if (!mask) return;
    const veil = document.createElement('div');
    veil.className = 'privacy-wash';
    Object.assign(veil.style, { left:`${mask.x}%`, top:`${mask.y}%`, width:`${mask.w}%`, height:`${mask.h}%` });
    screen.append(veil);
  }

  function openingCore(className = 'opening-core') {
    const core = document.createElement('div');
    core.className = className;
    core.innerHTML = `<img class="opening-mark" src="assets/CuidarTEA_Typography_Personal_Logo.svg" alt="CuidarTEA">
      <div class="opening-number">9</div>
      <div class="opening-copy"><h1>pontos<br>da rede.</h1><p>1 plataforma.</p></div>
      <div class="opening-rule"></div>
      <div class="portal-map">
        <span style="--x:8%;--y:18%">Família</span><span style="--x:38%;--y:4%">Professor</span>
        <span style="--x:72%;--y:14%">Professor AEE</span><span style="--x:87%;--y:43%">Escola</span>
        <span style="--x:72%;--y:76%">Clínica</span><span style="--x:39%;--y:88%">UBS</span>
        <span style="--x:8%;--y:74%">CRAS</span><span style="--x:-3%;--y:45%">Regulação</span>
        <span class="portal-core" style="--x:40%;--y:43%">Gestor</span>
      </div>`;
    return core;
  }

  function buildScene(shot) {
    const scene = document.createElement('article');
    scene.className = `scene scene-${shot.kind}`;
    scene.dataset.shot = shot.id;

    if (shot.kind === 'opening') {
      scene.append(openingCore());
    } else if (shot.kind === 'mobile') {
      scene.innerHTML = `<div class="mobile-copy"><div class="kicker">${shot.profile}</div><h2>${shot.title}</h2><p>${shot.subtitle}</p></div>`;
    } else if (shot.kind === 'desktop') {
      scene.innerHTML = header(shot);
      const laptop = document.createElement('div');
      laptop.className = 'laptop-shell';
      const screen = document.createElement('div');
      screen.className = 'screen desktop-screen';
      const img = capture(shot.image, shot.title, shot.pos, shot.zoom);
      screen.append(img);
      addPrivacyMask(screen, shot.mask);
      laptop.append(screen);
      scene.append(laptop);
      scene._capture = img;
      scene._device = laptop;
      scene._screen = screen;
      if (shot.support) {
        const support = document.createElement('div');
        support.className = 'support-card';
        support.innerHTML = `<img src="${OFFICIAL}${shot.support}" alt="Detalhe real dos comandos de exportação"><span class="support-tag">Exportação</span>`;
        scene.append(support);
        scene._support = support;
      }
    } else if (shot.kind === 'network') {
      scene.classList.add('network-scene');
      scene.innerHTML = header(shot);
      const desktop = document.createElement('div');
      desktop.className = 'screen network-desktop';
      desktop.append(capture('02_terapeuta/05_terapeuta_pts.jpg', 'Plano Terapêutico Singular', [62,52], [1.02,1.02]));
      const mobile = document.createElement('div');
      mobile.className = 'phone-wrap network-phone';
      mobile.innerHTML = '<div class="phone"><div class="phone-screen"></div></div>';
      mobile.querySelector('.phone-screen').append(capture('05_mobile_familia/01_mobile_home_humor.jpeg', 'Home da família', [50,28], [1.04,1.04]));
      scene.append(desktop, mobile);
      scene._device = desktop;
      scene._phone = mobile;
    } else if (shot.kind === 'closing') {
      scene.innerHTML = `<div class="closing-content">
          <div class="closing-atmosphere" aria-hidden="true">
            <i style="--x:8%;--y:26%;--delay:0s"></i><i style="--x:27%;--y:12%;--delay:.45s"></i>
            <i style="--x:48%;--y:20%;--delay:.9s"></i><i style="--x:58%;--y:72%;--delay:1.35s"></i>
            <i style="--x:30%;--y:84%;--delay:1.8s"></i><i style="--x:84%;--y:14%;--delay:2.25s"></i>
          </div>
          <div class="closing-orbit" aria-hidden="true"></div>
          <div class="brand-beam" aria-hidden="true"></div>
          <img class="closing-logo" src="assets/CuidarTEA_Typography_Personal_Logo.svg" alt="CuidarTEA">
          <div class="closing-copy"><div class="closing-cta">Conheça a plataforma</div><h2>${shot.title}</h2><p>Instagram · ${shot.subtitle}</p></div>
          <div class="qr-panel"><img src="${BRAND}QR_CuidarTEA_Instagram.svg" onerror="this.onerror=null;this.src='${BRAND}QR_CuidarTEA_Instagram.png'" alt="QR Code do Instagram CuidarTEA"><span>${shot.subtitle}</span></div>
        </div>`;
      scene.append(openingCore('seam-core'));
      scene._closing = scene.querySelector('.closing-content');
      scene._seam = scene.querySelector('.seam-core');
    }

    sceneLayer.append(scene);
    sceneById.set(shot.id, scene);
  }

  shots.forEach(buildScene);

  function buildMobileRig() {
    const rig = document.createElement('div');
    rig.id = 'mobileRig';
    rig.className = 'phone-wrap';
    rig.setAttribute('aria-hidden', 'true');
    rig.innerHTML = '<div class="phone"><div class="phone-screen"></div></div>';
    const screen = rig.querySelector('.phone-screen');
    const layers = shots.filter((shot) => shot.kind === 'mobile').map((shot) => {
      const img = capture(shot.image, shot.title, shot.pos, [1,1]);
      img.classList.add('mobile-ui', `ui-${shot.id}`);
      screen.append(img);
      return [shot.id, img];
    });
    sceneLayer.append(rig);
    return { rig, layers:new Map(layers) };
  }
  const mobileRig = buildMobileRig();

  const nodePositions = [
    [82,310],[310,108],[650,76],[1030,92],[1400,88],[1770,260],[1835,760],[1460,996],[470,984]
  ];
  const nodesGroup = $('networkNodes');
  const nodes = nodePositions.map(([x,y], index) => {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const r = index % 4 === 0 ? 7 : 5;
    c.setAttribute('r', r);
    c.classList.add('net-node');
    if (index === 4 || index === 8) c.classList.add('hot');
    if (index === 0 || index === 6) c.classList.add('core');
    nodesGroup.append(c);
    return { c, x, y, index, r };
  });

  const lines = [...document.querySelectorAll('.net-line')];
  const pulses = [...document.querySelectorAll('.net-pulse')];
  const paths = [
    'M74 310 C250 150 420 100 620 76 S1120 65 1305 78 S1760 150 1840 330',
    'M1840 330 C1880 560 1870 690 1835 780 S1690 955 1510 1000 S1170 1025 930 1015',
    'M930 1015 C650 1018 470 1010 350 988 S90 790 74 310',
    'M82 310 C420 390 680 520 1030 92 S1520 310 1835 760',
    'M310 108 C540 420 690 760 470 984 S1010 840 1460 996',
    'M650 76 C780 310 1020 520 1400 88 S1630 480 1770 260'
  ];
  lines.forEach((line, i) => line.setAttribute('d', paths[i]));
  pulses.forEach((line, i) => line.setAttribute('d', paths[i]));

  function keyframe(keys, t) {
    if (t <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
      if (t <= keys[i][0]) {
        const [a, av] = keys[i - 1];
        const [b, bv] = keys[i];
        const q = smooth((t - a) / (b - a));
        return av.map((value, j) => mix(value, bv[j], q));
      }
    }
    return keys.at(-1)[1];
  }

  const mobileKeys = [
    [3.00,[1300,625,.60,-5]],
    [4.20,[1210,585,.78,-2.5]],
    [5.20,[1140,565,.88,-1]],
    [5.85,[1140,565,.88,-1]],
    [6.25,[1185,575,.93,-.3]],
    [7.25,[1230,570,1.03,.4]],
    [8.00,[1230,570,1.03,.4]],
    [9.00,[1295,545,1.13,0]],
    [10.25,[1475,540,1.50,0]],
    [11.80,[1475,540,1.50,0]],
    [12.50,[1330,600,.74,1.5]]
  ];

  let playing = true;
  let current = 0;
  let anchorTime = performance.now();
  let anchorValue = 0;
  let raf = 0;
  const params = new URLSearchParams(location.search);
  if (params.has('t')) {
    current = clamp(Number(params.get('t')) || 0, 0, DURATION - .001);
    anchorValue = current;
    playing = false;
  }
  if (params.get('paused') === '1') playing = false;

  function alphaAt(shot, t) {
    const fade = .38;
    if (shot.id === 'A01' && t >= 0 && t < shot.start + shot.dur - fade) return 1;
    if (shot.id === 'F01' && t >= shot.start) return 1;
    if (t < shot.start - fade || t > shot.start + shot.dur) return 0;
    if (t < shot.start) return between(t, shot.start - fade, shot.start);
    if (t > shot.start + shot.dur - fade) return 1 - between(t, shot.start + shot.dur - fade, shot.start + shot.dur);
    return 1;
  }

  function formatTime(t) {
    const mins = Math.floor(t / 60).toString().padStart(2, '0');
    const secs = Math.floor(t % 60).toString().padStart(2, '0');
    const cs = Math.floor((t % 1) * 100).toString().padStart(2, '0');
    return `${mins}:${secs}.${cs}`;
  }

  function renderStage(t) {
    const theta = 2 * Math.PI * (t / DURATION);
    document.querySelector('.ambient-a').style.transform = `translate3d(${18*Math.sin(theta)}px,${10*Math.cos(theta)}px,0) rotate(${mix(-7,-3,(Math.sin(2*theta)+1)/2)}deg)`;
    document.querySelector('.ambient-b').style.transform = `translate3d(${12*Math.sin(theta+2.1)}px,${8*Math.cos(theta+2.1)}px,0) rotate(${14+2*Math.sin(2*theta+1)}deg)`;
    document.querySelector('.ambient-c').style.transform = `translate3d(${26*Math.sin(theta+3.2)}px,${14*Math.cos(theta+3.2)}px,0) rotate(${10+1.2*Math.sin(theta)}deg)`;
    document.querySelector('.ambient-d').style.transform = `translate3d(${16*Math.sin(2*theta+.7)}px,${9*Math.cos(theta+.7)}px,0) rotate(${-18+2*Math.sin(theta)}deg)`;
    const humanPlate = document.querySelector('.human-tech-plate');
    humanPlate.style.transform = 'translate3d(' + (10*Math.sin(theta*.5)) + 'px,' + (5*Math.cos(theta*.5)) + 'px,0) scale(' + (1.015 + .008*Math.sin(theta)) + ')';
  }

  function renderNetwork(t) {
    const theta = 2 * Math.PI * (t / DURATION);
    const integrated = between(t, 46.8, 47.7) * (1 - between(t, 49.5, 50.2));
    const opening = t < 3 ? 1 : (t > 54.4 ? between(t,54.4,55) : 0);
    const product = t >= 3 && t < 47 ? 1 : 0;
    const base = .28 + integrated * .30 + opening * .24 + product * .06;
    lines.forEach((line, i) => {
      const breathe = .84 + .16 * ((Math.sin((i+1)*theta + i*.9) + 1) / 2);
      line.style.opacity = String(base * breathe * (i === 2 ? .78 : 1));
    });
    pulses.forEach((pulse, i) => {
      pulse.style.opacity = String(.22 + integrated*.30 + opening*.20 + product*.08);
      pulse.style.strokeDashoffset = String(-((t / DURATION) * (8 + i * 2) + i * .23));
    });
document.querySelectorAll('.portal-map span').forEach((label, index) => {
      const dx = Math.sin(theta * (1 + index % 2) + index * .72) * (4 + index % 3);
      const dy = Math.cos(theta * (1 + index % 3) + index * .51) * (3 + index % 2);
      label.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0)';
    });
    nodes.forEach(({c,x,y,index,r}) => {
      const ampX = 6 + (index % 4) * 2.6;
      const ampY = 4 + (index % 3) * 2.7;
      const phase = index * .71;
      const kx = index % 3 === 0 ? 2 : 1;
      const ky = index % 4 === 0 ? 2 : 1;
      c.setAttribute('cx', String(x + Math.sin(kx*theta + phase) * ampX));
      c.setAttribute('cy', String(y + Math.cos(ky*theta + phase*.8) * ampY));
      c.setAttribute('r', String(r * (1 + .12*Math.sin((2 + index%2)*theta + phase))));
      c.style.opacity = String(.62 + .20*((Math.cos((2+index%2)*theta+phase)+1)/2) + integrated*.14 + opening*.10);
    });
  }

  function setCaptureMotion(img, zoom, panX = 0, panY = 0) {
    img.style.setProperty('--zoom', zoom.toFixed(4));
    img.style.setProperty('--pan-x', `${panX}%`);
    img.style.setProperty('--pan-y', `${panY}%`);
  }

  function renderMobileRig(t) {
    const on = t >= 3 && t <= 12.5;
    mobileRig.rig.style.visibility = on ? 'visible' : 'hidden';
    if (!on) { mobileRig.rig.style.opacity = '0'; return; }

    const [cx,cy,scale,deg] = keyframe(mobileKeys, t);
    const fadeIn = between(t,3,3.35);
    const fadeOut = 1 - between(t,12.2,12.5);
    mobileRig.rig.style.opacity = String(fadeIn * fadeOut);
    mobileRig.rig.style.transform = `translate3d(${cx-180}px,${cy-368}px,0) scale(${scale}) rotate(${deg}deg)`;

    const m1 = fadeIn * (1 - between(t,5.95,6.35));
    const m2 = between(t,5.95,6.35) * (1 - between(t,8.72,9.08));
    const m3 = between(t,8.72,9.08);
    const ui1 = mobileRig.layers.get('M01');
    const ui2 = mobileRig.layers.get('M02');
    const ui3 = mobileRig.layers.get('M03');
    ui1.style.opacity = String(m1);
    ui2.style.opacity = String(m2);
    ui3.style.opacity = String(m3);

    setCaptureMotion(ui1, mix(1,1.025,between(t,4.2,5.2)));
    setCaptureMotion(ui2, mix(1,1.045,between(t,8,9)));

    let z3 = 1;
    let pan3 = 0;
    if (t < 10.25) z3 = mix(1,1.07,between(t,9,10.25));
    else if (t < 11.15) {
      const q = between(t,10.25,11.15);
      z3 = mix(1.07,1.12,q);
      pan3 = mix(0,-10,q);
    } else if (t < 11.8) {
      z3 = 1.12;
      pan3 = -10;
    } else {
      const q = between(t,11.8,12.5);
      z3 = mix(1.12,1.04,q);
      pan3 = mix(-10,-4,q);
    }
    setCaptureMotion(ui3, z3, 0, pan3);
  }

  function renderShot(shot, t) {
    const scene = sceneById.get(shot.id);
    const alpha = alphaAt(shot, t);
    scene.classList.toggle('active', alpha > .001);
    scene.style.opacity = alpha.toFixed(4);
    if (alpha <= .001) return;

    const local = clamp((t - shot.start) / shot.dur);
    const settle = smooth(clamp(local / .34));
    const exit = smooth(clamp((local - .82) / .18));
    if (shot.kind === 'mobile') scene.style.transform = `translate3d(${mix(-20,0,settle)}px,${mix(10,0,settle)-exit*5}px,0)`;
    else scene.style.transform = `translate3d(0,${mix(13,0,settle)-exit*7}px,0)`;
    if (shot.kind === 'opening') scene.style.transform = 'none';

    if (scene._capture && shot.zoom) {
      const travel = smooth(clamp((local - .12) / .68));
      const zoom = mix(shot.zoom[0], shot.zoom[1], travel);
      const px = shot.pan ? mix(0, shot.pan[0], travel) : 0;
      const py = shot.pan ? mix(0, shot.pan[1], travel) : 0;
      setCaptureMotion(scene._capture, zoom, px, py);
    }
    if (scene._device) {
      const reveal = smooth(clamp(local / .18));
      if (shot.kind === 'desktop') {
        const direction = shots.indexOf(shot) % 2 === 0 ? 1 : -1;
        const lateralIn = mix(direction * 92, 0, settle);
        const lateralOut = exit * direction * -82;
        scene._device.style.transform = 'translate3d(' + (lateralIn + lateralOut) + 'px,' + mix(30,0,settle) + 'px,0) scale(' + mix(.96,1,settle) + ')';
        scene._device.style.opacity = String(reveal * (1 - exit * .72));
        if (scene._screen) scene._screen.style.clipPath = 'inset(0 ' + ((1-reveal)*20) + '% 0 ' + ((1-reveal)*20) + '% round 16px)';
      }    }
    if (scene._support) {
      const show = between(local,.34,.56) * (1 - between(local,.88,1));
      scene._support.style.opacity = show.toFixed(3);
      scene._support.style.transform = `translate3d(0,${(1-show)*24}px,0) scale(${.97+.03*show})`;
    }
    if (shot.kind === 'network') {
      scene._phone.style.transform = `translate3d(${mix(42,0,settle)}px,0,0) rotate(${mix(2.5,0,settle)}deg)`;
      scene._device.style.transform = `translate3d(0,${mix(18,0,settle)}px,0) scale(${mix(1.025,1,settle)})`;
    }
    if (shot.kind === 'closing') {
      scene.style.transform = 'none';
      const seam = between(local,.88,1);
scene._closing.style.opacity = String(1-seam);
      scene._closing.style.transform = 'translate3d(' + (seam*-24) + 'px,0,0)';
      const logoReveal = between(local,0,.24);
      const logo = scene.querySelector('.closing-logo');
      logo.style.opacity = String(logoReveal);
      logo.style.transform = 'translate3d(' + mix(-46,0,logoReveal) + 'px,0,0) scale(' + mix(.84,1,logoReveal) + ')';
      logo.style.filter = 'drop-shadow(0 0 ' + mix(52,20,logoReveal) + 'px rgba(54,217,255,.48)) drop-shadow(0 18px 32px rgba(0,0,0,.32))';
      scene._seam.style.opacity = String(seam);
    }
  }

  function render(t) {
    current = ((t % DURATION) + DURATION) % DURATION;
    shots.forEach((shot) => renderShot(shot,current));
    renderMobileRig(current);
    renderStage(current);
    renderNetwork(current);
$('stage').classList.toggle('closing-active', current >= 50);
    const majorLogo = current < 3 || current >= 50;
    $('brandBug').style.opacity = majorLogo ? '0' : '.96';
    $('timelineRail').firstElementChild.style.transform = `scaleX(${current / DURATION})`;
    $('seek').value = current.toFixed(2);
    $('time').value = `${formatTime(current)} / 00:55.00`;
    document.documentElement.dataset.time = current.toFixed(3);
  }

  function frame(now) {
    if (playing) current = (anchorValue + (now - anchorTime) / 1000) % DURATION;
    render(current);
    raf = requestAnimationFrame(frame);
  }

  function setPlaying(next) {
    playing = next;
    anchorValue = current;
    anchorTime = performance.now();
    $('playPause').textContent = playing ? 'Pausar' : 'Reproduzir';
  }

  function seekTo(value) {
    current = ((value % DURATION) + DURATION) % DURATION;
    anchorValue = current;
    anchorTime = performance.now();
    render(current);
  }

  function resizeStage() {
    const scale = Math.min(innerWidth / 1920, innerHeight / 1080);
    $('stage').style.transform = `scale(${scale})`;
  }

  $('playPause').addEventListener('click', () => setPlaying(!playing));
  $('restart').addEventListener('click', () => seekTo(0));
  $('seek').addEventListener('input', (event) => { setPlaying(false); seekTo(Number(event.target.value)); });
  $('fullscreen').addEventListener('click', async () => {
    if (!document.fullscreenElement) await $('viewport').requestFullscreen();
    else await document.exitFullscreen();
  });
  addEventListener('resize', resizeStage);
  addEventListener('keydown', (event) => {
    if (event.code === 'Space') { event.preventDefault(); setPlaying(!playing); }
    if (event.key === 'ArrowRight') { event.preventDefault(); setPlaying(false); seekTo(current + (event.shiftKey ? .1 : 1)); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); setPlaying(false); seekTo(current - (event.shiftKey ? .1 : 1)); }
    if (event.key.toLowerCase() === 'h') document.body.classList.toggle('hide-ui');
  });

  window.standLoopV06 = {
    duration:DURATION,
    seek(t){ setPlaying(false); seekTo(t); },
    play(){ setPlaying(true); },
    pause(){ setPlaying(false); },
    get time(){ return current; },
    get playing(){ return playing; },
    get shots(){ return shots.map(({id,start,dur,kind}) => ({id,start,dur,kind})); }
  };

  const allImages = [...document.images];
  Promise.all(allImages.map((img) => img.complete ? Promise.resolve() : new Promise((resolve) => {
    img.addEventListener('load', resolve, {once:true});
    img.addEventListener('error', resolve, {once:true});
  }))).then(() => {
    resizeStage();
    anchorTime = performance.now();
    anchorValue = current;
    setPlaying(playing);
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);
  });
})();





