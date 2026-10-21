import fs from 'node:fs';
import assert from 'node:assert/strict';
const projects=JSON.parse(fs.readFileSync('src/content/projects.json'));
const categories=JSON.parse(fs.readFileSync('src/content/categories.json'));
const profile=JSON.parse(fs.readFileSync('src/content/profile.json'));
assert.equal(new Set(projects.map(p=>p.id)).size,projects.length,'Project IDs must be unique');
assert.equal(projects.filter(p=>p.featured).length,1);
const checkFile=u=>{if(!/^https?:/.test(u))assert(fs.existsSync(`public/${u}`),`Missing file: ${u}`)};
const demoPaths=new Set();
for(const p of projects){
 assert(categories.some(c=>c.id===p.category),`Unknown category: ${p.id}`);
 assert(p.role&&p.sources.length,`Missing role/source: ${p.id}`);
 assert(p.github&&/^https:\/\/github\.com\/[^/]+\/[^/]+/.test(p.github),`Missing code repository: ${p.id}`);
 assert(p.cover&&p.media.length,`Missing representative image: ${p.id}`);
 if(p.cover)checkFile(`assets/${p.cover}`);
 for(const m of p.media){checkFile(`assets/${m.src}`);assert(m.caption&&m.title);}
 for(const d of p.demos){
  assert(d.type==='gif'&&d.poster&&d.source.startsWith('https://')&&d.title&&d.caption,`Incomplete demo: ${p.id}`);
  assert(d.duration>0&&d.duration<=10&&d.start>=0,`Invalid demo timing: ${p.id}`);
  assert(!demoPaths.has(d.src),`Duplicate demo: ${d.src}`);demoPaths.add(d.src);
  checkFile(`assets/${d.src}`);checkFile(`assets/${d.poster}`);
  const bytes=fs.readFileSync(`public/assets/${d.src}`);
  assert(/^GIF8[79]a$/.test(bytes.subarray(0,6).toString()),`Invalid GIF: ${d.src}`);
  assert.equal(bytes.length,d.bytes,`Stale demo byte count: ${d.src}`);
  assert(bytes.length<4*1024*1024,`Oversized demo: ${d.src}`);
 }
 for(const v of [...p.verification,...p.archivedVerification]){assert(v.source&&v.scope&&['verified','historical-verified'].includes(v.status));checkFile(v.source);}
 for(const e of p.evidence)checkFile(e.url);
}
checkFile(`assets/${profile.portrait}`);checkFile('assets/cnn-demo-poster.jpg');
for(const field of ['portfolioPdf','resumePdf'])if(profile[field])checkFile(profile[field]);
assert(projects.filter(p=>p.tags.some(t=>t.includes('UVM'))).every(p=>p.category==='rtl'||p.category==='soc'));
console.log(`Content OK: ${projects.length} unique entries; ${demoPaths.size} recorded GIFs; roles, scoped metrics, evidence and local media checked`);
