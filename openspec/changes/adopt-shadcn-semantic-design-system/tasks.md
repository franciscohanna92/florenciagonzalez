## 1. Establish the Semantic Theme

- [x] 1.1 Read the relevant bundled Next.js 16 styling, font, and App Router guidance before changing application code.
- [x] 1.2 Reconcile `src/app/globals.css` with the warm semantic mapping for background, foreground, card, popover, primary, secondary, muted, accent, border, input, and ring roles.
- [x] 1.3 Add and register paired `brand` and `brand-foreground` variables for the editorial olive surface while preserving necessary global base, selection, scroll, and focus behavior.
- [x] 1.4 Map Manrope and Cormorant Garamond to `font-sans` and `font-heading` in the root layout, removing unused preset font imports and the deleted display-font contract.

## 2. Migrate Application Tokens

- [x] 2.1 Replace supporting-text uses of `text-muted` with `text-muted-foreground` across routes and shared components.
- [x] 2.2 Replace legacy surface, accent, and inverse-text utilities with `background`, `card`, `primary`, `accent`, and their paired foreground roles according to context.
- [x] 2.3 Replace the olive contact surface with `brand` and `brand-foreground`, including its child text, border, and action states.
- [x] 2.4 Replace all `font-[var(--display)]` uses with `font-heading` and confirm body content inherits the sans role.

## 3. Consolidate shadcn Primitives

- [x] 3.1 Inspect the current shadcn documentation and installed source for Button, Field, Input, NativeSelect, Textarea, Badge, and Separator before modifying their consumers.
- [x] 3.2 Migrate internal and external button-style links to real Next.js Link or anchor elements styled with `buttonVariants`, preserving native link semantics.
- [x] 3.3 Migrate native button actions, including the mobile navigation trigger, to the shared Button with appropriate built-in variants and sizes.
- [x] 3.4 Remove the duplicate `src/components/button.tsx` abstraction after all imports and call sites use the shared shadcn Button.
- [x] 3.5 Recompose the contact form with FieldGroup, Field, FieldLabel, Input, NativeSelect, NativeSelectOption, and Textarea while preserving every field name, label, option, and the WhatsApp action.
- [x] 3.6 Replace compact status or category labels and interface dividers with Badge or Separator where those primitives semantically match, while retaining native document and layout markup elsewhere.

## 4. Verify Migration Completeness

- [x] 4.1 Scan active application code and remove remaining references to `surface`, `surface-strong`, `accent-strong`, `accent-soft`, `olive`, `text-muted`, and `var(--display)` legacy utilities.
- [x] 4.2 Scan public application code for raw button, input, textarea, and select implementations and confirm any remaining native controls are intentional exceptions rather than duplicate primitives.
- [x] 4.3 Format the touched files and run the repository lint, type-check, and production build commands without browser automation.
- [x] 4.4 Run strict OpenSpec validation and confirm all existing public routes, Spanish content, project data, and static WhatsApp behavior remain represented by the implementation.

## 5. Enforce Square Geometry

- [x] 5.1 Set the shadcn base radius and Tailwind radius theme tokens to zero, with a global elements-and-pseudo-elements safeguard for hard-coded radii.
- [x] 5.2 Replace application-owned rounded utilities on images, cards, captions, and forms with `rounded-none`.
- [x] 5.3 Format and verify the zero-radius change with TypeScript, production build, and strict OpenSpec validation without browser automation.
