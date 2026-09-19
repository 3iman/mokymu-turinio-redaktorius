/**
 * Scenarijaus laiko žymos — balsas ir garsai tiksliu momentu kadro viduje.
 *
 * „Kur spausti“ filmukuose balsas sakomas ne vienu gabalu nuo kadro pradžios, o sakiniais,
 * susietais su veiksmais, ir kiekvienas veiksmas turi savo garsą (Eimantas 2026-09-17).
 * Žymos rašomos kadro bloke po `### KADRAS N:`:
 *
 *   **Laiko žymos:**
 *
 *   | Laikas | Kas | Tekstas arba garsas |
 *   |---|---|---|
 *   | 1.5 | balsas | Paimate naują dokumentą už rankenėlės ir tempiate į viršų. |
 *   | 3.6 | garsas | paemimas |
 *
 * Laikas — sekundės nuo KADRO pradžios. „garsas“ — failo vardas be plėtinio iš assets/video/sfx/.
 * Kadrai be žymų veikia kaip anksčiau: balsas iš pagrindinės lentelės stulpelio „Balsas“.
 */
function parseCues(content) {
  const cues = {};
  const blocks = content.split(/^### KADRAS (\d+):.*$/m);
  for (let i = 1; i < blocks.length; i += 2) {
    const kadras = parseInt(blocks[i], 10);
    const body = blocks[i + 1] || '';
    const rows = [];
    for (const line of body.split('\n')) {
      const m = line.match(/^\|\s*(\d+(?:[.,]\d+)?)\s*\|\s*(balsas|garsas)\s*\|\s*(.+?)\s*\|\s*$/i);
      if (!m) continue;
      rows.push({ at: parseFloat(m[1].replace(',', '.')), kind: m[2].toLowerCase(), value: m[3].trim() });
    }
    if (rows.length) cues[kadras] = rows.sort((a, b) => a.at - b.at);
  }
  return cues;
}

module.exports = { parseCues };
