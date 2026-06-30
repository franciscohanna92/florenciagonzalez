## 1. Confirm SEO Inputs

- [x] 1.1 Record the approved canonical production domain and configure the public site URL for local, preview, and production environments without canonicalizing preview hosts
- [x] 1.2 Record verified professional title, location/service area, credentials, practice identity, contact details, and any address facts approved for visible content and structured data
- [x] 1.3 Identify an approved factual source for every project summary, challenge, solution, and result/status; list fields that still require editorial input
- [x] 1.4 Select and approve the global social-card image treatment and branded favicon/icon assets

## 2. Canonical Metadata and Crawl Discovery

- [x] 2.1 Read the installed Next.js 16 metadata, robots, sitemap, and Open Graph file-convention guides before implementation
- [x] 2.2 Add a shared canonical-origin and absolute-URL helper used consistently by metadata, sitemap, robots, structured data, and social images
- [x] 2.3 Add self-referencing canonical, distinct title/description, Open Graph, and Twitter metadata to every top-level public route
- [ ] 2.4 Update project metadata to use verified unique summaries, canonical URLs, and representative social-image context while preserving unknown-slug not-found behavior
- [x] 2.5 Add branded root Open Graph/Twitter image and favicon/icon assets using the approved treatment
- [x] 2.6 Implement `src/app/robots.ts` with public crawl rules and the absolute canonical sitemap URL
- [x] 2.7 Implement `src/app/sitemap.ts` with each top-level route and every valid project route exactly once, excluding generated assets and query variants

## 3. Structured Data

- [x] 3.1 Add a sanitized server-rendered JSON-LD utility with stable canonical `@id` helpers and coverage for reserved markup characters
- [x] 3.2 Add verified website and Person/practice structured data to the appropriate top-level layout or pages, omitting unsupported address, credential, rating, review, and hours claims
- [x] 3.3 Add project and breadcrumb structured data to project detail pages using only visible verified project content
- [x] 3.4 Validate representative structured-data payloads against schema syntax and document which Google rich-result features do or do not apply

## 4. Service, Process, and Profile Content

- [x] 4.1 Build `/servicios` as a server-rendered page with one `h1`, distinct metadata, detailed need-based service groups, relevant project links, and contact CTA
- [x] 4.2 Build `/como-trabajo` as a server-rendered page with one `h1`, distinct metadata, all ordered process stages, and consultation CTA
- [x] 4.3 Build `/sobre-mi` as a server-rendered page with one `h1`, distinct metadata, approved first-person profile/location copy, service links, and contact CTA
- [x] 4.4 Update the homepage to communicate accurate San Juan/service-area relevance and link its service, process, and profile summaries to the new pages
- [x] 4.5 Update shared desktop, mobile, and footer navigation with crawlable links to projects, services, process, profile, and contact

## 5. Project Content and Internal Discovery

- [x] 5.1 Extend the project content types/data with a verified summary while retaining identifiable missing editorial fields
- [ ] 5.2 Populate approved summaries, challenges, solutions, and results/statuses in reviewable project batches without inventing missing facts
- [x] 5.3 Render project editorial sections with semantic headings and omit unverified empty claims cleanly
- [x] 5.4 Add visible project breadcrumbs that match JSON-LD and descriptive links to related projects, relevant service content, the project index, and contact
- [x] 5.5 Improve the projects index with visible category/service context and a coherent heading hierarchy rather than jumping directly from `h1` to card `h3`

## 7. Automated Validation

- [x] 7.1 Add repeatable SEO checks for complete sitemap coverage, canonical-origin consistency, unique titles/descriptions, and absence of localhost or preview hosts in production output
- [x] 7.2 Add checks for exactly one `h1`, coherent heading order, and visible/crawlable internal links on every generated page
- [x] 7.3 Add checks that JSON-LD parses, uses canonical identifiers, escapes unsafe markup characters, and omits unverified structured-data properties
- [x] 7.4 Run formatting/linting, type checks, the SEO validation suite, and an optimized Next.js production build with the canonical origin configured; resolve all failures

## 8. Release Verification

- [x] 8.1 Document deployment and rollback steps plus a production SEO checklist covering `/robots.txt`, `/sitemap.xml`, representative canonicals, share cards, and structured data
- [ ] 8.2 After deployment, verify Search Console ownership, submit the sitemap, inspect representative top-level/project URLs, and record indexing results
- [ ] 8.3 Validate representative pages with structured-data/schema tools and social preview tools and record any warnings requiring follow-up
- [ ] 8.4 Establish a baseline and follow-up review for production Core Web Vitals, indexed-page coverage, and search queries without claiming ranking guarantees
