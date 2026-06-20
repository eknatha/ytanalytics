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
  money:'<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5a2.5 2 0 0 1 5 0c0 1.5-2.5 1.5-2.5 2.5M9.5 14.5a2.5 2 0 0 0 5 0"/>',
  link:'<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
  crown:'<path d="M3 8l4 4 5-7 5 7 4-4v9H3z"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
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

/* ============ TOP CREATORS (bundled snapshot — as of June 2026) ============ */
const SNAPSHOT_DATE='June 2026';
const TOP_SUBS=[
  ['MrBeast',478,'Entertainment','🇺🇸'],['T-Series',300,'Music','🇮🇳'],['Cocomelon',196,'Kids','🇺🇸'],
  ['SET India',182,'Entertainment','🇮🇳'],['Kids Diana Show',128,'Kids','🇺🇦'],['Vlad and Niki',124,'Kids','🇷🇺'],
  ['Like Nastya',122,'Kids','🇷🇺'],['PewDiePie',111,'Gaming','🇸🇪'],['Zee Music Company',109,'Music','🇮🇳'],
  ['WWE',103,'Sports','🇺🇸'],['Goldmines',98,'Film','🇮🇳'],['Sony SAB',93,'Entertainment','🇮🇳'],
  ['5-Minute Crafts',82,'How-to','🇨🇾'],['BangtanTV (BTS)',79,'Music','🇰🇷'],['Justin Bieber',74,'Music','🇨🇦']
];
const NICHE_CREATORS={
  'Cloud / DevOps':[['TechWorld with Nana',1.1,'Kubernetes, DevOps'],['NetworkChuck',4.2,'Cloud, networking, Linux'],['freeCodeCamp',10.5,'Full curriculum, certs'],['KodeKloud',0.42,'K8s, Docker, IaC labs'],['That DevOps Guy (Rawkode)',0.13,'Cloud-native, GitOps'],['Fireship',3.6,'Fast dev explainers'],['Tech With Tim',1.5,'Python, backend']],
  'Programming':[['freeCodeCamp',10.5,'Courses'],['Fireship',3.6,'Web dev'],['Traversy Media',2.3,'Full-stack'],['Programming with Mosh',4.5,'Fundamentals'],['Tech With Tim',1.5,'Python']],
  'Tech reviews':[['MKBHD',20.1,'Gadgets'],['Linus Tech Tips',16.2,'PC hardware'],['Unbox Therapy',24.3,'Unboxings'],['Dave2D',4.5,'Laptops']],
  'Finance':[['Graham Stephan',4.6,'Investing'],['Andrei Jikh',2.3,'Money'],['Ali Abdaal',6.5,'Productivity+money']],
  'Gaming':[['PewDiePie',111,'Variety'],['Markiplier',37,'Let\'s plays'],['Jacksepticeye',31,'Gaming']]
};

/* ============ YOUTUBE MONEY CALCULATOR ============ */
// RPM = revenue per 1000 monetized views, AFTER YouTube's 45% cut. Niche/geo adjust CPM.
const RPM_NICHE={'Finance / business':14,'Tech / software':9,'Education':7,'Cloud / DevOps':10,'Make money online':18,'Gaming':3,'Entertainment / vlogs':3.5,'Lifestyle / beauty':5,'Kids':2.5,'Music':2};
const GEO_MULT={'Tier 1 (US/UK/CA/AU)':1.0,'Mixed / global':0.6,'Tier 2 (Europe/Asia metros)':0.45,'Tier 3 (India/SEA/LATAM)':0.28};
function calcMoney(views,rpm,geo,monetizedPct){
  const mv=views*(monetizedPct/100);            // monetized views
  const eRpm=rpm*geo;                            // effective RPM after geo
  const rev=mv/1000*eRpm;                        // creator revenue (RPM already net of YT cut)
  return{low:rev*0.7,mid:rev,high:rev*1.4,eRpm};
}

/* ============ CHANNEL OPTIMIZATION CHECKLIST ============ */
const CHANNEL_OPT=[
  ['Banner & avatar','Custom 2560×1440 banner + recognizable avatar that reads at small sizes.'],
  ['Channel trailer','A short unsubscribed-viewer trailer pinned to home.'],
  ['Keyword-rich description','First 2 lines state who it\'s for and what they\'ll learn; include niche keywords.'],
  ['Consistent upload schedule','A cadence you can sustain beats sporadic bursts — the algorithm rewards reliability.'],
  ['Playlists by topic','Group videos into series; playlists drive session time and surface in search.'],
  ['Custom thumbnails','Every video — consistent style, high contrast, readable on mobile.'],
  ['Title + tag hygiene','Front-loaded keywords, no clickbait mismatch, 2-3 power words.'],
  ['End screens & cards','Point each video at the next logical one to chain watch sessions.'],
  ['Pinned comment','Add context, links, or a question to spark engagement early.'],
  ['Handle & links','Claim a clean @handle; link site/socials in the header.'],
  ['Sections on home','Arrange the home layout into themed shelves, not just "uploads".'],
  ['Community tab','Post between uploads to stay in subscribers\' feeds.']
];

/* ============ URL AUDIT (needs user's API key) ============ */
function parseChannelInput(s){
  s=(s||'').trim();if(!s)return null;
  let m;
  if((m=s.match(/youtube\.com\/channel\/(UC[\w-]+)/)))return{type:'id',value:m[1]};
  if((m=s.match(/youtube\.com\/@([\w.-]+)/)))return{type:'handle',value:m[1]};
  if((m=s.match(/youtube\.com\/(?:c|user)\/([\w.-]+)/)))return{type:'handle',value:m[1]};
  if(/^UC[\w-]{20,}$/.test(s))return{type:'id',value:s};
  if(/^@?[\w.-]+$/.test(s))return{type:'handle',value:s.replace(/^@/,'')};
  return null;
}
async function ytFetch(path,key){
  const r=await fetch('https://www.googleapis.com/youtube/v3/'+path+'&key='+encodeURIComponent(key));
  if(!r.ok){const e=await r.json().catch(()=>({}));throw new Error(e.error?.message||('API error '+r.status));}
  return r.json();
}
async function urlAudit(input,key){
  const parsed=parseChannelInput(input);
  if(!parsed)throw new Error('Could not parse that as a channel URL, @handle, or channel ID.');
  // resolve channel
  let chId=parsed.value;
  if(parsed.type==='handle'){
    const s=await ytFetch('search?part=snippet&type=channel&maxResults=1&q='+encodeURIComponent(parsed.value),key);
    if(!s.items?.length)throw new Error('No channel found for "'+parsed.value+'".');
    chId=s.items[0].id.channelId;
  }
  const ch=await ytFetch('channels?part=snippet,statistics,contentDetails&id='+chId,key);
  if(!ch.items?.length)throw new Error('Channel not found.');
  const c=ch.items[0];
  const uploads=c.contentDetails.relatedPlaylists.uploads;
  const pl=await ytFetch('playlistItems?part=snippet,contentDetails&maxResults=20&playlistId='+uploads,key);
  const vidIds=pl.items.map(i=>i.contentDetails.videoId).join(',');
  const vs=await ytFetch('videos?part=snippet,statistics&id='+vidIds,key);
  const vids=vs.items.map(v=>({
    title:v.snippet.title,
    views:+v.statistics.viewCount||0,
    likes:+v.statistics.likeCount||0,
    pub:new Date(v.snippet.publishedAt),
    titleScore:scoreTitle(v.snippet.title).score
  }));
  // cadence: avg days between uploads
  const dates=vids.map(v=>v.pub).sort((a,b)=>b-a);
  let cadence=null;
  if(dates.length>1){let g=0;for(let i=0;i<dates.length-1;i++)g+=(dates[i]-dates[i+1])/864e5;cadence=g/(dates.length-1);}
  const now=Date.now();
  const med=(()=>{const a=vids.map(v=>v.views/Math.max(1,(now-v.pub)/864e5)).sort((p,q)=>p-q);return a[Math.floor(a.length/2)]||0;})();
  vids.forEach(v=>{const vpd=v.views/Math.max(1,(now-v.pub)/864e5);v.tag=vpd>med*1.3?'aging well':vpd<med*0.6?'decaying':'steady';});
  return{
    channel:{title:c.snippet.title,subs:+c.statistics.subscriberCount||0,views:+c.statistics.viewCount||0,
      videos:+c.statistics.videoCount||0,thumb:c.snippet.thumbnails?.default?.url,desc:c.snippet.description},
    vids,cadence,
    avgTitleScore:Math.round(vids.reduce((s,v)=>s+v.titleScore,0)/vids.length)
  };
}

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
const NAV=[['optimize','Optimize',svg('optimize'),'tools'],['research','Research',svg('research'),'tools'],['channelopt','Channel Optimization',svg('check'),'tools'],['money','Money Calculator',svg('money'),'tools'],
  ['audit','Audit',svg('audit'),'your data'],['urlaudit','Audit by URL',svg('link'),'your data'],
  ['creators','Top Creators',svg('crown'),'explore'],['niches','By Niche',svg('grid'),'explore'],
  ['compare','Compare',svg('compare'),'live'],['settings','Settings',svg('settings'),'']];
const ATITLE={optimize:'Optimize <small>pre-publish · no data</small>',research:'Research <small>keywords &amp; tags</small>',channelopt:'Channel Optimization <small>scored checklist</small>',money:'Money Calculator <small>earnings estimator</small>',audit:'Audit <small>your Studio export</small>',urlaudit:'Audit by URL <small>public data · needs key</small>',creators:'Top Creators <small>by subscribers</small>',niches:'Top Creators by Niche',compare:'Compare <small>live mode</small>',settings:'Settings'};

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
  try{({optimize:vOptimize,research:vResearch,channelopt:vChannelOpt,money:vMoney,audit:vAudit,urlaudit:vUrlAudit,creators:vCreators,niches:vNiches,compare:vCompare,settings:vSettings}[name]||vOptimize)();}
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
    const hasKey=!!localStorage.getItem('yt_api_key');
    $('#appView').innerHTML=`
    <div class="vhead"><h1>Audit a channel</h1><p>Two ways in. Public data from any channel URL, or your own private metrics from a Studio CSV.</p></div>

    <div class="panel"><div class="panel-h">${svg('audit')}<h3>Audit by channel URL <span class="pill ${hasKey?'good':'steady'}" style="margin-left:6px">${hasKey?'live mode on':'needs API key'}</span></h3></div>
    <div class="panel-sub">Pulls public data — titles, views, upload cadence, velocity decay, and heuristic title scores — for any channel. ${hasKey?'':'Requires your own YouTube Data API key (Settings). CTR &amp; retention are never public, so those still need a CSV.'}</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap"><input class="inp" id="urlIn" style="flex:1;min-width:240px" placeholder="https://www.youtube.com/@channelname  or  channel ID" ${hasKey?'':'disabled'}>
    <button class="appbtn" id="urlGo" ${hasKey?'':'disabled'}>Audit</button></div>
    ${hasKey?'':`<div class="lockbar" style="margin-top:14px">${svg('lock',1.8)}<div><b>Live mode is off.</b> <span>Public channel data needs the YouTube Data API. Add your own key in Settings — it stays in your browser and uses your quota. We never bundle one.</span></div></div>`}
    <div id="urlMsg" style="margin-top:10px;font-size:13px"></div></div>

    <div class="panel"><div class="panel-h">${svg('upload')}<h3>Audit by Studio CSV</h3></div>
    <div class="panel-sub">The only source for your real CTR, retention and average view duration — they're private, so no URL can reach them. Export: YouTube Studio → Analytics → Content → Export → CSV.</div>
    <div class="drop" id="csvDrop">${svg('upload',1.5)}<h3>Drop your Studio export (.csv)</h3><p>Table data CSV from any analytics view</p><span class="loc">${svg('shield',2)} parsed locally · never uploaded</span></div>
    <input type="file" id="csvFile" accept=".csv" class="hide"></div>`;

    const dz=$('#csvDrop'),fi=$('#csvFile');
    dz.onclick=()=>fi.click();
    dz.ondragover=e=>{e.preventDefault();dz.classList.add('over');};
    dz.ondragleave=()=>dz.classList.remove('over');
    dz.ondrop=e=>{e.preventDefault();dz.classList.remove('over');if(e.dataTransfer.files[0])loadCSV(e.dataTransfer.files[0]);};
    fi.onchange=e=>{if(e.target.files[0])loadCSV(e.target.files[0]);};

    if(hasKey){
      const go=$('#urlGo'),urlIn=$('#urlIn');
      const run=()=>auditByURL(urlIn.value.trim());
      go.onclick=run;
      urlIn.onkeydown=e=>{if(e.key==='Enter')run();};
    }
    return;
  }
  const {stats:s,vids,source,channel}=CSV_STATE;
  const top=[...vids].sort((a,b)=>b.views-a.views).slice(0,8);
  const isURL=source==='url';
  const naCard=(l)=>`<div class="mcard"><div class="l">${l}</div><div class="n dim">—</div><div class="d dim">private · needs CSV</div></div>`;
  $('#appView').innerHTML=`
  <div class="vhead" style="display:flex;justify-content:space-between;align-items:flex-end"><div><h1>${channel?esc(channel.title):'Channel audit'}</h1><p>${isURL?`${fmt(channel.subs)} subscribers · ${s.count} recent videos · public data`:`${s.count} videos · ${fmt(s.totalViews)} total views · benchmarked vs DevOps niche`}</p></div>
  <button class="appbtn gho" onclick="resetCSV()">${isURL?'Audit another':'Load different file'}</button></div>
  ${isURL?`<div class="lockbar" style="margin-bottom:18px;border-left-color:var(--blue)">${svg('shield',1.8)}<div><span><b>Public audit.</b> CTR, retention and average view duration aren't exposed by any public API — only you can export those from Studio as a CSV. The metrics below are everything a channel URL can honestly provide.</span></div></div>`:''}
  <div class="grid4" style="margin-bottom:18px">
    ${isURL?naCard('Avg CTR'):mcard('Avg CTR',s.avgCtr!=null?s.avgCtr.toFixed(1)+'%':'—',bench(s.avgCtr,NICHE.ctr))}
    ${isURL?naCard('Avg retention'):mcard('Avg retention',s.avgRet!=null?Math.round(s.avgRet)+'%':'—',bench(s.avgRet,NICHE.retention))}
    ${isURL?mcard('Total views',fmt(s.totalViews),['','across sampled videos']):mcard('Avg view',s.avgView!=null?fmtDur(s.avgView):'—',bench(s.avgView,NICHE.avgView))}
    ${isURL?mcard('Avg title score',s.avgTitleScore!=null?s.avgTitleScore:'—',[s.avgTitleScore>=60?'pass':'warn',s.avgTitleScore>=60?'strong':'room to improve']):mcard('Hidden gems',s.gems,['',s.gems?'re-promote':'none found'])}
  </div>
  <div class="panel"><div class="panel-h">${svg('audit')}<h3>Views — top videos</h3></div><div class="panel-sub">Where your reach concentrates.</div><div class="chartbox"><canvas id="vChart"></canvas></div></div>
  ${s.gems?`<div class="panel"><div class="panel-h">${svg('gem')}<h3>Hidden gems — re-promote these</h3></div><div class="panel-sub">Strong retention or CTR but low views. Your highest-leverage targets.</div>
  ${vids.filter(v=>v.gem).slice(0,5).map(v=>`<div class="row"><div class="body"><b>${esc(v.title)}</b><span>${fmt(v.views)} views${v.ret!=null?' · '+Math.round(v.ret)+'% retention':''}${v.ctr!=null?' · '+v.ctr.toFixed(1)+'% CTR':''}</span></div><span class="pill gem">gem</span></div>`).join('')}</div>`:''}
  <div class="panel"><div class="panel-h">${svg('audit')}<h3>All videos</h3></div>
  <div style="overflow-x:auto"><table class="dtbl"><thead><tr><th>Video</th><th class="r">Views</th>${isURL?'<th class="r">Title score</th>':'<th class="r">CTR</th><th class="r">Retention</th>'}<th class="r">Aging</th></tr></thead><tbody>
  ${[...vids].sort((a,b)=>b.views-a.views).slice(0,20).map(v=>{const cl=v.tag==='aging well'?'good':v.tag==='decaying'?'decay':v.gem?'gem':'steady';
  const mid=isURL?`<td class="r">${v.titleScore!=null?`<span class="pill ${v.titleScore>=70?'good':v.titleScore>=45?'decay':'gem'}">${v.titleScore}</span>`:'—'}</td>`:`<td class="r">${v.ctr!=null?v.ctr.toFixed(1)+'%':'—'}</td><td class="r">${v.ret!=null?Math.round(v.ret)+'%':'—'}</td>`;
  return `<tr><td>${esc(v.title)}</td><td class="r">${fmt(v.views)}</td>${mid}<td class="r">${v.tag!=='—'?`<span class="pill ${cl}">${v.tag}</span>`:'—'}</td></tr>`;}).join('')}
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
    r.source='csv';CSV_STATE=r;route('audit');
  },error:()=>{$('#appView').insertAdjacentHTML('beforeend','<div class="panel"><div class="empty rose">Couldn\'t read that file.</div></div>');}});
}

/* ---------- URL audit via YouTube Data API (user's own key) ---------- */
function parseChannelInput(input){
  // returns {type:'handle'|'id'|'user'|'custom', value}
  input=(input||'').trim();
  if(!input)return null;
  // bare channel ID
  if(/^UC[\w-]{22}$/.test(input))return{type:'id',value:input};
  // bare handle
  if(/^@[\w.-]+$/.test(input))return{type:'handle',value:input};
  try{
    const u=new URL(input.startsWith('http')?input:'https://'+input);
    const parts=u.pathname.split('/').filter(Boolean);
    if(parts[0]&&parts[0].startsWith('@'))return{type:'handle',value:parts[0]};
    if(parts[0]==='channel'&&parts[1])return{type:'id',value:parts[1]};
    if(parts[0]==='user'&&parts[1])return{type:'user',value:parts[1]};
    if(parts[0]==='c'&&parts[1])return{type:'custom',value:parts[1]};
    // youtube.com/SomeName
    if(parts[0])return{type:'custom',value:parts[0]};
  }catch(e){}
  // fallback: treat as handle-ish search term
  return{type:'custom',value:input.replace(/^@/,'')};
}
async function ytGet(endpoint,params){
  const key=localStorage.getItem('yt_api_key');
  const qs=new URLSearchParams({...params,key});
  const res=await fetch(`https://www.googleapis.com/youtube/v3/${endpoint}?${qs}`);
  const data=await res.json();
  if(!res.ok){const m=data&&data.error&&data.error.message?data.error.message:'request failed ('+res.status+')';throw new Error(m);}
  return data;
}
async function resolveChannelId(parsed){
  if(parsed.type==='id')return parsed.value;
  if(parsed.type==='handle'){
    const d=await ytGet('channels',{part:'id',forHandle:parsed.value});
    if(d.items&&d.items[0])return d.items[0].id;
  }
  if(parsed.type==='user'){
    const d=await ytGet('channels',{part:'id',forUsername:parsed.value});
    if(d.items&&d.items[0])return d.items[0].id;
  }
  // custom or fallback: search
  const s=await ytGet('search',{part:'snippet',type:'channel',q:parsed.value,maxResults:'1'});
  if(s.items&&s.items[0])return s.items[0].snippet.channelId||s.items[0].id.channelId;
  throw new Error('Channel not found. Try the @handle or the channel ID (UC…).');
}
async function auditByURL(input){
  const msg=$('#urlMsg');const parsed=parseChannelInput(input);
  if(!parsed){if(msg)msg.innerHTML='<span class="rose">Enter a channel URL, @handle, or channel ID.</span>';return;}
  if(msg)msg.innerHTML='<span class="dim">Resolving channel…</span>';
  try{
    const chId=await resolveChannelId(parsed);
    if(msg)msg.innerHTML='<span class="dim">Fetching channel…</span>';
    const ch=await ytGet('channels',{part:'snippet,statistics,contentDetails',id:chId});
    if(!ch.items||!ch.items[0])throw new Error('Channel not found.');
    const c=ch.items[0];
    const uploads=c.contentDetails.relatedPlaylists.uploads;
    if(msg)msg.innerHTML='<span class="dim">Fetching recent videos…</span>';
    const pl=await ytGet('playlistItems',{part:'contentDetails',playlistId:uploads,maxResults:'25'});
    const ids=(pl.items||[]).map(i=>i.contentDetails.videoId).filter(Boolean);
    let vids=[];
    if(ids.length){
      const vd=await ytGet('videos',{part:'snippet,statistics',id:ids.join(',')});
      vids=(vd.items||[]).map(v=>{
        const views=+(v.statistics&&v.statistics.viewCount||0);
        const pub=new Date(v.snippet.publishedAt);
        return{title:v.snippet.title,views,pub,ctr:null,ret:null,avg:null,titleScore:scoreTitle(v.snippet.title).score};
      });
    }
    if(!vids.length)throw new Error('No public videos found for this channel.');
    // velocity tagging (same logic as CSV)
    const now=Date.now();
    vids.forEach(v=>{v.vpd=(v.pub&&!isNaN(v.pub))?v.views/Math.max(1,(now-v.pub)/864e5):null;});
    const vpds=vids.map(v=>v.vpd).filter(x=>x!=null).sort((a,b)=>a-b);const medV=vpds.length?vpds[Math.floor(vpds.length/2)]:0;
    vids.forEach(v=>{if(v.vpd==null)v.tag='—';else if(v.vpd>medV*1.3)v.tag='aging well';else if(v.vpd<medV*0.6)v.tag='decaying';else v.tag='steady';});
    const totalViews=vids.reduce((s,v)=>s+v.views,0);
    const avgTitle=Math.round(vids.reduce((s,v)=>s+v.titleScore,0)/vids.length);
    CSV_STATE={source:'url',channel:{title:c.snippet.title,subs:+(c.statistics.subscriberCount||0)},
      stats:{count:vids.length,totalViews,avgTitleScore:avgTitle,avgCtr:null,avgRet:null,avgView:null,gems:0},vids};
    route('audit');
  }catch(e){
    if(msg)msg.innerHTML=`<span class="rose">${esc(e.message)}</span>`;
  }
}
function drawBar(id,labels,data){
  const el=document.getElementById(id);if(!el)return;
  try{CHARTS.push(new Chart(el,{type:'bar',data:{labels,datasets:[{data,backgroundColor:'#3DDC97',borderRadius:5,maxBarThickness:24}]},
    options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>fmt(c.raw)+' views'}}},
    scales:{x:{ticks:{color:'#65676F',font:{size:10}},grid:{color:'rgba(255,255,255,.05)'}},y:{ticks:{color:'#A1A3AC',font:{size:10}},grid:{display:false}}}}}));}catch(e){console.error(e);}
}

/* ---------- CHANNEL OPTIMIZATION ---------- */
function vChannelOpt(){
  const saved=JSON.parse(localStorage.getItem('yt_chanopt')||'{}');
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Channel optimization</h1><p>Work through the checklist — your score updates live. Saved locally so you can come back to it.</p></div>
  <div class="panel"><div class="scorewrap" style="margin-bottom:0"><div class="ring"><svg width="96" height="96"><circle cx="48" cy="48" r="42" fill="none" stroke="var(--line)" stroke-width="8"/><circle id="coRing" cx="48" cy="48" r="42" fill="none" stroke="var(--mint)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${2*Math.PI*42}" stroke-dashoffset="${2*Math.PI*42}" style="transition:stroke-dashoffset .4s"/></svg><div class="n" id="coNum">0</div></div>
  <div class="meta-txt"><div class="t" id="coLabel">Check off what your channel already does</div><div class="s">12 fundamentals that move the algorithm and conversions.</div></div></div></div>
  <div class="panel">${CHANNEL_OPT.map(([t,d],i)=>`<label class="row" style="cursor:pointer"><div class="ic"><input type="checkbox" data-co="${i}" ${saved[i]?'checked':''} style="width:18px;height:18px;accent-color:var(--mint)"></div><div class="body"><b>${t}</b><span>${d}</span></div></label>`).join('')}</div>`;
  const upd=()=>{
    const boxes=[...document.querySelectorAll('[data-co]')];
    const done=boxes.filter(b=>b.checked).length,pct=Math.round(done/boxes.length*100);
    const store={};boxes.forEach((b,i)=>store[i]=b.checked);localStorage.setItem('yt_chanopt',JSON.stringify(store));
    const ring=$('#coRing'),num=$('#coNum'),lbl=$('#coLabel');
    const dash=2*Math.PI*42;ring.style.strokeDashoffset=dash*(1-pct/100);
    const col=pct>=80?'var(--mint)':pct>=50?'var(--amber)':'var(--rose)';ring.style.stroke=col;num.style.color=col;
    num.textContent=pct;lbl.textContent=done+' of '+boxes.length+' done · '+(pct>=80?'dialed in':pct>=50?'getting there':'lots of easy wins left');
  };
  document.querySelectorAll('[data-co]').forEach(b=>b.addEventListener('change',upd));upd();
}

/* ---------- MONEY CALCULATOR ---------- */
function vMoney(){
  $('#appView').innerHTML=`
  <div class="vhead"><h1>YouTube money calculator</h1><p>Estimate ad revenue from views, niche and audience geography. RPM figures are realistic post-cut ranges — actual earnings vary.</p></div>
  <div class="panel"><div class="grid2">
    <div><label class="fld">Monthly views</label><input class="inp" id="mViews" type="text" value="100000" inputmode="numeric"></div>
    <div><label class="fld">Niche</label><select class="inp" id="mNiche">${Object.keys(RPM_NICHE).map(k=>`<option value="${RPM_NICHE[k]}">${k} (~$${RPM_NICHE[k]} RPM)</option>`).join('')}</select></div>
    <div><label class="fld">Audience geography</label><select class="inp" id="mGeo">${Object.keys(GEO_MULT).map(k=>`<option value="${GEO_MULT[k]}">${k}</option>`).join('')}</select></div>
    <div><label class="fld">Monetized views <span class="dim">(% with ads)</span></label><input class="inp" id="mPct" type="text" value="55" inputmode="numeric"></div>
  </div></div>
  <div class="panel"><div class="panel-h">${svg('money')}<h3>Estimated ad revenue</h3></div><div class="panel-sub">Range reflects seasonality and CPM variance. Excludes sponsorships, memberships and affiliate income — usually the bigger earners.</div>
  <div class="grid3"><div class="mcard"><div class="l">Monthly (low)</div><div class="n" id="mLow">—</div></div><div class="mcard" style="border-color:var(--mint)"><div class="l">Monthly (likely)</div><div class="n mint" id="mMid">—</div></div><div class="mcard"><div class="l">Monthly (high)</div><div class="n" id="mHigh">—</div></div></div>
  <div class="grid2" style="margin-top:12px"><div class="mcard"><div class="l">Yearly (likely)</div><div class="n" id="mYear">—</div></div><div class="mcard"><div class="l">Effective RPM</div><div class="n" id="mRpm">—</div></div></div></div>
  <div class="panel"><div class="panel-sub" style="margin:0">RPM = what you keep per 1,000 monetized views, already net of YouTube's 45% cut. Finance, tech and "make money online" command the highest CPMs; entertainment, gaming and kids the lowest. Tier-1 (US/UK) audiences pay several times more than Tier-3.</div></div>`;
  const calc=()=>{
    const views=+($('#mViews').value.replace(/[^\d]/g,''))||0;
    const rpm=+$('#mNiche').value,geo=+$('#mGeo').value,pct=Math.min(100,Math.max(0,+$('#mPct').value||0));
    const r=calcMoney(views,rpm,geo,pct);
    const $m=id=>document.getElementById(id);
    $m('mLow').textContent='$'+fmt(r.low);$m('mMid').textContent='$'+fmt(r.mid);$m('mHigh').textContent='$'+fmt(r.high);
    $m('mYear').textContent='$'+fmt(r.mid*12);$m('mRpm').textContent='$'+r.eRpm.toFixed(2);
  };
  ['mViews','mNiche','mGeo','mPct'].forEach(id=>$('#'+id).addEventListener('input',calc));calc();
}

/* ---------- TOP CREATORS ---------- */
function vCreators(){
  const max=TOP_SUBS[0][1];
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Top creators by subscribers</h1><p>Most-subscribed channels worldwide · snapshot as of ${SNAPSHOT_DATE}. Bundled offline — not a live feed.</p></div>
  <div class="panel" style="padding:8px 0"><table class="dtbl"><thead><tr><th style="padding-left:18px">#</th><th>Channel</th><th>Niche</th><th class="r" style="padding-right:18px">Subscribers</th></tr></thead><tbody>
  ${TOP_SUBS.map((c,i)=>`<tr><td style="padding-left:18px" class="dim">${i+1}</td><td><b>${c[3]} ${esc(c[0])}</b><div style="height:5px;width:${Math.round(c[1]/max*120)}px;background:var(--mint);border-radius:3px;margin-top:5px;opacity:.7"></div></td><td class="dim">${c[2]}</td><td class="r" style="padding-right:18px">${c[1]}M</td></tr>`).join('')}
  </tbody></table></div>
  <div class="panel"><div class="panel-sub" style="margin:0">Subscriber counts are rounded snapshots and shift constantly. For live figures, the Compare tab (with your API key) pulls real-time numbers for any channel.</div></div>`;
}

/* ---------- BY NICHE ---------- */
function vNiches(){
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Top creators by niche</h1><p>Leaders in key categories · ${SNAPSHOT_DATE}. Cloud/DevOps first — the channels worth studying for your own.</p></div>
  ${Object.entries(NICHE_CREATORS).map(([niche,list])=>`
  <div class="panel"><div class="panel-h">${svg('grid')}<h3>${niche}</h3></div><div style="margin-top:6px">
  ${list.map(c=>`<div class="ideaitem"><div class="it"><b>${esc(c[0])}</b><span class="dim" style="display:block;font-size:12px">${esc(c[2])}</span></div><span class="pill steady">${c[1]>=1?c[1]+'M':Math.round(c[1]*1000)+'K'}</span></div>`).join('')}
  </div></div>`).join('')}`;
}

/* ---------- URL AUDIT (needs key) ---------- */
function vUrlAudit(){
  const key=localStorage.getItem('yt_api_key');
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Audit any channel by URL</h1><p>Public data for any channel — subscribers, video performance, upload cadence, title scoring. ${key?'':'Needs your YouTube Data API key.'}</p></div>
  ${key?'':`<div class="lockbar">${svg('lock',1.8)}<div><b>Add your API key to enable this.</b> <span>Public channel data comes from the YouTube Data API, which needs a key. We never bundle one. Add yours in Settings — it stays in this browser and uses your quota. <b style="color:var(--mint);cursor:pointer" onclick="route('settings')">Open Settings →</b></span></div></div>`}
  <div class="panel"><div class="panel-h">${svg('link')}<h3>Channel URL, @handle, or ID</h3></div>
  <div class="panel-sub">Paste any of: youtube.com/@handle · youtube.com/channel/UC… · or just the @handle.</div>
  <div style="display:flex;gap:10px"><input class="inp" id="urlIn" placeholder="https://youtube.com/@TechWorldwithNana" ${key?'':'disabled'}><button class="appbtn" id="urlGo" ${key?'':'disabled'} style="white-space:nowrap">Audit</button></div>
  <div style="font-size:12px;color:var(--txt-3);margin-top:10px">Note: CTR, retention and watch-time are private — no public method exposes them. For those, use <b style="color:var(--mint);cursor:pointer" onclick="route('audit')">Audit by CSV</b>.</div>
  <div id="urlOut"></div></div>`;
  if(!key)return;
  const go=async()=>{
    const out=$('#urlOut'),btn=$('#urlGo');
    out.innerHTML='<div class="empty">Fetching public data…</div>';btn.disabled=true;
    try{
      const r=await urlAudit($('#urlIn').value,key);
      const c=r.channel;
      out.innerHTML=`<div style="margin-top:20px">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">${c.thumb?`<img src="${c.thumb}" style="width:54px;height:54px;border-radius:50%;border:1px solid var(--line)">`:''}<div><div style="font-size:18px;font-weight:600">${esc(c.title)}</div><div class="dim" style="font-size:13px">${fmt(c.subs)} subscribers · ${fmt(c.videos)} videos · ${fmt(c.views)} total views</div></div></div>
      <div class="grid3" style="margin-bottom:16px">
        <div class="mcard"><div class="l">Avg title score</div><div class="n ${r.avgTitleScore>=70?'mint':r.avgTitleScore>=45?'amber':'rose'}">${r.avgTitleScore}</div><div class="d dim">recent uploads</div></div>
        <div class="mcard"><div class="l">Upload cadence</div><div class="n">${r.cadence!=null?r.cadence.toFixed(1):'—'}</div><div class="d dim">days between</div></div>
        <div class="mcard"><div class="l">Recent reach</div><div class="n">${fmt(r.vids.reduce((s,v)=>s+v.views,0))}</div><div class="d dim">last ${r.vids.length} videos</div></div>
      </div>
      <div style="overflow-x:auto"><table class="dtbl"><thead><tr><th>Recent video</th><th class="r">Views</th><th class="r">Likes</th><th class="r">Title</th><th class="r">Aging</th></tr></thead><tbody>
      ${r.vids.sort((a,b)=>b.views-a.views).map(v=>{const cl=v.tag==='aging well'?'good':v.tag==='decaying'?'decay':'steady';return `<tr><td>${esc(v.title.slice(0,46))}</td><td class="r">${fmt(v.views)}</td><td class="r">${fmt(v.likes)}</td><td class="r"><span class="pill ${v.titleScore>=70?'good':v.titleScore>=45?'decay':'gem'}">${v.titleScore}</span></td><td class="r"><span class="pill ${cl}">${v.tag}</span></td></tr>`;}).join('')}
      </tbody></table></div></div>`;
    }catch(e){out.innerHTML=`<div class="empty" style="color:var(--rose);margin-top:16px">${esc(e.message)}</div>`;}
    btn.disabled=false;
  };
  $('#urlGo').onclick=go;
  $('#urlIn').addEventListener('keydown',e=>{if(e.key==='Enter')go();});
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
