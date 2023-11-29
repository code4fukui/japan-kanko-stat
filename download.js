import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const url = "https://www.nihon-kankou.or.jp/home/jigyou/research/d-toukei/";
const html = await fetchOrLoad(url);
const dom = HTMLParser.parse(html);
const as = dom.querySelectorAll("a");
for (const a of as) {
  const url = a.getAttribute("href");
  //console.log(url);
  if (!url || !url.endsWith(".csv")) continue;
  const fn = url.substring(url.lastIndexOf("/") + 1);
  try {
    await Deno.readFile("data/" + fn);
    continue;
  } catch (e) {
  }
  const data = await CSV.fetchJSON(url);
  await Deno.writeTextFile("data/" + fn, CSV.stringify(data));
}
