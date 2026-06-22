## Context

The project is a clean Next.js 16 App Router scaffold using TypeScript, React 19, Tailwind CSS 4, and Biome. The existing app contains only the starter root layout, starter home page, and default global CSS. The brief defines a personal-brand architecture website for Florencia González, with Spanish copy, Argentine voseo, a warm editorial visual direction, static project data, `placehold.co` imagery, and WhatsApp contact via `+543825554196`.

The implementation must follow the local Next.js documentation because this project uses Next 16. Relevant constraints from the bundled docs include App Router file-system routing, page/layout metadata exports in Server Components, Tailwind 4 imported from global CSS, and remote image configuration when using `next/image` with external URLs.

## Goals / Non-Goals

**Goals:**

- Build the first complete public website scaffold with all required routes and navigation.
- Establish reusable components and data modules so content can later move to real images or a CMS without rewriting pages.
- Preserve the required brand voice: first person where appropriate, visitor-facing voseo, professional and warm tone, no generic filler.
- Make project status visible wherever projects are summarized or detailed, especially to distinguish built work from renders or proposals.
- Use `https://placehold.co/` image URLs for project/profile/hero placeholders.
- Include basic SEO metadata, semantic page structure, responsive layouts, and accessible interactive states.

**Non-Goals:**

- No CMS integration.
- No backend form submission, email delivery, CRM integration, or persistence.
- No analytics, authentication, admin editing, blog, multilingual support, or deployment automation.
- No invented personal data such as matrícula, university, office address, email, Instagram, or years of experience.
- No browser testing unless explicitly requested by the user.

## Decisions

### Use App Router pages with a shared root shell

Create routes under `src/app` for `/`, `/proyectos`, `/proyectos/[slug]`, `/servicios`, `/como-trabajo`, `/sobre-mi`, and `/contacto`. Keep the shared header/footer in the root layout or shared components used by the root layout.

Alternatives considered:

- A single long landing page: rejected because the brief explicitly requires separate pages and a project detail route.
- Pages Router: rejected because the repo already uses App Router and the local docs describe the current conventions.

### Model content as typed static data

Place project records in a TypeScript data module, with a `Project` shape matching the brief. Add small supporting content arrays where useful for services, process steps, navigation, and contact options. Pages should consume these modules instead of duplicating large blocks of content.

Alternatives considered:

- Hardcoding all content in pages: faster initially, but makes project cards/details and future CMS migration harder.
- Adding a CMS now: rejected as overengineering for the first version.

### Use reusable presentational components

Create a focused component set for `Header`, `Footer`, `Container`, `Button`, `SectionHeader`, `ProjectCard`, `ServiceCard`, `ProcessStep`, `ContactCTA`, `ImagePlaceholder`, and `ProjectMeta`. Keep components simple and server-renderable unless interactivity requires a client component.

Alternatives considered:

- Introducing a UI component library: rejected because the desired visual language is custom, restrained, and small enough for local components.
- One-off page markup only: rejected because repeated project/service/process patterns are central to this site.

### Use Tailwind 4 with global design tokens

Define the warm palette and font variables in `src/app/globals.css`, using Tailwind utility classes for layout and component styling. The design should avoid SaaS/startup patterns, saturated gradients, excessive icons, nested cards, and generic corporate templates.

Alternatives considered:

- CSS Modules for every component: viable, but less aligned with the scaffold's Tailwind setup.
- A theme package: unnecessary for the small first version.

### Use Next image optimization for placeholders

Use `next/image` for visual assets where practical, and configure `next.config.ts` to allow remote images from `https://placehold.co/**`. Provide explicit dimensions or stable aspect-ratio containers to prevent layout shift.

Alternatives considered:

- Plain `<img>` tags: simpler and avoids config, but gives up Next image behavior and consistency.
- Local placeholder SVGs: rejected because the user explicitly chose `placehold.co`.

### Keep contact functional enough without backend submission

Show WhatsApp as a direct contact path using `+543825554196` and include the visual form fields from the brief. The form can have a placeholder client-side or non-submitting behavior, but must not imply successful backend delivery.

Alternatives considered:

- Implementing a real form endpoint: rejected because backend submission is out of scope.
- Omitting the form: rejected because the contact page requirements include form fields.

### Use static dynamic-route generation for project details

Generate project detail pages from static project data. Follow Next 16 dynamic route conventions, including async `params` handling where required by the local docs, and include a not-found path for unknown slugs.

Alternatives considered:

- Client-side filtering/routing only: rejected because project detail pages need stable URLs and metadata.

## Risks / Trade-offs

- Placeholder images may feel less premium than real work → Use warm, editorial `placehold.co` dimensions/colors/text and make statuses explicit so placeholders do not misrepresent built work.
- Static content can drift from real business details → Keep unconfirmed fields visibly editable as `[completar]` and avoid invented credentials.
- Remote placeholders can fail or be rate-limited → Keep layout stable with aspect ratios and ensure alt/placeholder text still communicates context.
- The visual form may be mistaken for a working submission flow → Use clear non-misleading behavior until a backend is added.
- Spanish copy constraints are easy to violate during implementation → Centralize repeated copy and review for first person, voseo, and avoidance of third-person references.

## Migration Plan

1. Replace starter metadata, global styles, and home content with the new brand/site foundation.
2. Add reusable components and static data modules.
3. Add the required route pages and project detail route.
4. Configure `placehold.co` remote images if using `next/image`.
5. Run formatting/linting and build checks.

Rollback is straightforward because this is replacing the starter scaffold: revert the change files or restore the previous starter `src/app` files and `next.config.ts`.

## Open Questions

- Email and Instagram remain `[completar]` until confirmed.
- Matrícula, formation, and other professional credentials remain `[completar]` until confirmed.
- Real project images/renders can replace `placehold.co` URLs later without changing the page architecture.
