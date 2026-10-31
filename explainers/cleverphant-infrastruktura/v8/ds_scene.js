  /* ===== 6 Design system ===== */
  scene(6);
  head("#c6a", t(6, 0.3), w(6, "same parts") - 0.6);
  head("#c6b", w(6, "same parts") - 0.1, w(6, "Improve one part") - 0.6);
  head("#c6c", w(6, "Improve one part") - 0.1);
  // Frostas paprastais žodžiais: detalės → blokai → skiltys → puslapiai
  const DSX = [300, 740, 1180, 1620], DSY = 270, DSW = 300, DSH = 420, BTN = [];
  const dcol = (i) => el("div", "abs", `left:${DSX[i] - DSW / 2}px;top:${DSY}px;width:${DSW}px;height:${DSH}px;opacity:0`, $("#c6cols"));
  const dbtn = (p, x, y, bw, bh, ci, txt) => { const b = el("div", "abs", `left:${x}px;top:${y}px;width:${bw}px;height:${bh}px;border-radius:999px;background:var(--blue);color:#fff;font:600 ${Math.round(bh * 0.4)}px/${bh}px Inter, sans-serif;text-align:center`, p, txt || "");
    BTN.push({ b, ci }); return b; };
  const dcard = (p, x, y, cw, ch) => el("div", "abs", `left:${x}px;top:${y}px;width:${cw}px;height:${ch}px;border-radius:14px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.05), 0 8px 22px rgba(30,40,80,.09)`, p);
  const dline = (p, x, y, lw, c, lh) => el("div", "abs", `left:${x}px;top:${y}px;width:${lw}px;height:${lh || 10}px;border-radius:5px;background:${c || "#cbd5e1"}`, p);
  const dava = (p, x, y, s) => el("div", "abs", `left:${x}px;top:${y}px;width:${s}px;height:${s}px;border-radius:50%;background:#d0deec`, p);
  // 1. detalės: spalvos, šriftas, mygtukas
  const d1 = dcol(0);
  COL.slice(0, 5).forEach((c, k) => el("div", "abs", `left:${26 + k * 52}px;top:40px;width:40px;height:40px;border-radius:50%;background:${c}`, d1));
  el("div", "abs", "left:26px;top:120px;font:700 96px/1 Inter, sans-serif;color:#1e293b", d1, "Aa");
  dbtn(d1, 26, 270, 210, 64, 0, "DS_BUTTON");
  // 2. blokai: paieškos laukelis, darbuotojo kortelė
  const d2 = dcol(1);
  const sf = dcard(d2, 0, 40, 300, 72); dline(sf, 24, 31, 150); dbtn(sf, 212, 14, 72, 44, 1);
  const sk = dcard(d2, 0, 160, 300, 170); dava(sk, 24, 30, 68); dline(sk, 110, 40, 150, "#94a3b8", 12); dline(sk, 110, 66, 110); dbtn(sk, 110, 108, 130, 42, 1);
  // 3. skiltys: paieška + darbuotojų sąrašas
  const d3 = dcol(2), sec = dcard(d3, 0, 0, 300, 400);
  dline(sec, 22, 34, 170); dbtn(sec, 216, 22, 62, 34, 2);
  for (let r = 0; r < 3; r++) { const y = 96 + r * 100; dava(sec, 22, y, 48); dline(sec, 84, y + 8, 120, "#94a3b8"); dline(sec, 84, y + 28, 90); dbtn(sec, 216, y + 8, 62, 32, 2); }
  // 4. puslapiai: mokyklos juosta + skiltys + vaizdas
  const d4 = dcol(3), pg = dcard(d4, 0, 0, 300, 420);
  el("div", "abs", `left:0;top:0;width:300px;height:40px;border-radius:14px 14px 0 0;background:${COL[0]}`, pg);
  dline(pg, 24, 62, 200, "#1e293b", 14);
  for (let r = 0; r < 2; r++) { const y = 100 + r * 64; dava(pg, 24, y, 40); dline(pg, 76, y + 8, 120, "#94a3b8"); dbtn(pg, 216, y + 6, 60, 30, 3); }
  el("div", "abs", "left:24px;top:240px;width:252px;height:84px;border-radius:12px;background:linear-gradient(135deg,#f3a8c4,#c9b8db)", pg);
  dbtn(pg, 24, 346, 150, 46, 3);
  const DK = ["ready-made parts", "blocks", "Blocks make sections", "pages"];
  ["DS_PARTS", "DS_BLOCKS", "DS_SECTIONS", "DS_PAGES"].forEach((txt, i) => {
    const c = $("#c6cols").children[i];
    const lb = el("div", "abs", `left:${DSX[i]}px;top:${DSY + DSH + 26}px;font:700 30px/1.2 Inter, sans-serif;color:#1e293b;white-space:nowrap;opacity:0`, $("#c6cols"), txt);
    tl.set(lb, { xPercent: -50 }, 0);
    tl.fromTo(c, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, w(6, DK[i]) - 0.1);
    tl.fromTo(lb, { opacity: 0 }, { opacity: 1, duration: 0.4 }, w(6, DK[i]) + 0.2);
    if (i > 0) { const x1 = DSX[i - 1] + DSW / 2 + 14, x2 = DSX[i] - DSW / 2 - 14, y = DSY + DSH / 2;
      const ar = svgEl("path", { d: `M${x1},${y} L${x2 - 10},${y} M${x2 - 22},${y - 12} L${x2},${y} L${x2 - 22},${y + 12}`, fill: "none", stroke: "#8fb3d9", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, $("#c6arr"));
      tl.fromTo(ar, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.4, ease: E }, w(6, DK[i]) - 0.4); } });
  // 5. visų mokyklų puslapiai — iš tų pačių detalių, kiekvienas savo spalvomis
  const st6 = strip("#c6strip", 860, w(6, "same parts"));
  st6.forEach((m) => dbtn(m, 26, 32, 28, 14, 4));
  // 6. prieinamumas — jau detalėse
  ["DS_CONTRAST", "DS_HEADINGS", "DS_KEYBOARD"].forEach((txt, k) => {
    const c = el("div", "chip", `left:${700 + k * 260}px;top:194px;font-size:26px;padding:10px 22px`, $("#c6acc"), `<i style="background:var(--teal)"></i>${txt}`);
    tl.set(c, { xPercent: -50 }, 0); pop(c, w(6, "accessibility") + 0.2 + k * 0.25); });
  tl.to("#c6acc", { opacity: 0, duration: 0.4 }, w(6, "Improve one part") - 0.5);
  // 7. pagerink vieną detalę — ir ji pagerėja visur
  tl.to(BTN[0].b, { scale: 1.12, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, w(6, "Improve one part"));
  BTN.forEach(({ b, ci }, k) => tl.to(b, { backgroundColor: "#3ab0b0", duration: 0.35 }, w(6, "Improve one part") + 0.3 + ci * 0.45 + (ci === 4 ? (k % 16) * 0.05 : 0)));

