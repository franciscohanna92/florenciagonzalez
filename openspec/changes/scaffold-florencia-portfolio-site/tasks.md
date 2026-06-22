## 1. Foundation

- [x] 1.1 Update the root layout metadata, document language, and shared page shell for the Florencia González site.
- [x] 1.2 Replace starter global CSS with Tailwind 4 design tokens, warm color variables, base typography, focus styles, and responsive body defaults.
- [x] 1.3 Configure `next.config.ts` to allow optimized remote images from `https://placehold.co/**`.
- [x] 1.4 Remove starter Next.js demo content from the home page.

## 2. Static Data and Shared Components

- [x] 2.1 Add typed static project data with slugs, categories, years, statuses, locations, services, excerpts, descriptions, challenge/solution/result text, and `placehold.co` image URLs.
- [x] 2.2 Add reusable shared content constants for navigation, services, process steps, contact details, project categories, and form option lists.
- [x] 2.3 Create layout and primitive components: `Header`, `Footer`, `Container`, `Button`, and `SectionHeader`.
- [x] 2.4 Create content components: `ImagePlaceholder`, `ProjectMeta`, `ProjectCard`, `ServiceCard`, `ProcessStep`, and `ContactCTA`.

## 3. Public Routes

- [x] 3.1 Build the home page with hero, services preview, featured projects, process preview, about preview, and final contact CTA.
- [x] 3.2 Build `/servicios` with the four service groups and related service items.
- [x] 3.3 Build `/proyectos` with category controls or labels and reusable project cards.
- [x] 3.4 Build `/proyectos/[slug]` from static project data, including metadata, static params, unknown-slug handling, project meta, gallery placeholders, challenge/solution/result sections, and contact CTA.
- [x] 3.5 Build `/como-trabajo` with the six ordered process stages and consultation CTA.
- [x] 3.6 Build `/sobre-mi` with first-person profile copy, profile placeholder visual, San Juan location, and editable credential placeholders.
- [x] 3.7 Build `/contacto` with visible contact data, WhatsApp `+543825554196`, editable email/Instagram placeholders, all required form fields, project-type options, project-status options, and clear non-backend form behavior.

## 4. SEO, Copy, Responsiveness, and Verification

- [x] 4.1 Add route-level metadata for home, services, projects, project details, process, about, and contact pages.
- [x] 4.2 Verify heading hierarchy uses one `h1` per page, `h2` for sections, and `h3` for cards where appropriate.
- [x] 4.3 Review Spanish copy for first-person practice language, Argentine voseo, no third-person Florencia descriptions, no lorem ipsum, and no "Proyecto integral" service framing.
- [x] 4.4 Check responsive classes for mobile, tablet, and desktop layouts without browser automation unless the user explicitly requests it.
- [x] 4.5 Run `pnpm lint` and `pnpm build`; fix any Biome, TypeScript, or Next.js build issues.
