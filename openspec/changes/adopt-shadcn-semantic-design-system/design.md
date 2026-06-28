## Context

The portfolio currently has two overlapping UI systems. The original implementation uses a custom warm palette (`surface`, `accent-strong`, `olive`, and related utilities), a custom Button that handles links, raw contact-form controls, and a `--display` font variable. The installed shadcn `base-sera` setup introduces Base UI primitives, Tailwind CSS 4 semantic variables, component variants, and `font-sans`/`font-heading` roles, while replacing the global stylesheet that defined several values still used by the application.

This leaves active failure modes: `text-muted` now points at a background role rather than secondary text, removed utilities no longer resolve, and headings reference a deleted font variable. The migration must consolidate the systems without turning the portfolio into a generic preset or changing its routes and content. The project uses Next.js 16 App Router with React Server Components by default, Base UI composition, and the `@/components/ui` alias.

## Goals / Non-Goals

**Goals:**

- Establish one semantic color and typography contract for application and shadcn components.
- Preserve the existing warm editorial palette by mapping it to meaningful roles.
- Make installed shadcn primitives the default for matching controls and interface patterns.
- Remove the duplicate custom button and migrate button-style links using Base UI's supported composition API.
- Recompose the contact form with shared, accessible field primitives without introducing client state or backend submission.
- Enforce square geometry across application media and component primitives.
- Remove all active references to superseded tokens and verify the application statically.

**Non-Goals:**

- Redesigning page structure, copy, project data, or navigation.
- Adding a dark-mode toggle or theme provider.
- Adding form validation, persistence, email delivery, CRM integration, or a new contact endpoint.
- Replacing semantic layout elements with shadcn components when no reusable UI primitive is needed.
- Reinstalling, overwriting, or switching the selected shadcn preset.
- Browser testing or browser automation unless separately requested.

## Decisions

### Map the brand palette onto standard semantic roles

Use the existing warm colors as the source palette, but assign them by behavior in `src/app/globals.css`:

| Existing value | Semantic role |
|---|---|
| warm page background | `background` |
| dark brown text | `foreground`, `card-foreground`, `popover-foreground` |
| cream surface | `card`, `popover` |
| terracotta action | `primary`, `ring` |
| cream action text | `primary-foreground` |
| warm raised neutral | `secondary`, `muted` |
| brown secondary text | `muted-foreground` |
| pale terracotta interaction | `accent` |
| warm divider | `border`, `input` |

`primary` remains the action color rather than the olive callout color. This keeps buttons and focus states coherent with the original action hierarchy. Standard components consume these values automatically.

Alternative considered: keep the generated taupe preset values unchanged. Rejected because it discards the established brand palette and leaves existing visual intent unmapped.

Alternative considered: recreate every legacy utility alongside shadcn. Rejected because it preserves two vocabularies and allows `muted` to continue meaning both text and background.

### Add one paired semantic extension for the editorial olive surface

Define `brand` and `brand-foreground` in `:root` and register both through Tailwind 4's `@theme inline`. Use this pair only for the olive contact/editorial section. The name expresses the role rather than the literal hue and prevents `primary` from carrying two unrelated surface meanings.

Alternative considered: use `primary` for the olive section. Rejected because primary is already the action role and would make buttons, focus states, and large editorial surfaces inseparable.

### Preserve the portfolio typefaces behind standard font roles

Retain the existing Manrope body and Cormorant Garamond editorial typefaces, but expose them as the `font-sans` and `font-heading` roles used by the installed components. Replace `font-[var(--display)]` with `font-heading`; remove unused preset font imports and retain the mono role only if still consumed.

Alternative considered: adopt Noto Sans and Playfair Display solely because the preset added them. Rejected because installing components does not require replacing established brand typography.

### Use shadcn components selectively by semantic responsibility

Replace the custom Button with `@/components/ui/button`. Use built-in variants before modifying component styles. With the current Base UI Button, button-style links use `buttonVariants` on a real Next.js `Link` or anchor. They do not render anchors through Button because Base UI assigns `role="button"`, which would override link semantics.

Use `Badge` for compact project status/category labels and `Separator` where markup currently creates a divider as an interface element. Use `Card` only where the complete card composition matches the content; native `section`, `article`, `dl`, and layout containers remain native markup.

Alternative considered: replace all styled elements with shadcn components. Rejected because shadcn is a primitive system, not a substitute for semantic document structure.

### Keep the contact form server-rendered with native select behavior

Compose the form from `FieldGroup`, `Field`, `FieldLabel`, `Input`, `NativeSelect`, `NativeSelectOption`, and `Textarea`. NativeSelect avoids introducing client-side select state for a static, non-submitting form. Preserve all identifiers, names, labels, and option text. The consultation CTA remains a Button-composed WhatsApp link.

Alternative considered: use the fully interactive Select. Rejected because it adds client behavior without providing value for the existing form.

Alternative considered: add form submission while touching the form. Rejected because delivery and validation remain outside the existing product scope.

### Treat installed shadcn source as owned application code

Keep the selected Base Sera component source unless a deliberate variant or accessibility correction is needed. Application call sites use component variants and semantic variables rather than overriding component colors and typography through `className`. Layout-related classes remain valid at call sites.

Before modifying a component file during implementation, inspect its installed implementation and current shadcn documentation. Do not re-run an overwrite operation against locally installed components.

### Enforce zero radius at the theme boundary

Set the base shadcn radius and every Tailwind radius theme token to zero. Add a global base-layer rule for elements and pseudo-elements with `border-radius: 0 !important` so hard-coded `rounded-full`, arbitrary radius utilities, inline component states, and decorative pseudo-elements cannot reintroduce rounding. Replace application-owned rounded utilities with `rounded-none` so local intent remains explicit.

Alternative considered: replace every radius utility in the installed component source. Rejected because it creates a large, fragile fork and newly installed components could reintroduce rounding.

## Risks / Trade-offs

- [Semantic remapping changes many surfaces at once] → Define the complete token table first, then migrate consumers by role and run repository scans for legacy utilities.
- [The Sera component treatment differs from the original rounded controls] → Keep the installed component treatment as the control baseline while preserving page-level editorial geometry; add variants only when a documented product need cannot use an existing variant.
- [Removing the custom Button can break link semantics] → Migrate every link call site explicitly using `buttonVariants` on a real Next.js Link or anchor, including internal and external links.
- [Theme tokens can have insufficient contrast] → Pair every surface token with a foreground role and verify primary, muted, card, and brand pairs during implementation with static contrast tooling if available.
- [Broad component replacement can create unnecessary client boundaries] → Prefer server-compatible primitives and NativeSelect; add `"use client"` only where the selected component actually requires it.
- [Unrelated shadcn installation changes exist in the working tree] → Limit implementation to files required by this change and preserve unrelated user modifications.
- [Global zero-radius enforcement also squares controls normally rendered as circles] → Accept this intentionally because the product direction requires zero radius everywhere, including avatars and control indicators.

## Migration Plan

1. Reconcile global theme and font variables, preserving necessary global base styles such as minimum viewport width, scroll behavior, selection styling, inherited form fonts, and accessible focus behavior.
2. Migrate typography and legacy color utilities across shared components and routes according to their semantic role.
3. Replace custom Button imports and call sites with the installed Button for native actions and `buttonVariants` for real links, then remove the duplicate abstraction.
4. Recompose the contact form and applicable status/divider patterns with installed shadcn primitives.
5. Scan for superseded utilities, format the touched files, and run lint/type/build checks without browser automation.
6. Set all radius tokens to zero, enforce zero radius globally, and remove application-owned rounded utilities.

Rollback consists of restoring the prior global token definitions, custom Button, form markup, and utility call sites. No persisted data or external API contract changes are involved.

## Open Questions

None. The migration preserves the existing brand palette and typography while adopting the installed Base Sera component behavior.
