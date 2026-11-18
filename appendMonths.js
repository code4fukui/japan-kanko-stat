// Scheduled updates keep published months intact. Use make.js for a full rebuild.
import { CSV } from "https://js.sabae.cc/CSV.js";

const path = "data/all.csv";
const published = await Deno.readTextFile(path);
const existingMonths = new Set(CSV.toJSON(CSV.decode(published)).map(row => Number(row.month)));
const files = new Set();
for await (const entry of Deno.readDir("data")) {
  if (entry.isFile) files.add(entry.name);
}

const additions = new Map();
// Prefer the annual release when both annual and monthly sources cover a new month.
for (const file of [...files].sort()) {
  const match = /^pref(\d{4}(?:\d{2})?)\.csv$/.exec(file);
  if (!match) continue;
  const period = match[1];
  const months = period.length === 6 ? [Number(period)] :
    Array.from({ length: 12 }, (_, i) => Number(period) * 100 + i + 1);
  const pending = new Set(months.filter(month => !existingMonths.has(month) && !additions.has(month)));
  const cityFile = "city" + period + ".csv";
  if (!pending.size || !files.has(cityFile)) continue;

  const groups = new Map();
  for (const source of [file, cityFile]) {
    const rows = await CSV.fetchJSON("data/" + source);
    for (const row of rows) {
      const month = Number(row.年) * 100 + Number(row.月);
      if (!pending.has(month)) continue;
      const lgcode = Number(row.地域コード);
      const n = Number(row.人数);
      if (!/^\d+$/.test(row.地域コード) || !/^\d+$/.test(row.人数)) {
        throw new Error("Invalid visitor data in " + source);
      }
      if (!groups.has(month)) groups.set(month, { rows: new Map(), sources: new Set() });
      const group = groups.get(month);
      if (group.rows.has(lgcode)) throw new Error("Duplicate region in " + source);
      group.rows.set(lgcode, { month, lgcode, n });
      group.sources.add(source);
    }
  }
  for (const [month, group] of groups) {
    if (group.sources.size === 2) additions.set(month, [...group.rows.values()]);
  }
}

if (additions.size) {
  const rows = [...additions.values()].flat().sort((a, b) => a.month - b.month || a.lgcode - b.lgcode);
  const separator = published.endsWith("\n") ? "" : "\n";
  const lines = rows.map(row => [row.month, row.lgcode, row.n].join(","));
  const tempFile = await Deno.makeTempFile({ dir: "data" });
  await Deno.writeTextFile(tempFile, published + separator + lines.join("\n") + "\n");
  await Deno.rename(tempFile, path);
}
