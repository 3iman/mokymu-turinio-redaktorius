  // pilotas sukasi ratu (kaip cleverphant.lt „ciklas“): poreikis → analizė ir dizainas → įgyvendinimas → testavimas → vertinimas → iš naujo
  const CYC = $("#c9cyc"), CCX = 960, CCY = 608, CR = 210, CK = ["loop: need", "analysis", "build", "testing", "evaluation"];
  const CYL = ["Need", "Analysis & design", "Build", "Testing", "Evaluation"], CYC5 = ["#3363ab", "#f3a8c4", "#c9b8db", "#3ab0b0", "#8fb3d9"];
  const pol = (r, a) => [CCX + r * Math.cos(a * Math.PI / 180), CCY + r * Math.sin(a * Math.PI / 180)];
  tl.to(["#c9net", "#c9nodes", "#c9sym"], { opacity: 0.12, duration: 0.6 }, w(9, "runs in a loop") - 0.3);
  const segs = CYL.map((nm, i) => {
    const a0 = -150 + i * 72 + 4, a1 = a0 + 58, [x0, y0] = pol(CR, a0), [x1, y1] = pol(CR, a1);
    const g = svgEl("g", { opacity: 0 }, CYC);
    svgEl("path", { d: `M${x0},${y0} A${CR},${CR} 0 0 1 ${x1},${y1}`, fill: "none", stroke: CYC5[i], "stroke-width": 54 }, g);
    const t = pol(CR, a1 + 8), b1 = pol(CR + 40, a1 - 1), b2 = pol(CR - 40, a1 - 1);
    svgEl("polygon", { points: `${t[0]},${t[1]} ${b1[0]},${b1[1]} ${b2[0]},${b2[1]}`, fill: CYC5[i] }, g);
    const am = (a0 + a1) / 2, c = Math.cos(am * Math.PI / 180), [lx, ly] = pol(CR + 62, am);
    const lb = el("div", "lbl", `left:${lx}px;top:${ly}px;font-size:30px;font-weight:600;color:#1e293b`, $("#c9cycl"), nm);
    tl.set(lb, { xPercent: c > 0.3 ? 0 : c < -0.3 ? -100 : -50, yPercent: -50 }, 0);
    tl.fromTo(g, { opacity: 0.18 }, { opacity: 0.18, duration: 0.01 }, w(9, "runs in a loop") - 0.2);
    tl.to(g, { opacity: 1, duration: 0.35, ease: E }, w(9, CK[i]) - 0.1);
    tl.fromTo(lb, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: E }, w(9, CK[i]) - 0.05);
    return g; });
  // „ir vėl iš naujo“ — ratas sukasi lėtai, kol renkasi duomenys
  const com = svgEl("g", {}, CYC); const [dx, dy] = pol(CR, -150);
  svgEl("circle", { cx: dx, cy: dy, r: 15, fill: "#fff", stroke: "#3363ab", "stroke-width": 5 }, com);
  tl.set(com, { opacity: 0 }, 0);
  tl.set(com, { opacity: 1 }, w(9, "round again"));
  tl.fromTo(com, { rotation: 0 }, { rotation: 720, svgOrigin: `${CCX} ${CCY}`, duration: w(9, "data shows") - w(9, "round again") + 0.4, ease: "none" }, w(9, "round again"));
  segs.forEach((g, i) => [0, 1].forEach((r) => tl.to(g, { opacity: 0.55, duration: 0.18, yoyo: true, repeat: 1 }, w(9, "round again") + r * 2.2 + i * 0.4)));
  // duomenys parodo, kad veikia → ratas susitraukia į pilotinę mokyklą, tinklas grįžta
  tl.to(["#c9cyc", "#c9cycl"], { scale: 0.08, opacity: 0, transformOrigin: `${sp.x}px ${sp.y}px`, duration: 0.8, ease: EIO }, w(9, "data shows") + 0.6);
  tl.to(["#c9net", "#c9nodes", "#c9sym"], { opacity: 1, duration: 0.6 }, w(9, "data shows") + 1.0);
