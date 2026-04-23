# Build Design System Page with Form

You are building a new page for the VX Design System, following strict design system conventions.

## Core Constraints

- **Framework**: Next.js 15+ (App Router) with TypeScript strict mode
- **UI Library**: @vortx/ui (shadcn/ui + Base UI + custom primitives)
- **Styling**: Tailwind CSS v4 with design tokens (CSS variables)
- **Icons**: @tabler/icons-react only
- **Accessibility**: WCAG 2.1 AA compliant; semantic HTML; keyboard navigation
- **No external dependencies** unless explicitly approved

## When to Use This Prompt

Use this prompt when:

- Building a new authenticated/public page in `/admin` or `/apps`
- Creating forms with validation and error states
- Implementing authentication UI (login, signup, password reset)
- Building dashboard or settings pages with forms
- Ensuring consistency with existing design system patterns

## What This Prompt Provides

When you request to build a page using this prompt, you'll receive:

1. **Type-safe component structure** using the @vortx/ui component library
2. **Form handling** with built-in validation patterns
3. **Design token compliance** (colors, spacing, radius from CSS variables)
4. **Dark mode support** out of the box
5. **Accessibility features** (labels, ARIA, focus management)
6. **Tailwind utility classes** following v4 conventions
7. **File organization** matching project structure
8. **TypeScript interfaces** for all props and state

## Page Building Checklist

When implementing a page, follow this sequence:

### 1. Setup Page Structure
- Create page directory under `/apps/{app}/app/{feature}/`
- Add `page.tsx` for route component
- Add `layout.tsx` if sub-layout needed
- Keep components colocated in same directory or `/components/`

### 2. Use Design System Components
- Import from `@vortx/ui`
- Available components: Button, Input, Label, Card, Dialog, Form, Textarea, Checkbox, RadioGroup, Select, Combobox, Tabs, etc.
- Each component is Base UI-backed and token-driven

### 3. Apply Design Tokens
- Use CSS variables: `--background`, `--foreground`, `--primary`, `--destructive`, `--border`, `--input`, `--ring`, `--radius`, etc.
- Reference in classes: `bg-[var(--background)]`, `text-[var(--foreground)]`, `border-[var(--border)]`
- Dark mode auto-handled by theme provider in layout

### 4. Implement Accessibility
- Use semantic HTML (`<form>`, `<fieldset>`, `<legend>`)
- Label all inputs with `<Label>` component
- Use `aria-invalid`, `aria-describedby` for errors
- Ensure keyboard navigation works
- Maintain focus indicators (provided by design tokens)
- Test with screen readers if complex interaction

### 5. Handle Forms
- Use the `<Form>` component for complex forms
- Structure: Label → Input/Control → Helper text/Error
- Implement client-side validation
- Show inline validation errors
- Disable submit button during loading
- Provide success/error feedback

### 6. Follow Tailwind v4 Patterns
- Use utility classes for layout: `flex`, `grid`, `gap-*`, `p-*`, `m-*`
- Use semantic spacing from scale: `gap-4`, `p-6`, `mb-2`
- Avoid arbitrary values (`w-[234px]`) unless truly needed
- Use data-attributes for state styling: `data-[state=open]:`
- Prefer composable patterns over one-off styles

## Example Patterns

### Login Form Page
```
/admin/app/login/page.tsx
- Card container with max-width
- Email input + Password input
- "Remember me" checkbox
- Submit button (disabled while loading)
- Error alert
- "Forgot password?" link
```

### Settings Form Page
```
/admin/app/settings/page.tsx
- Form sections in Tabs or separate Cards
- Each section has related fields
- Save/Cancel button pattern
- Success toast on save
- Field-level validation feedback
```

## Available Components Reference

Core form components:
- `Button` – With size, variant, loading states
- `Input` – With error state, placeholder, disabled
- `Label` – Always pair with inputs
- `Textarea` – For multi-line text
- `Checkbox` – With label integration
- `RadioGroup` – For exclusive selection
- `Select` – Headless select dropdown
- `Combobox` – Searchable select
- `Card` – Container with optional header, footer
- `Alert` – For status messages
- `Dialog` – Modal overlays
- `Form` – Wrapper for complex forms

## Command Examples

### Build a login page
```
@copilot build a login page with email and password inputs at /admin/app/login
```

### Build a settings form
```
@copilot build a settings page with profile form at /admin/app/settings/profile
```

### Add a modal form
```
@copilot add a password reset dialog component
```

## Notes

- All generated code follows TypeScript strict mode
- Components are fully typed with React.FC and proper prop interfaces
- Forms include proper error handling and loading states
- Dark mode is automatic via theme provider
- No hardcoded colors or spacing values in components
- All icons use Tabler Icons via `@tabler/icons-react`
- Accessibility is built in, not bolted on
