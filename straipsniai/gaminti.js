const fs=require('fs'), path=require('path'), {execSync}=require('child_process');
const puppeteer=require('puppeteer');
const kadrai=require('./kadrai.js');

const W=1600,H=900,FPS=30;
const DIR=path.join(__dirname,'slapukai','video');
const KADRAI=path.join(DIR,'_k'); const KLIPAI=path.join(DIR,'klipai');
const ASSETS=path.join(__dirname,'..','assets','video');
const MUZIKA=path.join(ASSETS,'jiglr-malibu_cleverphant-mokymu-fonas.mp3');
const AUTRO=path.join(ASSETS,'autro.mp4');

(async()=>{
  for(const d of [KADRAI,KLIPAI]) fs.mkdirSync(d,{recursive:true});
  const br=await puppeteer.launch({headless:true});
  for(const k of kadrai){
    const tmp=path.join(DIR,`_${k.vardas}.html`); fs.writeFileSync(tmp,k.html,'utf-8');
    const p=await br.newPage(); await p.setViewport({width:W,height:H,deviceScaleFactor:1});
    await p.goto('file://'+tmp,{waitUntil:'networkidle0'});
    await p.evaluateHandle('document.fonts.ready');
    await p.evaluate(()=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=0;}));
    const n=Math.ceil(k.sek*FPS);
    const fd=path.join(KADRAI,k.vardas); fs.mkdirSync(fd,{recursive:true});
    for(let f=0;f<n;f++){
      await p.evaluate(ms=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=ms;}),(f/FPS)*1000);
      await p.screenshot({path:path.join(fd,`f_${String(f).padStart(4,'0')}.png`),type:'png'});
    }
    await p.close(); fs.unlinkSync(tmp);
    execSync(`ffmpeg -y -framerate ${FPS} -i "${path.join(fd,'f_%04d.png')}" -c:v libx264 -pix_fmt yuv420p -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0xf4f6fa" "${path.join(KLIPAI,k.vardas+'.mp4')}"`,{stdio:'pipe'});
    fs.rmSync(fd,{recursive:true,force:true});
    console.log('  ✓',k.vardas,k.sek+'s');
  }
  await br.close();

  // vinjetė
  const outro=path.join(KLIPAI,'zz-outro.mp4');
  execSync(`ffmpeg -y -i "${AUTRO}" -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0xf4f6fa" -c:v libx264 -pix_fmt yuv420p -r 30 -an "${outro}"`,{stdio:'pipe'});

  const sar=kadrai.map(k=>path.join(KLIPAI,k.vardas+'.mp4')).concat([outro]);
  const lst=path.join(DIR,'_sarasas.txt');
  fs.writeFileSync(lst,sar.map(f=>`file '${f}'`).join('\n'));
  const tylus=path.join(DIR,'_tylus.mp4');
  execSync(`ffmpeg -y -f concat -safe 0 -i "${lst}" -c copy "${tylus}"`,{stdio:'pipe'});

  const visa=parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${tylus}"`,{encoding:'utf-8'}).trim());
  const oSek=parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${AUTRO}"`,{encoding:'utf-8'}).trim());
  const oStart=Math.max(0,visa-oSek), fadeSt=Math.max(0,oStart-1.5), delay=Math.round(oStart*1000);
  const isvestis=path.join(DIR,'slapukai-straipsnis-lt.mp4');
  execSync(`ffmpeg -y -i "${tylus}" -stream_loop -1 -i "${MUZIKA}" -i "${AUTRO}" -filter_complex "[1:a]volume=0.4,afade=t=out:st=${fadeSt}:d=1.5[bg];[2:a]adelay=${delay}|${delay}[s];[bg][s]amix=inputs=2:duration=first:normalize=0[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -shortest "${isvestis}"`,{stdio:'pipe'});
  fs.unlinkSync(lst); fs.unlinkSync(tylus); fs.rmSync(KLIPAI,{recursive:true,force:true}); fs.rmSync(KADRAI,{recursive:true,force:true});
  console.log('\nVideo:',isvestis);
  console.log('Trukmė:',execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${isvestis}"`,{encoding:'utf-8'}).trim(),'s · vinjetė nuo',oStart.toFixed(1),'s');
})();
