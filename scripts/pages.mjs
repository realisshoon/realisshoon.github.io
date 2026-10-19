import fs from 'node:fs';
import path from 'node:path';
const projects=JSON.parse(fs.readFileSync('src/content/projects.json','utf8'));
const template=fs.readFileSync('dist/index.html','utf8');
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
console.log(`Prepared ${projects.length} direct project URLs, shared content.json and .nojekyll`);
