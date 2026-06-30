## Why

The portfolio is statically rendered and has basic page metadata, but search engines receive no sitemap or canonical signals, top-level pages lack complete sharing metadata, local relevance is understated, and project detail pages contain almost no unique explanatory copy. Improving these areas will make the site easier to discover, understand, index, and share for architecture and interior-design searches relevant to Florencia's services and locations.

## What Changes

- Add crawl and index discovery endpoints for `robots.txt` and a sitemap containing every public canonical route.
- Establish a single production site origin and emit self-referencing canonical URLs and complete Open Graph/Twitter metadata for public pages.
- Add accurate structured data describing Florencia, her professional services, contact channels, service area, and project portfolio without inventing unverified credentials or a street address.
- Strengthen local and service intent in visible copy and metadata, including San Juan, Argentina where contextually accurate.
- Add substantial standalone pages for services, work process, and professional profile, using the existing first-person content model and internal linking them from shared navigation.
- Enrich project detail pages with verified, unique editorial content, descriptive metadata, and links to relevant projects and services.
- Improve project-list semantics, breadcrumb/navigation context, and branded favicon/social imagery.
- Add SEO-focused automated validation and document post-deployment checks for Search Console, rich results, indexing, and Core Web Vitals.

## Capabilities

### New Capabilities

- `portfolio-search-discovery`: Crawl discovery, canonical metadata, structured data, local/service landing content, project content quality, internal linking, and automated SEO validation for the public portfolio.

### Modified Capabilities

None. There are no archived baseline specifications under `openspec/specs/`; the SEO behavior is introduced as a new capability.

## Impact

- Affects the root metadata configuration, top-level and project route metadata, project data/content, shared header/footer navigation, project cards, and new public content routes under `src/app`.
- Adds App Router metadata files such as `sitemap.ts`, `robots.ts`, and branded Open Graph assets or generators.
- Requires a production site URL configuration and verified business/profile facts; it must not fabricate project narratives, credentials, reviews, ratings, or physical-address data.
- May add lightweight schema validation or test tooling, but does not require a CMS, analytics platform, or changes to the contact flow.
