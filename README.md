# VX Design System Template

Framework-agnostic design system starter for multiple Next.js 16 applications.

This repository is organized so the source of truth is shared packages, not an app:

- `@vortx/design-tokens`: CSS-first tokens, semantic theme mapping, Tailwind v4 `@theme` exports.
- `@vortx/ui`: reusable React primitives and wrappers that consume semantic tokens.
- `apps/docs`: documentation and visual QA playground.
- `apps/web` and `apps/admin`: example consuming applications.

## Monorepo Structure

```txt
.
├─ apps/
│  ├─ docs/
│  ├─ web/
│  └─ admin/
├─ packages/
│  ├─ design-tokens/
│  ├─ ui/
│  ├─ eslint-config/
│  └─ typescript-config/
├─ package.json
└─ turbo.json
```

## Design Principles

- Tokens are framework-agnostic and CSS-based.
- Semantic names are the contract (`background`, `foreground`, `primary`, `ring`, `chart-*`).
- Components depend on semantics, not literal color values.
- Apps import packages; packages never import app code.

## Token Layers

`packages/design-tokens/src/index.css` includes:

- Base and semantic variables in `:root` and `.dark`
- Tailwind v4 `@theme inline` mappings so semantic utilities are generated
- Shared radius and chart tokens

Additional files:

- `src/themes/gray.css`: gray-primary theme overrides
- `src/themes/gray-vega.css`: Vega-like chart palette overrides
- `src/typography.css`, `src/motion.css`, `src/charts.css`: supporting token groups

## UI Package

`packages/ui` exports:

- `Button` and `Card` components (token-driven styles)
- Primitive set: `AppDialog`, `Popover`, `Menu`, `Select`, `Tabs`, `Tooltip`
- `cn()` utility based on `clsx` + `tailwind-merge`

This keeps behavior and visual semantics reusable across app boundaries.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Run all dev servers (Turbo parallel):

```bash
npm run dev
```

3. Run only docs app:

```bash
npm run dev --workspace=@vortx/docs
```

4. Run Storybook visual QA for docs:

```bash
npm run storybook --workspace=@vortx/docs
```

## How Apps Consume Tokens

Each app imports shared CSS in `app/globals.css`:

```css
@import "@vortx/design-tokens/styles.css";
@import "@vortx/design-tokens/themes/gray";
@import "@vortx/design-tokens/themes/gray-vega";
```

Apps can then use semantic utilities such as:

- `bg-background`
- `text-foreground`
- `border-border`
- `bg-primary`
- `text-muted-foreground`

## Suggested Next Steps

1. Add Storybook or visual snapshot tests to `apps/docs`.
2. Expand `packages/ui/src/primitives` with popover, menu, select, tabs, and tooltip.
3. Add a chart adapter that maps `--chart-1` to `--chart-5` into a Vega theme object.
4. Add lint and formatting rules in `packages/eslint-config` and root scripts.
