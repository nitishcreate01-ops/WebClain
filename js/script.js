/* CURSOR */
const cd=document.querySelector('.cd'),cr=document.querySelector('.cr');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cd.style.left=mx+'px';cd.style.top=my+'px'});
document.addEventListener('mousedown',()=>document.body.classList.add('clk'));
document.addEventListener('mouseup',()=>document.body.classList.remove('clk'));
(function lp(){rx+=(mx-rx)*.09;ry+=(my-ry)*.09;cr.style.left=rx+'px';cr.style.top=ry+'px';requestAnimationFrame(lp)})();
document.querySelectorAll('a,button,.sc,.pc,.tc,.bopt').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
});

/* CANVAS — full hero bg, particles concentrated in center */
(()=>{
  const cvs=document.getElementById('hcvs');
  const ctx=cvs.getContext('2d');
  let W,H,pts=[];
  const N=100,CONN=135,G='rgba(29,185,84,';

  function resize(){W=cvs.width=cvs.offsetWidth;H=cvs.height=cvs.offsetHeight}
  resize();
  window.addEventListener('resize',()=>{resize();init()});

  function init(){
    pts=[];
    for(let i=0;i<N;i++){
      const near=Math.random()<.65;
      pts.push({
        x:near?W/2+(Math.random()-.5)*W*.52:Math.random()*W,
        y:near?H/2+(Math.random()-.5)*H*.52:Math.random()*H,
        vx:(Math.random()-.5)*.38,vy:(Math.random()-.5)*.38,
        r:Math.random()*1.5+.4,p:Math.random()*Math.PI*2
      });
    }
  }
  init();

  let MX=W/2,MY=H/2;
  document.addEventListener('mousemove',e=>{MX=e.clientX;MY=e.clientY});

  function draw(){
    ctx.clearRect(0,0,W,H);
    const CX=W/2,CY=H/2;
    pts.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.p+=.013;
      p.vx*=.998;p.vy*=.998;
      const dx=CX-p.x,dy=CY-p.y,dist=Math.sqrt(dx*dx+dy*dy);
      if(dist>W*.4){p.vx+=dx*.003;p.vy+=dy*.003}
      if(p.x<0){p.x=0;p.vx*=-1}if(p.x>W){p.x=W;p.vx*=-1}
      if(p.y<0){p.y=0;p.vy*=-1}if(p.y>H){p.y=H;p.vy*=-1}
      const cent=Math.max(0,1-dist/(W*.45));
      const a=.18+cent*.32+Math.sin(p.p)*.06;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r*(1+Math.sin(p.p)*.16),0,Math.PI*2);
      ctx.fillStyle=G+a+')';ctx.fill();
      pts.forEach(q=>{
        const ex=p.x-q.x,ey=p.y-q.y,ed=Math.sqrt(ex*ex+ey*ey);
        if(ed>0&&ed<CONN){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=G+(1-ed/CONN)*.12+')';ctx.lineWidth=.5;ctx.stroke()}
      });
      const md=Math.sqrt((p.x-MX)**2+(p.y-MY)**2);
      if(md<155){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(MX,MY);ctx.strokeStyle=G+(1-md/155)*.34+')';ctx.lineWidth=.7;ctx.stroke()}
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* NAV */
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('stuck',scrollY>50));

/* PROCESS */
(()=>{
  const steps=[...document.querySelectorAll('.ps')];
  let cur=0,tim;
  function go(i){steps.forEach((s,j)=>s.classList.toggle('on',j===i));cur=i}
  steps.forEach((s,i)=>s.addEventListener('click',()=>{clearInterval(tim);go(i);tim=setInterval(()=>go((cur+1)%steps.length),2400)}));
  tim=setInterval(()=>go((cur+1)%steps.length),2400);
})();

/* TESTIMONIALS */
let tIdx=0,tTim;
const ttrack=document.getElementById('ttrack');
const tdotsEl=document.getElementById('tdots');
const tcards=[...ttrack.querySelectorAll('.tc')];
const CW=420;
tcards.forEach((_,i)=>{const d=document.createElement('div');d.className='tdot'+(i===0?' on':'');d.onclick=()=>{tGo(i);tReset()};tdotsEl.appendChild(d)});
function tGo(i){tIdx=Math.max(0,Math.min(i,tcards.length-1));ttrack.style.transform=`translateX(-${tIdx*CW}px)`;document.querySelectorAll('.tdot').forEach((d,j)=>d.classList.toggle('on',j===tIdx))}
function tReset(){clearInterval(tTim);tTim=setInterval(()=>tGo(tIdx+1<tcards.length?tIdx+1:0),3800)}
tReset();
let ds=0,dd=false;
ttrack.addEventListener('mousedown',e=>{dd=true;ds=e.clientX});
document.addEventListener('mouseup',e=>{if(!dd)return;dd=false;if(Math.abs(ds-e.clientX)>55){tGo(ds-e.clientX>0?tIdx+1:tIdx-1)}tReset()});
ttrack.addEventListener('touchstart',e=>{ds=e.touches[0].clientX},{passive:true});
ttrack.addEventListener('touchend',e=>{const d=ds-e.changedTouches[0].clientX;if(Math.abs(d)>55)tGo(d>0?tIdx+1:tIdx-1);tReset()});

/* CLOCK */
function tick(){const n=new Date();document.getElementById('clk').textContent=n.toLocaleTimeString('en-US',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'})+' PKT'}
tick();setInterval(tick,1000);

/* TICKER */
const tks=['NexaTech Platform v2.0','UrbanPulse Campaign Q2','Apex Brand Refresh','LuxeStore Shopify','GrowFast Ads'];
let ti=0;setInterval(()=>{ti=(ti+1)%tks.length;const el=document.getElementById('tkr');if(el){el.style.opacity='0';setTimeout(()=>{el.textContent=tks[ti];el.style.opacity='1'},300)}},3500);

/* BUDGET */
function pickB(el){document.querySelectorAll('.bopt').forEach(b=>b.classList.remove('sel'));el.classList.add('sel')}

/* FORM */
function fSub(e){e.preventDefault();const b=e.target.querySelector('.fsub');b.textContent='✓ Sent! Reply within 24hrs.';b.style.background='#0a7a2e';b.disabled=true;setTimeout(()=>{b.textContent='Send Message';b.style.background='';b.disabled=false;e.target.reset()},5000)}

/* SERVICE OVERLAY */
const SD={
  design:{num:'01',name:'Graphic <span>Design</span>',desc:'We create visual identities and digital assets that make your brand impossible to ignore.',
    feats:[{t:'Brand Identity Systems',d:'Logos, palettes, typography, and guidelines that create instant recognition across every medium.'},{t:'Social Media Design',d:'Scroll-stopping graphics and templates that make your social presence look world-class daily.'},{t:'Print & Packaging',d:'Business cards, brochures, packaging, and collateral that convert in the physical world.'},{t:'UI / UX Design',d:'User interfaces designed for delight and conversion — wireframes to high-fidelity prototypes.'}],
    steps:[{n:'Discovery',t:'Brand Deep-Dive',d:'We audit your brand, analyze competitors, and understand your audience before a single pixel.'},{n:'Concept',t:'Creative Direction',d:'We present 3 distinct creative directions — visual moodboards — you pick what feels right.'},{n:'Design',t:'Crafting the Work',d:'We build out your full brand system with meticulous attention at every milestone.'},{n:'Delivery',t:'Files & Handover',d:'All source files (AI, SVG, PNG, PDF) plus brand guidelines for consistent use forever.'}]},
  web:{num:'02',name:'Web <span>Development</span>',desc:'We engineer high-performance websites that load in milliseconds, rank on Google, and convert visitors into customers.',
    feats:[{t:'Next.js & React',d:'Blazing-fast, SEO-friendly web apps with server-side rendering for brands that need scale.'},{t:'Shopify E-Commerce',d:'Conversion-optimized storefronts. Custom themes, apps, and full launch support.'},{t:'Webflow Development',d:'Pixel-perfect CMS sites your team can update without touching code.'},{t:'WordPress & CMS',d:'Flexible, scalable WordPress builds with custom themes and plugins. Full training included.'}],
    steps:[{n:'Discovery',t:'Goals & Architecture',d:'We map sitemap, user journeys, and technical requirements before writing a line of code.'},{n:'Design',t:'UI/UX Prototyping',d:'Full Figma prototypes reviewed and approved before development begins.'},{n:'Development',t:'Building & Testing',d:'Agile sprints with weekly demos. Every page tested across all devices and browsers.'},{n:'Launch',t:'Deploy & Optimise',d:'We handle launch, SEO setup, speed optimisation, analytics, and 30-day post-launch support.'}]},
  social:{num:'03',name:'Social Media <span>Management</span>',desc:'We take over your social channels completely — strategy, creation, posting, and community management.',
    feats:[{t:'Content Strategy',d:'Data-driven monthly content calendars aligned with your brand voice and goals.'},{t:'Creative Production',d:'Professional graphics, captions, reels scripts in your brand visual language — consistently.'},{t:'Community Management',d:'Daily engagement with followers, replies, DMs, and proactive outreach to grow organically.'},{t:'Analytics & Reporting',d:'Monthly reports showing reach, engagement, follower growth, and conversion attribution.'}],
    steps:[{n:'Onboarding',t:'Brand Voice & Strategy',d:'We learn your brand voice, define your target audience, and build a 3-month content roadmap.'},{n:'Content',t:'Monthly Creation Batch',d:'Full month of content created and submitted for approval 7 days before posting.'},{n:'Publishing',t:'Scheduled Posting',d:'Optimal-time scheduling across all platforms. Consistent and on-brand every day.'},{n:'Growth',t:'Engage & Grow',d:'Daily community management plus monthly strategy reviews to continuously improve performance.'}]},
  marketing:{num:'04',name:'Digital <span>Marketing</span>',desc:'Every dollar of your ad budget should return more than it costs. We build performance systems that convert.',
    feats:[{t:'Google Ads Management',d:'Search, Display, Shopping, and YouTube campaigns optimised for maximum ROI.'},{t:'Meta Ads (Facebook & Instagram)',d:'Highly targeted campaigns across the Meta ecosystem — prospecting, retargeting, and conversion funnels.'},{t:'Search Engine Optimisation',d:'Technical SEO, content strategy, and link building that puts you on page 1.'},{t:'Email Marketing & Automation',d:'Automated flows and campaigns that nurture leads and turn one-time buyers into repeat customers.'}],
    steps:[{n:'Audit',t:'Account & Market Audit',d:'We audit your existing campaigns and competitive landscape to find immediate wins.'},{n:'Strategy',t:'Campaign Architecture',d:'Full campaign structure, audience targeting, keyword strategy, and creative brief.'},{n:'Launch',t:'Campaign Activation',d:'Careful launch with daily monitoring in the first 2 weeks to catch and fix issues fast.'},{n:'Optimise',t:'Scale What Works',d:'Monthly optimisation sprints based on data. We cut what underperforms and scale what wins.'}]}
};
function openSvc(id){
  const d=SD[id];
  const feats=d.feats.map(f=>`<div class="svof"><svg class="svofic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="20 6 9 17 4 12"/></svg><div class="svoft">${f.t}</div><div class="svofd">${f.d}</div></div>`).join('');
  const steps=d.steps.map((s,i)=>`<div class="svostep"><div class="svostn">Step 0${i+1} — ${s.n}</div><div class="svostt">${s.t}</div><div class="svostd">${s.d}</div></div>`).join('');
  document.getElementById('svoc').innerHTML=`<div class="svonum">Service ${d.num} of 04</div><div class="svoh">${d.name}</div><div class="svodesc">${d.desc}</div><div class="svofeats">${feats}</div><div class="svoph">How It Works</div><div class="svosteps">${steps}</div><div class="svobot"><div class="svobh">Ready to Get Started?</div><div class="svobp">Book your free strategy call and we'll show you exactly how we'd approach your project.</div><a href="#contact" class="svoblink" onclick="closeSvc()">Claim Your Free Strategy Call →</a></div>`;
  document.getElementById('svo').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeSvc(){document.getElementById('svo').classList.remove('open');document.body.style.overflow=''}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSvc()});
