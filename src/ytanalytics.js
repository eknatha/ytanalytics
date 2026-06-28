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
  fire:'<path d="M12 2c1 4 4 5 4 9a4 4 0 0 1-8 0c0-1 .5-2 1-2.5C9 11 8 13 8 15a4 4 0 0 0 8 0c0-4-3-5-4-13z"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
  split:'<path d="M6 3v6a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v6M6 3H3m3 0h3M18 21h-3m3 0h3"/><circle cx="6" cy="3" r="0.5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  rocket:'<path d="M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3a12 12 0 0 1 8-8c2 0 3 1 3 3a12 12 0 0 1-8 8zM14 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>',
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
  const mods=['tutorial','for beginners','explained','2026','step by step','tips','guide','review','at home','that actually work'];
  const out=new Set([topic]);base.forEach(b=>out.add(b));mods.forEach(m=>out.add(topic+' '+m));
  const NT={kubernetes:['k8s','kubectl','helm','pods'],terraform:['iac','infrastructure','provisioning'],docker:['containers','compose','image'],aws:['ec2','s3','cloud'],linux:['bash','shell','cli'],python:['coding','programming','script'],javascript:['js','web dev','react'],
    makeup:['beauty','tutorial','cosmetics'],skincare:['routine','glow','beauty'],workout:['fitness','gym','home workout'],recipe:['cooking','food','easy recipe'],
    gaming:['gameplay','walkthrough','tips'],investing:['stocks','money','finance'],crypto:['bitcoin','blockchain','trading'],travel:['vlog','guide','budget travel'],
    photography:['camera','editing','tips'],music:['cover','beats','production'],guitar:['lesson','chords','tutorial'],drawing:['art','sketch','tutorial']};
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
// Verified snapshot. Ranks 1-40 high-confidence; 41-50 lower (sources vary). Subs in millions, rounded.
const TOP_SUBS=[
  ['MrBeast',501,'Entertainment','🇺🇸'],['T-Series',345,'Music','🇮🇳'],['Cocomelon',200,'Kids','🇺🇸'],
  ['SET India',186,'Entertainment','🇮🇳'],['Kids Diana Show',138,'Kids','🇺🇦'],['Vlad and Niki',150,'Kids','🇷🇺'],
  ['Like Nastya',125,'Kids','🇷🇺'],['Stokes Twins',140,'Entertainment','🇺🇸'],['PewDiePie',111,'Gaming','🇸🇪'],
  ['Zee Music Company',115,'Music','🇮🇳'],['WWE',105,'Sports','🇺🇸'],['KIMPRO',104,'Entertainment','🇰🇷'],
  ['Goldmines',100,'Film','🇮🇳'],['Sony SAB',97,'Entertainment','🇮🇳'],['Bispo Bruno Leonardo',75,'Religion','🇧🇷'],
  ['Fede Vigevani',74,'Comedy','🇺🇾'],['Anaya Kandhal',72,'Family','🇮🇳'],['Zhong',71,'Entertainment','🇺🇸'],
  ['YOLO AVENTURAS',69,'Comedy','🇲🇽'],['5-Minute Crafts',82,'How-to','🇨🇾'],['BangtanTV (BTS)',79,'Music','🇰🇷'],
  ['Sony Entertainment Television',88,'Entertainment','🇮🇳'],['Pinkfong',75,'Kids','🇰🇷'],['Justin Bieber',74,'Music','🇨🇦'],
  ['Blackpink',96,'Music','🇰🇷'],['Toys and Colors',82,'Kids','🇺🇸'],['HYBE LABELS',79,'Music','🇰🇷'],
  ['Ed Sheeran',58,'Music','🇬🇧'],['Marshmello',57,'Music','🇺🇸'],['Ryan\'s World',38,'Kids','🇺🇸'],
  ['Dude Perfect',60,'Sports','🇺🇸'],['Eminem',64,'Music','🇺🇸'],['Ariana Grande',54,'Music','🇺🇸'],
  ['Billie Eilish',52,'Music','🇺🇸'],['Taylor Swift',61,'Music','🇺🇸'],['BG Bishop',56,'Religion','🇮🇳'],
  ['ChuChu TV',81,'Kids','🇮🇳'],['Wave Music',62,'Music','🇮🇳'],['T-Series Bhakti Sagar',82,'Religion','🇮🇳'],
  ['Aaj Tak',79,'News','🇮🇳'],['Vlad and Niki (es)',55,'Kids','🇷🇺'],['Markiplier',37,'Gaming','🇺🇸'],
  ['El Reino Infantil',58,'Kids','🇦🇷'],['Movieclips',61,'Film','🇺🇸'],['LooLoo Kids',55,'Kids','🇷🇴'],
  ['Shemaroo',52,'Film','🇮🇳'],['Bad Bunny',51,'Music','🇵🇷'],['Justin Bieber VEVO',50,'Music','🇨🇦'],
  ['CoComelon en Español',54,'Kids','🇺🇸'],['MrBeast Gaming',50,'Gaming','🇺🇸']
];
const NICHE_CREATORS={
  'Gaming':[['PewDiePie',111,'Variety'],['Markiplier',37,'Let\'s plays'],['Jacksepticeye',31,'Gaming'],['Techno Gamerz',43,'India gaming'],['Total Gaming',45,'Free Fire/India']],
  'Music':[['T-Series',345,'Bollywood'],['BLACKPINK',96,'K-pop'],['Justin Bieber',74,'Pop'],['Marshmello',57,'EDM']],
  'Beauty & Fashion':[['James Charles',23,'Makeup'],['NikkieTutorials',13,'Beauty'],['Jeffree Star',13,'Cosmetics'],['Sandeep Maheshwari',40,'India (motiv.)']],
  'Comedy':[['Fede Vigevani',74,'Comedy'],['Ryan Higa',21,'Sketches'],['CarryMinati',45,'India comedy'],['Smosh',27,'Sketch']],
  'Cooking & Food':[['Nick DiGiovanni',28,'Cooking'],['Joshua Weissman',10,'Recipes'],['Binging with Babish',10,'Cooking'],['Your Food Lab',7,'India food']],
  'Fitness & Health':[['Chloe Ting',25,'Workouts'],['athleanx',14,'Training'],['FitnessBlender',6.5,'Home fitness'],['Yoga With Adriene',13,'Yoga']],
  'Vlogs & Lifestyle':[['David Dobrik',18,'Vlogs'],['Emma Chamberlain',12,'Lifestyle'],['Casey Neistat',12,'Filmmaking vlogs']],
  'Education':[['Kurzgesagt',23,'Science animation'],['Veritasium',17,'Science'],['CrashCourse',16,'Academic'],['Vsauce',23,'Curiosity'],['Khan Academy',9,'Lessons']],
  'Tech reviews':[['MKBHD',20.1,'Gadgets'],['Unbox Therapy',24.3,'Unboxings'],['Linus Tech Tips',16.2,'PC hardware'],['Dave2D',4.5,'Laptops'],['Mrwhosetheboss',20.5,'Smartphones']],
  'Finance':[['Graham Stephan',4.6,'Investing'],['Andrei Jikh',2.3,'Money'],['Ali Abdaal',6.5,'Productivity+money'],['Minority Mindset',1.5,'Wealth'],['CA Rachana Ranade',4.3,'India finance']],
  'Travel':[['Drew Binsky',5,'Countries'],['Mark Wiens',11,'Food travel'],['Kara and Nate',4,'Couple travel'],['Mountain Trekker',5,'India travel']],
  'Sports':[['Dude Perfect',60,'Trick shots'],['WWE',105,'Wrestling'],['NBA',23,'Basketball'],['olympics',12,'Multi-sport']],
  'Kids & Family':[['Cocomelon',200,'Nursery'],['Kids Diana Show',138,'Play'],['Vlad and Niki',150,'Family'],['Ryan\'s World',38,'Toys']],
  'Science & Tech':[['Mark Rober',70,'Engineering'],['Veritasium',17,'Physics'],['The Action Lab',5,'Experiments'],['SmarterEveryDay',12,'Science']],
  'Film & Animation':[['Movieclips',61,'Clips'],['Goldmines',100,'Films'],['Pixar',12,'Animation'],['Corridor Crew',13,'VFX']],
  'Programming':[['freeCodeCamp',10.5,'Courses'],['Fireship',3.6,'Web dev'],['Traversy Media',2.3,'Full-stack'],['Programming with Mosh',4.5,'Fundamentals'],['Web Dev Simplified',1.5,'JS/web']],
  'Cloud / DevOps':[['TechWorld with Nana',1.1,'Kubernetes, DevOps'],['NetworkChuck',4.2,'Cloud, networking, Linux'],['freeCodeCamp',10.5,'Full curriculum, certs'],['KodeKloud',0.42,'K8s, Docker, IaC labs'],['That DevOps Guy (Rawkode)',0.13,'Cloud-native, GitOps'],['Fireship',3.6,'Fast dev explainers']],
  'News & Politics':[['Aaj Tak',79,'India news'],['ABP NEWS',60,'India news'],['Vox',12,'Explainers'],['TLDR News',2,'Global']],
  'Business & Entrepreneur':[['Y Combinator',1.5,'Startups'],['GaryVee',4.4,'Marketing'],['Think Media',3,'Creator biz'],['Aevy TV',1.4,'India biz']],
  'Cars & Autos':[['supercars',5,'Exotics'],['Doug DeMuro',4.5,'Reviews'],['donut',9,'Car culture'],['carwow',10,'Reviews']],
  'Art & Design':[['Proko',3,'Drawing'],['The Art Assignment',1,'Art'],['DesignCourse',1,'UI/UX'],['Adobe',2,'Creative']],
  'Motivation & Self-help':[['Sandeep Maheshwari',40,'India motiv.'],['TED',25,'Talks'],['Improvement Pill',4,'Self-help'],['Better Ideas',2,'Habits']],
};

/* ============ MULTI-LANGUAGE OPPORTUNITY ============ */
/* Each: [name, native, speakers(M, YouTube-relevant), rpmTier 1-5, competition 1-5(low=good),
   effort label, region tag, note]. India-weighted: regional Indian languages flagged for the India market. */
const LANGUAGES=[
  ['Hindi','हिन्दी',600,2,3,'low','India','Largest Indian audience — and most creators publish English-only, leaving a huge Hindi-speaking base in tier-2/3 cities untapped.','india'],
  ['Spanish','Español',490,3,3,'low','LATAM + Spain','2nd-biggest language on YouTube. Massive, fast-growing LATAM developer community, light tech competition.','global'],
  ['Portuguese','Português',260,3,2,'low','Brazil','Brazil is a top-5 YouTube market with an enormous, underserved dev community. Pairs with Spanish to cover LATAM.','global'],
  ['Indonesian','Bahasa',200,2,1,'low','Indonesia','One of YouTube\'s largest & fastest-growing audiences. Young tech workforce, very low tech-content competition — best effort-to-reach ratio.','global'],
  ['Bengali','বাংলা',270,1,2,'medium','India + Bangladesh','Huge speaker base across India and Bangladesh. Growing IT workforce, very little technical content.','india'],
  ['Telugu','తెలుగు',95,2,2,'low','India','Strong, fast-growing audience in Telangana and the Telugu diaspora — under-served by most creators.','india'],
  ['Tamil','தமிழ்',85,2,2,'low','India + SEA','Strong technical workforce (Chennai + diaspora in SG/MY). Active, loyal tech audience.','india'],
  ['Marathi','मराठी',95,1,2,'medium','India','Pune is a large IT/engineering hub. Underserved for technical content in Marathi.','india'],
  ['Kannada','ಕನ್ನಡ',60,2,2,'low','India','Bengaluru and Karnataka — a large, engaged urban audience with growing online spend.','india'],
  ['Malayalam','മലയാളം',45,2,2,'medium','India + Gulf','Large Gulf diaspora with strong earning power; engaged tech community.','india'],
  ['Arabic','العربية',310,3,2,'high','MENA + Gulf','Large, underserved for technical content. Growing Gulf cloud market. Effort higher (dialect + RTL).','global'],
  ['German','Deutsch',95,5,4,'high','DACH','Among the highest CPMs on YouTube — translating earns more per view, though the audience expects polish.','global'],
  ['French','Français',230,4,3,'medium','France + Africa','Good RPM plus huge francophone-Africa reach. Solid balance of earnings and growth.','global'],
  ['Japanese','日本語',110,5,4,'high','Japan','High RPM, strong engineering culture, but the hardest: subs rarely enough, audience expects native quality.','global'],
];
const RPM_TIER=['','very low','moderate','good','high','premium'];
const COMP_LABEL=['','wide open','low','moderate','crowded','saturated'];
function langAdvice(channelLang){
  // score = reach(speakers) blended with low competition and RPM, India-weighted slightly
  const max=Math.max(...LANGUAGES.map(l=>l[2]));
  return LANGUAGES.map(l=>{
    const [name,native,sp,rpm,comp,effort,region,note,grp]=l;
    const reachScore=sp/max*40;                 // 0-40
    const compScore=(6-comp)*8;                  // low competition = up to 40
    const rpmScore=rpm*4;                        // 0-20
    const indiaBonus=grp==='india'?6:0;          // user's edge
    const score=Math.round(reachScore+compScore+rpmScore+indiaBonus);
    let why;
    if(comp<=2&&rpm>=3)why=['pass','High reach + high pay — prime target'];
    else if(comp<=2)why=['pass','Low competition — easy reach win'];
    else if(rpm>=4)why=['warn','High RPM but tougher entry — worth it for earnings'];
    else why=['warn','Solid opportunity — weigh effort'];
    // format recommendation by effort
    const fmtRec=effort==='low'?'Start with translated titles + subtitles (cheap, fast).':
      effort==='medium'?'Subtitles first; add multi-language audio if it gains traction.':
      'Needs dubbing or a dedicated regional channel — audience expects native quality.';
    return{name,native,sp,rpm,comp,effort,region,note,grp,score,why,fmtRec};
  }).sort((a,b)=>b.score-a.score);
}

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
  const vs=await ytFetch('videos?part=snippet,statistics,contentDetails&id='+vidIds,key);
  const vids=vs.items.map(v=>{
    const views=+v.statistics.viewCount||0, likes=+v.statistics.likeCount||0;
    return{
      title:v.snippet.title,
      views, likes,
      engagement: views?likes/views*100:0,
      pub:new Date(v.snippet.publishedAt),
      dur:parseISODur(v.contentDetails?.duration),
      titleScore:scoreTitle(v.snippet.title).score,
      hasThumb:!!(v.snippet.thumbnails?.maxres||v.snippet.thumbnails?.high)
    };
  });
  // cadence: avg days between uploads
  const dates=vids.map(v=>v.pub).sort((a,b)=>b-a);
  let cadence=null, consistency=null;
  if(dates.length>1){
    const gaps=[];for(let i=0;i<dates.length-1;i++)gaps.push((dates[i]-dates[i+1])/864e5);
    cadence=gaps.reduce((s,g)=>s+g,0)/gaps.length;
    // consistency = how regular the gaps are (lower stdev/mean = more consistent)
    const m=cadence, sd=Math.sqrt(gaps.reduce((s,g)=>s+(g-m)**2,0)/gaps.length);
    consistency=m?Math.max(0,Math.min(100,Math.round(100-(sd/m)*60))):null;
  }
  const now=Date.now();
  const med=(()=>{const a=vids.map(v=>v.views/Math.max(1,(now-v.pub)/864e5)).sort((p,q)=>p-q);return a[Math.floor(a.length/2)]||0;})();
  vids.forEach(v=>{const vpd=v.views/Math.max(1,(now-v.pub)/864e5);v.tag=vpd>med*1.3?'aging well':vpd<med*0.6?'decaying':'steady';});
  const daysSinceLast=dates.length?(now-dates[0])/864e5:null;
  const avgEng=vids.reduce((s,v)=>s+v.engagement,0)/vids.length;
  const avgTitleScore=Math.round(vids.reduce((s,v)=>s+v.titleScore,0)/vids.length);
  const channel={title:c.snippet.title,subs:+c.statistics.subscriberCount||0,views:+c.statistics.viewCount||0,
      videos:+c.statistics.videoCount||0,thumb:c.snippet.thumbnails?.default?.url,desc:c.snippet.description};
  return{channel,vids,cadence,consistency,daysSinceLast,avgEng,avgTitleScore,
    suggestions:buildUrlSuggestions(channel,vids,{cadence,consistency,daysSinceLast,avgEng,avgTitleScore})};
}
// ISO 8601 duration (PT#M#S) -> seconds
function parseISODur(d){if(!d)return 0;const m=d.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);if(!m)return 0;return (+m[1]||0)*3600+(+m[2]||0)*60+(+m[3]||0);}

/* build ranked fixes + per-video + strategy from public data */
function buildUrlSuggestions(ch,vids,m){
  const fixes=[];  // [severity 0-100, title, detail]  higher=more urgent
  // title quality
  if(m.avgTitleScore<50)fixes.push([90,'Rewrite your titles',`Average title score is ${m.avgTitleScore}/100. Titles are your #1 click lever and they're underperforming. Front-load the keyword, add a number, and a curiosity hook.`]);
  else if(m.avgTitleScore<70)fixes.push([55,'Sharpen your titles',`Titles average ${m.avgTitleScore}/100 — decent but not magnetic. The Optimize tab can score drafts before you publish.`]);
  // consistency
  if(m.consistency!=null&&m.consistency<50)fixes.push([80,'Upload on a schedule',`Your upload timing is erratic (consistency ${m.consistency}/100). The algorithm and your audience both reward predictability. Pick a cadence you can actually sustain.`]);
  // dormancy
  if(m.daysSinceLast!=null&&m.cadence&&m.daysSinceLast>m.cadence*2.5)fixes.push([85,'You\'ve gone quiet',`It's been ${Math.round(m.daysSinceLast)} days since your last upload — well past your usual ~${Math.round(m.cadence)}-day rhythm. Dormancy kills momentum and reach.`]);
  // engagement
  if(m.avgEng<1)fixes.push([60,'Lift engagement',`Like-to-view ratio is ${m.avgEng.toFixed(1)}% — low. Ask a specific question in the first 30s and pin a comment to prompt replies.`]);
  // decaying catalog
  const decay=vids.filter(v=>v.tag==='decaying').length;
  if(decay>vids.length*0.5)fixes.push([50,'Refresh aging videos',`${decay} of the last ${vids.length} videos are losing velocity. Update thumbnails/titles on the ones that once did well.`]);
  // concentration
  const sorted=[...vids].sort((a,b)=>b.views-a.views);
  const total=vids.reduce((s,v)=>s+v.views,0)||1;
  if(sorted[0]&&sorted[0].views/total>0.5)fixes.push([45,'Diversify beyond one hit',`One video drives ${Math.round(sorted[0].views/total*100)}% of recent views. Study what made it work and make 2-3 spiritual sequels.`]);
  // duration sweet spot (educational/tutorial content rewards depth, but not bloat)
  const avgDur=vids.reduce((s,v)=>s+v.dur,0)/vids.length;
  if(avgDur>0&&avgDur<240)fixes.push([35,'Consider longer formats',`Average video is ${fmtDur(avgDur)}. For educational/tutorial content, deeper 8-15 min videos often hold better watch-time and unlock mid-roll ads.`]);
  fixes.sort((a,b)=>b[0]-a[0]);

  // per-video: lowest title scores or decaying with decent views = best targets
  const perVideo=sorted.map(v=>{const tips=[];
    if(v.titleScore<60)tips.push('weak title ('+v.titleScore+'/100) — rewrite');
    if(v.tag==='decaying'&&v.views>med0(vids))tips.push('was popular, now fading — refresh thumbnail');
    if(v.engagement<0.8&&v.views>1000)tips.push('low engagement — add a pinned question');
    return tips.length?{title:v.title,views:v.views,tips}:null;
  }).filter(Boolean).slice(0,6);

  // strategy
  const strategy=[];
  strategy.push(m.cadence!=null?`You upload roughly every ${Math.round(m.cadence)} days. ${m.cadence>10?'Tightening toward weekly would compound growth — if sustainable.':'Solid rhythm; protect it.'}`:'Not enough uploads to read a cadence yet.');
  strategy.push(m.consistency!=null?`Consistency score ${m.consistency}/100 — ${m.consistency>=70?'very regular, keep it up.':m.consistency>=50?'somewhat irregular; a fixed publish day helps.':'erratic; this is your biggest structural fix.'}`:'');
  const winners=sorted.slice(0,3).map(v=>v.title).filter(Boolean);
  if(winners.length)strategy.push(`Your top recent performers: "${winners.join('", "')}". Lean into these formats and topics.`);
  return{fixes,perVideo,strategy:strategy.filter(Boolean)};
}
function med0(vids){const a=vids.map(v=>v.views).sort((p,q)=>p-q);return a[Math.floor(a.length/2)]||0;}

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
  const F=[
  ['optimize','Title & Thumbnail Studio','Score titles 0–100 with written reasoning, grade thumbnails on-canvas for contrast and mobile readability.'],
  ['split','A/B Test','Pit title and thumbnail variants head-to-head and crown a winner. A paid feature on vidIQ &amp; ViewStats — free here.'],
  ['audit','Channel Audit','Drag your Studio CSV: niche-benchmarked CTR, retention, velocity decay, hidden-gem detection — all in your browser.'],
  ['link','Audit by URL','Analyze any channel by name or URL — subscribers, performance, ranked fixes and strategy. Your key, your quota.'],
  ['clock','Best Time to Publish','Finds your strongest publish days from your own data — plus India-aware niche timing guidance.'],
  ['money','Money & Watch-time','Earnings estimator and a translator that turns retention and CTR gains into real annual dollars.'],
  ['globe','Language Opportunity','14 languages ranked by reach, RPM and competition — weighted for an India-based creator. Your regional edge, flagged.'],
  ['fire','Roast My Channel','The full audit with zero diplomacy. Blunt, shareable, and honest about what to fix first.']];
  const route={optimize:'optimize',split:'abtest',audit:'audit',link:'urlaudit',clock:'besttime',money:'money',globe:'languages',fire:'roast'};
  g.innerHTML=F.map(([k,t,d])=>`<div class="feat" onclick="openApp('${route[k]}')"><div class="ic">${svg(k)}</div><h3>${t}</h3><p>${d}</p><div class="go">Open ${svg('arrow',2)}</div></div>`).join('');
}
function paintCompare(){
  const b=$('#cmpBody');if(!b)return;
  const Y=`<span class="yes">${svg('check',2)}</span>`,N=`<span class="no">${svg('x',2)}</span>`,P=t=>`<span class="part">${t}</span>`;
  const R=[
  ['Title / thumbnail scoring',Y,N,N,N,Y],
  ['A/B title &amp; thumbnail testing',Y,N,N,P('beta'),Y],
  ['Channel audit on your own data',P('partial'),N,N,N,Y],
  ['Title / thumbnail reasoning, not just a score',P('score only'),N,N,N,Y],
  ['Earnings / money tools',N,P('basic'),Y,N,Y],
  ['Multi-language strategy',N,N,N,N,Y],
  ['Your data stays in your browser',N,N,N,N,Y],
  ['No account / no extension',N,N,N,N,Y],
  ['Historical scrape of any channel',N,Y,Y,P('trends'),P('not offline')],
  ['Price',`$24.99/mo`,`from $4.50/mo`,`$49.99/mo`,`paid`,`<span class="yes">free</span>`]];
  b.innerHTML=R.map(r=>`<tr><td>${r[0]}</td><td class="c">${r[1]}</td><td class="c">${r[2]}</td><td class="c">${r[3]}</td><td class="c">${r[4]}</td><td class="c us">${r[5]}</td></tr>`).join('');
}

/* ============ APP ROUTER ============ */
let CSV_STATE=null,CHARTS=[];
const NAV=[['optimize','Optimize',svg('optimize'),'tools'],['abtest','A/B Test',svg('split'),'tools'],['research','Research',svg('research'),'tools'],['tags','Tag Suggestions',svg('tag'),'tools'],['besttime','Best Time to Publish',svg('clock'),'tools'],['channelopt','Channel Optimization',svg('check'),'tools'],['money','Money Calculator',svg('money'),'tools'],['worth','Watch-time → Money',svg('money'),'tools'],['languages','Language Opportunity',svg('globe'),'tools'],
  ['plan','Growth Plan',svg('rocket'),'your data'],['audit','Audit',svg('audit'),'your data'],['urlaudit','Audit by URL',svg('link'),'your data'],['roast','Roast My Channel',svg('fire'),'your data'],
  ['creators','Top Creators',svg('crown'),'explore'],['niches','By Niche',svg('grid'),'explore'],
  ['compare','Compare',svg('compare'),'live'],['settings','Settings',svg('settings'),'']];
const ATITLE={optimize:'Optimize <small>pre-publish · no data</small>',abtest:'A/B Test <small>title &amp; thumbnail head-to-head</small>',research:'Research <small>keywords &amp; tags</small>',tags:'Tag Suggestions <small>niche-aware</small>',besttime:'Best Time to Publish <small>from your data</small>',channelopt:'Channel Optimization <small>scored checklist</small>',money:'Money Calculator <small>earnings estimator</small>',worth:'Watch-time → Money <small>what retention is worth</small>',languages:'Language Opportunity <small>expand your reach</small>',plan:'Growth Plan <small>your ranked next steps</small>',audit:'Audit <small>your Studio export</small>',urlaudit:'Audit by URL <small>public data · needs key</small>',roast:'Roast My Channel <small>blunt audit</small>',creators:'Top Creators <small>by subscribers</small>',niches:'Top Creators by Niche',compare:'Compare <small>live mode</small>',settings:'Settings'};

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
  try{({optimize:vOptimize,abtest:vABTest,research:vResearch,tags:vTags,besttime:vBestTime,channelopt:vChannelOpt,money:vMoney,worth:vWorth,languages:vLanguages,plan:vPlan,audit:vAudit,urlaudit:vUrlAudit,roast:vRoast,creators:vCreators,niches:vNiches,compare:vCompare,settings:vSettings}[name]||vOptimize)();}
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
  <div class="panel-sub">Scored on length, power words, specificity, front-loading and curiosity — tuned for how viewers actually click and search.</div>
  <input class="inp" id="tIn" placeholder="e.g. 7 Beginner Mistakes That Ruin Your First Video">
  <div id="tOut" style="margin-top:18px"></div></div>
  <div class="panel"><div class="panel-h">${svg('thumb')}<h3>Thumbnail auditor</h3></div>
  <div class="panel-sub">Drop a thumbnail — contrast, detail density and a real mobile preview, graded on-canvas. Nothing uploaded.</div>
  <div class="drop" id="thDrop">${svg('thumb',1.5)}<h3>Drop thumbnail image</h3><p>1280×720 ideal · JPG / PNG</p></div>
  <input type="file" id="thFile" accept="image/*" class="hide"><div id="thOut"></div></div>
  <div class="panel"><div class="panel-h">${svg('hook')}<h3>Hook builder</h3></div>
  <div class="panel-sub">The 0:18 retention cliff is the #1 killer. This scaffolds the first 15 seconds to beat it.</div>
  <input class="inp" id="hIn" placeholder="What's the video about? e.g. editing in CapCut">
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
  <div class="vhead"><h1>Keyword &amp; tag research</h1><p>Smart tag generation for any niche. We don't invent search-volume numbers we can't source.</p></div>
  <div class="panel"><div class="panel-h">${svg('tag')}<h3>Tag generator</h3></div>
  <div class="panel-sub">Enter your core topic. We expand with niche co-occurrence (k8s → kubectl, helm…) and proven modifiers. Click a tag to copy.</div>
  <input class="inp" id="tagIn" placeholder="e.g. budget travel tips"><div class="tags" id="tagOut"></div></div>
  <div class="panel"><div class="panel-h">${svg('research')}<h3>Title idea spinner</h3></div>
  <div class="panel-sub">Templates that score well, filled with your topic and auto-scored. Take the winner to the Optimize tab.</div>
  <input class="inp" id="idIn" placeholder="e.g. morning routine"><div id="idOut" style="margin-top:14px"></div></div>`;
  const tagIn=$('#tagIn'),tagOut=$('#tagOut');
  tagIn.addEventListener('input',()=>{
    const t=buildTags(tagIn.value);
    tagOut.innerHTML=t.length?t.map(x=>`<span class="t" onclick="navigator.clipboard&&navigator.clipboard.writeText('${esc(x)}')">${esc(x)}</span>`).join(''):'<span class="empty">Type a topic.</span>';
  });
  const idIn=$('#idIn'),idOut=$('#idOut');
  idIn.addEventListener('input',()=>{
    const t=idIn.value.trim();if(!t){idOut.innerHTML='';return;}
    const T=t.charAt(0).toUpperCase()+t.slice(1);
    const ideas=[`How to ${t} (the right way)`,`${T} explained in 10 minutes`,`5 ${t} mistakes everyone makes`,`Why your ${t} isn't working`,`${T}: a beginner's guide`];
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
  <div class="vhead" style="display:flex;justify-content:space-between;align-items:flex-end"><div><h1>${channel?esc(channel.title):'Channel audit'}</h1><p>${isURL?`${fmt(channel.subs)} subscribers · ${s.count} recent videos · public data`:`${s.count} videos · ${fmt(s.totalViews)} total views · benchmarked vs typical YouTube ranges`}</p></div>
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
function loadCSV(file,dest){
  if(!window.Papa){$('#appView').insertAdjacentHTML('beforeend','<div class="panel rose"><div class="empty rose">CSV parser failed to load. Check that vendor/papaparse.min.js is present.</div></div>');return;}
  Papa.parse(file,{header:true,skipEmptyLines:true,complete:res=>{
    const fields=res.meta.fields||Object.keys(res.data[0]||{});
    const r=auditCSV(res.data,fields);
    if(r.error){$('#appView').insertAdjacentHTML('beforeend',`<div class="panel" style="border-color:var(--rose)"><div class="empty" style="color:var(--rose)">${r.error}</div></div>`);return;}
    r.source='csv';CSV_STATE=r;route(dest||'audit');
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
  const sorted=[...TOP_SUBS].sort((a,b)=>b[1]-a[1]);
  const max=sorted[0][1];
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Top ${sorted.length} creators by subscribers</h1><p>Most-subscribed channels worldwide · snapshot as of ${SNAPSHOT_DATE}. Bundled offline — not a live feed.</p></div>
  <div class="panel" style="padding:8px 0"><table class="dtbl"><thead><tr><th style="padding-left:18px">#</th><th>Channel</th><th>Niche</th><th class="r" style="padding-right:18px">Subscribers</th></tr></thead><tbody>
  ${sorted.map((c,i)=>`<tr><td style="padding-left:18px" class="dim">${i+1}</td><td><b>${c[3]} ${esc(c[0])}</b><div style="height:5px;width:${Math.round(c[1]/max*120)}px;background:var(--mint);border-radius:3px;margin-top:5px;opacity:.7"></div></td><td class="dim">${c[2]}</td><td class="r" style="padding-right:18px">${c[1]}M</td></tr>`).join('')}
  </tbody></table></div>
  <div class="panel"><div class="panel-sub" style="margin:0">Subscriber counts are rounded snapshots and shift constantly; the top ~40 are high-confidence, lower ranks vary more by source. For live figures, the Compare tab (with your API key) pulls real-time numbers for any channel.</div></div>`;
}

/* ---------- BY NICHE ---------- */
function vNiches(){
  const entries=Object.entries(NICHE_CREATORS);
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Top creators across ${entries.length} niches</h1><p>Category leaders · ${SNAPSHOT_DATE}. Browse any category — tap a chip to jump to it.</p></div>
  <div class="panel" style="padding:14px 16px"><div style="display:flex;flex-wrap:wrap;gap:8px">${entries.map(([n],i)=>`<span class="t" onclick="document.getElementById('niche${i}').scrollIntoView({behavior:'smooth'})" style="cursor:pointer">${esc(n)}</span>`).join('')}</div></div>
  ${entries.map(([niche,list],i)=>`
  <div class="panel" id="niche${i}"><div class="panel-h">${svg('grid')}<h3>${niche}</h3></div><div style="margin-top:6px">
  ${list.map(c=>`<div class="ideaitem"><div class="it"><b>${esc(c[0])}</b><span class="dim" style="display:block;font-size:12px">${esc(c[2])}</span></div><span class="pill steady">${c[1]>=1?c[1]+'M':Math.round(c[1]*1000)+'K'}</span></div>`).join('')}
  </div></div>`).join('')}
  <div class="panel"><div class="panel-sub" style="margin:0">A curated set of major categories, not an exhaustive list of every possible niche — and figures are rounded snapshots. Every major category is covered, from Gaming and Music to Finance and Tech.</div></div>`;
}

/* ---------- URL AUDIT (needs key) ---------- */
function vUrlAudit(){
  const key=localStorage.getItem('yt_api_key');
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Audit any channel by URL</h1><p>Public data for any channel — subscribers, video performance, upload cadence, title scoring. ${key?'':'Needs your YouTube Data API key.'}</p></div>
  ${key?'':`<div class="lockbar">${svg('lock',1.8)}<div><b>Add a free API key to enable this — takes 2 minutes.</b> <span>Looking up any channel by name or URL needs the YouTube Data API, which requires a key. We never bundle one (it would get stolen). Our Settings page walks you through getting one step by step, with a button that tests it for you.</span><div style="margin-top:11px"><button class="appbtn" onclick="route('settings')" style="font-size:13px;padding:8px 15px">${svg('key',1.8)} Set up my key</button></div></div></div>`}
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
      const c=r.channel;const sg=r.suggestions;
      const sev=s=>s>=80?'fail':s>=50?'warn':'pass';
      out.innerHTML=`<div style="margin-top:20px">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">${c.thumb?`<img src="${c.thumb}" style="width:54px;height:54px;border-radius:50%;border:1px solid var(--line)">`:''}<div><div style="font-size:18px;font-weight:600">${esc(c.title)}</div><div class="dim" style="font-size:13px">${fmt(c.subs)} subscribers · ${fmt(c.videos)} videos · ${fmt(c.views)} total views</div></div></div>
      <div class="grid4" style="margin-bottom:16px">
        <div class="mcard"><div class="l">Avg title score</div><div class="n ${r.avgTitleScore>=70?'mint':r.avgTitleScore>=45?'amber':'rose'}">${r.avgTitleScore}</div><div class="d dim">recent uploads</div></div>
        <div class="mcard"><div class="l">Upload cadence</div><div class="n">${r.cadence!=null?r.cadence.toFixed(1):'—'}</div><div class="d dim">days between</div></div>
        <div class="mcard"><div class="l">Consistency</div><div class="n ${r.consistency>=70?'mint':r.consistency>=50?'amber':'rose'}">${r.consistency!=null?r.consistency:'—'}</div><div class="d dim">schedule regularity</div></div>
        <div class="mcard"><div class="l">Engagement</div><div class="n ${r.avgEng>=2?'mint':r.avgEng>=1?'amber':'rose'}">${r.avgEng.toFixed(1)}%</div><div class="d dim">likes ÷ views</div></div>
      </div>

      <div class="panel" style="background:var(--bg)"><div class="panel-h">${svg('fire')}<h3>Priority fixes</h3></div><div class="panel-sub">Ranked by impact — tackle the top ones first.</div>
      ${sg.fixes.length?sg.fixes.map((f,i)=>`<div class="row"><div class="ic ${sev(f[0])}">${svg(sev(f[0])==='pass'?'check':sev(f[0])==='warn'?'warn':'x',1.8)}</div><div class="body"><b>${i+1}. ${f[1]}</b><span style="color:var(--txt-2)">${f[2]}</span></div></div>`).join(''):'<div class="empty">No major issues found in the public signals — this channel is well run.</div>'}</div>

      ${sg.perVideo.length?`<div class="panel" style="background:var(--bg)"><div class="panel-h">${svg('optimize')}<h3>Per-video suggestions</h3></div><div class="panel-sub">Specific videos worth revisiting and why.</div>
      ${sg.perVideo.map(v=>`<div class="row"><div class="body"><b>${esc(v.title.slice(0,52))}</b><span style="color:var(--txt-2)">${fmt(v.views)} views · ${v.tips.join(' · ')}</span></div></div>`).join('')}</div>`:''}

      <div class="panel" style="background:var(--bg)"><div class="panel-h">${svg('grid')}<h3>Channel strategy</h3></div>
      ${sg.strategy.map(s=>`<div class="row"><div class="ic info">${svg('check',1.8)}</div><div class="body"><span style="color:var(--txt-2)">${esc(s)}</span></div></div>`).join('')}</div>

      <div class="panel" style="background:var(--bg)"><div class="panel-h">${svg('audit')}<h3>Recent videos</h3></div>
      <div style="overflow-x:auto"><table class="dtbl"><thead><tr><th>Recent video</th><th class="r">Views</th><th class="r">Likes</th><th class="r">Title</th><th class="r">Aging</th></tr></thead><tbody>
      ${r.vids.sort((a,b)=>b.views-a.views).map(v=>{const cl=v.tag==='aging well'?'good':v.tag==='decaying'?'decay':'steady';return `<tr><td>${esc(v.title.slice(0,46))}</td><td class="r">${fmt(v.views)}</td><td class="r">${fmt(v.likes)}</td><td class="r"><span class="pill ${v.titleScore>=70?'good':v.titleScore>=45?'decay':'gem'}">${v.titleScore}</span></td><td class="r"><span class="pill ${cl}">${v.tag}</span></td></tr>`;}).join('')}
      </tbody></table></div></div>
      <div class="panel-sub" style="text-align:center">Note: CTR, retention and watch-time are private. For those, the channel owner can use <b style="color:var(--mint);cursor:pointer" onclick="route('audit')">Audit by CSV</b>.</div>
      </div>`;
    }catch(e){out.innerHTML=`<div class="empty" style="color:var(--rose);margin-top:16px">${esc(e.message)}</div>`;}
    btn.disabled=false;
  };
  $('#urlGo').onclick=go;
  $('#urlIn').addEventListener('keydown',e=>{if(e.key==='Enter')go();});
}

/* ---------- LANGUAGE OPPORTUNITY ---------- */
function vLanguages(){
  const recs=langAdvice();
  const top=recs.slice(0,5);
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Language opportunity 🌍</h1><p>Most channels publish in one language only, leaving large multilingual audiences untapped. This ranks 14 languages by reach, earnings and competition — with extra weight for India's large multilingual market. Strategic guidance, not a per-channel demand measurement.</p></div>

  <div class="panel"><div class="panel-h">${svg('globe')}<h3>Your top 5 expansion targets</h3></div><div class="panel-sub">Ranked by a blend of audience size, low competition, RPM, and regional edge.</div>
  ${top.map((l,i)=>`<div class="row"><div class="ic"><div style="width:26px;height:26px;border-radius:50%;background:var(--surf-2);border:1px solid var(--line-2);display:grid;place-items:center;font-family:var(--mono);font-size:12px;font-weight:600;color:var(--mint)">${i+1}</div></div>
  <div class="body"><b>${l.name} <span class="dim" style="font-weight:400">${l.native} · ${l.region}</span></b><span style="color:var(--txt-2)">${l.note}</span><span style="color:var(--txt-3);margin-top:4px">→ ${l.fmtRec}</span></div>
  <div style="text-align:right;flex-shrink:0"><span class="pill ${l.why[0]==='pass'?'good':'decay'}">${l.score}</span></div></div>`).join('')}</div>

  <div class="panel"><div class="panel-h">${svg('grid')}<h3>All 14 languages</h3></div><div class="panel-sub">Reach = YouTube-relevant speakers. RPM = relative earning power. Competition lower is better.</div>
  <div style="overflow-x:auto"><table class="dtbl"><thead><tr><th>Language</th><th class="r">Reach</th><th class="r">RPM</th><th class="r">Competition</th><th class="r">Effort</th><th class="r">Score</th></tr></thead><tbody>
  ${recs.map(l=>`<tr><td><b>${l.name}</b> <span class="dim">${l.native}</span>${l.grp==='india'?' <span class="pill steady" style="font-size:10px">your edge</span>':''}</td>
  <td class="r">${l.sp}M</td>
  <td class="r"><span class="${l.rpm>=4?'mint':l.rpm>=3?'':'dim'}">${RPM_TIER[l.rpm]}</span></td>
  <td class="r"><span class="${l.comp<=2?'mint':l.comp>=4?'rose':'amber'}">${COMP_LABEL[l.comp]}</span></td>
  <td class="r dim">${l.effort}</td>
  <td class="r"><span class="pill ${l.score>=70?'good':l.score>=50?'decay':'steady'}">${l.score}</span></td></tr>`).join('')}
  </tbody></table></div></div>

  <div class="panel"><div class="panel-h">${svg('check')}<h3>How to expand — cheapest to most committed</h3></div>
  <div class="row"><div class="ic pass">${svg('check',1.8)}</div><div class="body"><b>1. Translated titles + descriptions</b><span>Lowest effort, instant. YouTube lets you add translations per language — captures search in that language with zero new production.</span></div></div>
  <div class="row"><div class="ic pass">${svg('check',1.8)}</div><div class="body"><b>2. Subtitles / closed captions</b><span>Upload SRTs (or auto-generate then correct). Opens the video to non-English viewers and boosts accessibility + SEO.</span></div></div>
  <div class="row"><div class="ic warn">${svg('warn',1.8)}</div><div class="body"><b>3. Multi-language audio tracks</b><span>YouTube's dubbing feature lets one video carry multiple audio tracks. More effort (voiceover per language) but keeps everything on one video's momentum.</span></div></div>
  <div class="row"><div class="ic warn">${svg('warn',1.8)}</div><div class="body"><b>4. Dedicated regional channel</b><span>Most committed. Worth it only when a language shows real traction — splits your effort but lets you tailor fully to that audience.</span></div></div></div>

  <div class="panel"><div class="panel-sub" style="margin:0">Rankings come from bundled knowledge (speaker base, niche translatability, RPM tier) — not live per-channel demand data. Use them to <i>prioritize</i> experiments, then let your own results confirm. The Indian languages are flagged as your edge: your roots make that content more authentic than a generalist could produce.</div></div>`;
}

/* ---------- A/B TEST (title + thumbnail head-to-head) ---------- */
function vABTest(){
  $('#appView').innerHTML=`
  <div class="vhead"><h1>A/B test 🆚</h1><p>Pit your variants against each other before you publish. vidIQ &amp; TubeBuddy charge for this — here it's free and instant. (Heuristic prediction, not live split-testing.)</p></div>
  <div class="panel"><div class="panel-h">${svg('split')}<h3>Title showdown</h3></div><div class="panel-sub">Enter 2–4 title variants. We score each and crown a winner with the reasoning.</div>
  <div id="abTitles"></div>
  <button class="appbtn gho" id="abAdd" style="margin-top:10px">+ Add variant</button>
  <div id="abTitleOut" style="margin-top:18px"></div></div>
  <div class="panel"><div class="panel-h">${svg('thumb')}<h3>Thumbnail showdown</h3></div><div class="panel-sub">Drop two thumbnails — we grade contrast, detail density and mobile readability side by side.</div>
  <div class="grid2"><div class="drop" id="abThA" style="padding:28px 16px">${svg('thumb',1.5)}<h3>Thumbnail A</h3><p>drop or click</p></div><div class="drop" id="abThB" style="padding:28px 16px">${svg('thumb',1.5)}<h3>Thumbnail B</h3><p>drop or click</p></div></div>
  <input type="file" id="abFileA" accept="image/*" class="hide"><input type="file" id="abFileB" accept="image/*" class="hide">
  <div id="abThumbOut" style="margin-top:16px"></div></div>`;

  // titles
  let variants=['',''];
  const renderInputs=()=>{
    $('#abTitles').innerHTML=variants.map((v,i)=>`<div style="display:flex;gap:8px;margin-bottom:8px;align-items:center"><span class="mono dim" style="width:18px">${String.fromCharCode(65+i)}</span><input class="inp abT" data-i="${i}" placeholder="Title variant ${String.fromCharCode(65+i)}" value="${esc(v)}">${variants.length>2?`<button class="appbtn gho abDel" data-i="${i}" style="padding:8px 11px">✕</button>`:''}</div>`).join('');
    document.querySelectorAll('.abT').forEach(inp=>inp.addEventListener('input',e=>{variants[+e.target.dataset.i]=e.target.value;scoreAB();}));
    document.querySelectorAll('.abDel').forEach(b=>b.onclick=()=>{variants.splice(+b.dataset.i,1);renderInputs();scoreAB();});
  };
  const scoreAB=()=>{
    const scored=variants.map((v,i)=>({label:String.fromCharCode(65+i),text:v,r:scoreTitle(v)})).filter(x=>x.text.trim());
    if(scored.length<2){$('#abTitleOut').innerHTML='<div class="empty">Enter at least two variants to compare.</div>';return;}
    const max=Math.max(...scored.map(s=>s.r.score));
    scored.sort((a,b)=>b.r.score-a.r.score);
    $('#abTitleOut').innerHTML=scored.map((s,idx)=>{
      const win=s.r.score===max;const col=s.r.score>=70?'var(--mint)':s.r.score>=45?'var(--amber)':'var(--rose)';
      return `<div class="row" style="${win?'background:rgba(61,220,151,.06);margin:0 -10px;padding:12px 10px;border-radius:8px':''}"><div class="ic" style="font-family:var(--mono);font-weight:600;color:${col}">${s.r.score}</div><div class="body"><b>${win?'🏆 ':''}${esc(s.text)}</b><span>${s.r.len} chars · ${s.r.pw} power words · ${win?'<span class="mint">winner — '+ (s.r.notes.find(n=>n[0]==='pass')?.[2]||'strongest overall')+'</span>':'try the Optimize tab to close the gap'}</span></div></div>`;
    }).join('');
  };
  $('#abAdd').onclick=()=>{if(variants.length<4){variants.push('');renderInputs();}};
  renderInputs();scoreAB();

  // thumbnails
  const slots={A:null,B:null};
  const wire=(drop,file,slot)=>{
    const dz=$(drop),fi=$(file);
    dz.onclick=()=>fi.click();
    dz.ondragover=e=>{e.preventDefault();dz.classList.add('over');};dz.ondragleave=()=>dz.classList.remove('over');
    dz.ondrop=e=>{e.preventDefault();dz.classList.remove('over');if(e.dataTransfer.files[0])gradeAB(e.dataTransfer.files[0],slot);};
    fi.onchange=e=>{if(e.target.files[0])gradeAB(e.target.files[0],slot);};
  };
  const gradeAB=(f,slot)=>{const img=new Image();img.onload=()=>{
    const cv=document.createElement('canvas');cv.width=160;cv.height=90;const ctx=cv.getContext('2d');ctx.drawImage(img,0,0,160,90);
    const d=ctx.getImageData(0,0,160,90).data,n=160*90,L=[];let sum=0,sum2=0;
    for(let i=0;i<d.length;i+=4){const l=.299*d[i]+.587*d[i+1]+.114*d[i+2];L.push(l);sum+=l;sum2+=l*l;}
    const mean=sum/n,sd=Math.sqrt(Math.max(0,sum2/n-mean*mean));
    let edges=0;for(let y=1;y<90;y++)for(let x=1;x<160;x++){const i=y*160+x;if(Math.abs(L[i]-L[i-1])>40||Math.abs(L[i]-L[i-160])>40)edges++;}
    const ep=Math.round(edges/n*100);
    const score=Math.round(Math.min(100,(sd>55?40:sd>35?25:10)+(ep>=6&&ep<=22?40:20)+(img.width>=1280?20:10)));
    slots[slot]={src:img.src,sd:Math.round(sd),ep,score,w:img.width,h:img.height};
    renderThumbs();
  };img.src=URL.createObjectURL(f);};
  const renderThumbs=()=>{
    if(!slots.A&&!slots.B)return;
    const cells=['A','B'].map(k=>{const s=slots[k];if(!s)return `<div class="mcard"><div class="l">Thumbnail ${k}</div><div class="empty" style="padding:14px">not loaded</div></div>`;
      const win=slots.A&&slots.B&&s.score===Math.max(slots.A.score,slots.B.score);
      return `<div class="mcard" style="${win?'border-color:var(--mint)':''}"><div class="l">${win?'🏆 ':''}Thumbnail ${k} — score ${s.score}</div><img src="${s.src}" style="width:100%;border-radius:6px;border:1px solid var(--line);margin:8px 0"><div style="font-size:12px;color:var(--txt-3)">contrast ${s.sd} · density ${s.ep}% · ${s.w}×${s.h}</div></div>`;}).join('');
    $('#abThumbOut').innerHTML=`<div class="grid2">${cells}</div>`;
  };
  wire('#abThA','#abFileA','A');wire('#abThB','#abFileB','B');
}

/* ---------- TAG SUGGESTIONS (dedicated, richer) ---------- */
function vTags(){
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Tag suggestions 🏷️</h1><p>Niche-aware tags with co-occurrence expansion. A paid feature elsewhere — free here. Click any tag to copy; "Copy all" grabs the set.</p></div>
  <div class="panel"><div class="panel-h">${svg('tag')}<h3>Generate tags</h3></div><div class="panel-sub">Enter your video's core topic. We expand with related terms and proven modifiers.</div>
  <input class="inp" id="tgIn" placeholder="e.g. healthy meal prep">
  <div id="tgOut"></div></div>
  <div class="panel"><div class="panel-sub" style="margin:0">Tags matter less than they used to for ranking, but still help YouTube understand context and catch misspellings. Keep 5–15 relevant ones; don't stuff. Your title and description carry far more SEO weight.</div></div>`;
  const out=$('#tgOut');
  $('#tgIn').addEventListener('input',e=>{
    const tags=buildTags(e.target.value);
    if(!tags.length){out.innerHTML='';return;}
    out.innerHTML=`<div class="tags" id="tgTags">${tags.map(t=>`<span class="t" data-t="${esc(t)}">${esc(t)}</span>`).join('')}</div>
    <div style="margin-top:14px;display:flex;gap:10px;align-items:center"><button class="appbtn gho" id="tgCopy">Copy all (${tags.length})</button><span class="dim" style="font-size:12px">${tags.join(', ').length} characters</span></div>`;
    out.querySelectorAll('.t').forEach(s=>s.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(s.dataset.t);s.style.borderColor='var(--mint)';s.style.color='var(--mint)';});
    $('#tgCopy').onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(tags.join(', '));$('#tgCopy').textContent='Copied ✓';setTimeout(()=>{const b=$('#tgCopy');if(b)b.textContent='Copy all ('+tags.length+')';},1200);};
  });
}

/* ---------- BEST TIME TO PUBLISH ---------- */
const DOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function bestTimeFromCSV(vids){
  // need publish dates; bucket by day-of-week, score by avg views
  const withDates=vids.filter(v=>v.pub&&!isNaN(v.pub));
  if(withDates.length<4)return null;
  const byDow={};for(let i=0;i<7;i++)byDow[i]={n:0,views:0};
  withDates.forEach(v=>{const d=v.pub.getDay();byDow[d].n++;byDow[d].views+=v.views;});
  const rows=DOW.map((name,i)=>({day:name,n:byDow[i].n,avg:byDow[i].n?byDow[i].views/byDow[i].n:0}));
  const maxAvg=Math.max(...rows.map(r=>r.avg))||1;
  return{rows,maxAvg,total:withDates.length};
}
function vBestTime(){
  const data=CSV_STATE&&CSV_STATE.vids?bestTimeFromCSV(CSV_STATE.vids):null;
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Best time to publish ⏰</h1><p>${data?'Based on YOUR channel\'s actual upload history — which days have earned you the most views per video.':'Two modes: upload your CSV to see when <i>your</i> videos perform best, or use the niche guidance below.'}</p></div>
  ${data?`<div class="panel"><div class="panel-h">${svg('clock')}<h3>Your performance by day</h3></div><div class="panel-sub">Average views per video, by publish day. From ${data.total} videos with dates.</div>
  ${data.rows.map(r=>`<div style="display:flex;align-items:center;gap:12px;margin-bottom:9px"><span class="mono" style="width:38px;color:var(--txt-2)">${r.day}</span><div style="flex:1;height:24px;background:var(--bg);border-radius:6px;overflow:hidden;position:relative"><div style="height:100%;width:${Math.round(r.avg/data.maxAvg*100)}%;background:${r.avg===data.maxAvg?'var(--mint)':'var(--line-2)'};border-radius:6px;transition:width .4s"></div></div><span class="mono dim" style="width:70px;text-align:right;font-size:12px">${r.n?fmt(r.avg):'—'}</span></div>`).join('')}
  <div class="panel-sub" style="margin-top:14px;margin-bottom:0">${(()=>{const best=data.rows.filter(r=>r.n).sort((a,b)=>b.avg-a.avg)[0];return best?`Your strongest day is <b class="mint">${best.day}</b> (${fmt(best.avg)} avg views/video). Worth concentrating uploads there — but small sample sizes can mislead, so treat it as a lean, not a law.`:'';})()}</div></div>
  <div style="text-align:center;margin-bottom:18px"><button class="appbtn gho" onclick="resetCSV()">Use a different file</button></div>`:`
  <div class="panel"><div class="panel-h">${svg('audit')}<h3>Analyze your own data</h3></div><div class="panel-sub">Upload your Studio CSV to see your actual best-performing days.</div>
  <div class="drop" id="btDrop">${svg('clock',1.5)}<h3>Drop your Studio export (.csv)</h3><p>parsed locally, never uploaded</p></div><input type="file" id="btFile" accept=".csv" class="hide"></div>`}
  <div class="panel"><div class="panel-h">${svg('globe')}<h3>Niche guidance (India + global defaults)</h3></div><div class="panel-sub">When no data is loaded, these are sensible defaults for a technical audience.</div>
  <div class="row"><div class="ic pass">${svg('check',1.8)}</div><div class="body"><b>Best days: Tuesday–Thursday</b><span>Tech audiences watch tutorials most mid-week. Weekends skew lower for educational content.</span></div></div>
  <div class="row"><div class="ic pass">${svg('check',1.8)}</div><div class="body"><b>Best time (India): 6–9 PM IST</b><span>After work hours. Publish a couple hours earlier so YouTube has indexed it before the evening surge.</span></div></div>
  <div class="row"><div class="ic pass">${svg('check',1.8)}</div><div class="body"><b>For a global/US tech audience: 2–4 PM IST</b><span>Catches US morning (EST) plus India evening — the overlap window for a bilingual reach strategy.</span></div></div>
  <div class="row"><div class="ic warn">${svg('warn',1.8)}</div><div class="body"><b>Consistency beats perfect timing</b><span>A predictable schedule the algorithm can rely on matters more than hitting an exact hour. Pick a slot you can keep.</span></div></div></div>`;
  if(!data){const dz=$('#btDrop'),fi=$('#btFile');if(dz){
    dz.onclick=()=>fi.click();
    dz.ondragover=e=>{e.preventDefault();dz.classList.add('over');};dz.ondragleave=()=>dz.classList.remove('over');
    dz.ondrop=e=>{e.preventDefault();dz.classList.remove('over');if(e.dataTransfer.files[0])loadCSV(e.dataTransfer.files[0],'besttime');};
    fi.onchange=e=>{if(e.target.files[0])loadCSV(e.target.files[0],'besttime');};
  }}
}

/* ---------- GROWTH PLAN (synthesis) ---------- */
function buildGrowthPlan(s,vids){
  const plan=[];  // {priority, title, why, action, payoff}
  // 1. CTR / thumbnails
  if(s.avgCtr!=null){
    if(s.avgCtr<NICHE.ctr.poor)plan.push({p:95,area:'Thumbnails',title:'Fix your thumbnails first',why:`CTR is ${s.avgCtr.toFixed(1)}% vs the ${NICHE.ctr.good}% healthy benchmark — this is your single biggest bottleneck.`,action:'Redesign thumbnails with high contrast, large readable text, and one clear focal point. Test variants in the A/B tab.',payoff:'Lifting CTR from '+s.avgCtr.toFixed(1)+'% toward 6% could multiply impressions-to-views.'});
    else if(s.avgCtr<NICHE.ctr.good)plan.push({p:65,area:'Thumbnails',title:'Sharpen your thumbnails',why:`CTR is ${s.avgCtr.toFixed(1)}% — workable but below the ${NICHE.ctr.good}% top tier.`,action:'A/B test bolder thumbnail variants. Small CTR gains compound across every impression.',payoff:'Each +1% CTR is a direct, proportional view increase.'});
  }
  // 2. Retention
  if(s.avgRet!=null){
    if(s.avgRet<NICHE.retention.poor)plan.push({p:90,area:'Retention',title:'Rebuild your intros',why:`${Math.round(s.avgRet)}% retention means most viewers leave early — the 0:18 cliff is hitting you hard.`,action:'Use the Hook Builder. State the payoff in the first 5 seconds, show the result on screen, cut the throat-clearing.',payoff:'Higher retention = more watch-time, more ad slots, and a stronger algorithmic signal.'});
    else if(s.avgRet<NICHE.retention.good)plan.push({p:60,area:'Retention',title:'Tighten pacing',why:`${Math.round(s.avgRet)}% retention is decent but viewers drift mid-video.`,action:'Add pattern interrupts (chapters, b-roll, screen changes) every 30-60s.',payoff:'See the Watch-time → Money tab for the dollar value of each retention point.'});
  }
  // 3. Hidden gems
  if(s.gems>0)plan.push({p:80,area:'Promotion',title:`Re-promote ${s.gems} hidden gem${s.gems>1?'s':''}`,why:`You have ${s.gems} video${s.gems>1?'s':''} with strong retention/CTR but low views — proven content that just needs eyes.`,action:'Add them to playlists, link from end screens of popular videos, and re-share on community tab. Zero new production.',payoff:'Fastest possible win — the content already works.'});
  // 4. Titles
  const avgTitle=Math.round(vids.reduce((a,v)=>a+scoreTitle(v.title).score,0)/vids.length);
  if(avgTitle<50)plan.push({p:70,area:'Titles',title:'Rewrite weak titles',why:`Titles average ${avgTitle}/100 — they read like filenames, not hooks.`,action:'Front-load keywords, add numbers, inject curiosity. Score drafts in the Optimize tab before publishing.',payoff:'Better titles lift both search discovery and CTR.'});
  else if(avgTitle<70)plan.push({p:45,area:'Titles',title:'Polish your titles',why:`Titles average ${avgTitle}/100 — serviceable but not magnetic.`,action:'Run each new title through the Optimize scorer; aim for 70+.',payoff:'Incremental CTR and search gains.'});
  // 5. Cadence / decay
  const decay=vids.filter(v=>v.tag==='decaying').length;
  if(decay>vids.length*0.5)plan.push({p:50,area:'Catalog',title:'Refresh aging videos',why:`${decay} of ${vids.length} videos are losing velocity.`,action:'Update thumbnails and titles on ones that once performed; they may re-enter circulation.',payoff:'Revives dormant reach without new filming.'});
  // 6. Best day (if dates available)
  const bt=bestTimeFromCSV(vids);
  if(bt){const best=bt.rows.filter(r=>r.n).sort((a,b)=>b.avg-a.avg)[0];if(best)plan.push({p:40,area:'Timing',title:`Concentrate uploads on ${best.day}`,why:`Your ${best.day} videos average ${fmt(best.avg)} views — your strongest day.`,action:`Schedule consistently on ${best.day}. Consistency matters more than the exact day.`,payoff:'Aligns releases with your audience\'s proven active window.'});}
  // 7. Language (always relevant for India-based)
  plan.push({p:30,area:'Expansion',title:'Test one new language',why:'Most channels publish in one language only, leaving large multilingual audiences untapped.',action:'Start cheap: add translated titles + subtitles for Hindi or your strongest regional language (see Language Opportunity tab).',payoff:'Opens an entirely new audience with zero new filming.'});
  return plan.sort((a,b)=>b.p-a.p);
}
function vPlan(){
  if(!CSV_STATE||CSV_STATE.source==='url'){
    $('#appView').innerHTML=`
    <div class="vhead"><h1>Your growth plan 🚀</h1><p>One ranked action list, synthesized from your real data — pulling together what the Audit, Best-Time, Retention and Language tools each see. ${CSV_STATE&&CSV_STATE.source==='url'?'The URL audit only has public data; load your Studio CSV for the full plan.':'Upload your Studio CSV to generate it.'}</p></div>
    <div class="drop" id="planDrop">${svg('rocket',1.5)}<h3>Drop your Studio export (.csv)</h3><p>We turn your numbers into a prioritized to-do list — parsed locally, never uploaded</p></div>
    <input type="file" id="planFile" accept=".csv" class="hide">
    <div class="panel" style="margin-top:18px"><div class="panel-sub" style="margin:0">No CSV yet? You can still use every pre-publish tool (Optimize, A/B Test, Tags, Language) with no data at all.</div></div>`;
    const dz=$('#planDrop'),fi=$('#planFile');
    dz.onclick=()=>fi.click();
    dz.ondragover=e=>{e.preventDefault();dz.classList.add('over');};dz.ondragleave=()=>dz.classList.remove('over');
    dz.ondrop=e=>{e.preventDefault();dz.classList.remove('over');if(e.dataTransfer.files[0])loadCSV(e.dataTransfer.files[0],'plan');};
    fi.onchange=e=>{if(e.target.files[0])loadCSV(e.target.files[0],'plan');};
    return;
  }
  const {stats:s,vids}=CSV_STATE;
  const plan=buildGrowthPlan(s,vids);
  const top3=plan.slice(0,3);
  $('#appView').innerHTML=`
  <div class="vhead" style="display:flex;justify-content:space-between;align-items:flex-end"><div><h1>Your growth plan 🚀</h1><p>${plan.length} prioritized actions from ${s.count} videos · ranked by impact</p></div><button class="appbtn gho" onclick="resetCSV()">Different file</button></div>

  <div class="panel" style="border-color:var(--mint)"><div class="panel-h">${svg('rocket')}<h3 style="color:var(--mint)">Do these 3 first</h3></div><div class="panel-sub">Your highest-impact moves this month.</div>
  ${top3.map((p,i)=>`<div class="row"><div class="ic"><div style="width:26px;height:26px;border-radius:50%;background:var(--mint);color:#04231A;display:grid;place-items:center;font-family:var(--mono);font-size:13px;font-weight:700">${i+1}</div></div><div class="body"><b>${p.title}</b><span style="color:var(--txt-2)">${p.why}</span><span style="color:var(--mint);margin-top:4px">→ ${p.action}</span></div></div>`).join('')}</div>

  <div class="panel"><div class="panel-h">${svg('check')}<h3>The full plan</h3></div><div class="panel-sub">Every opportunity we found, ranked. Tackle top-down.</div>
  ${plan.map((p,i)=>`<div class="row"><div class="ic" style="width:auto;flex-shrink:0"><span class="pill ${p.p>=80?'decay':p.p>=50?'gem':'steady'}" style="font-size:10px;white-space:nowrap">${p.area}</span></div><div class="body" style="margin-left:4px"><b>${i+1}. ${p.title}</b><span style="color:var(--txt-2)">${p.why}</span><span style="color:var(--txt-3);margin-top:3px">${p.action}</span><span class="mint" style="font-size:12px;margin-top:3px">Payoff: ${p.payoff}</span></div></div>`).join('')}</div>

  <div class="panel"><div class="panel-sub" style="margin:0">This plan synthesizes your CTR, retention, catalog age, title quality, upload timing and expansion options into one ranked list. For the blunt version see <b style="color:var(--mint);cursor:pointer" onclick="route('roast')">Roast</b>; for full data see <b style="color:var(--mint);cursor:pointer" onclick="route('audit')">Audit</b>.</div></div>`;
}

/* ---------- WORTH: WATCH-TIME → MONEY ---------- */
function vWorth(){
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Watch-time → money translator</h1><p>Retention feels abstract. This turns it into dollars: see what a few points of CTR or watch-time are actually worth on your traffic.</p></div>
  <div class="panel"><div class="grid2">
    <div><label class="fld">Monthly impressions <span class="dim">(thumbnail shown)</span></label><input class="inp" id="wImp" type="text" value="1000000" inputmode="numeric"></div>
    <div><label class="fld">Niche</label><select class="inp" id="wNiche">${Object.keys(RPM_NICHE).map(k=>`<option value="${RPM_NICHE[k]}">${k} (~$${RPM_NICHE[k]} RPM)</option>`).join('')}</select></div>
    <div><label class="fld">Audience geography</label><select class="inp" id="wGeo">${Object.keys(GEO_MULT).map(k=>`<option value="${GEO_MULT[k]}">${k}</option>`).join('')}</select></div>
    <div><label class="fld">Monetized views <span class="dim">(% with ads)</span></label><input class="inp" id="wPct" type="text" value="55" inputmode="numeric"></div>
  </div></div>
  <div class="panel"><div class="panel-h">${svg('optimize')}<h3>Your current levers</h3></div><div class="panel-sub">Set these to your real numbers. The two biggest multipliers on revenue: how many people click (CTR) and how long they stay (more watch-time = more ad slots).</div>
  <div style="margin-bottom:18px"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px"><span class="muted">Click-through rate</span><span class="mono mint" id="wCtrV">5%</span></div><input type="range" id="wCtr" min="1" max="15" value="5" step="0.5" style="width:100%;accent-color:var(--mint)"></div>
  <div><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px"><span class="muted">Avg view duration (min)</span><span class="mono mint" id="wRetV">4 min</span></div><input type="range" id="wRet" min="1" max="20" value="4" step="0.5" style="width:100%;accent-color:var(--mint)"></div></div>
  <div class="panel"><div class="panel-h">${svg('money')}<h3>What you're earning now</h3></div>
  <div class="grid2"><div class="mcard"><div class="l">Monthly views (from CTR)</div><div class="n" id="wViews">—</div></div><div class="mcard" style="border-color:var(--mint)"><div class="l">Monthly revenue</div><div class="n mint" id="wRev">—</div></div></div></div>
  <div class="panel"><div class="panel-h">${svg('fire')}<h3>What improvements are worth</h3></div><div class="panel-sub">Holding everything else equal — the annual upside of each move.</div><div id="wDeltas"></div></div>
  <div class="panel"><div class="panel-sub" style="margin:0">Watch-time affects revenue because longer videos can run mid-roll ads. This models that gently — real ad load varies. Numbers are directional, meant to show <i>relative</i> leverage, not a payout guarantee.</div></div>`;
  const $w=id=>document.getElementById(id);
  const adFactor=mins=>Math.min(1.8,0.85+Math.max(0,mins-4)*0.06+(mins>=8?0.15:0));
  const calc=()=>{
    const imp=+($w('wImp').value.replace(/[^\d]/g,''))||0;
    const rpm=+$w('wNiche').value,geo=+$w('wGeo').value,pct=Math.min(100,Math.max(0,+$w('wPct').value||0));
    const ctr=+$w('wCtr').value,ret=+$w('wRet').value;
    $w('wCtrV').textContent=ctr+'%';$w('wRetV').textContent=ret+' min';
    const rev=(c,r)=>{const views=imp*(c/100);return{views,rev:calcMoney(views,rpm*adFactor(r),geo,pct).mid};};
    const cur=rev(ctr,ret);
    $w('wViews').textContent=fmt(cur.views);$w('wRev').textContent='$'+fmt(cur.rev);
    const sc=[['CTR +1 point','one more click per 100 impressions',rev(ctr+1,ret).rev-cur.rev],
      ['CTR +2 points','a meaningfully better thumbnail + title',rev(ctr+2,ret).rev-cur.rev],
      ['+2 min watch-time','beat the cliff, hold viewers longer',rev(ctr,ret+2).rev-cur.rev],
      ['Both: +1 CTR & +2 min','compounding the two levers',rev(ctr+1,ret+2).rev-cur.rev]];
    $w('wDeltas').innerHTML=sc.map(([t,d,delta])=>`<div class="row"><div class="ic pass">${svg('check',1.8)}</div><div class="body"><b>${t}</b><span>${d}</span></div><div style="text-align:right;flex-shrink:0"><div class="mono mint" style="font-size:16px;font-weight:600">+$${fmt(Math.max(0,delta)*12)}</div><div class="dim" style="font-size:11px">per year</div></div></div>`).join('');
  };
  ['wImp','wNiche','wGeo','wPct','wCtr','wRet'].forEach(id=>$w(id).addEventListener('input',calc));calc();
}

/* ---------- ROAST MY CHANNEL ---------- */
function roastLines(s,vids){
  const L=[];
  if(s.avgCtr!=null){
    if(s.avgCtr<NICHE.ctr.poor)L.push(['fail','Your thumbnails',`A ${s.avgCtr.toFixed(1)}% CTR means ~${Math.round(100-s.avgCtr)} of every 100 people who saw your video scrolled right past. Your thumbnails are doing volunteer work.`]);
    else if(s.avgCtr<NICHE.ctr.good)L.push(['warn','Your thumbnails',`${s.avgCtr.toFixed(1)}% CTR is... fine. "Fine" is what you call a restaurant you'll never revisit. The good ones in your niche clear 6%.`]);
    else L.push(['pass','Your thumbnails',`${s.avgCtr.toFixed(1)}% CTR — okay, the thumbnails actually work. Credit where it's due.`]);
  }
  if(s.avgRet!=null){
    if(s.avgRet<NICHE.retention.poor)L.push(['fail','Retention',`${Math.round(s.avgRet)}% average retention. More than half your audience leaves before the point. The 0:18 cliff isn't a cliff for you — it's a water slide.`]);
    else if(s.avgRet<NICHE.retention.good)L.push(['warn','Retention',`${Math.round(s.avgRet)}% retention. People stay, then quietly leave like a party that peaked early. Tighten the intros.`]);
    else L.push(['pass','Retention',`${Math.round(s.avgRet)}% retention is genuinely strong. Whatever you do in the first 30 seconds — keep doing it.`]);
  }
  const top=[...vids].sort((a,b)=>b.views-a.views);const totalV=s.totalViews||1;const share=top[0]?top[0].views/totalV:0;
  if(share>0.5)L.push(['warn','One-hit wonder',`One video is ${Math.round(share*100)}% of your entire view count. That's not a channel, it's one video with ${s.count-1} witnesses.`]);
  const decay=vids.filter(v=>v.tag==='decaying').length;
  if(decay>s.count*0.5)L.push(['warn','Aging badly',`${decay} of your ${s.count} videos are losing steam. Your back catalog is aging like milk, not wine.`]);
  if(s.gems>0)L.push(['pass','Hidden gems',`You've got ${s.gems} video${s.gems>1?'s':''} with strong retention but low views — quietly excellent, criminally under-promoted. Re-share ${s.gems>1?'them':'it'} before making anything new.`]);
  const avgTitle=Math.round(vids.reduce((a,v)=>a+scoreTitle(v.title).score,0)/vids.length);
  if(avgTitle<50)L.push(['fail','Your titles',`Average title score ${avgTitle}/100. Your titles read like file names — "video-final-v2-REAL" energy.`]);
  else if(avgTitle<70)L.push(['warn','Your titles',`Titles average ${avgTitle}/100 — serviceable, forgettable. Nobody ever rage-clicked a serviceable title.`]);
  else L.push(['pass','Your titles',`Titles average ${avgTitle}/100. Crisp. You think before you publish — rare.`]);
  return L;
}
function vRoast(){
  if(!CSV_STATE){
    $('#appView').innerHTML=`
    <div class="vhead"><h1>Roast my channel 🔥</h1><p>Same data as the audit — zero diplomacy. Drop your Studio CSV and let's have an honest conversation about your numbers.</p></div>
    <div class="drop" id="rDrop">${svg('fire',1.5)}<h3>Drop your Studio export (.csv)</h3><p>Roast computed from your real metrics, in your browser</p><span class="loc">${svg('shield',2)} nothing uploaded · feelings not guaranteed</span></div>
    <input type="file" id="rFile" accept=".csv" class="hide">
    <div class="panel" style="margin-top:18px"><div class="panel-sub" style="margin:0">Loaded a file in the Audit tab already? It carries over — just revisit this page. The roast is affectionate. Mostly.</div></div>`;
    const dz=$('#rDrop'),fi=$('#rFile');
    dz.onclick=()=>fi.click();
    dz.ondragover=e=>{e.preventDefault();dz.classList.add('over');};dz.ondragleave=()=>dz.classList.remove('over');
    dz.ondrop=e=>{e.preventDefault();dz.classList.remove('over');if(e.dataTransfer.files[0])loadCSV(e.dataTransfer.files[0],'roast');};
    fi.onchange=e=>{if(e.target.files[0])loadCSV(e.target.files[0],'roast');};
    return;
  }
  if(CSV_STATE.source==='url'){
    $('#appView').innerHTML=`<div class="vhead"><h1>Roast my channel 🔥</h1></div><div class="panel"><div class="empty">The roast needs CTR & retention, which only the CSV export has. The URL audit only sees public data. <br><br>Load your Studio CSV here to get roasted properly.</div><div style="text-align:center"><button class="appbtn gho" onclick="resetCSV()">Load a CSV</button></div></div>`;
    return;
  }
  const {stats:s,vids}=CSV_STATE;const lines=roastLines(s,vids);
  const fails=lines.filter(l=>l[0]==='fail').length,passes=lines.filter(l=>l[0]==='pass').length;
  const verdict=fails>=3?['Brutal','var(--rose)','We need to talk. Sit down.']:fails>=1?['Tough love','var(--amber)','Some wins, some war crimes. Let\'s fix it.']:['Respectable','var(--mint)','Annoyingly competent. Fine — you\'re good.'];
  $('#appView').innerHTML=`
  <div class="vhead" style="display:flex;justify-content:space-between;align-items:flex-end"><div><h1>The verdict: <span style="color:${verdict[1]}">${verdict[0]}</span> 🔥</h1><p>${verdict[2]} · ${s.count} videos analyzed</p></div><button class="appbtn gho" onclick="resetCSV()">Different file</button></div>
  <div class="panel">${lines.map(([c,h,d])=>`<div class="row"><div class="ic ${c}">${svg(c==='pass'?'check':c==='warn'?'warn':'x',1.8)}</div><div class="body"><b>${h}</b><span style="color:var(--txt-2)">${d}</span></div></div>`).join('')}</div>
  <div class="panel"><div class="panel-sub" style="margin:0">${passes>fails?'Beneath the roast, you\'re doing more right than wrong — the fixes are tuning, not rebuilding.':'Don\'t take it personally — every line is a lever you control. Fix the reds first; they cost the most.'} Want the polite version? <b style="color:var(--mint);cursor:pointer" onclick="route('audit')">Open Audit</b>.</div></div>`;
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
  const steps=[
    ['Open the Google Cloud Console','It\'s free and works with any Google account. We\'ll open it in a new tab.','https://console.cloud.google.com/projectcreate','Open Console →'],
    ['Create a project','Click <b>"New Project"</b>, give it any name (e.g. "my-yt-tools"), and click <b>Create</b>. Wait a few seconds for it to finish.',null,null],
    ['Enable the YouTube Data API','Open the API library and click <b>Enable</b> on "YouTube Data API v3".','https://console.cloud.google.com/apis/library/youtube.googleapis.com','Open API page →'],
    ['Create the key','Go to Credentials → <b>Create Credentials</b> → <b>API key</b>. Copy the key it shows you (starts with <span class="mono">AIza</span>).','https://console.cloud.google.com/apis/credentials','Open Credentials →'],
    ['Paste it below','Drop the key in the box and hit <b>Test &amp; save</b>. We\'ll verify it works before saving.',null,null],
  ];
  $('#appView').innerHTML=`
  <div class="vhead"><h1>Settings</h1><p>Add a free YouTube API key to unlock channel lookup by URL and live Compare. Everything stays in this browser.</p></div>

  ${key?`<div class="panel" style="border-color:var(--mint)"><div class="panel-h">${svg('check')}<h3 style="color:var(--mint)">Key active — live features unlocked</h3></div>
  <div class="panel-sub">Audit by URL and Compare are ready to use. Your key is stored only in this browser.</div>
  <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="mono" style="background:var(--bg);border:1px solid var(--line);padding:8px 12px;border-radius:8px;color:var(--txt-2)">${esc(key.slice(0,8))}••••••••${esc(key.slice(-4))}</span>
  <button class="appbtn gho" id="kTest">Re-test</button><button class="appbtn gho" id="kClear">Remove key</button></div>
  <div id="kMsg" style="margin-top:10px;font-size:13px"></div></div>`:''}

  <div class="panel"><div class="panel-h">${svg('key')}<h3>${key?'Replace your key':'Get your free API key — 2 minutes'}</h3></div>
  <div class="panel-sub">The YouTube Data API is free for normal use (10,000 units/day — that's hundreds of channel audits). No billing setup required.</div>
  <div id="keySteps">${steps.map((s,i)=>`
    <div class="row"><div class="ic"><div style="width:24px;height:24px;border-radius:50%;background:var(--surf-2);border:1px solid var(--line-2);display:grid;place-items:center;font-family:var(--mono);font-size:12px;font-weight:600;color:var(--mint)">${i+1}</div></div>
    <div class="body"><b>${s[0]}</b><span>${s[1]}</span>${s[2]?`<a href="${s[2]}" target="_blank" rel="noopener" class="appbtn gho" style="margin-top:9px;display:inline-flex;font-size:13px;padding:7px 13px">${s[3]} ${svg('link',1.8)}</a>`:''}</div></div>`).join('')}</div>
  <div style="margin-top:18px;background:var(--bg);border:1px solid var(--line-2);border-radius:var(--r-sm);padding:16px">
    <label class="fld">Paste your API key</label>
    <div style="display:flex;gap:10px"><input class="inp" id="kIn" placeholder="AIzaSy..." value="${esc(key)}" style="font-family:var(--mono)"><button class="appbtn" id="kSave" style="white-space:nowrap">Test &amp; save</button></div>
    <div id="kMsg2" style="margin-top:10px;font-size:13px"></div>
  </div></div>

  <div class="panel"><div class="panel-h">${svg('shield')}<h3>Is this safe?</h3></div>
  <div class="panel-sub" style="margin:0">Yes. The key is stored only in your browser's local storage and is sent <b>only to Google's API</b>, directly from your browser — never to any EknathaLabs server (there is no server). For extra safety you can restrict the key in Google Console to the YouTube Data API and to your domain. Remove it any time with one click.</div></div>`;

  const testAndSave=async(val,msgEl,onDone)=>{
    const v=(val||'').trim();const m=$(msgEl);
    if(!v){m.innerHTML='<span class="rose">Enter a key first.</span>';return;}
    if(!/^AIza[\w-]{30,}$/.test(v)){m.innerHTML='<span class="amber">That doesn\'t look like a Google API key (they start with "AIza"). Double-check you copied the whole thing.</span>';return;}
    m.innerHTML='<span class="muted">Testing key against the YouTube API…</span>';
    try{
      // cheap validation call: look up a known channel id
      const r=await fetch('https://www.googleapis.com/youtube/v3/channels?part=id&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key='+encodeURIComponent(v));
      const d=await r.json();
      if(r.ok&&!d.error){localStorage.setItem('yt_api_key',v);m.innerHTML='<span class="mint">✓ Key works and is saved. Audit by URL is unlocked.</span>';setTimeout(()=>{route(onDone||'settings');},1100);}
      else{
        const reason=d.error?.message||'';
        if(/API key not valid/i.test(reason))m.innerHTML='<span class="rose">Key rejected — it\'s not valid yet. If you just created it, wait 1-2 minutes and retry.</span>';
        else if(/has not been used|disabled|not enabled/i.test(reason))m.innerHTML='<span class="rose">The YouTube Data API isn\'t enabled for this key yet. Do step 3 (Enable the API), wait a minute, and retry.</span>';
        else m.innerHTML='<span class="rose">'+esc(reason||'Key test failed. Check the steps above.')+'</span>';
      }
    }catch(e){m.innerHTML='<span class="rose">Network error testing the key. Check your connection and retry.</span>';}
  };
  $('#kSave').onclick=()=>testAndSave($('#kIn').value,'#kMsg2','urlaudit');
  $('#kIn').addEventListener('keydown',e=>{if(e.key==='Enter')testAndSave($('#kIn').value,'#kMsg2','urlaudit');});
  const ct=$('#kTest');if(ct)ct.onclick=()=>testAndSave(key,'#kMsg');
  const cc=$('#kClear');if(cc)cc.onclick=()=>{localStorage.removeItem('yt_api_key');route('settings');};
}

/* ============ BOOT ============ */
function boot(){
  try{paintHero();}catch(e){console.error('hero',e);}
  try{paintFeatures();}catch(e){console.error('features',e);}
  try{paintCompare();}catch(e){console.error('compare',e);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
