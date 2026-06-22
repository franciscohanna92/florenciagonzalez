## ADDED Requirements

### Requirement: Site information architecture
The system SHALL provide a public website for Florencia González with the routes `/`, `/proyectos`, `/proyectos/[slug]`, `/servicios`, `/como-trabajo`, `/sobre-mi`, and `/contacto`.

#### Scenario: Visitor navigates primary pages
- **WHEN** a visitor uses the primary navigation
- **THEN** the visitor can reach Proyectos, Servicios, Cómo trabajo, Sobre mí, and Contacto from the shared site navigation

#### Scenario: Brand appears in the header
- **WHEN** any public page is rendered
- **THEN** the header displays "Florencia González" and "Arquitectura e interiores"

### Requirement: Brand voice and copy constraints
The system SHALL use Spanish copy with a professional, clear, warm, and precise tone; visitor-facing copy MUST use Argentine voseo, and personal practice copy MUST use first person where referring to the architect's work.

#### Scenario: Visitor-facing calls to action use voseo
- **WHEN** a visitor reads primary calls to action
- **THEN** the calls to action include voseo phrasing such as "Contame qué querés proyectar"

#### Scenario: Site avoids third-person personal-brand copy
- **WHEN** a page describes the architect's services, process, or professional profile
- **THEN** the copy does not describe Florencia in third person

#### Scenario: Site avoids prohibited service framing
- **WHEN** services or navigation are displayed
- **THEN** the system does not present "Proyecto integral" as a page, main service, product, or primary category

### Requirement: Home page visitor journey
The system SHALL provide a home page that communicates what Florencia does, shows residential and commercial service fit, previews projects, explains the work process, introduces the professional profile, and provides a final contact call to action.

#### Scenario: Home hero communicates positioning
- **WHEN** the home page is rendered
- **THEN** it displays the headline "Diseño espacios desde la idea hasta la obra." with the brief's main supporting copy and primary/secondary calls to action

#### Scenario: Home highlights services
- **WHEN** the home page service section is rendered
- **THEN** it presents Viviendas, Espacios comerciales, Interiores y mobiliario, and Visualización, planos y obra as grouped service needs

#### Scenario: Home previews projects and process
- **WHEN** the home page is rendered
- **THEN** it includes featured projects with visible status data and a process summary with ordered stages

### Requirement: Services page content
The system SHALL provide a services page that explains the offer by client need rather than as an unstructured technical list.

#### Scenario: Services page shows grouped service sections
- **WHEN** a visitor opens `/servicios`
- **THEN** the page displays sections for Viviendas, Espacios comerciales, Interiores y mobiliario, and Visualización, planos y obra

#### Scenario: Services page shows related service items
- **WHEN** a visitor reads a service section
- **THEN** the section includes related items such as reforms, approvals, habilitations, renders, documentation, furniture, or direction of work as appropriate to that category

### Requirement: Project listing
The system SHALL provide a project listing page with project cards built from reusable static project data.

#### Scenario: Visitor views project cards
- **WHEN** a visitor opens `/proyectos`
- **THEN** each listed project displays image or placeholder, title, category, year, status, services, excerpt, and a link to its detail page

#### Scenario: Project statuses are explicit
- **WHEN** a project card is displayed
- **THEN** the project status is visibly shown using one of Obra finalizada, Proyecto, En obra, Visualización 3D, or Dirección de obra

#### Scenario: Visitor can filter or scan by category
- **WHEN** the project listing is rendered
- **THEN** the page includes visual category controls or labels for Todos, Vivienda, Comercial, Interiorismo, Mobiliario, and Visualización 3D

### Requirement: Project detail pages
The system SHALL provide static project detail pages at `/proyectos/[slug]` for each mock project record.

#### Scenario: Visitor opens a valid project detail
- **WHEN** a visitor opens a known project slug
- **THEN** the page displays title, category, year, status, generic location, services performed, description, gallery or placeholders, initial need, proposed solution, result or current state, and a contact CTA

#### Scenario: Unknown project slug is handled
- **WHEN** a visitor opens an unknown project slug
- **THEN** the system returns the site's not-found behavior instead of rendering an unrelated project

### Requirement: Process page
The system SHALL provide a "Cómo trabajo" page that explains the work process as clear ordered stages.

#### Scenario: Visitor reads process stages
- **WHEN** a visitor opens `/como-trabajo`
- **THEN** the page displays Consulta inicial, Relevamiento y análisis, Idea y propuesta, Desarrollo, Gestión y obra, and Cierre o próxima etapa

#### Scenario: Process page leads to contact
- **WHEN** a visitor reaches the end of the process page
- **THEN** the page provides a call to action to start with a consultation

### Requirement: About page
The system SHALL provide an about page that introduces Florencia's professional profile without inventing unconfirmed credentials.

#### Scenario: Visitor reads profile content
- **WHEN** a visitor opens `/sobre-mi`
- **THEN** the page includes first-person profile copy about residential and commercial architecture, interior design, documentation, visualization, and direction of work

#### Scenario: Unconfirmed credentials remain placeholders
- **WHEN** the about professional facts are displayed
- **THEN** matrícula and formation appear as editable placeholders, while location displays San Juan, Argentina

### Requirement: Contact page and contact paths
The system SHALL provide a contact page with visible contact data, a visual consultation form, and a direct WhatsApp path.

#### Scenario: Visitor sees contact data
- **WHEN** a visitor opens `/contacto`
- **THEN** the page displays San Juan, Argentina, projects in person and remotely depending on scope, WhatsApp `+543825554196`, and editable placeholders for email and Instagram

#### Scenario: Visitor sees consultation form fields
- **WHEN** a visitor reads the contact form
- **THEN** the form includes Nombre, Email, Teléfono / WhatsApp, Tipo de proyecto, Ubicación del proyecto, Estado actual, and Mensaje

#### Scenario: Visitor sees project-type options
- **WHEN** the Tipo de proyecto field is presented
- **THEN** it includes Casa desde cero, Reforma o ampliación, Local comercial, Interiorismo, Mobiliario, Renders o visualización 3D, Planos, aprobación o habilitación, Dirección de obra, and Otro

#### Scenario: Visitor sees project-status options
- **WHEN** the Estado actual field is presented
- **THEN** it includes Tengo una idea inicial, Tengo terreno o local, Tengo planos, Estoy por empezar obra, La obra ya empezó, Necesito regularizar o aprobar, and No sé por dónde empezar

### Requirement: Visual design and placeholders
The system SHALL use a warm, minimal, editorial architecture visual direction with stable placeholder images from `https://placehold.co/` until real assets are available.

#### Scenario: Placeholder visuals render in project surfaces
- **WHEN** project, hero, profile, or gallery images are needed before real assets exist
- **THEN** the system uses `placehold.co` placeholder URLs with descriptive labels rather than generic gray blocks

#### Scenario: Site follows visual constraints
- **WHEN** public pages are rendered
- **THEN** the design uses warm backgrounds, restrained colors, clear grids, subtle borders or dividers, strong image areas, and avoids saturated gradients, excessive icons, and generic SaaS styling

### Requirement: SEO, responsiveness, and accessibility
The system SHALL include basic SEO metadata, semantic HTML structure, responsive layouts, and accessible interaction affordances for the first version.

#### Scenario: Pages expose metadata
- **WHEN** a public route is rendered
- **THEN** the page provides a relevant title and description, including the specified home, services, projects, and contact metadata

#### Scenario: Pages use semantic headings
- **WHEN** a public page is rendered
- **THEN** the page has one `h1`, section headings use `h2`, and card titles use `h3` where appropriate

#### Scenario: Layout adapts to viewport size
- **WHEN** the site is viewed on mobile, tablet, or desktop
- **THEN** navigation, cards, CTAs, images, and page sections remain readable and do not require horizontal scrolling

#### Scenario: Interactive elements are accessible
- **WHEN** a visitor navigates by keyboard or screen reader
- **THEN** links, buttons, form fields, and focus states are clear and usable
