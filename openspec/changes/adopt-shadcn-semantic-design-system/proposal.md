## Why

The shadcn component library is installed, but the portfolio still mixes custom controls and legacy color utilities with the new semantic theme. Several legacy utilities now resolve incorrectly or reference removed tokens, so the site needs one coherent component and token contract before further UI work.

## What Changes

- Make installed shadcn components the default primitives for buttons, form controls, badges, separators, cards, and other matching interface patterns.
- Replace legacy color-role utilities with shadcn semantic tokens such as `background`, `foreground`, `card`, `muted-foreground`, `primary`, `accent`, `border`, `input`, and `ring`.
- Remap the existing warm editorial palette onto semantic variables so adopting shadcn does not replace the portfolio's brand direction with raw preset colors.
- Introduce a paired custom brand-surface token only where the standard shadcn roles cannot represent the olive editorial callout surface without changing action semantics.
- Consolidate the duplicate custom button abstraction into the installed shadcn button and its supported link composition pattern.
- Recompose the contact form with shadcn field and control components while preserving its current fields, content, accessibility, and non-submitting behavior.
- Align typography utilities with the installed semantic font tokens and remove references to deleted font variables.
- Enforce zero border radius across page surfaces, images, controls, overlays, and installed components.
- Preserve the site's existing routes, content, responsive behavior, and restrained architecture-focused visual language.

## Capabilities

### New Capabilities

- `semantic-design-system`: Defines semantic theme roles, shadcn component reuse, brand-token extension rules, accessible form composition, and migration constraints for the public portfolio UI.

### Modified Capabilities

None.

## Impact

- Affects `src/app/globals.css`, the root font setup, shared presentational components, public route markup, and the installed files under `src/components/ui` where a deliberate variant is required.
- Replaces usage of the custom `src/components/button.tsx` abstraction and raw contact-form controls with installed shadcn primitives.
- Uses the existing shadcn, Base UI, Tailwind CSS 4, and icon dependencies; no additional runtime dependency is expected.
- Changes UI implementation and theme contracts without changing public routes, content data, or adding form submission.
