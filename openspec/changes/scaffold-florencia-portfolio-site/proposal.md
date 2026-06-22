## Why

Florencia González needs a first functional website that presents her personal architecture practice as both a professional portfolio and a commercial entry point for potential clients. The current app is still the default Next.js scaffold, so there is an opportunity to establish the site structure, visual direction, reusable components, and static content model before real project media or a CMS are introduced.

## What Changes

- Replace the starter app with a polished, responsive public website for "Florencia González | Arquitectura e interiores".
- Add the required information architecture: Inicio, Proyectos, Detalle de proyecto, Servicios, Cómo trabajo, Sobre mí, and Contacto.
- Add a reusable component structure for layout, cards, CTAs, process steps, project metadata, contact sections, and image placeholders.
- Add static project data with visible category, year, status, services, descriptions, detail content, and placeholder image URLs from `https://placehold.co/`.
- Add Spanish copy in first person where appropriate, using Argentine voseo for visitor-facing calls to action.
- Add contact content and a visual contact form, including WhatsApp `+543825554196`; backend submission is out of scope for this first version.
- Add basic page metadata, semantic headings, responsive layouts, and accessibility-minded links, focus states, and placeholder handling.
- Avoid presenting "Proyecto integral" as a page, primary service, or standalone product category.

## Capabilities

### New Capabilities

- `public-portfolio-site`: Defines the public marketing and portfolio website for Florencia González, including navigation, pages, project listing/detail behavior, service content, process content, about content, contact presentation, static data, visual placeholders, SEO metadata, responsive behavior, and accessibility expectations.

### Modified Capabilities

None.

## Impact

- Affected app routes under `src/app`, including the root page and new route segments for `proyectos`, `proyectos/[slug]`, `servicios`, `como-trabajo`, `sobre-mi`, and `contacto`.
- New reusable UI components and static content/data modules under `src`.
- Global styles and design tokens in `src/app/globals.css`.
- Basic metadata in route files and the root layout.
- No new runtime dependencies are expected beyond the existing Next.js, React, TypeScript, Tailwind CSS, and Biome setup.
