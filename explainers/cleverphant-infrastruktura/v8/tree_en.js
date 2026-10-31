  // mūsų medis — nekertamas: lenkia vėjai, merkia lietūs (naujos taisyklės, pokyčiai), o po kantrybės pakyla saulė
  const our = tree(1500, 300, "#3ab0b0");
  tl.fromTo(our.trunk, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.6, ease: E }, w(4, "Ours") - 0.1);
  tl.fromTo(our.crown, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 0.75, duration: 0.8, ease: E }, w(4, "Ours") + 0.2);
  // vėjas
  for (let k = 0; k < 6; k++) { const ln = el("div", "abs", `left:1060px;top:${300 + k * 62}px;width:${180 + (k % 3) * 60}px;height:6px;border-radius:3px;background:#8fb3d9;opacity:0`, TR);
    tl.fromTo(ln, { opacity: 0, x: -200 }, { opacity: 0.75, x: 320, duration: 0.9, ease: "power1.in" }, w(4, "Wind") + k * 0.12);
    tl.to(ln, { opacity: 0, duration: 0.3 }, w(4, "Wind") + k * 0.12 + 0.7); }
  tl.to(our.crown, { rotation: -9, duration: 0.45, yoyo: true, repeat: 3, ease: "sine.inOut" }, w(4, "Wind") + 0.2);
  // lietus
  const RN = el("div", "abs", "left:0;top:0;width:1920px;height:1080px", TR);
  for (let k = 0; k < 28; k++) { const x = 1250 + (k * 37) % 520, y0 = 150 + (k * 53) % 200;
    const d = el("div", "abs", `left:${x}px;top:${y0}px;width:4px;height:26px;border-radius:2px;background:#8fb3d9;opacity:0`, RN);
    tl.fromTo(d, { opacity: 0, y: 0 }, { opacity: 0.8, y: 420, duration: 1.0, ease: "none", repeat: 2 }, w(4, "rain") + (k % 7) * 0.14); }
  tl.to(RN, { opacity: 0, duration: 0.5 }, w(4, "nobody argues") - 0.4);
  // naujos taisyklės įskrenda iš kairės ir medį stiprina
  RULES.forEach((r, k) => {
    const ch = el("div", "chip", `left:1330px;top:${330 + k * 90}px;font-size:26px;padding:10px 18px`, TR, `<i style="background:var(--pink)"></i>${r}`);
    tl.set(ch, { xPercent: -100 }, 0);
    const at = w(4, "every new rule") + k * 0.45;
    tl.fromTo(ch, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.4, ease: E }, at);
    tl.to(ch, { x: 170, y: 500 - (330 + k * 90), scale: 0.4, opacity: 0, duration: 0.7, ease: "power2.in" }, at + 0.6);
    tl.to(our.crown, { scale: 0.8 + (k + 1) * 0.07, y: -(k + 1) * 0.08 * 165, duration: 0.35, ease: "power2.out" }, at + 1.2);
    tl.to(our.trunk, { scaleY: 1 + (k + 1) * 0.1, scaleX: 1 + (k + 1) * 0.22, duration: 0.35, ease: "power2.out" }, at + 1.2); });
  tl.to(our.crown, { scale: 1.2, y: -0.4 * 165, duration: 1.2, ease: "power1.inOut" }, w(4, "stronger"));
  tl.to(our.trunk, { scaleY: 1.4, scaleX: 1.9, duration: 1.2, ease: "power1.inOut" }, w(4, "stronger"));
  // po kantrybės — saulė
  const sun = el("div", "abs", "left:1650px;top:420px;width:160px;height:160px;border-radius:50%;background:radial-gradient(circle,#ffd66b 0%,#ffc94d 55%,rgba(255,201,77,0) 72%);opacity:0", TR);
  tl.fromTo(sun, { opacity: 0, y: 120 }, { opacity: 1, y: -210, duration: 1.6, ease: E }, w(4, "nobody argues") - 0.2);
  head("#c4b", w(4, "Ours") - 0.1);
