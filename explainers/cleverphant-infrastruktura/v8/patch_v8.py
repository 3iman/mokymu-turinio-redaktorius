# -*- coding: utf-8 -*-
"""Vienkartinis v7 → v8 šablono perstatymas: nauja pradžia, kelmai, „slow“, skaitikliai, rievės. Paleidžiamas vieną kartą."""
import re, os
HERE = os.path.dirname(os.path.abspath(__file__))
p = os.path.join(HERE, 'template.html'); s = open(p, encoding='utf-8').read()

def blocks(text, pat):
    idx = [m.start() for m in re.finditer(pat, text)]
    return text[:idx[0]], [text[a:b] for a, b in zip(idx, idx[1:] + [None])]

# ---------------- HTML sekcijos
head_html, rest = s.split('<div id="root"', 1)
root_open, rest = rest.split('\n', 1)
sec_part, after = rest.split('</div>\n\n<script>', 1)
pre, secs = blocks(sec_part, r'  <!-- \d+ ')
title = lambda b: re.match(r'  <!-- \d+ ([^-:]+)', b).group(1).strip()
H = {title(b): b for b in secs}

H['Just a detail'] = '''  <!-- 0 Details -->
  <section id="c0" class="scene clip" data-start="__S0__" data-duration="__D0__" data-track-index="1">
    <div class="h" id="c0a">Each one looks like a <em>detail</em>.</div>
    <div class="h" id="c0b">Now <em>multiply</em> it.</div>
    <div id="c0grid" class="abs" style="left:0;top:0;width:1920px;height:1080px"></div>
    <div id="c0issues"></div>
    <div id="c0count" class="abs" style="left:0;top:0;width:1920px;height:1080px"></div>
  </section>

'''
H['Stumps'] = '''  <!-- 2 Stumps -->
  <section id="c2" class="scene clip" data-start="__S2__" data-duration="__D2__" data-track-index="1">
    <div class="h" id="c2a">A new website every <em>few years</em>?</div>
    <div class="h" id="c2b">Stop replacing. <em>Start growing.</em></div>
    <div id="c2ground" class="abs" style="left:120px;top:860px;width:1680px;height:4px;border-radius:2px;background:#cbd5e1;opacity:0"></div>
    <div id="c2trees"></div>
  </section>

'''
H['Walked this road'] = H['Walked this road'].replace('<svg id="c12time" class="abs" width="1920" height="1080" style="left:0;top:0"></svg>',
    '<svg id="c12time" class="abs" width="1920" height="1080" style="left:0;top:0"></svg>\n    <div id="c12ylab" class="lbl" style="left:560px;top:930px;font-size:30px;color:var(--blue)">15 years · 15 rings</div>')
H['One notices'] = H['One notices'].replace('    <div id="c4nodes"></div>', '    <div id="c4nodes"></div>\n    <div id="c4count" class="abs" style="left:0;top:0;width:1920px;height:1080px"></div>')
order = ['Just a detail', 'Each school alone', 'Stumps', 'Only the surface', 'One notices', 'Pilot → standard', 'Publish once', 'Equally good',
         'Trojan elephant', 'What if…', 'And AI?', 'The logic of scale', 'Walked this road']
sec_new = pre + ''.join(H[k] for k in order)

# ---------------- JS blokai
js_pre, js_rest = after.split('  /* ===== 0 ', 1)
js_rest = '  /* ===== 0 ' + js_rest
js_body, js_tail = js_rest.split('  window.__timelines = window.__timelines || {};', 1)
_, jbl = blocks(js_body, r'  /\* ===== \d+ ')
jt = lambda b: re.match(r'  /\* ===== \d+ (.+?) ===== \*/', b).group(1).strip()
J = {jt(b): b for b in jbl}

J['Just a detail'] = r'''  /* ===== 0 Details ===== */
  scene(0);
  // šeši tikri radiniai iš auditų — be mokyklų vardų
  const ISS = [
    ["All caps", "All-caps headings", `<div class="fx" style="display:inline-block;font:800 34px Inter, sans-serif;letter-spacing:1px;padding:6px 12px;border:4px solid transparent;border-radius:10px">SCHOOL NEWS</div><div style="height:12px;width:80%;background:#e2e8f0;border-radius:3px;margin-top:16px"></div><div style="height:12px;width:64%;background:#e2e8f0;border-radius:3px;margin-top:12px"></div>`],
    ["Justified", "Justified text", `<p class="fx" style="width:300px;font:500 19px/1.5 Inter, sans-serif;text-align:justify;word-spacing:18px;color:#475569;padding:6px 10px;border:4px solid transparent;border-radius:10px">The school was founded long ago and grew together with its community.</p>`],
    ["images", "Text hidden in an image", `<div class="fx" style="width:300px;height:118px;border-radius:12px;background:linear-gradient(135deg,#f3a8c4,#c6b8db);display:flex;flex-direction:column;align-items:center;justify-content:center;border:4px solid transparent"><b style="font:800 28px Inter, sans-serif;color:#fff;filter:blur(.5px);transform:rotate(-3deg)">OPEN DAY</b><span style="font:700 18px Inter, sans-serif;color:#fff;filter:blur(.5px);transform:rotate(-3deg)">Sept 1 · 9:00</span></div>`],
    ["Scanned", "Scanned PDF, not searchable", `<div class="fx" style="width:150px;height:126px;border-radius:8px;background:#e9e7e2;transform:rotate(-4deg);padding:14px;border:4px solid transparent;box-shadow:inset 0 0 18px rgba(0,0,0,.12)"><div style="height:7px;background:#b8b2a7;margin:6px 0;width:90%"></div><div style="height:7px;background:#b8b2a7;margin:6px 0;width:70%"></div><div style="height:7px;background:#b8b2a7;margin:6px 0;width:84%"></div><div style="height:7px;background:#b8b2a7;margin:6px 0;width:60%"></div></div>`],
    ["Broken", "Broken links", `<div style="font:600 24px Inter, sans-serif;color:#3363ab;text-decoration:underline">Lesson timetable</div><div class="fx" style="display:inline-block;margin-top:14px;font:800 40px Inter, sans-serif;color:#94a3b8;padding:4px 16px;border:4px solid transparent;border-radius:10px">404</div>`],
    ["Staff who left", "Staff who left years ago", `<div class="fx" style="display:flex;align-items:center;gap:14px;padding:8px 12px;border:4px solid transparent;border-radius:10px"><div style="width:52px;height:52px;border-radius:50%;background:#d0deec"></div><div><div style="font:700 22px Inter, sans-serif">Mrs. Teacher</div><div style="font:600 18px Inter, sans-serif;color:#94a3b8">left in 2019</div></div></div>`]];
  const IX = [130, 710, 1290], IY = [250, 570];
  const icards = ISS.map((d, i) => { const x = IX[i % 3], y = IY[Math.floor(i / 3)];
    const c = el("div", "abs", `left:${x}px;top:${y}px;width:500px;height:270px;background:#fff;border-radius:18px;box-shadow:0 1px 3px rgba(0,0,0,.05), 0 12px 30px rgba(30,40,80,.10);overflow:hidden;opacity:0`, $("#c0issues"),
      `<div style="height:14px;background:${COL[i]}"></div><div style="padding:22px 26px;height:186px">${d[2]}</div><div style="padding:0 26px;font:700 24px Inter, sans-serif;color:#991b1b">${d[1]}</div>`);
    pop(c, w(0, d[0]) - 0.15, 0.45);
    tl.to(c.querySelector(".fx"), { borderColor: "#ef4444", duration: 0.35 }, w(0, d[0]) + 0.45);
    return { c, x, y }; });
  head("#c0a", w(0, "Each one") - 0.1, w(0, "hundred") - 0.5);
  // radiniai susitraukia į langelius, ir problema dauginasi
  icards.forEach((k, i) => tl.to(k.c, { scale: 0.1, opacity: 0, x: 960 - (k.x + 250), y: 620 - (k.y + 135), duration: 0.9, ease: EIO }, w(0, "hundred") - 0.6 + i * 0.05));
  grid($("#c0grid")).forEach((g) => tl.fromTo(g.tile, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: E }, w(0, "hundred") + 0.1 + g.d * 0.075));
  head("#c0b", w(0, "hundred") - 0.4);
  counter("#c0count", [["× 100", w(0, "hundred")], ["× 200", w(0, "Two hundred")], ["× 500", w(0, "Five hundred")], ["× 1 000 and counting", w(0, "thousand")]], "#ef4444");

'''
J['Stumps'] = r'''  /* ===== 2 Stumps ===== */
  scene(2);
  head("#c2a", t(2, 0.3), w(2, "Ours") - 0.6);
  tl.fromTo("#c2ground", { opacity: 0, scaleX: 0.6 }, { opacity: 1, scaleX: 1, duration: 0.6, ease: E }, t(2, 0.4));
  const TR = $("#c2trees");
  function tree(x, size, crownCol) { const g = el("div", "abs", `left:${x}px;top:0;width:0;height:0`, TR);
    const trunk = el("div", "abs", `left:-14px;top:${860 - size * 0.55}px;width:28px;height:${size * 0.55}px;background:#b59f8a;border-radius:6px 6px 0 0;transform-origin:50% 100%;opacity:0`, g);
    const crown = el("div", "abs", `left:${-size * 0.45}px;top:${860 - size * 0.55 - size * 0.8}px;width:${size * 0.9}px;height:${size * 0.9}px;border-radius:50%;background:${crownCol};transform-origin:50% 100%;opacity:0`, g);
    const stump = el("div", "abs", `left:-24px;top:${860 - 52}px;width:48px;height:22px;border-radius:50%;background:#d8c7b4;border:3px solid #b59f8a;opacity:0`, g);
    return { g, trunk, crown, stump, size }; }
  const cut = [["new tender", 330], ["And again", 640], ["And again", 950]];
  cut.forEach(([k, x], i) => { const T0 = w(2, k) + (i === 2 ? 0.9 : 0), tr = tree(x, 280, "#8fb3d9");
    const lab = el("div", "lbl", `left:${x}px;top:${860 - 280 * 1.45 - 54}px;font-size:22px`, TR, "new tender · new website");
    tl.set(lab, { xPercent: -50 }, 0);
    tl.fromTo(tr.trunk, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.5, ease: E }, T0);
    tl.fromTo(tr.crown, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, T0 + 0.25);
    tl.fromTo(lab, { opacity: 0 }, { opacity: 1, duration: 0.3 }, T0 + 0.2);
    const C0 = (i === 0 ? w(2, "stump") : T0 + 0.9);
    tl.to(tr.crown, { rotation: 75, x: 120, y: 160, opacity: 0, duration: 0.8, ease: "power2.in", transformOrigin: "20% 100%" }, C0);
    tl.to(tr.trunk, { scaleY: 0.12, duration: 0.5, ease: "power2.in" }, C0 + 0.1);
    tl.to(tr.stump, { opacity: 1, duration: 0.3 }, C0 + 0.4);
    tl.to(lab, { opacity: 0.35, duration: 0.4 }, C0 + 0.5); });
  // mūsų medis — nekertamas, auga, o kiekviena nauja taisyklė jį stiprina
  const our = tree(1470, 300, "#3ab0b0");
  tl.fromTo(our.trunk, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.6, ease: E }, w(2, "Ours") - 0.1);
  tl.fromTo(our.crown, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 0.75, duration: 0.8, ease: E }, w(2, "Ours") + 0.2);
  tl.to(our.crown, { scale: 0.95, duration: 1.6, ease: "power1.inOut" }, w(2, "keeps growing"));
  tl.to(our.trunk, { scaleY: 1.12, duration: 1.6, ease: "power1.inOut" }, w(2, "keeps growing"));
  ["New accessibility law", "New data rules", "New standard"].forEach((r, k) => {
    const ch = el("div", "chip", `left:${1720}px;top:${330 + k * 90}px;font-size:22px;padding:10px 18px`, TR, `<i style="background:var(--pink)"></i>${r}`);
    const at = w(2, "stronger") - 0.9 + k * 0.45;
    tl.fromTo(ch, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.4, ease: E }, at);
    tl.to(ch, { x: -230, y: 500 - (330 + k * 90), scale: 0.4, opacity: 0, duration: 0.7, ease: "power2.in" }, at + 0.5);
    tl.to(our.crown, { scale: 1.0 + (k + 1) * 0.06, duration: 0.35, ease: "power2.out" }, at + 1.1); });
  head("#c2b", w(2, "Ours") - 0.1);

'''
J['One notices'] = J['One notices'].replace('  tl.to(ring3, { attr: { stroke: "#3ab0b0" }, duration: 0.4 }, w(4, "Fixed once") + 0.7);',
  '  tl.to(ring3, { attr: { stroke: "#3ab0b0" }, duration: 0.4 }, w(4, "Fixed once") + 0.7);\n'
  '  counter("#c4count", [["fixed × 100", w(4, "Fixed once") + 0.6], ["fixed × 200", w(4, "Fixed once") + 1.0], ["fixed × 500", w(4, "Fixed once") + 1.4], ["fixed × 1 000", w(4, "Fixed once") + 1.8]], "#3ab0b0");')
pil = J['Pilot → standard']
pil = pil.replace('head("#c5a", t(5, 0.3), w(5, "standard") - 0.6);', 'head("#c5a", t(5, 0.3), w(5, "at once") - 0.6);')
pil = pil.replace('w(5, "data") + k * 0.18', 'w(5, "data shows") + k * 0.18').replace('w(5, "data") + 0.5', 'w(5, "data shows") + 0.5')
pil = pil.replace('head("#c5b", w(5, "standard") - 0.1);', 'head("#c5b", w(5, "at once") - 0.1);')
pil = pil.replace('w(5, "standard"));\n', 'w(5, "at once"));\n').replace('w(5, "standard") + 0.15', 'w(5, "at once") + 0.15')
pil = pil.replace('  pop(pil, w(5, "pilot") - 0.1);',
  '  pop(pil, w(5, "pilot") - 0.1);\n'
  '  // „Slow. Very slow.“ — piloto juosta pildosi lėtai\n'
  '  const sb = el("div", "abs", `left:${ux + 130}px;top:${uy + 26}px;width:240px;height:14px;border-radius:7px;background:#e2e8f0;overflow:hidden;opacity:0`, UI, \'<div style="width:100%;height:100%;background:var(--blue);transform:scaleX(0);transform-origin:0 50%"></div>\');\n'
  '  const sl = el("div", "lbl", `left:${ux + 130}px;top:${uy + 50}px;font-size:22px`, UI, "slow… very slow…");\n'
  '  tl.fromTo(sb, { opacity: 0 }, { opacity: 1, duration: 0.3 }, w(5, "Slow") - 0.2);\n'
  '  tl.fromTo(sb.firstChild, { scaleX: 0 }, { scaleX: 1, duration: w(5, "data shows") - w(5, "Slow"), ease: "none" }, w(5, "Slow"));\n'
  '  tl.fromTo(sl, { opacity: 0 }, { opacity: 1, duration: 0.4 }, w(5, "Slow"));')
assert pil.count('"standard"') == 0, pil
J['Pilot → standard'] = pil
eq = J['Equally good']
a = eq.index('  const A6 = cards6[0], B6 = cards6[3];'); b = eq.index('  head("#c7b"')
eq = eq[:a] + eq[b:]
J['Equally good'] = eq
J['Trojan elephant'] = r'''  /* ===== 8 Trojan elephant ===== */
  scene(8);
  head("#c8a", t(8, 0.3), w(8, "every next step") - 0.7);
  tl.fromTo("#c8site", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, t(8, 0.4));
  // dramblys lėtas. Labai lėtas. Taip lėtas, kad pokytis nepastebimas — kol jis visur.
  const walk0 = w(8, "Elephants") - 0.4, walk1 = w(8, "everywhere") + 0.9, WD = walk1 - walk0;
  tl.set("#c8sym", { x: -160, y: 810, opacity: 0, rotation: 0 }, 0);
  tl.set("#c8sym", { opacity: 1 }, walk0);
  tl.to("#c8sym", { x: 1940, duration: WD, ease: "none" }, walk0);
  for (let k = 0; k < Math.floor(WD / 1.0); k++) tl.to("#c8sym", { rotation: k % 2 ? -4 : 4, y: k % 2 ? 810 : 802, duration: 1.0, ease: "sine.inOut" }, walk0 + k * 1.0);
  [["slow…", "Elephants"], ["very slow…", "Very slow"], ["so slow…", "So slow"]].forEach(([txt, k], i) => {
    const lb = el("div", "lbl", `left:0;top:0;font-size:26px;color:var(--blue)`, $("#c8steps"), txt);
    const at = w(8, k); const x = -160 + (at - walk0) / WD * 2100;
    tl.set(lb, { x: x + 20, y: 770 }, 0);
    tl.fromTo(lb, { opacity: 0, y: 780 }, { opacity: 1, y: 760, duration: 0.4, ease: E }, at);
    tl.to(lb, { opacity: 0, duration: 0.4 }, at + 1.0); });
  const fx = (f) => walk0 + f * WD;
  const swap = (a, b, at) => { tl.to(a, { opacity: 0, duration: 0.5 }, at); tl.to(b, { opacity: 1, duration: 0.6 }, at + 0.1); };
  swap("#c8capA", "#c8capB", fx(0.30)); swap("#c8jA", "#c8jB", fx(0.42)); swap("#c8imgA", "#c8imgB", fx(0.66));
  tl.fromTo("#c8cookie", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, fx(0.84));
  tl.set("#c8sym", { opacity: 0, rotation: 0 }, walk1);
  tl.set("#c8troj", { xPercent: -50 }, 0);
  pop("#c8troj", w(8, "Trojan") - 0.1, 0.5);
  tl.to(["#c8site", "#c8troj"], { opacity: 0, y: -20, duration: 0.5, ease: "power1.in" }, w(8, "every next step") - 0.7);
  head("#c8b", w(8, "every next step") - 0.1);
  const strip8 = strip("#c8strip", 236, w(8, "every next step"));
  const steps = [["Digital hygiene", "every next step"], ["Live tables", "live tables"], ["Whistleblower channel", "whistleblower"], ["Consultation booking", "consultation"],
                 ["Surveys", "surveys"], ["Event calendar", "event calendars"], ["Update subscription", "update subscriptions"]];
  const stepX = steps.map((_, i) => 130 + i * 240), stepH = steps.map((_, i) => 90 + i * 62);
  const SC = ["#3363ab", "#3ab0b0", "#9f8fc4", "#e58fb2", "#3363ab", "#3ab0b0", "#9f8fc4"];
  steps.forEach((s, i) => { const st = el("div", "step", `left:${stepX[i]}px;height:${stepH[i]}px;background:${SC[i]}`, $("#c8steps"), `<span>${s[0]}</span>`);
    const at = w(8, s[1]) + (i === 0 ? 0.2 : -0.1);
    tl.fromTo(st, { opacity: 0, scaleY: 0.2 }, { opacity: 1, scaleY: 1, duration: 0.6, ease: E }, at);
    wave(strip8, at + 0.45, SC[i]); });
  const top8 = (i) => 1080 - 120 - stepH[i] - 110;
  tl.set("#c8sym", { x: stepX[0] + 55, y: top8(0) }, w(8, "every next step") + 0.4);
  tl.to("#c8sym", { opacity: 1, duration: 0.4 }, w(8, "every next step") + 0.5);
  for (let i = 1; i < steps.length; i++) { const at = w(8, steps[i][1]) + 0.15;
    tl.to("#c8sym", { y: top8(i) - 34, duration: 0.35, ease: "power2.out" }, at);
    tl.to("#c8sym", { x: stepX[i] + 55, duration: 0.65, ease: EIO }, at);
    tl.to("#c8sym", { y: top8(i), duration: 0.3, ease: "power2.inOut" }, at + 0.35); }

'''
wi = J['What if…']
wi = wi.replace('''                 ["Outdated content flags itself", "once a month, one email", "#9f8fc4", "outdated"],\n''', '')
wi = wi.replace('const pos = [[180, 260], [980, 260], [180, 440], [980, 440]];', 'const pos = [[180, 260], [980, 260], [580, 440]];')
wi = wi.replace('(i - 1.5) * 330 + 960', '(i - 1) * 330 + 960')
assert '"outdated"' not in wi
J['What if…'] = wi
pr = J['Walked this road']
a = pr.index('  const TL = $("#c12time");'); b = pr.index('  tl.to(["#c12time", "#c12marks"]')
pr = pr[:a] + r'''  // 15 metų = 15 rievių: pirmos dešimt — lėtai, lėtai, lėtai; tada tinklas auga pats
  const TL = $("#c12time"), RC12 = [560, 560];
  for (let k = 0; k < 15; k++) { const r = 24 + k * 19, slow = k < 10;
    const at = slow ? w(12, "first ten") - 0.3 + k * ((w(12, "So slow") + 1.0 - w(12, "first ten")) / 10) : w(12, "grow by itself") + (k - 10) * 0.18;
    const c = svgEl("circle", { cx: RC12[0], cy: RC12[1], r, fill: "none", stroke: slow ? "#b59f8a" : "#3ab0b0", "stroke-width": slow ? 4 : 6, opacity: 0 }, TL);
    tl.fromTo(c, { opacity: 0, attr: { r: r * 0.85 } }, { opacity: 0.85, attr: { r }, duration: slow ? 0.6 : 0.3, ease: E }, at); }
  svgEl("circle", { cx: RC12[0], cy: RC12[1], r: 12, fill: "#b59f8a" }, TL);
  tl.set("#c12ylab", { xPercent: -50 }, 0);
  tl.fromTo("#c12ylab", { opacity: 0 }, { opacity: 1, duration: 0.4 }, w(12, "fifteen"));
  for (let k = 0; k < 110; k++) { const a = rnd() * 2 * Math.PI, r = 320 + rnd() * 170;
    const d = svgEl("circle", { cx: RC12[0] + r * Math.cos(a), cy: RC12[1] + r * Math.sin(a) * 0.72, r: 8, fill: COL[k % 4], opacity: 0 }, TL);
    tl.to(d, { opacity: 0.9, duration: 0.25 }, w(12, "grow by itself") + 0.2 + k * 0.012); }
  [["Content audit", "content audits"], ["Onboarding", "onboarding"], ["Training platform", "training platform"]].forEach(([name, k], i) => {
    const c = el("div", "chip", `left:1180px;top:${380 + i * 110}px`, $("#c12marks"), `<i style="background:var(--teal)"></i>${name}`);
    pop(c, w(12, k) - 0.1); });
''' + pr[b:]
J['Walked this road'] = pr
jorder = ['Just a detail', 'Each school alone', 'Stumps', 'Only the surface', 'One notices', 'Pilot → standard', 'Publish once', 'Equally good',
          'Trojan elephant', 'What if…', 'And AI?', 'The logic of scale', 'Walked this road']
helper = r'''  // skaitiklis: tas pats ritmas klaidoms ir pataisymams (×100 → ×1 000 and counting)
  function counter(sel, steps, color) { const box = $(sel);
    steps.forEach(([txt, at], i) => { const e = el("div", "abs", `left:0;right:0;top:972px;text-align:center;font:800 56px Inter, sans-serif;color:${color};letter-spacing:-1px;opacity:0`, box, txt);
      tl.fromTo(e, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, ease: E }, at);
      if (i + 1 < steps.length) tl.to(e, { opacity: 0, y: -10, duration: 0.25 }, steps[i + 1][1] - 0.05); }); }

'''
js_new = js_pre + helper + ''.join(J[k] for k in jorder) + '  window.__timelines = window.__timelines || {};' + js_tail
out = head_html + '<div id="root"' + root_open + '\n' + sec_new + '</div>\n\n<script>' + js_new
out = out.replace('v7 (EN). GENERUOJAMA iš v7/template.html per v7/build.py', 'v8 (EN). GENERUOJAMA iš v8/template.html per v8/build.py')
open(p, 'w', encoding='utf-8').write(out)
print('ok', len(out))
