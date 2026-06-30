# SEO inputs

This file records which facts and creative choices are approved for SEO output. Unknown details must remain absent from visible copy and structured data.

## Canonical deployment

- Canonical origin: `https://florenciagonzalez.vercel.app`
- Evidence: the GitHub repository homepage points to this stable Vercel production alias.
- Preview deployments: Vercel's generated deployment URLs are testing targets only and must never become canonical URLs.
- Configuration: `NEXT_PUBLIC_SITE_URL` may override the stable alias when a custom production domain is approved. Local development may use `http://localhost:3000` for non-production output.

## Verified professional facts

| Fact | Approved value | Existing public source |
| --- | --- | --- |
| Practice identity | Florencia González, personal architecture practice | Shared site header and profile copy |
| Professional title | Arquitecta | Home profile copy |
| Descriptor | Arquitectura & Diseño | Shared site header |
| Base location | San Juan, Argentina | Existing site configuration and project data |
| Service mode | Proyectos presenciales y a distancia según alcance | Existing site configuration |
| WhatsApp | +54 264 417-1300 | Existing contact page/configuration |
| Email | gonzalez.florencialuz@gmail.com | Existing contact page/configuration |
| Instagram | @florencial.arq | Existing contact page/configuration |
| Portfolio source | Behance profile `florencia1112` and project URLs | `scripts/scrape-myportfolio.mjs` |

Do not publish matrícula, university/formation, years of experience, street address, office hours, ratings, reviews, awards, or a separate company identity until Florencia approves exact values.

## Project content sources and gaps

The Behance project URLs in `scripts/scrape-myportfolio.mjs` are the approved source for project titles and media. `src/data/scraped-projects.json` contains the currently approved category, year, location, services, feature selection, and downloaded image mapping.

The following fields still need project-specific editorial approval for all projects unless a Behance page explicitly supplies them:

- concise project summary;
- initial need or challenge;
- proposed design solution;
- result or current status;
Implementation must keep these gaps identifiable and omit unsupported claims.

## Social and icon treatment

- Global social card: code-generated 1200 × 630 editorial card matching the existing project card—sage `#5f6b5b` background, warm `#fffaf3` text, Florencia González name, “Arquitectura & Diseño” descriptor, and a concise service/location statement.
- Project social cards: retain the existing generated treatment and project-specific title/category/location/year.
- App icon/favicon: code-generated `FG` monogram using the same sage and warm palette.
- Photography is intentionally excluded from the global card until a specific image and crop are separately approved.
