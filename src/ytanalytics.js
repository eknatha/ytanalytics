/* ytanalytics · EknathaLabs — premium offline studio. Self-contained, error-guarded. */
'use strict';

/* ---------- inline SVG icons (no font dependency) ---------- */
const IC = {
  optimize:'<path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5 19 19M19 5l-2.5 2.5M7.5 16.5 5 19"/><circle cx="12" cy="12" r="3.2"/>',
  audit:'<path d="M3 12h4l2.5 7 4-14 2.5 7H21"/>',
  research:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  thumb:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 17-5-5L5 20"/>',
  hook:'<path d="M4 6V4h16v2M9 20h6M12 4v16"/>',
  compare:'<path d="M7 8 3 12l4 4M17 8l4 4-4 4M14 4l-4 16"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.3 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.3-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.5-2-1.5a7 7 0 0 0 .1-1z"/>',
  check:'<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-4.5"/>',
  warn:'<path d="M12 3 2 21h20L12 3z"/><path d="M12 10v4M12 17h.01"/>',
  x:'<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  gem:'<path d="M6 3h12l3 6-9 12L3 9z"/><path d="M3 9h18M9 3 6 9l6 12 6-12-3-6"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 9l5-5 5 5M12 4v12"/>',
  key:'<path d="M21 2 15 8M18 5l3 3M2 22l6-6M11 13l-2 2M13 11l-2 2"/><circle cx="6" cy="18" r="3"/>',
  shield:'<path d="M12 2 4 6v6c0 5 8 8 8 8s8-3 8-8V6z"/>',
  tag:'<path d="M3 7v5l9 9 7-7-9-9H3z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
};
const svg=(name,sw)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw||1.7}" stroke-linecap="round" stroke-linejoin="round">${IC[name]||''}</svg>`;

/* ---------- niche benchmarks (the moat) ---------- */
const NICHE={ctr:{poor:2.5,ok:4,good:6},retention:{poor:30,ok:40,good:50},avgView:{poor:120,ok:240,good:360}};
const POWER=['ultimate','complete','guide','explained','easy','fast','secret','mistake','stop','why','how','best','vs','crash','course','beginners','production','real','actually','finally','master','fix','broke','avoid','before','this','tested','honest'];
const FILLER=['a','the','to','of','in','on','for','with','my','your'];

/* ============ TIER 1 ENGINES ============ */
function scoreTitle(t){
  t=(t||'').trim();const len=t.length;const words=t.split(/\s+/).filter(Boolean);
  if(!len)return{score:0,notes:[],len:0,words:0,pw:0};
  let s=0;const notes=[];
  if(len>=40&&len<=60){s+=25;notes.push(['pass','Length','optimal — won\'t truncate on mobile']);}
  else if(len<40){s+=14;notes.push(['warn','Length',len+' chars — room for more keywords']);}
  else{s+=10;notes.push(['fail','Length',len+' chars — likely cut off (~60 max on mobile)']);}
  const pw=words.filter(w=>POWER.includes(w.toLowerCase().replace(/[^a-z]/g,'')));
  if(pw.length>=1&&pw.length<=3){s+=22;notes.push(['pass','Power words','"'+pw.join('", "')+'" drive clicks']);}
  else if(!pw.length){s+=6;notes.push(['warn','Power words','none — try "how", "why", "fix", "tested"']);}
  else{s+=12;notes.push(['warn','Power words',pw.length+' — slightly stuffed, keep 2-3']);}
  if(/\d/.test(t)){s+=15;notes.push(['pass','Specificity','has a number — boosts CTR']);}
  else{s+=4;notes.push(['warn','Specificity','no number — "5 ways", "in 10 min" perform better']);}
  if(!FILLER.includes((words[0]||'').toLowerCase())){s+=14;notes.push(['pass','Front-loading','keyword-first — good for search']);}
  else{s+=5;notes.push(['warn','Front-loading','starts with "'+words[0]+'" — lead with the topic']);}
  if(/\?|!|never|stop|mistake|wrong|secret|nobody|actually|finally|truth/i.test(t)){s+=14;notes.push(['pass','Curiosity hook','triggers click-through']);}
  else{s+=6;notes.push(['warn','Curiosity hook','flat — add tension or a question']);}
  if((t.match(/\b[A-Z]{4,}\b/g)||[]).length>1){s-=8;notes.push(['fail','Caps','excessive ALL-CAPS reads as spam']);}
  s=Math.max(0,Math.min(100,s));
  return{score:s,notes,len,words:words.length,pw:pw.length};
}
function buildTags(topic){
  topic=(topic||'').trim().toLowerCase();if(!topic)return[];
  const base=topic.split(/\s+/).filter(w=>!FILLER.includes(w));
  const mods=['tutorial','for beginners','explained','2026','step by step','crash course','in production','hands on','interview','best practices'];
  const out=new Set([topic]);base.forEach(b=>out.add(b));mods.forEach(m=>out.add(topic+' '+m));
  const NT={kubernetes:['k8s','kubectl','helm','pods','cluster'],terraform:['iac','hcl','terraform state','provisioning'],docker:['containers','dockerfile','compose','image'],aws:['ec2','s3','iam','cloud'],linux:['bash','shell','sysadmin','cli'],devops:['ci cd','pipeline','sre','automation']};
  base.forEach(b=>{if(NT[b])NT[b].forEach(x=>out.add(x))});
  return[...out].slice(0,15);
}
function buildHook(topic){
  topic=(topic||'your topic').trim();
  return[['0:00 · Cold open','State the payoff in one line: "By the end you\'ll '+topic.toLowerCase()+' — no fluff."'],
  ['0:03 · Stakes','Name the pain: why this is hard, what breaks without it.'],
  ['0:08 · Proof','Show the end result on screen FIRST — the demo, the working thing.'],
  ['0:15 · Roadmap','The 0:18 retention cliff lives here. Don\'t pad. Cut straight to step one.']];
}

/* ============ TIER 2 — CSV AUDIT ============ */
const COLMAP={title:['video title','content','title','video'],views:['views','view count'],
  ctr:['impressions click-through rate (%)','click-through rate','ctr','impressions ctr (%)'],
  avgView:['average view duration','avg view duration','average view duration (seconds)'],
  published:['video publish time','publish time','date'],
  retention:['average percentage viewed (%)','average view percentage','average percentage viewed']};
function findCol(h,keys){const L=h.map(x=>x.toLowerCase().trim());
  for(const k of keys){const i=L.indexOf(k);if(i>=0)return h[i];}
  for(const k of keys){const i=L.findIndex(x=>x.includes(k));if(i>=0)return h[i];}return null;}
function parseDur(v){if(v==null)return 0;v=String(v).trim();if(/^\d+(\.\d+)?$/.test(v))return +v;
  const p=v.split(':').map(Number);if(p.length===2)return p[0]*60+p[1];if(p.length===3)return p[0]*3600+p[1]*60+p[2];return parseFloat(v)||0;}
function auditCSV(rows,headers){
  const c={};for(const k in COLMAP)c[k]=findCol(headers,COLMAP[k]);
  if(!c.title||!c.views)return{error:'Couldn\'t find Video title / Views columns. In YouTube Studio: Analytics → Content → Export → CSV.'};
  const vids=rows.map(r=>{
    const views=+String(r[c.views]||'0').replace(/[, ]/g,'')||0;
    return{title:r[c.title]||'(untitled)',views,
      ctr:c.ctr?parseFloat(r[c.ctr])||null:null,
      ret:c.retention?parseFloat(r[c.retention])||null:null,
      avg:c.avgView?parseDur(r[c.avgView]):null,
      pub:c.published?new Date(r[c.published]):null};
  }).filter(v=>v.title&&v.title!=='Total'&&v.title!=='(untitled)');
  if(!vids.length)return{error:'No video rows found in that file.'};
  const n=vids.length,avg=k=>{const a=vids.map(v=>v[k]).filter(x=>x!=null&&!isNaN(x));return a.length?a.reduce((s,x)=>s+x,0)/a.length:null;};
  const stats={count:n,totalViews:vids.reduce((s,v)=>s+v.views,0),avgCtr:avg('ctr'),avgRet:avg('ret'),avgView:avg('avg')};
  const now=Date.now();
  vids.forEach(v=>{v.vpd=(v.pub&&!isNaN(v.pub))?v.views/Math.max(1,(now-v.pub)/864e5):null;});
  const vpds=vids.map(v=>v.vpd).filter(x=>x!=null).sort((a,b)=>a-b);const medV=vpds.length?vpds[Math.floor(vpds.length/2)]:0;
  vids.forEach(v=>{if(v.vpd==null)v.tag='—';else if(v.vpd>medV*1.3)v.tag='aging well';else if(v.vpd<medV*0.6)v.tag='decaying';else v.tag='steady';});
  const views=vids.map(v=>v.views).sort((a,b)=>a-b);const medViews=views[Math.floor(views.length/2)]||0;
  vids.forEach(v=>{v.gem=((v.ret!=null&&v.ret>=NICHE.retention.good)||(v.ctr!=null&&v.ctr>=NICHE.ctr.good))&&v.views<medViews;});
  stats.gems=vids.filter(v=>v.gem).length;
  return{stats,vids};
}
function bench(val,b,inv){if(val==null)return['','—'];
  if(inv){if(val<=b.poor)return['pass','strong'];if(val<=b.ok)return['warn','ok'];return['fail','high'];}
  if(val>=b.good)return['pass','strong for niche'];if(val>=b.ok)return['warn','ok for niche'];return['fail','below niche'];}

/* ============ FORMATTERS ============ */
const fmt=n=>n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?(n/1e3).toFixed(1)+'k':String(Math.round(n));
const fmtDur=s=>{s=Math.round(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $=s=>document.querySelector(s);

/* ============ LANDING WIRING ============ */
function paintHero(){
  const inp=$('#heroTitle');if(!inp)return;
  const upd=()=>{
    const r=scoreTitle(inp.value);
    const col=r.score>=70?'var(--mint)':r.score>=45?'var(--amber)':'var(--rose)';
    const sc=$('#heroScore'),cap=$('#heroCap'),del=$('#heroDelta'),meta=$('#heroMeta');
    if(sc){sc.textContent=r.score;sc.style.color=col;}
    if(cap)cap.textContent=r.score>=70?'strong — ship it':r.score>=45?'workable':'needs work';
    if(del){const base=58;const d=r.score-base;del.textContent=(d>=0?'+':'')+d+' vs baseline';del.style.color=d>=0?'var(--mint)':'var(--amber)';del.style.background=d>=0?'rgba(61,220,151,.12)':'rgba(245,181,68,.12)';}
    if(meta)meta.innerHTML=r.notes.slice(0,4).map(([c,k,d])=>`<div class="meta"><span class="k">${k}</span><span class="v ${c==='pass'?'mint':c==='warn'?'amber':'rose'}">${c==='pass'?'✓':c==='warn'?'!':'✕'} ${d.split('—')[0].split('(')[0].trim().slice(0,22)}</span></div>`).join('');
  };
  inp.addEventListener('input',upd);upd();
}
function paintFeatures(){
  const g=$('#featGrid');if(!g)return;
  const F=[['optimize','Title Studio','Score any title 0–100 with written reasoning on length, power words, curiosity and front-loading — calibrated for DevOps search.'],
  ['thumb','Thumb Studio','Drop a thumbnail and grade contrast, detail density and mobile readability on-canvas. Nothing is uploaded.'],
  ['audit','Channel Audit','Drag your Studio CSV. Niche-benchmarked CTR, retention, velocity decay and hidden-gem detection — all in your browser.'],
  ['research','Keyword Research','Niche-aware tag generation and title ideas. We don\'t fake search-volume numbers we can\'t source.']];
  g.innerHTML=F.map(([k,t,d])=>`<div class="feat" onclick="openApp('${k==='thumb'?'optimize':k}')"><div class="ic">${svg(k)}</div><h3>${t}</h3><p>${d}</p><div class="go">Open ${svg('arrow',2)}</div></div>`).join('');
}
function paintCompare(){
  const b=$('#cmpBody');if(!b)return;
  const Y=`<span class="yes">${svg('check',2)}</span>`,N=`<span class="no">${svg('x',2)}</span>`,P=t=>`<span class="part">${t}</span>`;
  const R=[['Niche-calibrated title scoring',P('global'),P('global'),Y],
  ['Thumbnail auto-grade',Y,'editor only',Y],
  ['Deep retention diagnostics','partial','partial',Y],
  ['Your data stays in your browser',N,N,Y],
  ['No account / no extension',N,N,Y],
  ['Historical scrape of any channel',Y,Y,P('not offline')],
  ['Price','$24/mo','$23.99/mo',`<span class="yes">free</span>`]];
  b.innerHTML=R.map(r=>`<tr><td>${r[0]}</td><td class="c">${r[1]}</td><td class="c">${r[2]}</td><td class="c">${r[3]}</td></tr>`).join('');
}

/* ============ APP ROUTER ============ */
let CSV_STATE=null,CHARTS=[];
const NAV=[['optimize','Optimize',svg('optimize'),'tools'],['research','Research',svg('research'),'tools'],
  ['audit','Audit',svg('audit'),'your data'],['compare','Compare',svg('compare'),'live'],['settings','Settings',svg('settings'),'']];
const ATITLE={optimize:'Optimize <small>pre-publish · no data</small>',research:'Research <small>keywords &amp; tags</small>',audit:'Audit <small>your Studio export</small>',compare:'Compare <small>live mode</small>',settings:'Settings'};

function paintRail(active){
  const r=$('#rnav');let html='',lastGrp=null;
  NAV.forEach(([k,label,ic,grp])=>{
    if(grp&&grp!==lastGrp){html+=`<div class="grp">${grp}</div>`;lastGrp=grp;}
    html+=`<button class="${k===active?'on':''}" onclick="route('${k}')">${ic}${label}</button>`;
  });
  r.innerHTML=html;
}
function destroyCharts(){CHARTS.forEach(c=>{try{c.destroy()}catch(e){}});CHARTS=[];}
function route(name){
  destroyCharts();paintRail(name);
  const t=$('#appTitle');if(t)t.innerHTML=ATITLE[name]||name;
  const v=$('#appView');if(!v)return;v.className='app-view fadein';void v.offsetWidth;v.className='app-view';
  try{({optimize:vOptimize,research:vResearch,audit:vAudit,compare:vCompare,settings:vSettings}[name]||vOptimize)();}
  catch(e){v.innerHTML=`<div class="panel"><div class="empty">Something went wrong rendering this view. <br><span class="dim">${esc(e.message)}</span></div></div>`;console.error(e);}
}
window.openApp=k=>{$('#landing').classList.add('off');$('#app').classList.add('on');window.scrollTo(0,0);route(k||'optimize');};
window.closeApp=()=>{$('#app').classList.remove('on');$('#landing').classList.remove('off');};
window.route=route;

/* ---------- OPTIMIZE ---------- */
function vOptimize(){
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Optimize before you publish</h1><p>Live heuristic engines — no upload, no key. Type and watch the score move.</p></div>
  <div class="panel"><div class="panel-h">${svg('optimize')}<h3>Title analyzer</h3></div>
  <div class="panel-sub">Scored on length, power words, specificity, front-loading and curiosity — tuned for DevOps search behavior.</div>
  <input class="inp" id="tIn" placeholder="e.g. How I fixed a Kubernetes CrashLoop in production (5 steps)">
  <div id="tOut" style="margin-top:18px"></div></div>
  <div class="panel"><div class="panel-h">${svg('thumb')}<h3>Thumbnail auditor</h3></div>
  <div class="panel-sub">Drop a thumbnail — contrast, detail density and a real mobile preview, graded on-canvas. Nothing uploaded.</div>
  <div class="drop" id="thDrop">${svg('thumb',1.5)}<h3>Drop thumbnail image</h3><p>1280×720 ideal · JPG / PNG</p></div>
  <input type="file" id="thFile" accept="image/*" class="hide"><div id="thOut"></div></div>
  <div class="panel"><div class="panel-h">${svg('hook')}<h3>Hook builder</h3></div>
  <div class="panel-sub">The 0:18 retention cliff is the #1 killer. This scaffolds the first 15 seconds to beat it.</div>
  <input class="inp" id="hIn" placeholder="What does the video teach? e.g. deploy Terraform to AWS">
  <div id="hOut" style="margin-top:16px"></div></div>`;

  const tIn=$('#tIn'),tOut=$('#tOut');
  const drawT=()=>{tOut.innerHTML=titleHTML(scoreTitle(tIn.value));};
  tIn.addEventListener('input',drawT);drawT();

  const hIn=$('#hIn'),hOut=$('#hOut');
  const drawH=()=>{hOut.innerHTML=buildHook(hIn.value).map(([t,d])=>rowHTML('pass',t,d)).join('');};
  hIn.addEventListener('input',drawH);drawH();

  const dz=$('#thDrop'),fi=$('#thFile');
  dz.onclick=()=>fi.click();
  dz.ondragover=e=>{e.preventDefault();dz.classList.add('over');};
  dz.ondragleave=()=>dz.classList.remove('over');
  dz.ondrop=e=>{e.preventDefault();dz.classList.remove('over');if(e.dataTransfer.files[0])gradeThumb(e.dataTransfer.files[0]);};
  fi.onchange=e=>{if(e.target.files[0])gradeThumb(e.target.files[0]);};
}
function titleHTML(r){
  if(!r.len)return '<div class="empty">Start typing a title to see its score.</div>';
  const col=r.score>=70?'var(--mint)':r.score>=45?'var(--amber)':'var(--rose)';
  const dash=2*Math.PI*42,off=dash*(1-r.score/100);
  return `<div class="scorewrap">
    <div class="ring"><svg width="96" height="96"><circle cx="48" cy="48" r="42" fill="none" stroke="var(--line)" stroke-width="8"/>
    <circle cx="48" cy="48" r="42" fill="none" stroke="${col}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${dash}" stroke-dashoffset="${off}" style="transition:stroke-dashoffset .4s"/></svg>
    <div class="n" style="color:${col}">${r.score}</div></div>
    <div class="meta-txt"><div class="t">${r.len} chars · ${r.words} words · ${r.pw} power word${r.pw===1?'':'s'}</div>
    <div class="s">${r.score>=70?'Strong — ship it.':r.score>=45?'Workable — tighten the flags below.':'Needs work — address the red flags.'}</div></div></div>
    ${r.notes.map(([c,h,d])=>rowHTML(c,h,d)).join('')}`;
}
function rowHTML(c,h,d){const ic=c==='pass'?'check':c==='warn'?'warn':'x';
  return `<div class="row"><div class="ic ${c}">${svg(ic,1.8)}</div><div class="body"><b>${h}</b><span>${d}</span></div></div>`;}
function gradeThumb(file){
  const out=$('#thOut');const img=new Image();
  img.onload=()=>{
    const cv=document.createElement('canvas');cv.width=160;cv.height=90;const ctx=cv.getContext('2d');ctx.drawImage(img,0,0,160,90);
    const d=ctx.getImageData(0,0,160,90).data,n=160*90,L=[];let sum=0,sum2=0;
    for(let i=0;i<d.length;i+=4){const l=.299*d[i]+.587*d[i+1]+.114*d[i+2];L.push(l);sum+=l;sum2+=l*l;}
    const mean=sum/n,sd=Math.sqrt(Math.max(0,sum2/n-mean*mean));
    let edges=0;for(let y=1;y<90;y++)for(let x=1;x<160;x++){const i=y*160+x;if(Math.abs(L[i]-L[i-1])>40||Math.abs(L[i]-L[i-160])>40)edges++;}
    const ep=Math.round(edges/n*100);
    const con=sd>55?['pass','Contrast','strong ('+Math.round(sd)+') — pops in feed']:sd>35?['warn','Contrast','moderate — try bolder lights/darks']:['fail','Contrast','flat ('+Math.round(sd)+') — disappears in feed'];
    const den=ep>22?['warn','Detail density','busy ('+ep+'%) — may be unreadable at mobile size']:ep<6?['warn','Detail density','sparse — add a focal subject or 2-4 words']:['pass','Detail density','balanced ('+ep+'%) for mobile'];
    out.innerHTML=`<div class="grid2" style="margin-top:18px;align-items:start">
      <div><div class="panel-sub" style="margin-bottom:8px">Mobile feed preview (actual size)</div><img src="${img.src}" style="width:160px;border-radius:8px;border:1px solid var(--line)"></div>
      <div>${rowHTML(...con)}${rowHTML(...den)}${rowHTML(img.width>=1280?'pass':'warn','Resolution',img.width+'×'+img.height+(img.width>=1280?' — meets 1280×720':' — below 1280×720'))}</div></div>`;
  };
  img.onerror=()=>{out.innerHTML='<div class="empty rose">Couldn\'t read that image. Try a JPG or PNG.</div>';};
  img.src=URL.createObjectURL(file);
}

/* ---------- RESEARCH ---------- */
function vResearch(){
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Keyword &amp; tag research</h1><p>Niche-aware generation for cloud/DevOps. We don't invent search-volume numbers we can't source.</p></div>
  <div class="panel"><div class="panel-h">${svg('tag')}<h3>Tag generator</h3></div>
  <div class="panel-sub">Enter your core topic. We expand with niche co-occurrence (k8s → kubectl, helm…) and proven modifiers. Click a tag to copy.</div>
  <input class="inp" id="tagIn" placeholder="e.g. kubernetes networking"><div class="tags" id="tagOut"></div></div>
  <div class="panel"><div class="panel-h">${svg('research')}<h3>Title idea spinner</h3></div>
  <div class="panel-sub">Templates that score well, filled with your topic and auto-scored. Take the winner to the Optimize tab.</div>
  <input class="inp" id="idIn" placeholder="e.g. terraform state"><div id="idOut" style="margin-top:14px"></div></div>`;
  const tagIn=$('#tagIn'),tagOut=$('#tagOut');
  tagIn.addEventListener('input',()=>{
    const t=buildTags(tagIn.value);
    tagOut.innerHTML=t.length?t.map(x=>`<span class="t" onclick="navigator.clipboard&&navigator.clipboard.writeText('${esc(x)}')">${esc(x)}</span>`).join(''):'<span class="empty">Type a topic.</span>';
  });
  const idIn=$('#idIn'),idOut=$('#idOut');
  idIn.addEventListener('input',()=>{
    const t=idIn.value.trim();if(!t){idOut.innerHTML='';return;}
    const T=t.charAt(0).toUpperCase()+t.slice(1);
    const ideas=[`How to ${t} in production (the right way)`,`${T} explained in 10 minutes`,`5 ${t} mistakes that break everything`,`Why your ${t} setup is wrong`,`${T}: from zero to deploy`];
    idOut.innerHTML=ideas.map(i=>{const s=scoreTitle(i).score,c=s>=70?'good':s>=45?'decay':'gem';return `<div class="ideaitem"><span class="it">${esc(i)}</span><span class="pill ${c}">${s}</span></div>`;}).join('');
  });
}

/* ---------- AUDIT ---------- */
function vAudit(){
  if(!CSV_STATE){
    $('#appView').innerHTML=`
    <div class="vhead"><h1>Audit your channel</h1><p>YouTube Studio → Analytics → Content → Export → CSV. Drag it in — parsed entirely in your browser.</p></div>
    <div class="drop" id="csvDrop">${svg('upload',1.5)}<h3>Drop your Studio export (.csv)</h3><p>Table data CSV from any analytics view</p><span class="loc">${svg('shield',2)} parsed locally · never uploaded</span></div>
    <input type="file" id="csvFile" accept=".csv" class="hide">
    <div class="panel" style="margin-top:18px"><div class="panel-sub" style="margin:0">No file handy? The Optimize and Research tabs work right now with no data at all.</div></div>`;
    const dz=$('#csvDrop'),fi=$('#csvFile');
    dz.onclick=()=>fi.click();
    dz.ondragover=e=>{e.preventDefault();dz.classList.add('over');};
    dz.ondragleave=()=>dz.classList.remove('over');
    dz.ondrop=e=>{e.preventDefault();dz.classList.remove('over');if(e.dataTransfer.files[0])loadCSV(e.dataTransfer.files[0]);};
    fi.onchange=e=>{if(e.target.files[0])loadCSV(e.target.files[0]);};
    return;
  }
  const {stats:s,vids}=CSV_STATE;
  const top=[...vids].sort((a,b)=>b.views-a.views).slice(0,8);
  $('#appView').innerHTML=`
  <div class="vhead" style="display:flex;justify-content:space-between;align-items:flex-end"><div><h1>Channel audit</h1><p>${s.count} videos · ${fmt(s.totalViews)} total views · benchmarked vs DevOps niche</p></div>
  <button class="appbtn gho" onclick="resetCSV()">Load different file</button></div>
  <div class="grid4" style="margin-bottom:18px">
    ${mcard('Avg CTR',s.avgCtr!=null?s.avgCtr.toFixed(1)+'%':'—',bench(s.avgCtr,NICHE.ctr))}
    ${mcard('Avg retention',s.avgRet!=null?Math.round(s.avgRet)+'%':'—',bench(s.avgRet,NICHE.retention))}
    ${mcard('Avg view',s.avgView!=null?fmtDur(s.avgView):'—',bench(s.avgView,NICHE.avgView))}
    ${mcard('Hidden gems',s.gems,['',s.gems?'re-promote':'none found'])}
  </div>
  <div class="panel"><div class="panel-h">${svg('audit')}<h3>Views — top videos</h3></div><div class="panel-sub">Where your reach concentrates.</div><div class="chartbox"><canvas id="vChart"></canvas></div></div>
  ${s.gems?`<div class="panel"><div class="panel-h">${svg('gem')}<h3>Hidden gems — re-promote these</h3></div><div class="panel-sub">Strong retention or CTR but low views. Your highest-leverage targets.</div>
  ${vids.filter(v=>v.gem).slice(0,5).map(v=>`<div class="row"><div class="body"><b>${esc(v.title)}</b><span>${fmt(v.views)} views${v.ret!=null?' · '+Math.round(v.ret)+'% retention':''}${v.ctr!=null?' · '+v.ctr.toFixed(1)+'% CTR':''}</span></div><span class="pill gem">gem</span></div>`).join('')}</div>`:''}
  <div class="panel"><div class="panel-h">${svg('audit')}<h3>All videos</h3></div>
  <div style="overflow-x:auto"><table class="dtbl"><thead><tr><th>Video</th><th class="r">Views</th><th class="r">CTR</th><th class="r">Retention</th><th class="r">Aging</th></tr></thead><tbody>
  ${[...vids].sort((a,b)=>b.views-a.views).slice(0,20).map(v=>{const cl=v.tag==='aging well'?'good':v.tag==='decaying'?'decay':v.gem?'gem':'steady';
  return `<tr><td>${esc(v.title)}</td><td class="r">${fmt(v.views)}</td><td class="r">${v.ctr!=null?v.ctr.toFixed(1)+'%':'—'}</td><td class="r">${v.ret!=null?Math.round(v.ret)+'%':'—'}</td><td class="r">${v.tag!=='—'?`<span class="pill ${cl}">${v.tag}</span>`:'—'}</td></tr>`;}).join('')}
  </tbody></table></div></div>`;
  if(window.Chart)drawBar('vChart',top.map(v=>v.title.slice(0,26)),top.map(v=>v.views));
}
function mcard(l,n,[c,d]){return `<div class="mcard"><div class="l">${l}</div><div class="n">${n}</div><div class="d ${c}">${d}</div></div>`;}
window.resetCSV=()=>{CSV_STATE=null;route('audit');};
function loadCSV(file){
  if(!window.Papa){$('#appView').insertAdjacentHTML('beforeend','<div class="panel rose"><div class="empty rose">CSV parser failed to load. Check that vendor/papaparse.min.js is present.</div></div>');return;}
  Papa.parse(file,{header:true,skipEmptyLines:true,complete:res=>{
    const fields=res.meta.fields||Object.keys(res.data[0]||{});
    const r=auditCSV(res.data,fields);
    if(r.error){$('#appView').insertAdjacentHTML('beforeend',`<div class="panel" style="border-color:var(--rose)"><div class="empty" style="color:var(--rose)">${r.error}</div></div>`);return;}
    CSV_STATE=r;route('audit');
  },error:()=>{$('#appView').insertAdjacentHTML('beforeend','<div class="panel"><div class="empty rose">Couldn\'t read that file.</div></div>');}});
}
function drawBar(id,labels,data){
  const el=document.getElementById(id);if(!el)return;
  try{CHARTS.push(new Chart(el,{type:'bar',data:{labels,datasets:[{data,backgroundColor:'#3DDC97',borderRadius:5,maxBarThickness:24}]},
    options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>fmt(c.raw)+' views'}}},
    scales:{x:{ticks:{color:'#65676F',font:{size:10}},grid:{color:'rgba(255,255,255,.05)'}},y:{ticks:{color:'#A1A3AC',font:{size:10}},grid:{display:false}}}}}));}catch(e){console.error(e);}
}

/* ---------- COMPARE (Tier 3) ---------- */
function vCompare(){
  const has=localStorage.getItem('yt_api_key');
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Compare channels</h1><p>Live public data — any channel, not just yours. This is the one thing that needs the YouTube Data API.</p></div>
  ${has?'':`<div class="lockbar">${svg('lock',1.8)}<div><b>Live mode is off.</b> <span>Comparing arbitrary channels needs live data, which requires a YouTube Data API key. We never bundle one — that's a security hole. You add your own in Settings: it stays in this browser, uses your quota, and is sent only to Google.</span></div></div>`}
  <div class="${has?'':'locked'}"><div class="panel"><div class="panel-h">${svg('compare')}<h3>Channel comparison</h3></div><div class="panel-sub">Subscribers, total views, recent upload cadence — side by side.</div>
  <div class="grid2"><input class="inp" placeholder="Channel A — handle or ID"><input class="inp" placeholder="Channel B — handle or ID"></div>
  <button class="appbtn" style="margin-top:14px">Compare</button><div class="empty" style="margin-top:14px">Results render here once live mode is enabled.</div></div></div>
  <div class="panel"><div class="panel-h">${svg('x')}<h3>What we deliberately don't do</h3></div>
  <div class="panel-sub" style="margin:0">We won't show historical time-series of arbitrary channels (that needs a server-side scrape database we don't run) or invented "search volume" numbers. Tools that show those are often guessing — we'd rather show fewer numbers you can trust.</div></div>`;
  if(!has)$('#appView').querySelectorAll('.locked input,.locked button').forEach(e=>e.disabled=true);
}

/* ---------- SETTINGS ---------- */
function vSettings(){
  const key=localStorage.getItem('yt_api_key')||'';
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Settings</h1><p>Everything here is stored only in this browser's localStorage.</p></div>
  <div class="panel"><div class="panel-h">${svg('key')}<h3>YouTube Data API key (optional)</h3></div>
  <div class="panel-sub">Only needed to unlock live Compare mode. Get a free key from Google Cloud Console → YouTube Data API v3. Saved locally; sent only to Google from your browser, never to any EknathaLabs server.</div>
  <input class="inp" id="kIn" placeholder="AIza..." value="${esc(key)}">
  <div style="margin-top:14px;display:flex;gap:10px"><button class="appbtn" id="kSave">Save key</button>${key?'<button class="appbtn gho" id="kClear">Remove key</button>':''}</div>
  <div id="kMsg" style="margin-top:10px;font-size:13px"></div></div>
  <div class="panel"><div class="panel-h">${svg('shield')}<h3>Data &amp; privacy</h3></div>
  <div class="panel-sub" style="margin:0">ytanalytics has no backend. CSVs parse with PapaParse in your browser; thumbnails grade on an in-memory canvas. Nothing is uploaded. Closing the tab clears everything except a key you choose to save.</div></div>`;
  $('#kSave').onclick=()=>{const v=$('#kIn').value.trim();const m=$('#kMsg');
    if(v){localStorage.setItem('yt_api_key',v);m.innerHTML='<span class="mint">Saved. Live mode unlocked in Compare.</span>';setTimeout(()=>route('settings'),800);}
    else m.innerHTML='<span class="rose">Enter a key first.</span>';};
  const c=$('#kClear');if(c)c.onclick=()=>{localStorage.removeItem('yt_api_key');route('settings');};
}

/* ============ BOOT ============ */
function boot(){
  try{paintHero();}catch(e){console.error('hero',e);}
  try{paintFeatures();}catch(e){console.error('features',e);}
  try{paintCompare();}catch(e){console.error('compare',e);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
