// Straipsnio filmuko kadrai. Kiekvienas — {vardas, sek, kunas, anim}
const R = `<div class="ratas r1"></div><div class="ratas r2"></div><div class="ratas r3"></div>`;
const lapas = (kunas, anim, sek) => `<!DOCTYPE html><html lang="lt"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap">
<link rel="stylesheet" href="../../bendra.css">
<style>:root{--klipas:${sek}s}
${anim}</style></head><body>${R}<div class="turinys">${kunas}</div></body></html>`;

module.exports = [
{ vardas:'01-laiskas', sek:4,
  kunas:`<h1>Ateina laiškas iš duomenų<b>apsaugos pareigūno</b></h1>
         <div class="po">Raštinėje kyla įtampa. Ar prasideda patikra? Ar reikės ką nors skubiai taisyti?</div>`,
  anim:`h1{animation:kyla .7s var(--sp) .2s forwards}
        .po{animation:kylaLengvai .55s var(--sp) 1.5s forwards}` },

{ vardas:'02-klausiama', sek:4,
  kunas:`<h1>Klausiama vieno dalyko:<b>ar galima atsisakyti</b></h1>
         <div class="po">Ne apie tai, ar naudojate slapukus. Apie tai, ar lankytojas turi tikrą pasirinkimą.</div>`,
  anim:`h1{animation:kyla .7s var(--sp) .2s forwards}
        .po{animation:kylaLengvai .55s var(--sp) 1.6s forwards}` },

{ vardas:'03-mygtukai', sek:5.5,
  kunas:`<h1 style="font-size:52px">Pirma klaida<b>Mygtukai nelygiaverčiai</b></h1>
    <div class="du">
      <div class="sk a"><div class="z">Pasirinkimas tik formaliai</div>
        <div class="juosta"><div class="sm">Šioje svetainėje naudojame slapukus.</div>
          <div class="mygt"><span class="m ryskus">Sutinku</span><span class="m blankus">Nesutinku</span></div></div>
        <div class="isv">Vienas ryškus, kitas vos matomas.</div></div>
      <div class="sk b"><div class="z">Pasirinkimas iš tikrųjų</div>
        <div class="juosta"><div class="sm">Šioje svetainėje naudojame slapukus.</div>
          <div class="mygt"><span class="m vienodas">Sutinku</span><span class="m vienodas">Nesutinku</span></div></div>
        <div class="isv">To paties dydžio, formos ir spalvos.</div></div>
    </div>`,
  anim:`h1{animation:kyla .7s var(--sp) .2s forwards}
        .du{animation:ryskeja .01s linear 1.29s forwards}
        .du .sk{opacity:0}
        .sk.a{animation:isKaires .6s var(--sp) 1.3s forwards}
        .sk.b{animation:isDesines .6s var(--sp) 2.6s forwards}` },

{ vardas:'04-langeliai', sek:5.5,
  kunas:`<h1 style="font-size:52px">Antra klaida<b>Pažymėta iš anksto</b></h1>
    <div class="du">
      <div class="sk a"><div class="z">Numatytoji tvarka</div>
        <div class="juosta">
          <div class="lang"><span class="kv pazymeta">✓</span>Statistikos slapukai</div>
          <div class="lang"><span class="kv pazymeta">✓</span>Rinkodaros slapukai</div></div>
        <div class="isv">Kad atsisakytų, reikia atžymėti.</div></div>
      <div class="sk b"><div class="z">Aktyvus veiksmas</div>
        <div class="juosta">
          <div class="lang"><span class="kv tuscias"></span>Statistikos slapukai</div>
          <div class="lang"><span class="kv tuscias"></span>Rinkodaros slapukai</div></div>
        <div class="isv">Pirmą kartą užėjus langeliai tušti.</div></div>
    </div>`,
  anim:`h1{animation:kyla .7s var(--sp) .2s forwards}
        .du{animation:ryskeja .01s linear 1.29s forwards}
        .du .sk{opacity:0}
        .sk.a{animation:isKaires .6s var(--sp) 1.3s forwards}
        .sk.b{animation:isDesines .6s var(--sp) 2.6s forwards}` },

{ vardas:'05-atsakymas', sek:6,
  kunas:`<h1 style="font-size:52px">Į tokį laišką<b>atsakoma trimis teiginiais</b></h1>
    <div class="trys">
      <div class="teig"><span>1</span>Svetainėje veikia slapukų sutikimo valdymas.</div>
      <div class="teig"><span>2</span>Sutikimas duodamas aktyviu veiksmu, iš anksto nieko nepažymėta.</div>
      <div class="teig"><span>3</span>Sutikimą galima pakeisti bet kada.</div>
    </div>`,
  anim:`h1{animation:kyla .7s var(--sp) .2s forwards}
        .trys{animation:ryskeja .01s linear 1.29s forwards}
        .trys .teig{opacity:0}
        .teig:nth-child(1){animation:isKaires .5s var(--sp) 1.3s forwards}
        .teig:nth-child(2){animation:isKaires .5s var(--sp) 2.1s forwards}
        .teig:nth-child(3){animation:isKaires .5s var(--sp) 2.9s forwards}` },

{ vardas:'06-pabaiga', sek:4.5,
  kunas:`<h1>Atsisakyti turi būti taip pat<b>lengva, kaip sutikti</b></h1>
         <div class="po">Nežinote, ką atsakyti? Persiųskite laišką mums.</div>`,
  anim:`h1{animation:kyla .7s var(--sp) .2s forwards}
        .po{animation:kylaLengvai .55s var(--sp) 1.7s forwards}` },
].map(k => ({...k, html: lapas(k.kunas, k.anim, k.sek)}));
