## ADDED Requirements

### Requirement: Open a project image in context
The system SHALL present every image in a project detail gallery as an operable control and SHALL open the lightbox at the selected image's position in the ordered project image collection.

#### Scenario: Open from a pointer or touch interaction
- **WHEN** a visitor clicks or taps a project gallery image
- **THEN** the system opens the lightbox with that image selected

#### Scenario: Open from the keyboard
- **WHEN** a keyboard user focuses a project gallery image and activates it
- **THEN** the system opens the lightbox with that image selected

#### Scenario: Reopen from a different image
- **WHEN** a visitor closes the lightbox and subsequently activates a different project gallery image
- **THEN** the system reopens the lightbox at the newly selected image

### Requirement: Fit images within the available viewer
The system SHALL display the selected image within a full-viewport stage, SHALL preserve its intrinsic aspect ratio, and SHALL keep the complete image and gallery controls within the available viewport.

#### Scenario: Display a landscape image
- **WHEN** the selected image is landscape-oriented
- **THEN** the system enlarges it to fit the available stage without cropping or distortion

#### Scenario: Display a portrait image
- **WHEN** the selected image is portrait-oriented or taller than the available stage
- **THEN** the system constrains it by the available height without cropping, distortion, or displacement of the gallery controls

#### Scenario: View on a narrow viewport
- **WHEN** the lightbox is open on a narrow viewport
- **THEN** the image and controls remain usable without horizontal page overflow

### Requirement: Navigate the ordered gallery
The system SHALL provide persistent previous and next controls at the bottom of the lightbox, SHALL expose the selected image position and total image count, and SHALL prevent navigation beyond the collection boundaries.

#### Scenario: Move to the next image
- **WHEN** a visitor activates next while a later image exists
- **THEN** the system selects the following image and updates the position indicator

#### Scenario: Move to the previous image
- **WHEN** a visitor activates previous while an earlier image exists
- **THEN** the system selects the preceding image and updates the position indicator

#### Scenario: Reach the first image
- **WHEN** the first image is selected
- **THEN** the previous control is disabled and the next control remains available when the gallery contains another image

#### Scenario: Reach the final image
- **WHEN** the final image is selected
- **THEN** the next control is disabled and navigation does not wrap to the first image

#### Scenario: View a single-image project
- **WHEN** the project gallery contains exactly one image
- **THEN** both navigation controls are disabled and the position indicator reports `1 / 1`

### Requirement: Support keyboard and touch navigation
The system SHALL allow visitors to navigate with left and right arrow keys and with horizontal touch gestures while the lightbox is open.

#### Scenario: Navigate with arrow keys
- **WHEN** a visitor presses the left or right arrow key and a corresponding image exists
- **THEN** the system selects the previous or next image respectively

#### Scenario: Navigate with a swipe gesture
- **WHEN** a visitor performs a horizontal swipe toward an available adjacent image
- **THEN** the system selects that adjacent image

#### Scenario: Attempt keyboard navigation at a boundary
- **WHEN** a visitor presses an arrow key toward a collection boundary with no adjacent image
- **THEN** the selected image remains unchanged

### Requirement: Close the lightbox accessibly
The system SHALL expose a labeled close control, SHALL close in response to Escape, SHALL manage focus as a modal dialog, and SHALL return focus to the image control that opened it.

#### Scenario: Close with the close control
- **WHEN** a visitor activates the close control
- **THEN** the lightbox closes and focus returns to the originating gallery image

#### Scenario: Close with Escape
- **WHEN** a visitor presses Escape while the lightbox is open
- **THEN** the lightbox closes and focus returns to the originating gallery image

#### Scenario: Traverse controls with the keyboard
- **WHEN** a keyboard user moves focus while the lightbox is open
- **THEN** focus remains within the lightbox's operable controls until it closes

### Requirement: Preserve existing project-page behavior
The system SHALL retain the current project image order, grid presentation, static routing, metadata generation, and server-rendered page content outside the gallery interaction.

#### Scenario: View a project page before opening the lightbox
- **WHEN** a visitor loads a project detail page
- **THEN** the project content and ordered image grid render without requiring the lightbox to be open

#### Scenario: Close the lightbox
- **WHEN** the lightbox closes
- **THEN** the visitor returns to the same project page and scroll context without navigation or content changes
