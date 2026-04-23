/**
 * Exports design tokens to Figma Variables REST API format.
 *
 * Usage:  node scripts/export-tokens.mjs
 * Output: dist/tokens.figma.json
 *
 * Import via Figma REST API:
 *   POST https://api.figma.com/v1/files/:file_key/variables
 *   Headers: X-Figma-Token: <your_personal_access_token>
 *   Body: contents of dist/tokens.figma.json
 *
 * Docs: https://developers.figma.com/docs/rest-api/variables/
 */

import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC  = join(ROOT, "src");

// ─── Stable temporary IDs (scoped to this request) ──────────────────────────

const COL_PRIMITIVE = "collection/primitives";
const COL_SEMANTIC  = "collection/semantic";
const MODE_DEFAULT  = "mode/default";
const MODE_LIGHT    = "mode/light";
const MODE_DARK     = "mode/dark";

// ─── oklch → Figma RGBA { r, g, b, a }  (all values 0–1) ───────────────────

function r4(n) { return Math.round(n * 10000) / 10000; }

function oklchToFigmaColor(l, c, h, alpha = 1) {
  const rad = (h * Math.PI) / 180;
  const a_  = c * Math.cos(rad);
  const b_  = c * Math.sin(rad);
  const l_  = l + 0.3963377774 * a_ + 0.2158037573 * b_;
  const m_  = l - 0.1055613458 * a_ - 0.0638541728 * b_;
  const s_  = l - 0.0894841775 * a_ - 1.291485548  * b_;
  const lc = l_ ** 3, mc = m_ ** 3, sc = s_ ** 3;
  const lr =  4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
  const lg = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
  const lb = -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701  * sc;
  // sRGB transfer function (gamma encode)
  const srgb = (x) => {
    const v = Math.max(0, Math.min(1, x));
    return v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
  };
  return { r: r4(srgb(lr)), g: r4(srgb(lg)), b: r4(srgb(lb)), a: r4(alpha) };
}

function parseCssColorToFigma(value) {
  // oklch(L C H) or oklch(L C H / A%)
  const ok = value.match(
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+)(%?))?\s*\)/i,
  );
  if (ok) {
    const alpha = ok[4] !== undefined
      ? (ok[5] === "%" ? parseFloat(ok[4]) / 100 : parseFloat(ok[4]))
      : 1;
    return oklchToFigmaColor(parseFloat(ok[1]), parseFloat(ok[2]), parseFloat(ok[3]), alpha);
  }
  // #RRGGBB or #RRGGBBAA
  const hex = value.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i);
  if (hex) {
    return {
      r: r4(parseInt(hex[1], 16) / 255),
      g: r4(parseInt(hex[2], 16) / 255),
      b: r4(parseInt(hex[3], 16) / 255),
      a: hex[4] ? r4(parseInt(hex[4], 16) / 255) : 1,
    };
  }
  return null;
}

// ─── CSS parser ──────────────────────────────────────────────────────────────
// Extract all --name: value; declarations regardless of selector / at-rule context.
// NOTE: intentionally does NOT strip @theme blocks — globals.css uses @theme.

function parseCssProps(css) {
  const result = {};
  const re = /--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(css)) !== null) result[m[1].trim()] = m[2].trim();
  return result;
}

function read(p) { return readFileSync(p, "utf8"); }

function remToPx(value) {
  const n = parseFloat(value);
  if (isNaN(n)) return null;
  if (value.endsWith("px"))  return n;
  if (value.endsWith("rem")) return r4(n * 16);
  return null;
}

// ─── Load CSS sources ────────────────────────────────────────────────────────

const primitiveProps = parseCssProps(read(join(SRC, "tokens/primitive.css")));
const spacingProps   = parseCssProps(read(join(SRC, "tokens/spacing.css")));
const radiusProps    = parseCssProps(read(join(SRC, "tokens/radius.css")));
const globalsProps   = parseCssProps(read(join(SRC, "themes/globals.css")));
const lightProps     = parseCssProps(read(join(SRC, "themes/light.css")));
const darkProps      = parseCssProps(read(join(SRC, "themes/dark.css")));

const CSS_SKIP = new Set(["transparent", "currentcolor", "inherit", "initial", "unset"]);

// ─── Variable registry ───────────────────────────────────────────────────────

// Maps CSS var name (without --) → Figma variable id, for alias resolution
const cssVarToFigmaId = {};
const variables = [];

function addVariable(cssVarName, figmaName, collectionId, resolvedType, valuesByMode) {
  const id = `var/${figmaName}`;
  if (cssVarName) cssVarToFigmaId[cssVarName] = id;
  variables.push({
    action: "CREATE",
    id,
    name: figmaName,
    variableCollectionId: collectionId,
    resolvedType,
    valuesByMode,
  });
  return id;
}

// ─── Primitives: raw color scale ─────────────────────────────────────────────
// Source: tokens/primitive.css  (gray, status, chart, white, black)

for (const [k, v] of Object.entries(primitiveProps)) {
  if (CSS_SKIP.has(v.toLowerCase()) || v.startsWith("var(")) continue;
  const color = parseCssColorToFigma(v);
  if (!color) continue;
  // gray-50 → color/gray/50,  white → color/white,  chart-orange → color/chart/orange
  addVariable(k, `color/${k.replace(/-/g, "/")}`, COL_PRIMITIVE, "COLOR", {
    [MODE_DEFAULT]: color,
  });
}

// ─── Primitives: brand palette ───────────────────────────────────────────────
// Source: themes/globals.css  (color-vtxnavy-*, color-blue-*, color-vtxteal-*)
// Only raw oklch values — skip var() references (those are Tailwind utility aliases).

for (const [k, v] of Object.entries(globalsProps)) {
  if (!k.startsWith("color-")) continue;
  if (CSS_SKIP.has(v.toLowerCase()) || v.startsWith("var(")) continue;
  const color = parseCssColorToFigma(v);
  if (!color) continue;
  // color-vtxnavy-50 → color/vtxnavy/50  (strip "color-" prefix)
  const figmaName = `color/${k.replace(/^color-/, "").replace(/-/g, "/")}`;
  addVariable(k, figmaName, COL_PRIMITIVE, "COLOR", { [MODE_DEFAULT]: color });
}

// ─── Primitives: spacing ─────────────────────────────────────────────────────

for (const [k, v] of Object.entries(spacingProps)) {
  const px = remToPx(v);
  if (px === null) continue;
  addVariable(k, `spacing/${k.replace(/^space-/, "")}`, COL_PRIMITIVE, "FLOAT", {
    [MODE_DEFAULT]: px,
  });
}

// ─── Primitives: radius ───────────────────────────────────────────────────────

for (const [k, v] of Object.entries(radiusProps)) {
  const px = remToPx(v);
  if (px === null) continue;
  addVariable(k, `radius/${k.replace(/^radius-/, "")}`, COL_PRIMITIVE, "FLOAT", {
    [MODE_DEFAULT]: px,
  });
}

// ─── Semantic layer (Light + Dark modes) ─────────────────────────────────────
// Semantic tokens reference primitives via var(). Resolved as VARIABLE_ALIAS.
// --radius is a computed sizing helper used by Tailwind @theme, not a semantic color.

const SKIP_SEMANTIC = new Set(["radius"]);

function resolveSemanticValue(cssVarName, rawValue) {
  if (!rawValue) return null;
  const ref = rawValue.match(/^var\(--([a-zA-Z0-9_-]+)\)$/);
  if (ref) {
    const primitiveId = cssVarToFigmaId[ref[1]];
    if (primitiveId) return { type: "VARIABLE_ALIAS", id: primitiveId };
    console.warn(`  ⚠  unresolved var(--${ref[1]}) in --${cssVarName}`);
    return null;
  }
  return parseCssColorToFigma(rawValue);
}

const allSemanticKeys = new Set([...Object.keys(lightProps), ...Object.keys(darkProps)]);

for (const k of allSemanticKeys) {
  if (SKIP_SEMANTIC.has(k)) continue;

  const lightResolved = resolveSemanticValue(k, lightProps[k]);
  // Fall back to light value when dark doesn't define the token
  const darkResolved  = resolveSemanticValue(k, darkProps[k] ?? lightProps[k]);
  if (!lightResolved) continue;

  const valuesByMode = { [MODE_LIGHT]: lightResolved };
  if (darkResolved) valuesByMode[MODE_DARK] = darkResolved;

  // card-foreground → card/foreground
  addVariable(null, k.replace(/-/g, "/"), COL_SEMANTIC, "COLOR", valuesByMode);
}

// ─── Assemble output ──────────────────────────────────────────────────────────

const output = {
  variableCollections: [
    {
      action: "CREATE",
      id: COL_PRIMITIVE,
      name: "Primitives",
      defaultModeId: MODE_DEFAULT,
      modes: [{ id: MODE_DEFAULT, name: "Default" }],
    },
    {
      action: "CREATE",
      id: COL_SEMANTIC,
      name: "Semantic",
      defaultModeId: MODE_LIGHT,
      modes: [
        { id: MODE_LIGHT, name: "Light" },
        { id: MODE_DARK,  name: "Dark" },
      ],
    },
  ],
  variables,
  variableModeValues: [],
};

const distDir = join(ROOT, "dist");
mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, "tokens.figma.json"), JSON.stringify(output, null, 2), "utf8");

// ─── Stats ───────────────────────────────────────────────────────────────────

const byCol = {};
let aliasCount = 0;
for (const v of variables) {
  byCol[v.variableCollectionId] = (byCol[v.variableCollectionId] ?? 0) + 1;
  if (Object.values(v.valuesByMode).some((val) => val?.type === "VARIABLE_ALIAS")) aliasCount++;
}

console.log("✓ tokens exported → dist/tokens.figma.json");
console.log("  Format : Figma Variables REST API");
console.log(`  POST   : https://api.figma.com/v1/files/<file_key>/variables`);
console.log(`  Total  : ${variables.length} variables`);
console.log(`  Primitives : ${byCol[COL_PRIMITIVE] ?? 0} (${Object.keys(cssVarToFigmaId).length} CSS var mappings)`);
console.log(`  Semantic   : ${byCol[COL_SEMANTIC] ?? 0} (${aliasCount} aliases, rest are raw colors)`);
