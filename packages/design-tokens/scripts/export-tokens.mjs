/**
 * Exports design tokens to Tokens Studio for Figma format.
 *
 * Usage:  node scripts/export-tokens.mjs
 * Output: dist/tokens.figma.json  ← import this file in Tokens Studio for Figma
 *
 * Format: Tokens Studio (value / type — no $ prefix)
 * https://docs.tokens.studio/
 *
 * Import steps in Tokens Studio:
 *   1. Open Tokens Studio plugin in Figma
 *   2. Import → Load from file → select tokens.figma.json
 *   3. In Themes, enable "Light" or "Dark" and apply to your frames
 */

import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC  = join(ROOT, "src");

// oklch -> CSS color (#RRGGBB or rgba). Never 8-digit hex.
function oklchToColor(l, c, h, alpha = 1) {
  const hRad = (h * Math.PI) / 180;
  const a  = c * Math.cos(hRad);
  const b  = c * Math.sin(hRad);
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548  * b;
  const lc = l_ ** 3, mc = m_ ** 3, sc = s_ ** 3;
  const r  =  4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
  const g  = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
  const bv = -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701  * sc;
  const ch = (x) => { const v = Math.max(0, Math.min(1, x)); return v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055; };
  const ri = Math.round(ch(r) * 255);
  const gi = Math.round(ch(g) * 255);
  const bi = Math.round(ch(bv) * 255);
  if (alpha < 1) return `rgba(${ri}, ${gi}, ${bi}, ${parseFloat(alpha.toFixed(4))})`;
  return "#" + [ri, gi, bi].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function toCssColor(value) {
  const m = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+)(%?))?\s*\)/i);
  if (!m) return value;
  const alpha = m[4] !== undefined ? (m[5] === "%" ? parseFloat(m[4]) / 100 : parseFloat(m[4])) : 1;
  return oklchToColor(parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]), alpha);
}

const CSS_KEYWORDS = new Set(["transparent", "currentcolor", "inherit", "initial", "unset"]);

function remToPxStr(value) {
  const n = parseFloat(value);
  if (isNaN(n)) return null;
  if (value.endsWith("px"))  return String(Math.round(n));
  if (value.endsWith("rem")) return String(Math.round(n * 16));
  return null;
}

function parseCssProps(css) {
  const result = {};
  const stripped = css.replace(/@[a-z-]+[^{]*\{(?:[^{}]|\{[^{}]*\})*\}/gs, "");
  const re = /--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(stripped)) !== null) result[m[1].trim()] = m[2].trim();
  return result;
}

function read(p) { return readFileSync(p, "utf8"); }

// Tokens Studio format builders: { value, type }
const mkColor   = (v)    => ({ value: v,           type: "color" });
const mkAlias   = (path) => ({ value: `{${path}}`, type: "color" });
const mkSpacing = (v)    => ({ value: v,            type: "spacing" });
const mkRadius  = (v)    => ({ value: v,            type: "borderRadius" });

// load source
const primitiveProps = parseCssProps(read(join(SRC, "tokens/primitive.css")));
const spacingProps   = parseCssProps(read(join(SRC, "tokens/spacing.css")));
const radiusProps    = parseCssProps(read(join(SRC, "tokens/radius.css")));
const globalsProps   = parseCssProps(read(join(SRC, "themes/globals.css")));
const lightProps     = parseCssProps(read(join(SRC, "themes/light.css")));
const darkProps      = parseCssProps(read(join(SRC, "themes/dark.css")));

// PASS 1 — primitives + reverse map
const cssVarToPath = {};

function buildColorScale(props) {
  const out = {};
  for (const [k, v] of Object.entries(props)) {
    if (v.startsWith("var(") || CSS_KEYWORDS.has(v.toLowerCase())) continue;
    const parts = k.split("-");
    cssVarToPath[k] = `primitive.color.${parts.join(".")}`;
    let node = out;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!node[parts[i]]) node[parts[i]] = {};
      node = node[parts[i]];
    }
    node[parts.at(-1)] = mkColor(toCssColor(v));
  }
  return out;
}

const globalColors = {};
for (const [k, v] of Object.entries(globalsProps)) {
  if (k.startsWith("color-") && !v.startsWith("var(") && !CSS_KEYWORDS.has(v.toLowerCase())) {
    globalColors[k.replace(/^color-/, "")] = v;
  }
}

const primitiveColor = { ...buildColorScale(primitiveProps), ...buildColorScale(globalColors) };

const primitiveSpacing = {};
for (const [k, v] of Object.entries(spacingProps)) {
  const key = k.replace(/^space-/, "");
  const px  = remToPxStr(v);
  if (px !== null) {
    cssVarToPath[k] = `primitive.spacing.${key}`;
    primitiveSpacing[key] = mkSpacing(px);
  }
}

const primitiveRadius = {};
for (const [k, v] of Object.entries(radiusProps)) {
  const key = k.replace(/^radius-/, "");
  const px  = remToPxStr(v);
  if (px !== null) {
    cssVarToPath[k] = `primitive.radius.${key}`;
    primitiveRadius[key] = mkRadius(px);
  }
}

// PASS 2 — semantic tokens
function resolveSemanticValue(cssVarName, rawValue) {
  const varMatch = rawValue.match(/^var\(--([a-zA-Z0-9_-]+)\)$/);
  if (varMatch) {
    const jsonPath = cssVarToPath[varMatch[1]];
    if (jsonPath) return mkAlias(jsonPath);
    console.warn(`  warning: unresolved var(--${varMatch[1]}) in --${cssVarName}`);
    return null;
  }
  if (rawValue.startsWith("oklch(") || rawValue.startsWith("#") || rawValue.startsWith("rgb")) {
    return mkColor(toCssColor(rawValue));
  }
  return null;
}

function buildSemantic(props) {
  const out = {};
  for (const [k, v] of Object.entries(props)) {
    if (k === "radius") continue;
    const tok = resolveSemanticValue(k, v);
    if (!tok) continue;
    const parts     = k.split("-");
    const parentKey = parts.slice(0, -1).join("-");
    const parentIsToken = parts.length > 1 && props[parentKey] !== undefined;
    if (parts.length > 1 && !parentIsToken) {
      let node = out;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!node[parts[i]]) node[parts[i]] = {};
        node = node[parts[i]];
      }
      node[parts.at(-1)] = tok;
    } else {
      out[k] = tok;
    }
  }
  return out;
}

// assemble
const primitive     = { color: primitiveColor, spacing: primitiveSpacing, radius: primitiveRadius };
const semanticLight = buildSemantic(lightProps);
const semanticDark  = buildSemantic(darkProps);

const output = {
  $metadata: {
    tokenSetOrder: ["primitive", "semantic/light", "semantic/dark"],
  },
  $themes: [
    {
      id:   "light",
      name: "Light",
      selectedTokenSets: { primitive: "enabled", "semantic/light": "enabled", "semantic/dark": "disabled" },
    },
    {
      id:   "dark",
      name: "Dark",
      selectedTokenSets: { primitive: "enabled", "semantic/light": "disabled", "semantic/dark": "enabled" },
    },
  ],
  primitive,
  "semantic/light": semanticLight,
  "semantic/dark":  semanticDark,
};

const distDir = join(ROOT, "dist");
mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, "tokens.figma.json"), JSON.stringify(output, null, 2), "utf8");
writeFileSync(join(distDir, "tokens.primitives.json"),     JSON.stringify(primitive,     null, 2), "utf8");
writeFileSync(join(distDir, "tokens.semantic-light.json"), JSON.stringify(semanticLight, null, 2), "utf8");
writeFileSync(join(distDir, "tokens.semantic-dark.json"),  JSON.stringify(semanticDark,  null, 2), "utf8");

// stats
let colors = 0, aliases = 0, dims = 0;
function count(o) {
  for (const v of Object.values(o)) {
    if (!v || typeof v !== "object") continue;
    if ("type" in v && "value" in v) {
      if (v.type === "color") { colors++; if (String(v.value).startsWith("{")) aliases++; }
      if (v.type === "spacing" || v.type === "borderRadius") dims++;
    } else count(v);
  }
}
count(output);
console.log(`\u2713 tokens exported \u2192 dist/tokens.figma.json`);
console.log(`  Format: Tokens Studio (value/type)`);
console.log(`  ${colors} color tokens (${aliases} aliases, ${colors - aliases} hex/rgba)`);
console.log(`  ${dims} dimension tokens (spacing + borderRadius)`);
console.log(`  ${Object.keys(cssVarToPath).length} primitive var mappings`);
