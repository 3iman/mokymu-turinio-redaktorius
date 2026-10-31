  // ledkalnis: virš vandens — svetainės, po vandeniu — tai, kas jas palaiko
  const ICE = $("#c5ice");
  svgEl("rect", { x: 0, y: 440, width: 1920, height: 640, fill: "rgba(143,179,217,.12)" }, ICE);
  svgEl("line", { x1: 0, y1: 440, x2: 1920, y2: 440, stroke: "#8fb3d9", "stroke-width": 3 }, ICE);
  const berg = svgEl("polygon", { points: "200,440 1720,440 1650,640 1520,920 400,920 270,640", fill: "rgba(255,255,255,.78)", stroke: "rgba(51,99,171,.25)", "stroke-width": 3 }, ICE);
  svgEl("line", { x1: 258, y1: 604, x2: 1662, y2: 604, stroke: "rgba(51,99,171,.18)", "stroke-width": 2, "stroke-dasharray": "8 8" }, ICE);
  svgEl("line", { x1: 330, y1: 770, x2: 1590, y2: 770, stroke: "rgba(51,99,171,.18)", "stroke-width": 2, "stroke-dasharray": "8 8" }, ICE);
  tl.fromTo("#c5ice", { opacity: 0 }, { opacity: 1, duration: 0.7, ease: E }, w(5, "Underneath") - 0.2);
  const LAY = [["ICE_DS", "design system", 494], ["ICE_MOD", "compliance", 662], ["ICE_SUP", "support", 822]];
  LAY.forEach(([txt, k, y], i) => {
    const l = el("div", "abs", `left:960px;top:${y}px;font:700 30px/1.2 Inter, sans-serif;color:var(--blue);white-space:nowrap;opacity:0`, $("#c5layers"), txt);
    tl.set(l, { xPercent: -50 }, 0);
    tl.fromTo(l, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, w(5, k) - 0.1);
    if (i === 0) for (let c = 0; c < 6; c++) {
      const d = el("div", "abs", `left:${876 + c * 30}px;top:${y + 52}px;width:20px;height:20px;border-radius:50%;background:${COL[c]};opacity:0`, $("#c5layers"));
      tl.to(d, { opacity: 1, duration: 0.3 }, w(5, k) + 0.3 + c * 0.06); } });
  tl.fromTo("#c5shared", { opacity: 0 }, { opacity: 1, duration: 0.4 }, w(5, "shared by"));
  tl.set("#c5shared", { xPercent: -50 }, 0);
