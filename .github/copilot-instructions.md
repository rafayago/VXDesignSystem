# Copilot Instructions — Design System Foundation

You are working in a modern TypeScript React codebase.

Your job is to design and maintain a scalable, accessible, production-ready Design System using:

- Tailwind CSS v4.2.2
- shadcn/ui (latest stable) with Base UI (`@base-ui/react`) as the headless primitive foundation
- Local headless primitives and composed components in `packages/ui`
- Tabler Icons (`@tabler/icons-react`) for all iconography
- Custom design tokens
- TypeScript in strict mode
- Modern React patterns
- Best practices from the latest official library patterns and APIs

## Core goals

Build a design system that is:

- Accessible by default
- Token-driven
- Composable
- Type-safe
- Easy to extend
- Consistent across components
- Performance-conscious
- Compatible with dark mode
- Suitable for application-scale usage, not just marketing pages

## Non-negotiable standards

- Always prefer TypeScript.
- Use TypeScript strict mode if possible; assume strict mode is enabled unless the repo explicitly prevents it.
- Prefer server-safe, framework-safe patterns and avoid brittle client-only assumptions.
- Respect existing project conventions when they are already good.
- If the current structure is weak, propose and implement improvements that increase consistency, performance, maintainability, accessibility, and correctness.
- Never generate throwaway or demo-quality code unless explicitly requested.
- Never duplicate design tokens, variants, or accessibility logic across components.
- Never hardcode colors, spacing, radius, shadows, or typography values inside components when a token should exist.
- Never introduce components that conflict in responsibility between local Base UI primitives and composed shadcn-style components.

## Library responsibility rules

### shadcn/ui

Use shadcn/ui as the default base for:

- common UI building blocks
- form controls
- overlays
- layout primitives
- feedback components
- command/menu/dialog/popover/sheet/table patterns
- components that benefit from the shadcn + Base UI + Tailwind ecosystem

Because shadcn/ui gives actual source code, prefer customizing and extending those components inside the local codebase instead of wrapping them excessively.

### Base UI and Local Headless Primitives

Use Base UI and local headless primitives when unstyled behavior is specifically beneficial, such as:

- Combobox
- Listbox
- Menu
- Dialog
- Disclosure
- Popover
- RadioGroup
- Switch
- Tabs
- Select and combobox behavior
- Menu and popover positioning

Do not add `@headlessui/react` nor any other external headless UI library to this project unless the dependency is explicitly introduced and there is a strong architectural reason. The intent here is to build a local headless layer, not depend on that separate library.

Prefer implementing shared unstyled behavior in `packages/ui/src/primitives` and shared shadcn or custom styled components in `packages/ui/src/components`.

### Decision rule

If both libraries could solve the problem, prefer:

1. existing local design-system primitive
2. existing local shadcn or custom styled component already adopted in the repo
3. Base UI when a truly headless pattern or custom rendering need exists

Always avoid having two competing implementations for the same component category unless there is a documented reason.

## Tailwind CSS v4 rules

- Use Tailwind CSS v4 CSS-first conventions.
- Prefer `@theme` tokens and CSS variables as the foundation of theming.
- Keep tokens semantic and reusable.
- Use utility classes in component markup, but avoid unreadable class bloat.
- Extract repeated variant logic with `cva` or equivalent variant helpers when appropriate.
- Prefer data-attribute driven styling, especially for component states.
- Use modern Tailwind v4 capabilities where helpful, including:
  - `@theme`
  - custom variants when needed
  - container queries
  - modern state selectors
  - dark mode tokenization via CSS variables
- Do not fall back to outdated Tailwind v3-style config patterns unless the project still depends on them.

## Token system requirements

Create and maintain a clear token architecture.

### Token layers

Use a token model similar to:

1. Primitive tokens

- raw scales and foundations
- colors, spacing, radius, shadows, typography, motion, z-index

2. Semantic tokens

- background
- foreground
- muted
- accent
- border
- input
- ring
- destructive
- success
- warning
- chart colors if needed

3. Component tokens when necessary

- component-specific variables only when semantic tokens are insufficient

### Token rules

- Tokens must support light and dark themes.
- Prefer OKLCH when defining color values if the stack supports it well.
- Expose core tokens as CSS variables.
- Keep naming semantic, not brand-coupled unless explicitly required.
- Preserve shadcn/ui compatibility where useful, especially around expected token names.
- Typography, radius, shadow, and spacing must also come from tokens.

### Avoid

- hardcoded hex values inside components
- one-off spacing values
- arbitrary shadow duplication
- inconsistent naming like `primary2`, `gray-darker`, `blue-soft-final`

## TypeScript rules

- Use strict typing throughout.
- Avoid `any`.
- Prefer discriminated unions, generics, and utility types when they improve correctness.
- Export explicit prop types for reusable public components.
- Type refs correctly with `React.ElementRef` and `React.ComponentPropsWithoutRef` or the equivalent modern patterns.
- Type polymorphic APIs carefully; do not over-engineer them.
- Ensure variant props are inferred cleanly when using `class-variance-authority`.

## Accessibility rules

Every component must be accessible by default.

- Use semantic HTML first.
- Preserve keyboard navigation.
- Preserve visible focus states.
- Support screen readers with correct labels, descriptions, and ARIA only where needed.
- Ensure color contrast is acceptable in both light and dark themes.
- Respect reduced motion preferences.
- Ensure disabled, invalid, loading, selected, checked, and expanded states are represented accessibly.
- Prefer battle-tested accessibility primitives from Base UI and existing local components instead of rebuilding interaction logic from scratch.

## Component architecture

Build components in layers:

1. tokens
2. low-level primitives
3. composed UI components
4. patterns/recipes
5. application usage

### Preferred structure

Use or evolve the project toward a structure like:

```txt
src/
  components/
    ui/
      button.tsx
      input.tsx
      dialog.tsx
      ...
    primitives/
      dialog.tsx
      menu.tsx
      popover.tsx
      select.tsx
      tabs.tsx
      ...
    patterns/
      form-field.tsx
      page-header.tsx
      empty-state.tsx
      ...
  design-system/
    tokens/
      colors.css
      typography.css
      spacing.css
      motion.css
      index.css
    styles/
      globals.css
      utilities.css
    config/
      component-registry.ts
    docs/
      component-guidelines.md
  lib/
    utils.ts
    cn.ts
    a11y.ts
  hooks/
  types/
```
