## ADDED Requirements

### Requirement: Canonical production identity
The system SHALL use one configured production origin for all absolute SEO URLs and SHALL emit a self-referencing canonical URL for every indexable public page.

#### Scenario: Public page emits its canonical URL
- **WHEN** an indexable public route is rendered for production
- **THEN** its metadata contains an absolute canonical URL on the configured production origin matching that route without tracking parameters

#### Scenario: Production SEO output rejects development origins
- **WHEN** production SEO artifacts are generated
- **THEN** no canonical, sitemap, structured-data, or social-image URL uses localhost or a preview deployment origin

### Requirement: Crawl discovery endpoints
The system SHALL expose a public robots policy and a sitemap containing every canonical indexable route.

#### Scenario: Crawler requests robots policy
- **WHEN** a crawler requests `/robots.txt`
- **THEN** the response permits crawling of public content and references the absolute canonical sitemap URL

#### Scenario: Crawler requests sitemap
- **WHEN** a crawler requests `/sitemap.xml`
- **THEN** the response contains the home, projects, contact, services, process, profile, and every valid project detail canonical URL exactly once

#### Scenario: Non-page endpoints are excluded
- **WHEN** the sitemap is generated
- **THEN** it excludes generated social images, framework assets, unknown project slugs, and query-string variants

### Requirement: Complete route metadata and social previews
The system SHALL provide distinct, accurate titles and descriptions plus Open Graph and Twitter sharing metadata for every indexable public route.

#### Scenario: Top-level route metadata is rendered
- **WHEN** a top-level public page is rendered
- **THEN** its title and description describe that page's visible content and its Open Graph and Twitter metadata reference a branded absolute image URL

#### Scenario: Project metadata is rendered
- **WHEN** a valid project detail page is rendered
- **THEN** its title, description, canonical, and social metadata use that project's verified summary, title, and representative image context

#### Scenario: Unknown project metadata is requested
- **WHEN** metadata is requested for an unknown project slug
- **THEN** the route retains not-found behavior and does not advertise an unrelated canonical project URL

### Requirement: Accurate structured data
The system SHALL render valid JSON-LD that describes the website, Florencia's verified professional identity and services, navigation context, and applicable project content without asserting unverified facts.

#### Scenario: Site identity data is rendered
- **WHEN** a public top-level page is rendered
- **THEN** its JSON-LD identifies the website and links Florencia or the approved practice entity to visible contact, location, service-area, and profile facts

#### Scenario: Project data is rendered
- **WHEN** a project detail page is rendered
- **THEN** its JSON-LD describes that project and its breadcrumb path using absolute canonical identifiers and verified visible content

#### Scenario: Business facts are unknown
- **WHEN** a credential, review, rating, office hour, street address, or project outcome has not been verified
- **THEN** structured data omits that claim rather than supplying a placeholder or inferred value

#### Scenario: JSON-LD content contains reserved markup characters
- **WHEN** structured data is serialized into HTML
- **THEN** the serialization escapes characters that could terminate or inject markup into the script element

### Requirement: Local and service search content
The system SHALL expose substantial, distinct pages for services, work process, and professional profile and SHALL communicate San Juan relevance where it is accurate and useful to visitors.

#### Scenario: Visitor opens services page
- **WHEN** a visitor opens `/servicios`
- **THEN** the page explains residential, commercial, interior/furniture, visualization, documentation, and work-direction services by client need and links to relevant projects and contact

#### Scenario: Visitor opens process page
- **WHEN** a visitor opens `/como-trabajo`
- **THEN** the page explains the ordered work stages with one primary heading, useful page metadata, and a consultation path

#### Scenario: Visitor opens profile page
- **WHEN** a visitor opens `/sobre-mi`
- **THEN** the page presents verified first-person professional information, San Juan location/service context, relevant services, and a contact path without inventing credentials

#### Scenario: Visitor scans shared navigation
- **WHEN** any public page is rendered
- **THEN** shared navigation provides crawlable links to projects, services, process, profile, and contact pages

### Requirement: Substantive project pages
The system SHALL present verified, project-specific information that helps visitors and search engines understand each project's need, work performed, location context, and result or current state.

#### Scenario: Complete project content is available
- **WHEN** a project has an approved summary, challenge, solution, and result or status
- **THEN** its detail page renders those fields with semantic headings alongside category, year, location, services, and gallery content

#### Scenario: Project facts are incomplete
- **WHEN** a project fact has not been verified
- **THEN** the page omits that claim and the content dataset keeps the missing field identifiable for editorial follow-up

#### Scenario: Visitor reaches a project detail page
- **WHEN** a valid project detail page is rendered
- **THEN** it includes crawlable links to its project listing, at least one contextually related project when available, relevant service information, and contact

### Requirement: Semantic navigation and page structure
The system SHALL provide a coherent heading hierarchy, breadcrumb context on project details, and descriptive crawlable internal links between related content.

#### Scenario: Public page headings are inspected
- **WHEN** a public page is rendered
- **THEN** it contains exactly one `h1` and subsequent section and card headings do not skip the page's intended hierarchy

#### Scenario: Project detail navigation is inspected
- **WHEN** a project detail page is rendered
- **THEN** visible breadcrumb navigation identifies the projects index and current project and matches the structured breadcrumb data

#### Scenario: Internal link is rendered
- **WHEN** a page links to a service, project, profile, or contact route
- **THEN** the link has descriptive visible text or an equivalent accessible name that communicates its destination

### Requirement: SEO validation and release checks
The system SHALL provide repeatable repository checks for deterministic SEO output and a documented checklist for deployment-dependent validation.

#### Scenario: Automated SEO checks run
- **WHEN** the project validation suite is executed
- **THEN** it verifies sitemap coverage, canonical origins, route metadata uniqueness, heading counts, and structured-data serialization

#### Scenario: Production build runs
- **WHEN** the optimized Next.js build is executed with the canonical production origin configured
- **THEN** all public routes and metadata endpoints build successfully without localhost appearing in production SEO output

#### Scenario: Site is deployed
- **WHEN** the SEO change reaches the production domain
- **THEN** the release checklist covers sitemap submission, representative URL inspection, structured-data validation, social preview checks, indexing review, and Core Web Vitals monitoring
