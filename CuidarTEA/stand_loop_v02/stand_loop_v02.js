/* CuidarTEA Stand Loop V02 — deterministic 38 s timeline, no external dependencies.
 * The images are byte-identical copies of the organized official screenshots; only their viewport is animated.
 * All connection lines are outside product content while screenshots are on screen.
 */
'use strict';
(() => {
  const DURATION = 38;
  const $ = id => document.getElementById(id);
  const clamp = n => Math.max(0, Math.min(1, n));
  const smooth = n => { n=clamp(n); return n*n*(3-2*n); };
  const progress = (t,a,b) => smooth((t-a)/(b-a));
  const lerp = (a,b,p) => a+(b-a)*p;
  const roles = [
    {at:4, name:'RECEPÇÃO', key:'VISÃO GERAL', file:'01_recepcao_visao_geral.jpg', motion:'x'},
    {at:5.65, name:'RECEPÇÃO', key:'AGENDA', file:'02_recepcao_agenda_hoje.jpg', motion:'x'},
    {at:7.3, name:'RECEPÇÃO', key:'AGENDAMENTO', file:'04_recepcao_modal_agendamento.jpg', motion:'x'},
    {at:9, name:'TERAPEUTA', key:'AGENDA', file:'01_terapeuta_agenda.jpg', motion:'x'},
    {at:10.35, name:'TERAPEUTA', key:'PACIENTE / AVALIAÇÃO', file:'04_terapeuta_atec.jpg', motion:'x'},
    {at:11.7, name:'TERAPEUTA', key:'EVOLUÇÃO CLÍNICA / IA', file:'03_terapeuta_evolucao_ia.jpg', motion:'x'},
    {at:13.3, name:'TERAPEUTA', key:'PTS', file:'05_terapeuta_pts.jpg', motion:'x'},
    {at:15, name:'COORDENAÇÃO', key:'INDICADORES', file:'01_coordenacao_indicadores_tela-cheia.jpg', motion:'y'},
    {at:17, name:'COORDENAÇÃO', key:'SUPERVISÃO', file:'02_coordenacao_supervisao.jpg', motion:'y'},
    {at:19, name:'COORDENAÇÃO', key:'CAPTAÇÃO / ANAMNESES', file:'03_coordenacao_captacao.jpg', motion:'y'},
    {at:21, name:'ADMINISTRADOR', key:'INDICADORES', file:'01_admin_indicadores.jpg', motion:'focus'},
    {at:23, name:'ADMINISTRADOR', key:'RELATÓRIOS', file:'02_admin_relatorios.jpg', motion:'focus'},
    {at:25, name:'ADMINISTRADOR', key:'PTS', file:'04_admin_pts.jpg', motion:'focus'},
  ];
  const images = roles.map((item,i) => {
    const img = document.createElement('img');
    img.className='screen'; img.src='assets/'+item.file;
    img.alt='Captura oficial CuidarTEA: '+item.name+', '+item.key;
    img.loading='eager'; img.decoding='async'; img.style.zIndex=String(i+1);
    img.dataset.motion=item.motion;
    $('screen-stack').append(img);
    return img;
  });
  const openingPoints = [[1180,275],[1510,245],[1730,360],[1630,575],[1790,775],[1510,885],[1240,790],[1050,590],[1370,535]];
  const framePoints = [[80,180],[970,184],[1840,180],[1840,600],[1840,1023],[980,1025],[80,1023],[80,620],[80,408]];
  const networkPoints = [[1180,270],[1450,230],[1710,315],[1780,535],[1640,765],[1360,850],[1180,705],[1030,490],[1435,515]];
  const closePoints = [[1180,300],[1510,230],[1800,310],[1815,575],[1745,800],[1510,860],[1230,790],[1090,590],[1400,535]];
  const pointKeys = [[0,openingPoints],[3.05,openingPoints],[4.5,framePoints],[26.8,framePoints],[28.1,networkPoints],[32.85,networkPoints],[34,closePoints],[37.25,closePoints],[38,openingPoints]];
  function keyframe(keys,t) {
    for(let i=1;i<keys.length;i++) if(t<=keys[i][0]) {
      const [a,v]=keys[i-1], [b,w]=keys[i], q=progress(t,a,b);
      return v.map((item,j)=>Array.isArray(item)?item.map((number,k)=>lerp(number,w[j][k],q)):lerp(item,w[j],q));
    }
    return keys.at(-1)[1];
  }
  const svgNS='http://www.w3.org/2000/svg';
  const circles=openingPoints.map((_,i)=>{const c=document.createElementNS(svgNS,'circle');c.setAttribute('r',i===8?'8':'6');$('points').append(c);return c;});
  // Conceptual constellation: these lines never claim an implemented data flow.
  const pairs=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[7,8],[8,2],[8,5]];
  const paths=pairs.map(()=>{const p=document.createElementNS(svgNS,'path');p.setAttribute('pathLength','1');p.style.strokeDasharray='1';$('connections').append(p);return p;});
  function moment(element,t,a,b,enter=.7,exit=.55) {
    const live=t>=a&&t<b;
    element.style.visibility=live?'visible':'hidden';
    element.setAttribute('aria-hidden',String(!live));
    if(!live)return;
    const before=progress(t,a,a+enter),after=progress(t,b-exit,b);
    element.style.clipPath=`inset(${after*100}% 0 ${(1-before)*100}% 0)`;
    element.style.transform=`translate3d(0,${(1-before)*34-after*24}px,0)`;
  }
  function render(time) {
    const t=((time%DURATION)+DURATION)%DURATION;
    document.documentElement.dataset.time=t.toFixed(3);
    const opening=$('opening'),openingLive=t<4||t>=37.6;
    opening.style.visibility=openingLive?'visible':'hidden';
    opening.setAttribute('aria-hidden',String(!openingLive));
    if(openingLive){
      const out=t<4?progress(t,3.25,4):0;
      const returnIn=t>=37.6?progress(t,37.6,38):1;
      opening.style.clipPath=`inset(0 ${out*100}% 0 0)`;
      opening.style.opacity=String(returnIn);
      opening.style.transform=t>=37.6?`translate3d(0,${(1-returnIn)*24}px,0)`:`translate3d(${-out*35}px,0,0)`;
    }
    moment($('integrated'),t,27,33);
    moment($('closing'),t,33,38,.75,.01);
    if(t>=37.25){
      const fade=progress(t,37.25,37.6),closing=$('closing');
      closing.style.clipPath='inset(0)';
      closing.style.opacity=String(1-fade);
      closing.style.transform=`translate3d(0,${-fade*24}px,0)`;
    }else $('closing').style.opacity='1';

    const plane=$('product-plane');
    const openingPlane=progress(t,3.45,4.7),closingPlane=progress(t,26.7,27.95);
    plane.style.visibility=t>=3.45&&t<27.95?'visible':'hidden';
    plane.style.clipPath=`inset(0 ${(1-openingPlane)*100}% ${closingPlane*98}% 0)`;
    plane.style.transform=`translate3d(0,${(1-openingPlane)*42-closingPlane*25}px,0) scale(${1-.035*closingPlane})`;
    plane.style.opacity=String(1-.2*closingPlane);
    const heading=$('role-heading');
    moment(heading,t,3.7,27.3,.55,.5);
    if(t>=4&&t<27){
      let index=roles.length-1;
      for(let i=1;i<roles.length;i++) if(t<roles[i].at){index=i-1;break;}
      $('role-name').textContent=roles[index].name;
      $('role-section').textContent=roles[index].key;
      const change=roles[index].at;
      const reveal=progress(t,change,change+.52);
      heading.style.opacity=String(.6+.4*reveal);
    }
    images.forEach((img,i)=>{
      const a=roles[i].at,b=i+1<roles.length?roles[i+1].at:27.95;
      const visible=t>=a&&t<b+.58;
      img.style.visibility=visible?'visible':'hidden';
      if(!visible)return;
      const reveal=progress(t,a,a+.58);
      if(roles[i].motion==='y'){
        img.style.opacity='1';
        img.style.clipPath=`inset(${(1-reveal)*100}% 0 0 0)`;
        img.style.transform=`translate3d(0,${(1-reveal)*20}px,0) scale(${1.012-.012*reveal})`;
      }else if(roles[i].motion==='focus'){
        img.style.opacity=String(reveal);
        img.style.clipPath='inset(0)';
        img.style.transform=`translate3d(0,0,0) scale(${1.035-.035*reveal})`;
      }else{
        img.style.opacity='1';
        img.style.clipPath=`inset(0 ${(1-reveal)*100}% 0 0)`;
        img.style.transform=`translate3d(${(1-reveal)*24}px,0,0) scale(${1.014-.014*reveal})`;
      }
    });
    plane.querySelector('.plane-accent').style.transform=`scaleX(${.28+.72*progress(t,4,27)})`;

    const positions=keyframe(pointKeys,t);
    const productTime=t>=4&&t<27;
    const nodeOpacity=t<1.2?progress(t,0,.45):t>=33?1-progress(t,33,34.2):1;
    circles.forEach((c,i)=>{
      const [x,y]=positions[i];
      c.setAttribute('cx',x);c.setAttribute('cy',y);
      const stagger=t<1.2?progress(t,i*.08,i*.08+.35):1;
      c.style.opacity=String(nodeOpacity*stagger*(productTime?.44:1));
    });
    const joins=t<3.05?progress(t,1.2,3.1)*.36:productTime?.12:t<33?lerp(.12,.82,progress(t,27,29.6)):.33;
    paths.forEach((p,i)=>{
      const [a,b]=pairs[i],[x,y]=positions[a],[u,v]=positions[b];
      p.setAttribute('d',`M ${x} ${y} Q ${(x+u)/2+17} ${(y+v)/2-15} ${u} ${v}`);
      // During product moments, only outer perimeter strokes survive; no line crosses a screenshot.
      const allowed=productTime&&i>=8?0:1;
      p.style.opacity=String(joins*allowed*(t>=33?1-progress(t,33,34.2):1));
      p.style.strokeDashoffset=String(1-progress(t,1.25+i*.1,2.25+i*.1));
    });

    const number=$('stat-number'),stat=$('stat-copy'),numberLive=t>=27.4&&t<33;
    number.style.visibility=numberLive?'visible':'hidden';
    stat.style.visibility=numberLive?'visible':'hidden';
    if(numberLive){
      const v=progress(t,27.4,28.1),morph=progress(t,29.8,30.6),fade=progress(t,32.35,33);
      number.style.opacity=String(v*(1-fade));stat.style.opacity=String(v*(1-fade));
      number.style.transform=`translate3d(0,${(1-v)*42}px,0)`;
      $('digit-two').style.transform=`translate3d(0,${-240*morph}px,0)`;
      $('digit-two').style.opacity=String(1-morph);
      $('digit-zero').style.transform=`translate3d(${-100*morph}px,0,0) scale(${1+.18*morph})`;
      const second=morph>.52;
      $('stat-title').textContent=second?'DADO DIGITADO':'SEGUNDOS';
      $('stat-subtitle').textContent=second?'duas vezes':'para registrar';
      stat.style.transform=`translate3d(${-105*morph}px,${(1-v)*30}px,0)`;
    }

    const brand=keyframe([[0,[0,0,1]],[32.8,[0,0,1]],[34,[30,40,2.25]],[37.25,[30,40,2.25]],[38,[0,0,1]]],t);
    $('brand').style.transform=`translate3d(${brand[0]}px,${brand[1]}px,0) scale(${brand[2]})`;
    $('mast-label').style.opacity=String(1-progress(t,33,33.8)*(1-progress(t,37.25,38)));
    $('bottomline').firstElementChild.style.transform=`translate3d(${1650*(.5-.5*Math.cos(2*Math.PI*t/DURATION))}px,0,0)`;
    $('seek').value=t;$('time').value=`${t.toFixed(1).padStart(4,'0')} / 38.0`;
  }
  let current=0,playing=false,last=performance.now(),ready=false;
  const params=new URLSearchParams(location.search);
  const autoPlay=!params.has('t')&&!matchMedia('(prefers-reduced-motion: reduce)').matches; if(params.has('t')) current=Number(params.get('t'))||0;
  function syncPlay(){ $('play').textContent=playing?'Pausar':'Reproduzir'; }
  function seek(t){current=((t%DURATION)+DURATION)%DURATION;last=performance.now();render(current);}
  function toggle(){playing=!playing;last=performance.now();syncPlay();}
  function resize(){ $('stage').style.transform=`scale(${Math.min(innerWidth/1920,innerHeight/1080)})`; }
  async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{ /* F11 remains available in the browser. */ }}
  function frame(now){if(ready&&playing&&!document.hidden)current=(current+Math.max(0,(now-last)/1000))%DURATION;last=now;render(current);requestAnimationFrame(frame);}
  $('play').onclick=toggle;$('restart').onclick=()=>seek(0);$('fullscreen').onclick=fullscreen;
  $('seek').oninput=e=>{playing=false;seek(Number(e.target.value));syncPlay();};
  addEventListener('resize',resize);document.addEventListener('visibilitychange',()=>last=performance.now());
  addEventListener('keydown',e=>{
    if(e.target.matches('button,input'))return;
    if(e.code==='Space'){e.preventDefault();toggle();}
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){playing=false;seek(current+(e.key==='ArrowRight'?1:-1));syncPlay();}
    if(e.key.toLowerCase()==='f')fullscreen();
    if(e.key.toLowerCase()==='h')document.body.classList.toggle('hide-controls');
  });
  let hideTimer;function wake(){document.body.classList.remove('hide-controls');clearTimeout(hideTimer);hideTimer=setTimeout(()=>{if(playing)document.body.classList.add('hide-controls');},2500);}
  addEventListener('pointermove',wake);addEventListener('pointerdown',wake);
  window.standLoop={duration:DURATION,seek(t){playing=false;seek(t);syncPlay();},play(){if(ready){playing=true;last=performance.now();syncPlay();}},pause(){playing=false;syncPlay();},get time(){return current;},get playing(){return playing;},get ready(){return ready;}};
  resize();render(current);$('play').textContent='Carregando';$('play').disabled=true;wake();requestAnimationFrame(frame);
  const imageAssets=[document.querySelector('#brand img'),...images];
  Promise.allSettled(imageAssets.map(img=>img.decode())).then(results=>{
    const failed=results.flatMap((result,i)=>result.status==='rejected'||!imageAssets[i].naturalWidth?[imageAssets[i].getAttribute('src')]:[]);
    if(failed.length){$('preload').textContent='Não foi possível carregar as imagens do protótipo.';$('play').textContent='Imagens indisponíveis';return;}
    ready=true;playing=autoPlay;last=performance.now();$('play').disabled=false;$('preload').hidden=true;syncPlay();
  });
})();


