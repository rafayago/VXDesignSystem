# Claude Instructions — Reusable Design System for Next.js

You are building and maintaining a production-grade Design System for a modern React/Next.js codebase.

## Critical clarification

When I say **headless UI**, I mean the **architectural approach**, not the library.

Headless UI in this project means:

- separation of behavior and presentation where useful
- composable primitives
- token-driven styling
- reusable component anatomy
- flexible and portable abstractions
- a system that can later map clearly to Figma

### Absolute rule

- Do **not** use `@headlessui/react`
- Do **not** add Headless UI React as a dependency
- Do **not** use Headless UI React components
- Do **not** confuse “headless UI” with “the Headless UI library”

## Primary stack

Build the design system primarily around:

- **Next.js-first architecture**
- **React**
- **TypeScript only**
- **TypeScript strict mode**
- **Tailwind CSS v4.2.2**
- **shadcn/ui**
- **Base UI primitives instead of Radix**
- **Tabler Icons instead of Lucide**
- **custom design tokens**
- **Storybook in `/docs` for preview, documentation, and distribution support**

## Core intent

This system must be:

- reusable across multiple products
- independent from product-specific business logic
- optimized mainly for **Next.js projects**
- scalable
- accessible
- secure
- token-driven
- maintainable long term
- clearly documented
- aligned with future **Figma parity**

The long-term goal is that:

- this same design system will later be recreated in **Figma**
- prototypes created in Figma should be reversible into code using this system
- token names, component names, anatomy, variants, spacing, typography, hierarchy, and interaction states must stay systematic and stable

## Main implementation rule

The design system foundation must be:

1. **Tailwind CSS v4 theme variables and tokens**
2. **shadcn/ui as the base component layer**
3. **Base UI as the primitive foundation instead of Radix**
4. **custom internal abstractions and patterns on top**

Base UI is specifically designed as an unstyled accessible React foundation for building design systems, which matches this project well. shadcn now also supports and documents Base UI implementations. [web:20][web:19][web:23]

## Primitive and icon rules

### Base UI instead of Radix

- Prefer **Base UI** primitives for the underlying interactive foundation
- Do **not** default to Radix-based implementations if a Base UI approach is intended
- If a shadcn component can be implemented with Base UI primitives, prefer that path
- Keep the primitive layer internal, reusable, and design-system oriented

### Tabler Icons instead of Lucide

- Use **`@tabler/icons-react`**
- Do **not** use Lucide icons
- Keep icon usage consistent across the system
- Wrap icons in a local icon abstraction if that improves consistency
- Normalize icon size, stroke, alignment, and accessibility behavior through internal patterns

Tabler’s React package is tree-shakeable and supports direct component imports with size, color, and stroke props, which is suitable for a shared icon system. [web:21][web:24][web:27]

## Component policy

### Use shadcn/ui for:

- core UI components
- form controls
- overlays
- navigation elements
- feedback elements
- shell-level app UI
- reusable product-grade building blocks

Treat shadcn/ui as **owned local code**, not as a black box. It should be adapted to the system’s token model, naming rules, and standards. shadcn’s model is local ownership and customization of copied components, which fits this approach. [web:1][web:19]

### Use blocks only for:

- more complex grouped components
- composed product patterns
- opinionated UI assemblies
- sections or advanced use cases such as:
  - auth panels
  - settings layouts
  - dashboard summary groups
  - command surfaces
  - filter toolbars
  - empty states
  - onboarding panels
  - advanced forms
  - page headers
  - app shell compositions

### Block restriction

- Blocks must be built **from internal primitives and core UI components**
- Blocks must **not** become the design-system foundation
- Do **not** depend on external block kits or third-party marketplace snippets as architecture

## No unnecessary dependencies

Keep the design system independent and portable.

### Do not add external libraries or APIs unless explicitly approved.

Especially avoid:

- TanStack libraries
- external data table libraries
- external form ecosystems by default
- heavy animation libraries
- charting libraries unless explicitly required
- client state libraries unless clearly justified
- helper packages that duplicate native React, Next.js, Tailwind, Base UI, or shadcn functionality

### Preferred approach

Use:

- native browser capabilities
- React-native patterns
- Next.js-native patterns
- Tailwind v4 theme/token architecture
- internal utilities only when genuinely justified

If it can be built cleanly without another dependency, do not add the dependency.

## TypeScript rules

TypeScript is mandatory.

### Absolute requirements

- Use **TypeScript only**
- Assume **strict mode is enabled**
- Prefer strict, explicit, safe types everywhere
- No JavaScript source files for the design system unless tooling absolutely requires it
- Avoid `any`
- Avoid weak typing for convenience
- Type all public component props
- Type refs correctly
- Type event handlers correctly
- Type controlled and uncontrolled APIs correctly
- Type variants and utility functions correctly
- Use generics, unions, and utility types where they improve correctness

### Goal

TypeScript must act as **code safety and maintenance insurance** for the system.

## Tailwind CSS v4 rules

Use the latest **Tailwind CSS v4** approach.

### Requirements

- Use CSS-first Tailwind architecture
- Use `@theme`
- Use CSS variables as the token backbone
- Prefer semantic tokens over raw utility values in reusable components
- Support dark mode with semantic tokens
- Keep token naming stable and portable
- Avoid outdated Tailwind v3 habits unless forced by existing project constraints

Tailwind v4’s theme-variable approach is especially appropriate for a reusable tokenized design system. [web:16]

## Token architecture

Build a layered token system.

### Layer 1 — primitive tokens

- raw color scales
- typography scale
- spacing scale
- radius scale
- shadows
- motion values
- z-index values
- opacity values

### Layer 2 — semantic tokens

- background
- foreground
- surface
- surface-foreground
- card
- popover
- muted
- accent
- border
- input
- ring
- primary
- secondary
- destructive
- success
- warning
- info
- focus
- disabled
- selected

### Layer 3 — component tokens

Use only when semantic tokens are not enough.

### Token rules

- No hardcoded colors, spacing, radius, or shadow values inside reusable components
- No magic values unless clearly justified
- Use stable, human-readable naming
- Token naming must be suitable for future mapping into **Figma variables**
- Variant names must also be stable enough for later Figma component sets

## Headless architecture rules

This system should be **headless by architecture**.

That means:

- separate behavior from presentation when it improves reuse
- create composable primitives
- support flexible rendering without breaking component anatomy
- keep visual treatment token-based
- separate app logic from design-system logic
- keep business rules outside foundational components

Possible internal layering:

- behavior hooks
- primitives
- visual wrappers
- composed UI components
- blocks

Do not over-abstract for no reason.

## Next.js-first rules

This design system is mainly for **Next.js**.

### Therefore:

- prefer App Router-compatible patterns
- minimize unnecessary client components
- isolate client-only behavior carefully
- be mindful of Server vs Client boundaries
- avoid browser-only assumptions in shared components
- make shared components SSR-safe where possible
- mark client components only when needed
- keep imports and APIs clean for Next.js apps

At the same time, keep the system reasonably portable to other React projects.

## Security and integration rules

Use best practices for:

- security
- maintainability
- integrations
- predictable APIs

### Security expectations

- avoid unsafe HTML rendering unless explicitly required and sanitized
- avoid patterns that introduce XSS risk
- avoid unsafe URL handling
- constrain component APIs to predictable safe behavior
- avoid overly permissive polymorphism unless truly needed
- keep public interfaces narrow and intentional

### Integration expectations

- components should integrate cleanly with forms, auth flows, CMS-driven UIs, dashboards, and product shells
- avoid coupling components to one app’s business logic
- design APIs for reuse across multiple projects
- keep adapters thin and local when integrations are needed

## Clean codebase requirements

Maintain a clean, stable, scalable codebase.

### Rules

- use a consistent file and naming structure
- remove dead code
- avoid duplicate components
- avoid duplicate token definitions
- avoid duplicate variant logic
- keep files focused
- split oversized components
- keep utilities small and justified
- prefer composition over inheritance
- prefer clarity over cleverness
- prefer explicit code over hidden magic

## Suggested structure

Use a structure close to this unless the repository already has a better one:

```txt
src/
  components/
    primitives/
      box.tsx
      stack.tsx
      inline.tsx
      text.tsx
      heading.tsx
      surface.tsx
      icon.tsx
    ui/
      button.tsx
      badge.tsx
      input.tsx
      textarea.tsx
      select.tsx
      checkbox.tsx
      radio-group.tsx
      switch.tsx
      dialog.tsx
      drawer.tsx
      popover.tsx
      tooltip.tsx
      tabs.tsx
      card.tsx
      form.tsx
    blocks/
      auth/
      settings/
      dashboard/
      navigation/
      forms/
      feedback/
      shells/
    providers/
      theme-provider.tsx
  design-system/
    tokens/
      primitive.css
      semantic.css
      typography.css
      spacing.css
      radius.css
      shadow.css
      motion.css
      index.css
    themes/
      light.css
      dark.css
    types/
    constants/
    docs/
  lib/
    cn.ts
    utils.ts
    a11y.ts
  hooks/
  styles/
    globals.css
docs/
  storybook/
README.md
```
