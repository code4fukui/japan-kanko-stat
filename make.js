import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

/*
年,月,地域区分,データ区分,地域コード,地域名称,人数
2021,1,都道府県,観光来訪者数,1,北海道,1585278
*/

const list = [];

const fns = await dir2array("data");
for (const fn of fns) {
  const data = await CSV.fetchJSON("data/" + fn);
  data.forEach(i => {
    list.push({
      month: parseInt(i.年 + (i.月 < 10 ? "0": "") + i.月),
      lgcode: parseInt(i.地域コード),
      n: parseInt(i.人数),
    });
  });
}
const f = i => i.month * 100000 + i.lgcode;
list.sort((a, b) => f(a) - f(b));
await Deno.writeTextFile("data/all.csv", CSV.stringify(list));
