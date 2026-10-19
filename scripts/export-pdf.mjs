// Render the authored print document in an isolated Chrome process.
// Does not connect to or control the user's browser session.
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const dist=path.join(root,'dist');
await fs.access(path.join(dist,'print.html'));
const candidates=[process.env.CHROME_BIN,'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium','/usr/bin/chromium-browser'].filter(Boolean);
let chrome;
for(const candidate of candidates){try{await fs.access(candidate);chrome=candidate;break;}catch{}}
if(!chrome)throw new Error('Install Google Chrome, or set CHROME_BIN to its executable path.');
const temp=await fs.mkdtemp(path.join(os.tmpdir(),'portfolio-pdf-'));
const output=path.join(temp,'Han_SeungHun_Portfolio_Summary.pdf');
const types={'.html':'text/html; charset=utf-8','.woff2':'font/woff2','.jpg':'image/jpeg','.png':'image/png','.gif':'image/gif','.svg':'image/svg+xml','.pdf':'application/pdf'};
let servedPrint=false;
const missing=new Set();
const server=http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(dist,'.'+pathname);
  if(!file.startsWith(dist+path.sep)){res.writeHead(403);return res.end();}
  const bytes=await fs.readFile(file);if(pathname==='/print.html')servedPrint=true;
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(bytes);
 }catch{if(req.url!=='/favicon.ico')missing.add(req.url);res.writeHead(404);res.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
try{
 const port=server.address().port;
 await new Promise((resolve,reject)=>{
  const child=spawn(chrome,['--headless','--disable-gpu','--no-first-run',`--user-data-dir=${path.join(temp,'profile')}`,`--print-to-pdf=${output}`,'--no-pdf-header-footer','--virtual-time-budget=5000',`http://127.0.0.1:${port}/print.html`],{stdio:['ignore','ignore','pipe']});
  let errors='';child.stderr.on('data',d=>errors+=d);
  const timer=setTimeout(()=>{child.kill();reject(new Error('PDF export timed out'));},60000);
  child.on('error',error=>{clearTimeout(timer);reject(error);});
  child.on('exit',code=>{clearTimeout(timer);code===0?resolve():reject(new Error(`Chrome exited ${code}: ${errors}`));});
 });
 const bytes=await fs.readFile(output);
 if(!servedPrint||missing.size||bytes.length<100000||!bytes.subarray(0,5).equals(Buffer.from('%PDF-')))throw new Error(`Incomplete PDF output; missing assets: ${[...missing].join(', ')}`);
 for(const base of ['public','dist']){
  const directory=path.join(root,base,'downloads');await fs.mkdir(directory,{recursive:true});
  await fs.writeFile(path.join(directory,'Han_SeungHun_Portfolio_Summary.pdf'),bytes);
 }
 const count=JSON.parse(await fs.readFile(path.join(root,'src/content/print.json'),'utf8')).projects.length+2;
 console.log(`Exported ${count}-page A4 portfolio PDF (${(bytes.length/1024/1024).toFixed(2)} MiB)`);
}finally{await new Promise(resolve=>server.close(resolve));await fs.rm(temp,{recursive:true,force:true});}
