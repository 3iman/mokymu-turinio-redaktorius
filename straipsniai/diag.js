const puppeteer=require('puppeteer'), fs=require('fs'), path=require('path');
const kadrai=require('/Users/eimantasgardauskas/Workspace/AI vizualai/illustrations/straipsniai/kadrai.js');
(async()=>{
 const DIR='/Users/eimantasgardauskas/Workspace/AI vizualai/illustrations/straipsniai/slapukai/video';
 const k=kadrai[0]; const tmp=path.join(DIR,'_diag.html'); fs.writeFileSync(tmp,k.html,'utf-8');
 const br=await puppeteer.launch({headless:true}); const p=await br.newPage();
 await p.setViewport({width:1600,height:900,deviceScaleFactor:1});
 await p.goto('file://'+tmp,{waitUntil:'networkidle0'});
 await p.evaluateHandle('document.fonts.ready');
 const info=await p.evaluate(()=>{
   const a=document.getAnimations();
   return {kiek:a.length, vardai:a.map(x=>x.animationName||x.constructor.name),
           busenos:a.map(x=>x.playState)};
 });
 console.log('animacijų:',JSON.stringify(info));
 for(const ms of [0,800,3000]){
   await p.evaluate(m=>document.getAnimations().forEach(x=>{x.pause();x.currentTime=m;}),ms);
   const o=await p.evaluate(()=>({h1:getComputedStyle(document.querySelector('h1')).opacity,
                                  po:getComputedStyle(document.querySelector('.po')).opacity}));
   console.log('  currentTime',ms,'→ h1 opacity',o.h1,'· .po',o.po);
 }
 await br.close(); fs.unlinkSync(tmp);
})();
