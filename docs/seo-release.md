# SEO release and verification

## Structured-data scope

- `WebSite` and `Person` identify the site and Florencia using visible, verified facts.
- `CreativeWork` describes each project using its title, category, year, location, services, and approved summary when available.
- `BreadcrumbList` mirrors visible project breadcrumbs and is the only currently targeted Google rich-result feature.
- `LocalBusiness` is intentionally omitted because a public business address has not been approved. Ratings, reviews, office hours, credentials, awards, and education are also omitted.
- `Person`, `WebSite`, and `CreativeWork` improve machine-readable identity but do not guarantee a Google rich result.

## Pre-deployment

1. Set `NEXT_PUBLIC_SITE_URL` to the stable public origin, never a preview URL.
2. Run `pnpm seo:check`; it builds the site and checks every canonical page, `/robots.txt`, `/sitemap.xml`, metadata, headings, internal navigation, and JSON-LD.
3. Inspect the build output for the expected static top-level and project routes.
4. Confirm the generated root and representative project social cards contain approved copy.
5. Confirm no structured-data property asserts an unverified address, credential, review, rating, award, or office hour.

## Production verification

1. Confirm `/robots.txt` returns the public crawl rule and canonical sitemap URL.
2. Confirm `/sitemap.xml` lists the six top-level routes and every project route once.
3. Inspect `/`, `/servicios`, `/proyectos`, `/proyectos/casa-vp`, and `/contacto` with Google Search Console URL Inspection.
4. Submit `/sitemap.xml` in Search Console and record submission/indexing status.
5. Validate `/` and a representative project page with Google's Rich Results Test and Schema.org validator; record warnings separately from errors.
6. Check root and project links with social sharing preview tools.
7. Record the initial Core Web Vitals field-data baseline when available, then review it after enough production traffic has accumulated.
8. Review indexed-page coverage and search queries monthly without treating ranking changes as guaranteed outcomes of this release.

## Rollback

- Revert the SEO release commit to remove all new metadata, routes, and structured data together.
- If only structured data is problematic, remove the `JsonLd` render points while retaining visible pages and metadata.
- If the canonical origin is wrong, correct `NEXT_PUBLIC_SITE_URL`, redeploy, and request recrawling for representative URLs.
- Existing `/`, `/proyectos`, `/proyectos/[slug]`, and `/contacto` URLs are unchanged by this release.
