import { readFileSync } from "fs";
const d = JSON.parse(readFileSync("dist/tokens.figma.json", "utf8"));
let issues = [], sample = [], aliases = [], dims = [];
function w(o, p) {
  if (!o || typeof o !== "object") return;
  if ("$value" in o) { issues.push("DTCG format at " + p); return; }
  if ("value" in o && "type" in o) {
    const t = o["type"], v = o["value"];
    if (!["color","spacing","borderRadius"].includes(t)) issues.push("BAD TYPE [" + t + "]: " + p);
    if (t === "color" && !String(v).startsWith("{")) sample.push(p + " = " + v);
    if (t === "color" && String(v).startsWith("{"))  aliases.push(p + " -> " + v);
    if (t === "spacing" || t === "borderRadius")     dims.push(p + " = " + v);
  } else {
    for (const [k, x] of Object.entries(o)) if (!k.startsWith("$")) w(x, p ? p + "." + k : k);
  }
}
w(d, "");
console.log(issues.length + " issues");
issues.forEach(i => console.log("  " + i));
console.log("Format: Tokens Studio (value/type)");
console.log("Colors: " + sample.length + " hex/rgba, " + aliases.length + " aliases");
console.log("Dims:   " + dims.length + " (spacing + borderRadius)");
console.log("Sample primitives:");
sample.slice(0, 6).forEach(s => console.log("  " + s));
const alphas = sample.filter(s => s.includes("rgba"));
if (alphas.length) { console.log("Alpha colors:"); alphas.forEach(s => console.log("  " + s)); }
console.log("Sample aliases:");
aliases.slice(0, 4).forEach(s => console.log("  " + s));
