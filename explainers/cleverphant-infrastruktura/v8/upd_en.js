  tl.to(["#c12site", "#c12troj"], { opacity: 0, y: -20, duration: 0.5, ease: "power1.in" }, w(12, "biggest job") - 0.6);
  head("#c12m", w(12, "eat an elephant") - 0.1, w(12, "our strength") - 0.6);
  head("#c12n", w(12, "our strength") - 0.1, w(12, "every next step") - 0.5);
  // didžiausias darbas — šimtai svetainių; valgome po kąsnelį, nuolat: tikri atnaujinimai visoms mokykloms
  tl.fromTo("#c12eat", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, w(12, "biggest job"));
  tl.fromTo("#c12job", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, w(12, "biggest job") + 0.4);
  // šimtai svetainių: juosta atsiranda iš karto, savybės nušvinta paeiliui
  const st12 = strip("#c12mini", 872, w(12, "biggest job") + 0.8);
  const jq = $("#c12job").lastElementChild; jq.innerHTML = jq.textContent.split(" · ").map((x) => `<span style="display:inline-block">${x}</span>`).join(" · ");
  [...jq.querySelectorAll("span")].forEach((sp, k) => tl.fromTo(sp, { color: "#475569" }, { color: "#3ab0b0", duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, w(12, "biggest job") + 1.4 + k * 0.8));
  tl.to("#c12eat", { scale: 1.06, duration: 1.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, w(12, "biggest job") + 0.9);
  wave(st12, w(12, "biggest job") + 3.6, "#c9b8db");
  const UC = ["#3363ab", "#3ab0b0", "#f3a8c4"];
  const UPL = ["Improvements", "Speed and stability", "Cosmetics"];
  UPL.forEach((t, k) => { const l = el("div", "lbl", `left:${640 + k * 400}px;top:190px;font-size:22px;color:#475569`, $("#c12upd"), `<i style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${UC[k]};margin-right:10px;vertical-align:-1px"></i>${t}`);
    tl.fromTo(l, { opacity: 0 }, { opacity: 1, duration: 0.4 }, w(12, "Small improvements") + k * 0.5); });
  const UPD = [["Google Sheets integration", 0], ["Faster search: ~30 s → ~2 s", 1], ["Standardised banners", 2], ["Update subscriptions", 0],
    ["Images resized automatically", 1], ["Recycle bin for documents", 0], ["Consistent link hover", 2], ["Sitemap.xml fixed", 1],
    ["Documents open in the browser", 0], ["Improved search", 1], ["Two-factor authentication", 0], ["Pins auto-unpin by date", 0]];
  const ut0 = w(12, "One bite") + 0.2, udt = (w(12, "to all schools") - ut0) / UPD.length;
  UPD.forEach(([txt, ty], k) => {
    const x = 640 + (k % 2) * 600, y = 248 + Math.floor(k / 2) * 80, at = ut0 + k * udt;
    const c = el("div", "chip", `left:${x}px;top:${y}px;font-size:26px;padding:10px 22px`, $("#c12upd"), `<i style="background:${UC[ty]}"></i>${txt}`);
    tl.fromTo(c, { opacity: 0, x: 320 - x, y: 470 - y, scale: 0.4 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.55, ease: EIO }, at);
    const a = (-60 + k * 30) * Math.PI / 180;
    const b = el("div", "abs", `left:${150 + 152 * Math.cos(a) - 27}px;top:${150 + 152 * Math.sin(a) - 27}px;width:54px;height:54px;border-radius:50%;background:#f3f5fa;transform:scale(0)`, $("#c12eat"));
    tl.to(b, { scale: 1, duration: 0.2, ease: "back.out(2)" }, at); });
  // visoms mokykloms: atnaujinimai banga nueina į visų mokyklų svetaines
  wave(st12, w(12, "to all schools") + 0.2, "#3ab0b0");
  // daugiau akių: mokyklos pastebi ir praneša atgal
  [1, 3, 5, 7, 9, 11, 13, 15].forEach((i, k) => { const x = 190 + i * 96 + 40, at = w(12, "more eyes") + k * 0.3;
    tl.to(st12[i], { y: -18, borderColor: "#f3a8c4", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, at - 0.2);
    const d = el("div", "abs", `left:${x - 14}px;top:858px;width:28px;height:28px;border-radius:50%;background:#f3a8c4;opacity:0`, $("#c12mini"));
    tl.fromTo(d, { opacity: 0, x: 0, y: 0 }, { opacity: 1, x: 320 - x, y: 470 - 858, duration: 1.1, ease: "power1.inOut" }, at);
    tl.to(d, { opacity: 0, duration: 0.2 }, at + 1.0); });
  // kiekvienas patobulinimas — visi sublyksi
  [...$("#c12upd").querySelectorAll(".chip")].forEach((c, k) => tl.to(c, { scale: 1.08, boxShadow: "0 0 0 6px rgba(58,176,176,.4), 0 8px 24px rgba(30,40,80,.08)", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, w(12, "every improvement") + k * 0.12));
  wave(st12, w(12, "every improvement") + 1.0, "#3363ab");
  tl.to(["#c12upd", "#c12mini", "#c12job"], { opacity: 0, duration: 0.5 }, w(12, "every next step") - 0.5);
  tl.to("#c12eat", { opacity: 0, scale: 0.6, duration: 0.5, ease: "power1.in" }, w(12, "every next step") - 0.5);
