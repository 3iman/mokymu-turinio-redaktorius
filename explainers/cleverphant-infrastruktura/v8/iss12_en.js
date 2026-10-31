  // dvylika labiausiai į akį krentančių klaidų (mokymų pamokos „Pasikartojančios klaidos“) — kortelės iššoka greitai
  const LN = (w) => `<div style="height:7px;background:#cbd5e1;border-radius:2px;margin:6px 0;width:${w}%"></div>`;
  const FX = 'class="fx" style="display:inline-block;padding:4px 10px;border:4px solid transparent;border-radius:10px';
  const ISS = [
    [`<div ${FX};font:800 26px Inter, sans-serif;letter-spacing:1px">SCHOOL NEWS</div>${LN(80)}${LN(60)}`, "All-caps headings"],
    [`<div ${FX};width:330px">${[100, 96, 100, 92, 64].map(LN).join("")}</div>`, "Walls of text, no headings"],
    [`<div ${FX};width:240px;height:70px;background:linear-gradient(135deg,#f3a8c4,#c8b8db);text-align:center"><b style="display:block;font:800 22px/1 Inter, sans-serif;color:#fff;margin-top:12px;filter:blur(.5px)">OPEN DAY</b><span style="font:700 15px Inter, sans-serif;color:#fff;filter:blur(.5px)">Sept 1 · 9:00</span></div><div style="margin-top:6px;font:600 16px Inter, sans-serif;color:#94a3b8">🔊 “image”</div>`, "Posters screen readers can't read"],
    [`<div ${FX};width:330px;font:500 16px/1.45 Inter, sans-serif;color:#3363ab;text-decoration:underline;word-break:break-all">https://www.school.lt/wp-content/uploads/2019/03/scan_final_v2_NEW.pdf</div>`, "Naked links"],
    [`<div ${FX};line-height:1.25"><span style="font:700 26px Georgia, serif;color:#c2410c">Welcome</span> <span style="font:400 18px 'Comic Sans MS', cursive;color:#7c3aed">to our</span><br><span style="font:800 22px Inter, sans-serif;color:#0f766e;background:#fde68a;padding:0 6px">SCHOOL</span> <span style="font:italic 19px 'Times New Roman', serif;color:#2563eb;text-decoration:underline">website!!!</span></div>`, "Random fonts and colours"],
    [`<div ${FX};display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:#d0deec"></div><div><div style="font:700 19px Inter, sans-serif">Mrs. Teacher</div><div style="font:600 15px Inter, sans-serif;color:#94a3b8">left in 2019</div></div></div>`, "Staff who left years ago"],
    [`<div ${FX};width:330px"><div style="font:500 20px Inter, sans-serif;color:#1e293b;text-decoration:underline">Our history</div>${LN(90)}<div style="font:800 20px Inter, sans-serif;color:#1e293b;margin-top:8px">Our community</div>${LN(80)}</div>`, "Underline or bold instead of a heading"],
    [`<p ${FX};width:300px;font:500 16px/1.5 Inter, sans-serif;text-align:justify;word-spacing:16px;color:#475569;margin:0">The school was founded long ago and grew together with its community.</p>`, "Justified text, harder to read"],
    [`<div ${FX};font:500 17px/1.5 ui-monospace, Menlo, monospace;color:#334155">${["scan0012.pdf", "Document (2).pdf", "IMG_4031.pdf"].map((f) => `<div><span style="display:inline-block;width:30px;font:800 11px/18px Inter, sans-serif;color:#fff;background:#ef4444;border-radius:4px;text-align:center;margin-right:8px">PDF</span>${f}</div>`).join("")}</div>`, "File names instead of official titles"],
    [`<div ${FX};font:500 19px/1.7 Inter, sans-serif;color:#334155">Timetable: <span style="color:#3363ab;text-decoration:underline">click here</span><br>Menu: <span style="color:#3363ab;text-decoration:underline">click here</span></div>`, "“Click here”"],
    [`<div ${FX};font:500 19px/1.4 Inter, sans-serif;color:#334155">★ Library<br>– Canteen<br>» Gym</div>`, "Home-made lists: ★, –, »"],
    [`<div ${FX};width:330px">${["School concert", "Spring fair"].map((t) => `<div style="display:flex;gap:10px;align-items:center;margin:4px 0"><div style="width:50px;height:34px;border-radius:6px;border:2px dashed #cbd5e1"></div><div><div style="font:700 17px Inter, sans-serif">${t}</div><div style="font:500 14px Inter, sans-serif;color:#94a3b8">NEWS_NODATE</div></div></div>`).join("")}</div>`, "News without dates or categories"]];
  const icards = ISS.map((d, i) => { const x = 100 + (i % 4) * 440, y = 236 + Math.floor(i / 4) * 248;
    const c = el("div", "abs", `left:${x}px;top:${y}px;width:400px;height:228px;background:#fff;border-radius:18px;box-shadow:0 1px 3px rgba(0,0,0,.05), 0 12px 30px rgba(30,40,80,.10);overflow:hidden;opacity:0`, $("#c1issues"),
      `<div style="height:12px;background:${COL[i % 6]}"></div><div style="padding:14px 22px;height:118px">${d[0]}</div><div style="padding:0 22px;font:600 22px/1.25 Inter, sans-serif;color:#991b1b">${d[1]}</div>`);
    const at = w(1, "Here are") + 0.1 + i * 0.28;
    pop(c, at, 0.4);
    tl.to(c.querySelector(".fx"), { borderColor: "#ef4444", duration: 0.3 }, at + 0.35);
    return { c, x, y }; });
  head("#c1h", w(1, "Here are") - 0.1, w(1, "Each mistake") - 0.4);
  head("#c1a", w(1, "Each mistake") - 0.1, w(1, "Together") - 0.4);
