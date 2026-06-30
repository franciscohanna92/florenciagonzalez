## Context

The Next.js 16 App Router site currently prerenders `/`, `/proyectos`, `/contacto`, and 25 project detail routes. It already emits basic titles and descriptions, uses semantic top-level headings, and generates route-specific social images for projects. It does not emit a sitemap, robots policy, canonical links, structured data, or global social cards. The production origin is environment-derived but can fall back to localhost, and the project editorial fields are present in the data model but blank for every project. Project source media remains unchanged by this change.

The implementation must follow the metadata and file conventions bundled with the installed Next.js version. All visitor-facing content remains Spanish with Argentine voseo and first-person professional language. Business facts, credentials, addresses, reviews, and project outcomes must be verified rather than inferred.

## Goals / Non-Goals

**Goals:**

- Give crawlers complete, consistent discovery and canonicalization signals for every public route.
- Make page purpose, professional services, location relevance, and project subject matter clear in rendered HTML and metadata.
- Introduce accurate structured data and complete social sharing previews.
- provide substantial, indexable service, process, profile, and project content without creating thin or duplicative pages.
- Make SEO-critical output verifiable during development and after deployment.

**Non-Goals:**

- Guarantee rankings, traffic, rich results, or Core Web Vitals scores.
- Create fake project narratives, credentials, reviews, ratings, office hours, or a public street address.
- Add a CMS, paid SEO service, analytics vendor, advertising integration, or backlink campaign.
- Create many near-duplicate city or keyword landing pages.
- Redesign the portfolio or materially alter the contact submission flow.

## Decisions

### Use native App Router metadata conventions

Implement `src/app/sitemap.ts` and `src/app/robots.ts`, route metadata through static `metadata` or `generateMetadata`, and root/route Open Graph image conventions. This matches Next.js 16 behavior and avoids another runtime dependency. Hand-authored static XML and ad hoc `<head>` markup were rejected because route data already exists in TypeScript and native metadata APIs provide type checking.

### Centralize the canonical production origin

Add a single URL helper sourced from the configured public production URL and use it for `metadataBase`, canonicals, sitemap URLs, robots sitemap/host values, structured data IDs, and share image URLs. Development may use localhost, but a production build intended for deployment must not silently publish localhost or a preview deployment as the canonical origin. The final public domain must be confirmed before release.

### Use one canonical URL per indexable route

Every public page emits a self-referencing canonical. The sitemap contains only those canonical URLs and includes all project slugs from the shared project dataset. Query-string variants and generated social image endpoints are excluded. `robots.txt` permits the public site and points to the canonical sitemap; it is a discovery aid rather than an attempt to force indexing.

### Generate metadata from shared page and project content

Keep titles, descriptions, canonical paths, and social fields close to the content source and expose small helpers to keep formatting consistent. Project descriptions will derive from a verified project summary rather than the current category/location sentence. Titles remain concise and naturally written; they will not be mechanically stuffed with every service or location keyword.

### Model structured data as a small sanitized server-rendered graph

Render JSON-LD with native `<script type="application/ld+json">` elements in Server Components, serializing with `<` escaped. Use stable `@id` values rooted at the canonical domain and link appropriate `WebSite`, `Person`, professional service, breadcrumb, and creative-project entities. Only include properties supported by visible, verified site content. If a public street address cannot be confirmed, omit address-dependent LocalBusiness rich-result markup rather than inventing one.

### Create three substantial intent pages from existing content

Add `/servicios`, `/como-trabajo`, and `/sobre-mi` as standalone, server-rendered pages. They reuse and expand the current `serviceGroups`, `processSteps`, and profile content, each with a distinct search intent, one `h1`, useful internal links, and a contact CTA. The home page remains a summary and links to these deeper pages. Service content stays grouped around client needs; it will not create one thin page per keyword or municipality.

### Treat verified project narrative as required content data

Use the existing `challenge`, `solution`, and `result` fields and add a concise project summary. A project page renders only verified, project-specific claims. Missing facts remain absent and are tracked as content work rather than being generated speculatively. Related-project links can be selected deterministically from category/location data, avoiding new editorial infrastructure.

### Validate emitted output rather than source declarations alone

Add automated checks that exercise the production build or metadata helpers and assert the sitemap route set, absence of localhost in production SEO output, unique page titles/descriptions, self-canonicals, one `h1`, and valid JSON-LD serialization. Existing lint/type/build checks remain mandatory. Post-deployment checks cover Search Console ownership/submission, URL inspection, rich-result/schema validation, share previews, and real-user Core Web Vitals because those cannot be proven by repository tests.

## Risks / Trade-offs

- **Verified project copy is unavailable during implementation** → Implement the content structure and track each incomplete project explicitly; do not fabricate text merely to satisfy a word count.
- **The canonical domain is not configured** → Block SEO release validation until the domain is supplied and verify built output contains no localhost or preview host.
- **Structured data overstates the business** → Map only visible verified facts and omit address-, rating-, credential-, and hours-dependent properties when unknown.
- **New pages duplicate homepage copy** → Keep the homepage concise and make each standalone page answer a distinct visitor intent with deeper information.
- **Metadata tests become coupled to framework internals** → Prefer testing exported data/helpers and stable generated HTML outcomes, not private Next.js implementation modules.

## Migration Plan

1. Confirm the canonical production domain and verified professional/profile facts.
2. Add shared URL/metadata helpers, discovery endpoints, canonicals, and global sharing assets without removing existing project social images.
3. Add structured data and automated SEO assertions, then verify a production build.
4. Add and internally link the service, process, and profile pages.
5. Populate verified project summaries/editorial fields in reviewable batches.
6. Deploy, validate representative URLs and structured data, submit the sitemap in Search Console, and monitor indexing and Core Web Vitals.

Rollback is route- and metadata-safe: remove the new discovery/structured-data exports or revert individual content batches. Existing public URLs remain unchanged throughout the migration.

## Open Questions

- What is the final canonical production domain?
- Which professional title, matrícula/credentials, service area, and business address facts are approved for public display?
- What verified source should be used to complete each project's summary, challenge, solution, and result?
- Should the primary structured entity be Florencia as a `Person`, a named professional practice, or both as linked entities?
- Which portrait/project image and brand treatment should be used for the global social card and branded icons?
