  // kaip svetainė genda: unikalus maketas → tikras turinys → visų ir niekieno (Eimanto įžvalga: neapibrėžta atsakomybė)
  head("#c2t", t(2, 0.3), w(2, "unique design") - 0.6);
  head("#c2u", w(2, "unique design") - 0.1, w(2, "Real content") - 0.6);
  head("#c2e", w(2, "Real content") - 0.1, w(2, "no one") - 0.6);
  head("#c2n", w(2, "no one") - 0.1, w(2, "twelve mistakes") - 0.5);
  const DL = (n, w0) => Array.from({ length: n }, (_, i) => `<div style="height:8px;background:#cbd5e1;border-radius:3px;margin:9px 0;width:${w0 - (i * 13) % 30}%"></div>`).join("");
  const BRW = el("div", "browser", "left:600px;top:230px;width:1160px;height:640px;opacity:0", $("#c2decay"), `<div class="bar"><b></b><b></b><b></b>&nbsp;school.edu</div>`);
  const NAV = el("div", "abs", "left:0;top:54px;width:1160px;height:56px;background:var(--blue);display:flex;flex-wrap:wrap;align-content:flex-start;column-gap:34px;padding:0 40px;font:600 20px/56px Inter, sans-serif;color:#fff;overflow:hidden", BRW);
  const NV0 = ["Home", "About us", "Students", "Parents", "Contacts"], NV1 = ["Projects", "Erasmus+", "Gallery 2019", "Important!!!", "Archive", "News (old)"];
  NV0.forEach((x) => el("span", "", "", NAV, x));
  const nv1 = NV1.map((x) => el("span", "", "display:none", NAV, x));
  const BAN = el("div", "abs", "left:40px;top:178px;width:1080px;height:58px;background:#fee2e2;border:3px solid #ef4444;border-radius:10px;padding:0 20px;font:800 24px/52px Inter, sans-serif;color:#b91c1c;opacity:0", BRW,
    `IMPORTANT!!! <span style="font:500 20px Menlo, monospace;color:#334155">scan0012.pdf</span>`);
  const CT = el("div", "abs", "left:0;top:110px;width:1160px;height:530px", BRW);
  const HERO = el("div", "abs", "left:40px;top:24px;width:1080px;height:200px;border-radius:16px;background:linear-gradient(135deg,#8fb3d9,#c9b8db)", CT);
  const HT0 = el("div", "abs", "left:44px;top:46px;font:800 44px Inter, sans-serif;color:#fff", HERO, "Welcome to our school");
  const HT1 = el("div", "abs", "left:44px;top:46px;font:800 40px Inter, sans-serif;color:#fff;letter-spacing:2px;opacity:0", HERO, "WELCOME TO OUR SCHOOL WEBSITE");
  el("div", "abs", "left:44px;top:118px;font:500 24px Inter, sans-serif;color:#fff;opacity:.9", HERO, "Lorem ipsum dolor sit amet, consectetur adipiscing.");
  const FAKE = el("div", "abs", "left:28px;top:12px;width:1104px;height:224px;border:4px dashed #f59e0b;border-radius:20px;opacity:0", CT);
  const CTT = ["News", "Events", "Documents"];
  const cardsD = CTT.map((x, k) => { const c = el("div", "abs", `left:${40 + k * 366}px;top:250px;width:340px;height:250px;background:#fff;border:2px solid #e2e8f0;border-radius:14px;overflow:hidden`, CT);
    const tt = el("div", "abs", "left:22px;top:18px;font:700 28px Inter, sans-serif;color:#1e293b", c, x);
    el("div", "abs", "left:22px;top:66px;width:290px", c, DL(3, 90));
    const wall = el("div", "abs", "left:0;top:60px;width:340px;height:190px;background:#fff;padding:0 22px;opacity:0", c, DL(11, 100));
    return { c, tt, wall }; });
  tl.fromTo(BRW, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, w(2, "unique design") - 0.2);
  tl.fromTo(HERO, { filter: "brightness(1)" }, { filter: "brightness(1.12)", duration: 0.5, yoyo: true, repeat: 1, immediateRender: false }, w(2, "day one"));
  // išgalvotas turinys
  tl.to(FAKE, { opacity: 1, duration: 0.3 }, w(2, "made-up"));
  tl.to(FAKE, { opacity: 0, duration: 0.3 }, w(2, "Real content"));
  // veikėjai: kiekvienas prideda po truputį
  const ACT = [["A colleague", "One colleague", "#3ab0b0"], ["Another colleague", "another pasted", "#c9b8db"], ["The head", "The head", "#3363ab"], ["Parents", "Parents", "#f3a8c4"]];
  const actors = ACT.map(([nm, k, col], i) => { const c = el("div", "chip", `left:120px;top:${330 + i * 100}px;font-size:26px;padding:12px 24px`, $("#c2actors"), `<i style="background:${col}"></i>${nm}`);
    tl.fromTo(c, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: E }, w(2, k) - 0.1);
    if (i < ACT.length - 1) tl.to(c, { opacity: 0.45, duration: 0.3 }, w(2, ACT[i + 1][1]) - 0.1);
    return c; });
  // kolega: paklodės ir DIDŽIOSIOS
  tl.to(HT0, { opacity: 0, duration: 0.25 }, w(2, "One colleague") + 0.3); tl.to(HT1, { opacity: 1, duration: 0.25 }, w(2, "One colleague") + 0.3);
  cardsD.forEach((d, k) => tl.to(d.wall, { opacity: 1, duration: 0.3 }, w(2, "One colleague") + 0.5 + k * 0.2));
  // kitas įdėjo, kaip gavo: atsitiktiniai šriftai ir spalvos
  [["Georgia, serif", "#c2410c", "underline"], ["'Comic Sans MS', cursive", "#7c3aed", "none"], ["'Times New Roman', serif", "#2563eb", "underline"]].forEach(([ff, col, td], k) => {
    const at = w(2, "another pasted") + 0.3 + k * 0.25;
    tl.set(cardsD[k].tt, { fontFamily: ff, color: col, textDecoration: td }, at);
    tl.fromTo(cardsD[k].tt, { scale: 1 }, { scale: 1.15, duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, at); });
  tl.set(HERO, { background: "linear-gradient(135deg,#fde68a,#f97316)" }, w(2, "another pasted") + 1.0);
  // vadovas: meniu persipildo ir persilaužia
  nv1.forEach((s, k) => tl.set(s, { display: "inline" }, w(2, "The head") + 0.4 + k * 0.15));
  tl.to(NAV, { height: 112, duration: 0.4, ease: E }, w(2, "The head") + 0.6);
  tl.to(CT, { y: 56, duration: 0.4, ease: E }, w(2, "The head") + 0.6);
  // tėvai: dokumentas „aukščiau“
  tl.fromTo(BAN, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, w(2, "Parents") + 0.5);
  tl.to(CT, { y: 132, duration: 0.4, ease: E }, w(2, "Parents") + 0.5);
  // visų ir niekieno: maketas pakrypsta, blokai išsibarsto
  // niekas nenori blogo: kiekvienas veikėjas trumpai sušvinta žaliai — geri ketinimai
  tl.to(actors, { opacity: 1, duration: 0.3 }, w(2, "Nobody"));
  actors.forEach((c, k) => tl.to(c, { boxShadow: "0 0 0 6px rgba(34,181,115,.45), 0 8px 24px rgba(30,40,80,.08)", scale: 1.06, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, w(2, "Nobody") + 0.2 + k * 0.35));
  tl.to(BRW, { rotation: -1, duration: 1.2, ease: EIO }, w(2, "simply becomes"));
  tl.to(BRW, { rotation: -2.5, duration: 0.8, ease: EIO }, w(2, "no one"));
  [[-5, -14], [3, 10], [-3, 22]].forEach(([r, dy], k) => tl.to(cardsD[k].c, { rotation: r, y: dy, duration: 0.8, ease: EIO }, w(2, "no one") + 0.1 + k * 0.1));
  tl.to(HERO, { rotation: 1.5, x: 14, duration: 0.8, ease: EIO }, w(2, "no one") + 0.1);
  tl.to(actors, { x: 40, duration: 0.6, ease: EIO, stagger: 0.08 }, w(2, "no one") + 0.4);
  tl.to([BRW, ...actors], { opacity: 0, scale: 0.85, duration: 0.5, ease: "power1.in" }, w(2, "twelve mistakes") - 0.6);
