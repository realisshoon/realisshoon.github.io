import fs from 'node:fs';
import path from 'node:path';
import {googleTag} from './analytics.mjs';
const projects=JSON.parse(fs.readFileSync('src/content/projects.json','utf8'));
const template=fs.readFileSync('dist/index.html','utf8').replace('<head>',`<head>${googleTag}`);
fs.writeFileSync('dist/index.html',template);
fs.mkdirSync('dist/projects',{recursive:true});
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const p of projects){
 const html=template.replaceAll('./assets/','../assets/').replaceAll('./favicon.svg','../favicon.svg')
 .replace(/<title>.*?<\/title>/,`<title>${escape(p.name)} | Han SeungHun</title>`)
 .replace(/(<meta name="description" content=")[^"]*/,`$1${escape(p.summary)}`)
 .replace(/(<meta property="og:title" content=")[^"]*/,`$1${escape(p.name)} | Han SeungHun`)
 .replace(/(<meta property="og:description" content=")[^"]*/,`$1${escape(p.summary)}`);
 fs.writeFileSync(path.join('dist/projects',`${p.id}.html`),html);
}
fs.writeFileSync('dist/.nojekyll','');
fs.writeFileSync('dist/404.html',template);
fs.writeFileSync('dist/content.json',JSON.stringify({profile:JSON.parse(fs.readFileSync('src/content/profile.json')),projects},null,2));
const redirects=JSON.parse(fs.readFileSync('src/content/redirects.json','utf8'));
for(const [id,url] of Object.entries(redirects)){
 fs.writeFileSync(path.join('dist/projects',`${id}.html`),`<!doctype html><html lang="ko"><head><meta charset="UTF-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${escape(url)}"><title>포트폴리오로 이동 | Han SeungHun</title></head><body><a href="${escape(url)}">포트폴리오로 이동</a></body></html>`);
}
console.log(`Prepared ${projects.length} direct project URLs, shared content.json and .nojekyll`);

await import('./print.mjs');
