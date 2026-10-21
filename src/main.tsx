import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import profile from './content/profile.json';
import projects from './content/projects.json';
import categories from './content/categories.json';
import './styles.css';

type Project = typeof projects[number];
type Media = Project['media'][number];
const inDetail = /\/projects\/[^/]+\.html$/.test(location.pathname);
const prefix = inDetail ? '../' : './';
const home = `${prefix}index.html`;
const asset = (name: string) => `${prefix}assets/${name}`;
const localUrl = (url: string) => /^(https?:|mailto:)/.test(url) ? url : prefix + url;
const detailUrl = (id: string) => `${prefix}projects/${id}.html`;
const category = (id: string) => categories.find(c => c.id === id)!;
function External({href,children,className=''}:{href:string;children:React.ReactNode;className?:string}){
 return <a className={className} href={localUrl(href)} target="_blank" rel="noopener noreferrer">{children}<span aria-hidden="true"> ↗</span></a>;
}
function Header(){
 const [open,setOpen]=useState(false);
 useEffect(()=>{if(!open)return;const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[open]);
 return <header className="header"><div className="nav-wrap"><a className="brand" href={`${home}#home`} aria-label="한승훈 포트폴리오 홈"><b>Han.</b><span>한승훈 <small>PORTFOLIO</small></span></a><button className="menu-button" aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>메뉴 <span aria-hidden="true">{open?'×':'☰'}</span></button><nav id="navigation" aria-label="주 메뉴" className={open?'open':''}>{['Skills','Projects','About','Contact'].map(s=><a key={s} href={`${home}#${s.toLowerCase()}`} onClick={()=>setOpen(false)}>{s}</a>)}<External href={profile.github}>GitHub</External></nav><div className="header-action">{profile.portfolioPdf?<a className="button primary" href={localUrl(profile.portfolioPdf)} target="_blank" rel="noopener noreferrer">요약본 PDF 보기 ↗</a>:<a className="header-notion" href={profile.notion} target="_blank" rel="noopener noreferrer">Notion ↗</a>}</div></div></header>;
}
function Footer(){return <footer><div className="wrap footer-inner"><span>© {profile.year} {profile.name}<small>RTL Design · Verification · FPGA</small></span><a href={`${home}#home`}>맨 위로 ↑</a></div></footer>}
function Tags({items}:{items:string[]}){return <ul className="tags" aria-label="사용 기술">{items.map(t=><li key={t}>{t}</li>)}</ul>}
function SectionTitle({label,title,extra}:{label:string;title:string;extra?:React.ReactNode}){return <div className="section-heading"><div><p className="eyebrow">{label}</p><h2>{title}</h2></div>{extra}</div>}
function useVisible<T extends HTMLElement>(){
 const ref=useRef<T>(null);const [visible,setVisible]=useState(false);
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:0.05});observer.observe(node);return()=>observer.disconnect()},[]);
 return {ref,visible};
}
function useMotionPlayback(){
 const [playing,setPlaying]=useState(()=>!matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{const preference=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setPlaying(!preference.matches);preference.addEventListener('change',update);return()=>preference.removeEventListener('change',update)},[]);
 return {playing,toggle:()=>setPlaying(p=>!p)};
}
function ProjectImage({project,featured=false}:{project:Project;featured?:boolean}){
 const demo=project.demos[0];const {ref,visible}=useVisible<HTMLDivElement>();const {playing,toggle}=useMotionPlayback();
 const image=demo?(playing&&visible?demo.src:demo.poster):(project.coverPoster||project.cover);
 return <div ref={ref} className={`project-visual ${demo?'has-demo':''}`}><a className={`project-image ${project.cover?'':'text-cover'}`} href={detailUrl(project.id)} aria-label={`${project.name} 프로젝트 상세`}>{image?<picture><img src={asset(image)} alt={demo?demo.title:`${project.name} ${project.featured?'팀 시연':'원본 자료'}`} loading={featured?'eager':'lazy'} decoding="async"/></picture>:<><span className="eyebrow">{category(project.category).short}</span><span className="text-cover-title">{project.name}</span><span className="text-cover-sub">{project.tags.slice(0,2).join(' / ')}</span></>}</a>{demo&&<button className="card-demo-toggle" onClick={toggle} aria-label={`${project.name} GIF ${playing?'일시정지':'재생'}`}>{playing?'GIF 일시정지':'GIF 재생'}</button>}</div>;
}
function ProjectCard({project,index,featured=false}:{project:Project;index:number;featured?:boolean}){
 return <article className={`project-card ${featured?'featured':''}`} data-project-id={project.id}><ProjectImage project={project} featured={featured}/><div className="project-copy"><div className="card-meta"><span>{featured?'FEATURED PROJECT':`${String(index).padStart(2,'0')} — ${category(project.category).short.toUpperCase()}`}</span><span className="kind">{project.kind}</span></div>{project.period&&<p className="period">{project.period}</p>}<h3><a href={detailUrl(project.id)}>{project.name}</a></h3><p className="summary">{project.summary}</p><div className="role"><span>MY CONTRIBUTION</span><p>{project.role}</p></div><Tags items={project.tags}/>{featured&&<div className="featured-results"><p><span>TEAM RESULT</span>{project.teamResult}</p><p><span>MY VERIFICATION</span>{project.featuredVerification}</p></div>}<div className="card-links"><a href={detailUrl(project.id)}>프로젝트 상세 <span aria-hidden="true">↗</span></a>{featured&&project.github&&<External href={project.github}>GitHub</External>}</div></div></article>;
}
function Home(){
 const [filter,setFilter]=useState('all');
 const visible=projects.filter(p=>filter==='all'||p.category===filter);
 const featured=visible.find(p=>p.featured);
 const archive=visible.filter(p=>!p.featured);
 useEffect(()=>{if(location.hash){const node=document.getElementById(location.hash.slice(1));node?.scrollIntoView()}},[]);
 return <><main id="main"><section id="home" className="hero wrap"><div className="hero-copy"><p className="eyebrow">PORTFOLIO {profile.year}</p><h1>{profile.nameKo}</h1><p className="english-name">{profile.name}</p><p className="position">{profile.position}</p><div className="intro">{profile.intro.map(p=><p key={p}>{p}</p>)}</div><div className="actions"><a className="button primary" href="#projects">프로젝트 보기</a><External className="button" href={profile.github}>GitHub</External></div></div><div className="profile-panel"><div className="portrait"><img src={asset(profile.portrait)} alt="한승훈 프로필" width="450" height="600" fetchPriority="high"/></div><dl>{profile.facts.map(f=><div key={f.label}><dt>{f.label}</dt><dd>{f.label==='이메일'?<a href={`mailto:${f.value}`}>{f.value}</a>:f.value}</dd></div>)}</dl></div></section>
 <section id="skills" className="skills-section"><div className="wrap"><SectionTitle label="01 — SKILLS" title="Skills" extra={<p className="skills-caption">주요 언어<br/><span>Verilog · SystemVerilog · C · Python</span></p>}/><div className="skills-grid">{profile.skills.map((s,i)=><article key={s.title}><span className="index">0{i+1}</span><h3>{s.title}</h3><ul>{s.items.map(t=><li key={t}>{t}</li>)}</ul><p>{s.note}</p></article>)}</div></div></section>
 <section id="projects" className="projects-section wrap"><SectionTitle label="02 — PROJECTS" title="프로젝트"/>{featured&&<ProjectCard project={featured} index={1} featured/>}<div className="archive-heading"><h3>Project Archive <span>{String(projects.filter(p=>!p.featured).length).padStart(2,'0')}</span></h3><p>설계 · 검증 · 시스템 연동</p></div><div className="filters" role="group" aria-label="프로젝트 분야 필터"><button aria-pressed={filter==='all'} onClick={()=>setFilter('all')}>전체 <span>{projects.length}</span></button>{categories.filter(c=>projects.some(p=>p.category===c.id)).map(c=><button key={c.id} aria-pressed={filter===c.id} onClick={()=>setFilter(c.id)}>{c.short}<span>{projects.filter(p=>p.category===c.id).length}</span></button>)}</div><p className="sr-only" aria-live="polite">{visible.length}개의 프로젝트 표시</p><div className="archive-list">{archive.map((p,i)=><ProjectCard key={p.id} project={p} index={projects.indexOf(p)+1}/>)}</div></section>
 <section id="about" className="about-section"><div className="wrap about-grid"><div><p className="eyebrow">03 — ABOUT</p><h2>{profile.aboutTitle}</h2>{profile.about.map(p=><p key={p}>{p}</p>)}</div><div className="timeline"><p className="eyebrow">EXPERIENCE · EDUCATION</p>{profile.timeline.map(t=><article key={t.title}><p className="period">{t.period}</p><h3>{t.title}</h3><p>{t.description}</p></article>)}<div className="credentials">SQLD <span>·</span> TOEIC Speaking IM3 (130)</div></div></div></section>
 <section id="contact" className="contact-section"><div className="wrap contact-grid"><div><p className="eyebrow">04 — CONTACT</p><h2>{profile.nameKo}</h2><p className="contact-position">{profile.position}</p><p>프로젝트 코드와 구현 근거는 GitHub와 Notion에서 확인할 수 있습니다.</p><div className="contact-links"><External href={profile.github}>GitHub</External><External href={profile.notion}>Notion Portfolio</External><a href={`mailto:${profile.email}`}>{profile.email} ↗</a></div></div><div className="download-panel"><p className="eyebrow">PORTFOLIO PDF</p><h3>면접용 A4 포트폴리오</h3>{profile.portfolioPdf?<a className="button light" href={localUrl(profile.portfolioPdf)} target="_blank" rel="noopener noreferrer">요약본 PDF 보기 ↗</a>:<p>대표 프로젝트를 담은 PDF를 준비하고 있습니다.</p>}{profile.resumePdf&&<a href={profile.resumePdf} download>이력서 다운로드 ↓</a>}</div></div></section></main><Footer/></>;
}
function Figure({media,onZoom}:{media:Media;onZoom:(m:Media)=>void}){
 const {playing,toggle}=useMotionPlayback();const {ref,visible}=useVisible<HTMLElement>();
 const src=media.type==='gif'&&(!playing||!visible)?(media.poster||media.src):media.src;
 return <figure ref={ref} className="evidence-figure">{media.type==='video'?<video controls preload="metadata" playsInline src={asset(media.src)} aria-label={media.title}/>:<button className="zoom-button" onClick={()=>onZoom({...media,src})} aria-label={`${media.title} 확대`}><img src={asset(src)} alt={media.title} loading="lazy" decoding="async"/><span className="zoom-label">크게 보기 ↗</span></button>}<figcaption><div><h3>{media.title}</h3><p>{media.caption}</p></div>{media.type==='gif'&&<button className="play-toggle" onClick={toggle}>{playing?'GIF 일시정지':'GIF 재생'}</button>}</figcaption></figure>;
}
function Detail({project:p}:{project:Project}){
 const [zoom,setZoom]=useState<Media|null>(null);const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{document.title=`${p.name} | ${profile.name}`},[p.name]);
 useEffect(()=>{if(zoom)dialog.current?.showModal();else dialog.current?.close()},[zoom]);
 const siblings=projects.filter(x=>x.category===p.category&&x.id!==p.id);const next=siblings[0];
 return <><main id="main" className="detail wrap"><a className="back" href={`${home}#projects`}>← 전체 프로젝트</a><section className="detail-hero"><p className="eyebrow">{category(p.category).name.toUpperCase()}</p><h1>{p.name}</h1><p className="detail-summary">{p.overview}</p><p className="detail-meta">{p.period&&<span>{p.period}</span>}<span>{p.kind}</span></p><Tags items={p.techStack}/><div className="actions">{p.github&&<External className="button primary" href={p.github}>View GitHub</External>}{p.notion&&<External className="button" href={p.notion}>Notion 상세</External>}</div><div className="role-result"><div><span className="eyebrow">MY CONTRIBUTION</span><p>{p.role}</p></div><div><span className="eyebrow">{p.teamResult?'TEAM RESULT':'PROJECT FOCUS'}</span><p>{p.teamResult||p.summary}</p></div></div>{p.teamGoal&&<p className="team-goal"><strong>Team Goal</strong>{p.teamGoal}</p>}</section>
 <section className="detail-section"><SectionTitle label="WHAT I DID" title="내가 맡은 부분"/><ul className="contribution-list">{p.contributions.map(c=><li key={c}>{c}</li>)}</ul>{p.implementation.length>0&&<div className="implementation-grid">{p.implementation.map((x,i)=><article key={x.title}><span className="index">0{i+1}</span><h3>{x.title}</h3><p>{x.text}</p></article>)}</div>}</section>
 {p.demos.length>0&&<section className="detail-section"><SectionTitle label="PROJECT DEMO" title="동작 시연"/><div className="evidence-grid">{p.demos.map((m,i)=><div className={i===0?'wide':''} key={m.src}><Figure media={m} onZoom={setZoom}/><div className="demo-source"><span>{m.duration}초 · 실제 시연</span><External href={m.source}>전체 시연 원본</External></div></div>)}</div></section>}
 {p.media.length>0&&<section className="detail-section"><SectionTitle label="PROJECT EVIDENCE" title="구현 · 검증 자료"/><div className="evidence-grid">{p.media.filter(m=>!(p.demos.length>0&&m.type==='gif')).map((m,i)=><div className={i===0?'wide':''} key={m.src}><Figure media={m} onZoom={setZoom}/></div>)}</div></section>}
 {p.troubleshooting.length>0&&<section className="detail-section"><SectionTitle label="PROBLEM SOLVING" title="문제 해결"/>{p.troubleshooting.map(x=><article className="troubleshooting" key={x.title}><h3>{x.title}</h3><dl>{[['PROBLEM',x.problem],['ANALYSIS',x.analysis],['ACTION',x.action],['RESULT',x.result]].map(([l,t])=><div key={l}><dt>{l}</dt><dd>{t}</dd></div>)}</dl></article>)}</section>}
 {p.verification.length>0&&<section className="detail-section"><SectionTitle label="VERIFICATION RESULT" title="확인한 결과" extra={<span className="historical">{p.verificationLabel}</span>}/><div className="metrics">{p.verification.map(v=><article key={v.label}><span className="eyebrow">{v.label}</span><h3>{v.value}</h3><p>{v.scope}</p><External href={v.source}>원본 확인</External></article>)}</div></section>}
 {p.archivedVerification.length>0&&<section className="detail-section"><SectionTitle label="ARCHIVED EVIDENCE" title="완료 당시 Golden 회귀" extra={<span className="historical">보관 결과 · 최신 전체 회귀와 구분</span>}/><div className="metrics">{p.archivedVerification.map(v=><article key={v.label}><span className="eyebrow">{v.label}</span><h3>{v.value}</h3><p>{v.scope}</p><External href={v.source}>원본 확인</External></article>)}</div></section>}
 {p.limitations.length>0&&<aside className="scope"><p className="eyebrow">SCOPE & LIMITATIONS</p>{p.limitations.map(l=><p key={l}>{l}</p>)}</aside>}
 <section className="detail-section source-section"><SectionTitle label="EVIDENCE & LINKS" title="원본 자료"/><div className="source-links">{p.github&&<External href={p.github}>GitHub Repository</External>}{p.notion&&<External href={p.notion}>Notion Project</External>}{p.evidence.map(e=><External key={e.url} href={e.url}>{e.label}</External>)}</div><details><summary>콘텐츠 출처</summary><ul>{p.sources.map(s=><li key={s}>{s}</li>)}</ul></details></section><nav className="project-pagination" aria-label="프로젝트 이동"><a href={`${home}#projects`}>← 프로젝트 목록</a>{next&&<a href={detailUrl(next.id)}>다음: {next.name} →</a>}</nav></main><Footer/><dialog ref={dialog} className="lightbox" onClose={()=>setZoom(null)} onClick={e=>{if(e.target===e.currentTarget)setZoom(null)}} aria-label={zoom?.title||'이미지 확대'}><button className="close" onClick={()=>setZoom(null)} aria-label="이미지 닫기">닫기 ×</button>{zoom&&<><img src={asset(zoom.src)} alt={zoom.title}/><p>{zoom.caption}</p></>}</dialog></>;
}
function App(){const slug=location.pathname.match(/\/projects\/([^/]+)\.html$/)?.[1];const p=projects.find(x=>x.id===slug);return <><a href="#main" className="skip-link">본문으로 바로가기</a><Header/>{slug?(p?<Detail project={p}/>:<main id="main" className="wrap not-found"><h1>프로젝트를 찾을 수 없습니다.</h1><a href={home}>프로젝트 목록으로</a></main>):<Home/>}</>}
createRoot(document.getElementById('root')!).render(<App/>);
