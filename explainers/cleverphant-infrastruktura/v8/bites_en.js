  // one bite at a time: each bite is one detail fixed; a year later the elephant is eaten
  const BK = ["Today the", "Tomorrow", "The day after"], BN = ["headings", "cookie banner", "document names"];
  document.querySelectorAll("#c11eat .bite").forEach((b, k) => tl.to(b, { scale: 1, duration: 0.25, ease: "back.out(2)" }, w(11, BK[k]) - 0.05));
  BN.forEach((nm, k) => { const c = el("div", "chip", `left:1200px;top:${400 + k * 96}px;font-size:28px;padding:14px 26px`, $("#c11bites"), `<i style="background:var(--teal)"></i>${nm}`);
    tl.fromTo(c, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: E }, w(11, BK[k])); });
  tl.to("#c11eat", { scale: 0.5, opacity: 0, rotation: -8, duration: 1.0, ease: "power2.in" }, w(11, "A year later"));
  tl.to("#c11bites", { x: -240, duration: 1.0, ease: EIO }, w(11, "A year later") + 0.2);
  tl.to("#c11bites", { opacity: 0, duration: 0.5 }, w(11, "every next step") - 0.5);
