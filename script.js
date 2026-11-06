const $=i=>document.getElementById(i),R=a=>[...a].sort(()=>Math.random()-.5);
const F={
 nino:['embajador.jpg','Niño embajador de la campaña'],
 poster:['afiche.jpg','Afiche: «Súmate a lo que nos une»'],
 anfitrion:['anfitrion.jpg','Un momento de emoción en el escenario'],
 presentadores:['presentadores.jpg','Escenario del Teatro Teletón'],
 meta:['meta.png','Meta de la Teletón 2026'],
 teatro:['teatro.jpg','Teatro Teletón'],
 noche:['estadio-noche.jpg','Cierre de la campaña en el estadio, de noche'],
 corazon:['corazon.jpg','Artistas y niños en el escenario'],
 dia:['estadio-dia.jpg','Cierre de la campaña en el estadio']
};
Object.values(F).forEach(f=>new Image().src='img/'+f[0]);

const lugares=['Teatro Teletón','Estadio Nacional','Digitón'];
const art=[['Luz Casal',0,'teatro'],['Tito El Bambino',1,'noche'],['Icata',2,'corazon'],['Los Atletas de la Risa',0,'presentadores'],['Bacilos',1,'dia'],['Tomás Leiva',2,'corazon'],['Picus',0,'teatro'],['Pailita',1,'noche']];

const L=[
{t:'La meta',tipo:'mem',
 lee:[
 ['meta','La meta 2026 es de $44.253.268.546, el último cómputo de la Teletón 2025. Sirve para mantener los institutos Teletón de todo el país.'],
 ['dia','En 2024 el último cómputo televisado fue cercano a $40.502 millones. En 2025 llegó a $44.253 millones: unos $3.750 millones más.'],
 ['noche','La Teletón 2025 superó su meta y, al sumar las donaciones que no alcanzaron a contarse en la transmisión, cerró en $50.202.554.528.'],
 ['corazon','El 70% de lo recaudado en 2025 vino de personas y el 30% de empresas: los aportes pequeños de miles de chilenos cuentan.'],
 ['poster','El dinero financia tratamientos, terapias, operaciones, prótesis, equipos médicos y programas para la rehabilitación de niños y jóvenes.']],
 pares:[['Meta 2026','$44.253 millones'],['Cómputo 2024','$40.502 millones'],['Cierre final 2025','$50.202 millones'],['Aumento 2024 a 2025','$3.750 millones'],['Aporte de personas','70%'],['Aporte de empresas','30%']]},
{t:'El embajador',tipo:'quiz',
 lee:[
 ['nino','Iaán Calderón tiene 11 años, es de La Serena y recibe atención en el Instituto Teletón de Coquimbo. Es el niño embajador 2026.'],
 ['poster','Vive con osteogénesis imperfecta, conocida como huesos de cristal: sus huesos son más frágiles y se fracturan con más facilidad.'],
 ['anfitrion','Ser embajador es representar a los miles de pacientes de la Teletón y compartir una historia que genere empatía y solidaridad.'],
 ['corazon','Participa en actividades, entrevistas y presentaciones. Su mensaje: una condición física no impide tener sueños y metas.']],
 q:[
 ['¿Quién es el niño embajador 2026?',['Iaán Calderón','Matías Soto','Benjamín Rojas'],0,'nino'],
 ['¿De qué ciudad es?',['Temuco','La Serena','Valparaíso'],1,'poster'],
 ['¿Cómo se llama su condición?',['Osteogénesis imperfecta','Escoliosis','Espina bífida'],0,'anfitrion'],
 ['¿En qué instituto Teletón se atiende?',['Santiago','Concepción','Coquimbo'],2,'corazon'],
 ['¿Qué significa ser embajador?',['Solo aparecer en televisión','Representar a los pacientes y compartir una historia','Entregar las donaciones'],1,'nino']]},
{t:'Escenarios y artistas',tipo:'quiz',
 lee:[
 ['teatro','El Teatro Teletón abre la transmisión el viernes 6 a las 22:00 con Pandora, Luz Casal y SINAKA. Habrá humor, historias de familias y shows infantiles.'],
 ['presentadores','En las 27 horas también están Melón y Melame, Los Atletas de la Risa, Stefan Kramer, Leo Rey, Karla Melo, La Rancherita, El Perro Chocolo y Picus.'],
 ['noche','El Estadio Nacional recibe el gran cierre con Tito El Bambino, Santaferia, Gondwana, Princesa Alba, Pailita, King Savagge, Polimá WestCoast y Marcianeke.'],
 ['dia','En el estadio también se presentan Luciano Pereyra, Bacilos y Alanys Lagos.'],
 ['corazon','La Digitón, en plataformas digitales, reúne a cerca de 40 creadores como Icata, Tati Fernández, Eskarcita y Tomás Leiva. El Pulso Regional muestra la campaña en todo Chile.']],
 q:R(art).map(a=>['¿Dónde se presenta '+a[0]+'?',lugares,a[1],a[2]])}
];

let cur=0,max=0,pts=0,vid=3,fx=0;
const P=$('panel');

function ver(k){
 const [s,a]=F[k],v=$('visor'),m=$('vimg');
 v.classList.remove('go');void v.offsetWidth;v.classList.add('go');
 setTimeout(()=>{m.className='fx'+(fx++%6);m.src='img/'+s;m.alt=a;$('vcap').textContent=a},330);
}
function nav(){
 $('niv').innerHTML=L.map((l,i)=>`<button data-i="${i}" ${i>max?'disabled':''} ${i==cur?'aria-current="step"':''}>Nivel ${i+1}: ${l.t}</button>`).join('');
}
$('niv').onclick=e=>{const b=e.target.closest('button');if(b&&!b.disabled)ini(+b.dataset.i)};
function hud(){$('pts').textContent=pts;$('vidas').textContent='♥'.repeat(vid)+'♡'.repeat(3-vid)}

function ini(i){cur=i;vid=3;nav();hud();lee(0)}
function lee(k){
 const l=L[cur],[im,tx]=l.lee[k],u=k==l.lee.length-1;
 ver(im);
 P.innerHTML=`<article class="carta"><small>Tarjeta ${k+1} de ${l.lee.length}</small><p>${tx}</p><button class="btn" id="sg">${u?'¡A jugar!':'Siguiente tarjeta'}</button></article>`;
 $('sg').onclick=()=>u?(L[cur].tipo=='mem'?mem():quiz(0)):lee(k+1);
}

function mem(){
 const l=L[cur];let a=null,ok=0,lock=0;
 const c=R(l.pares.flatMap((p,i)=>[[i,p[0]],[i,p[1]]]));
 P.innerHTML=`<p class="pista">Une cada dato con su cifra. Acierto: +100 puntos.</p><div class="mem">${c.map((x,j)=>`<button class="mc" data-j="${j}" aria-label="Tarjeta ${j+1}"><span><b>♥</b><u>${x[1]}</u></span></button>`).join('')}</div>`;
 P.querySelector('.mem').onclick=e=>{
  const b=e.target.closest('.mc');
  if(!b||lock||b.classList.contains('v')||b.classList.contains('ok'))return;
  b.classList.add('v');
  if(!a){a=b;return}
  const x=c[a.dataset.j][0],y=c[b.dataset.j][0];
  if(x==y){
   a.className=b.className='mc ok';a=null;pts+=100;hud();ver(l.lee[ok%l.lee.length][0]);
   if(++ok==l.pares.length)setTimeout(fin,900);
  }else{
   lock=1;pts=Math.max(0,pts-10);hud();
   setTimeout(()=>{a.classList.remove('v');b.classList.remove('v');a=null;lock=0},900);
  }
 };
}

function quiz(n){
 const l=L[cur],q=l.q[n];
 P.innerHTML=`<article class="carta"><small>Pregunta ${n+1} de ${l.q.length}</small><h3>${q[0]}</h3><div class="ops">${q[1].map((o,i)=>`<button class="op" data-i="${i}">${o}</button>`).join('')}</div><p id="fb" role="status"></p></article>`;
 P.querySelector('.ops').onclick=e=>{
  const b=e.target.closest('.op');if(!b)return;
  const ok=+b.dataset.i==q[2];
  P.querySelectorAll('.op').forEach(z=>{z.disabled=true;if(+z.dataset.i==q[2])z.classList.add('bien')});
  if(ok){pts+=150;$('fb').textContent='¡Correcto! +150 puntos'}
  else{b.classList.add('mal');vid--;$('fb').textContent='Casi. La respuesta correcta está marcada.'}
  hud();ver(q[3]);
  setTimeout(()=>vid<1?perder():n+1<l.q.length?quiz(n+1):fin(),1500);
 };
}

function perder(){
 P.innerHTML=`<article class="carta"><h3>Te quedaste sin vidas</h3><p>Relee las tarjetas e inténtalo otra vez.</p><button class="btn" id="re">Reintentar nivel</button></article>`;
 $('re').onclick=()=>ini(cur);
}
function fin(){
 pts+=vid*50;hud();
 const last=cur==L.length-1;
 if(!last)max=Math.max(max,cur+1);
 nav();
 P.innerHTML=last
  ?`<article class="carta"><h3>¡Completaste Teleton sixseven!</h3><p>Sumaste <b>${pts}</b> puntos. ${pts>2200?'Ya eres embajador del dato.':'Repite los niveles para subir tu marcador.'}</p><p><b>Súmate a lo que nos une: 6 y 7 de noviembre.</b></p><button class="btn" id="re">Jugar de nuevo</button></article>`
  :`<article class="carta"><h3>¡Nivel superado!</h3><p>Llevas <b>${pts}</b> puntos. Te sobraron ${vid} vidas, que suman bonus.</p><button class="btn" id="re">Ir al nivel ${cur+2}</button></article>`;
 $('re').onclick=()=>last?(pts=0,max=0,ini(0)):ini(cur+1);
}

/* Mosaico con revelado al hacer scroll */
const M=['teatro','noche','corazon','dia','presentadores','poster'];
$('mos').innerHTML=M.map(k=>`<figure class="t"><img alt="${F[k][1]}" loading="lazy" src="img/${F[k][0]}"><figcaption>${F[k][1]}</figcaption></figure>`).join('');
const io=new IntersectionObserver(es=>es.forEach(e=>{
 if(e.isIntersecting){e.target.querySelector('img').className='fx'+[...$('mos').children].indexOf(e.target)%6;io.unobserve(e.target)}
}),{threshold:.3});
document.querySelectorAll('.t').forEach(t=>io.observe(t));

/* Estado de la campaña */
const ini0=new Date('2026-11-06T22:00:00-03:00'),fin0=new Date(+ini0+27*36e5);
function est(){
 const n=new Date(),e=$('estado');
 if(n<ini0){const m=Math.floor((ini0-n)/6e4),d=Math.floor(m/1440),h=Math.floor(m%1440/60);e.textContent=`Comienza en ${d?d+' d ':''}${h} h ${m%60} min`}
 else if(n<fin0){e.textContent='En vivo ahora: 27 horas de Teletón';e.classList.add('vivo')}
 else{e.textContent='Gracias por sumarte a la Teletón 2026';e.classList.remove('vivo')}
}
est();setInterval(est,30000);

/* Video */
const v=$('vid'),s=$('snd');
s.onclick=()=>{v.muted=!v.muted;s.textContent=v.muted?'Activar sonido':'Silenciar'};
if(matchMedia('(prefers-reduced-motion:reduce)').matches)v.pause();

ini(0);
