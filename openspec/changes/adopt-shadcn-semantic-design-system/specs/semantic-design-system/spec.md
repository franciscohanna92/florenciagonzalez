## ADDED Requirements

### Requirement: Semantic color roles
The public UI SHALL express colors through defined semantic theme roles rather than removed legacy utilities, raw palette utilities, or component-local color values.

#### Scenario: Default page content is rendered
- **WHEN** a public page renders its base surface and primary text
- **THEN** it uses the `background` and `foreground` roles

#### Scenario: Supporting copy is rendered
- **WHEN** secondary or supporting text is displayed
- **THEN** it uses the `muted-foreground` role rather than the `muted` background role

#### Scenario: Elevated content is rendered
- **WHEN** a card, form panel, popover, or comparable elevated surface is displayed
- **THEN** it uses a paired surface and foreground role such as `card` and `card-foreground`

#### Scenario: Interactive state is rendered
- **WHEN** an action, hover state, border, input boundary, or focus indicator is displayed
- **THEN** it uses the corresponding `primary`, `accent`, `border`, `input`, or `ring` semantic role and its paired foreground role where applicable

### Requirement: Warm editorial theme mapping
The semantic theme SHALL preserve the portfolio's warm, restrained architecture-focused palette while assigning each color according to UI meaning.

#### Scenario: Primary actions are displayed
- **WHEN** a primary call to action is rendered
- **THEN** the action uses the warm primary role with a legible `primary-foreground` color

#### Scenario: Editorial brand surface is displayed
- **WHEN** the olive contact or editorial callout surface is rendered
- **THEN** it uses a dedicated paired brand-surface role with a legible brand foreground instead of a raw color-named utility

#### Scenario: Standard shadcn component is rendered
- **WHEN** an installed shadcn component consumes theme variables
- **THEN** its colors remain consistent with the portfolio palette and meet the semantic purpose of the component

### Requirement: Shared shadcn primitives
The public UI SHALL use installed shadcn primitives for supported controls and common interface patterns instead of maintaining parallel custom implementations.

#### Scenario: Button action is rendered
- **WHEN** the site displays a button-style action
- **THEN** it uses the shared shadcn Button and an appropriate built-in or deliberately defined variant

#### Scenario: Button-style navigation is rendered
- **WHEN** an internal or external link is visually presented as a button
- **THEN** the shared Button composes the correct anchor or Next.js Link element without invalid nested interactive elements

#### Scenario: Matching component exists
- **WHEN** the site needs an input, textarea, select, badge, separator, card, or comparable pattern that is already installed
- **THEN** it uses or composes the matching shadcn primitive rather than recreating that primitive with raw styled markup

#### Scenario: No matching component abstraction is needed
- **WHEN** markup represents document structure or page layout rather than a reusable interface primitive
- **THEN** it MAY remain semantic native markup with layout utilities

### Requirement: Accessible field composition
The contact form SHALL use the shared shadcn field and form-control composition while preserving its labels, option sets, keyboard behavior, and current non-submitting contact flow.

#### Scenario: Text field is rendered
- **WHEN** a contact text field is displayed
- **THEN** it is composed from `Field`, `FieldLabel`, and `Input` with matching label and control identifiers

#### Scenario: Option field is rendered
- **WHEN** project type or current project status is displayed
- **THEN** it uses the shared native select composition and preserves every existing option

#### Scenario: Message field is rendered
- **WHEN** the message field is displayed
- **THEN** it uses the shared `Textarea` within the same field composition

#### Scenario: Contact action is used
- **WHEN** the visitor activates the form's consultation action
- **THEN** the action continues to open the configured WhatsApp contact path and does not claim that a backend form submission occurred

### Requirement: Semantic typography roles
The public UI SHALL use named typography roles for body and heading content rather than referencing deleted or component-specific font variables.

#### Scenario: Body copy is rendered
- **WHEN** navigation, labels, supporting copy, or body text is displayed
- **THEN** it inherits or uses the shared sans typography role

#### Scenario: Editorial heading is rendered
- **WHEN** a page title, section heading, or editorial card title is displayed
- **THEN** it uses the shared heading typography role

### Requirement: Zero-radius geometry
The public UI SHALL render all visual surfaces, media, controls, and component states with square corners.

#### Scenario: Image or project media is rendered
- **WHEN** an image, image placeholder, gallery item, or project card is displayed
- **THEN** its computed border radius is zero

#### Scenario: Shared component is rendered
- **WHEN** a button, field, card, badge, overlay, avatar, or other installed component is displayed
- **THEN** its computed border radius and the border radius of its decorative pseudo-elements are zero

#### Scenario: New radius utility is introduced
- **WHEN** application or installed component markup includes a rounded, full, or arbitrary radius utility
- **THEN** the global design-system rule still resolves the rendered border radius to zero

### Requirement: Migration completeness
The semantic design-system migration SHALL remove active application references to superseded theme roles and duplicate control abstractions without changing public content or routes.

#### Scenario: Application styles are scanned
- **WHEN** the migration is complete
- **THEN** active application code contains no references to removed `surface`, `surface-strong`, `accent-strong`, `accent-soft`, `olive`, or display-font utilities

#### Scenario: Public site is built
- **WHEN** the production build renders all existing routes
- **THEN** route structure, Spanish content, project data, and static contact behavior remain available
