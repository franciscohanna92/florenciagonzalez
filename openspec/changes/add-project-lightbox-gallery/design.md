## Context

The project detail route is a Next.js server component that maps an ordered `project.images` array into a two-column grid of `ImagePlaceholder` client components. Images are currently displayed in fixed 4:3 tiles with `object-cover`; there is no enlarged viewer or navigation between images. The asset set contains both landscape and portrait images, so a viewer that always forces the rendered image to the viewport width can overflow vertically.

The project already includes shadcn components backed by Base UI, including Dialog, Carousel, and Button, plus Next.js Image and Phosphor icons. The solution must preserve server rendering for the route and follow the existing semantic design tokens and zero-radius visual language.

## Goals / Non-Goals

**Goals:**

- Open the ordered project image collection from any grid image, starting at the selected index.
- Provide an immersive full-screen viewer whose image stage uses the available viewport while preserving the source aspect ratio.
- Keep close, previous, next, and position feedback consistently available across viewport sizes.
- Support accessible dialog focus behavior, keyboard navigation, and touch gestures.
- Reuse installed UI primitives and the current project image model without adding dependencies.

**Non-Goals:**

- Zooming, panning, downloading, sharing, captions, thumbnails, or fullscreen-browser APIs.
- Editing project metadata or adding image dimensions to the scraped content.
- Changing the project grid layout outside the interaction needed to make its images operable.
- Adding lightboxes to home-page or project-index cards.

## Decisions

### Introduce a dedicated client gallery boundary

Create a `ProjectGallery` client component that accepts the serializable `ProjectImage[]` value. The project route will render this component in place of its current image-map block, allowing metadata generation, static params, project lookup, and the rest of the page to remain server-rendered.

Alternative considered: convert the entire project detail page to a client component. This would unnecessarily expand the client bundle and complicate the route's current server-only behavior.

### Compose the existing Dialog and Carousel primitives

Use Dialog for modal state, focus containment, Escape handling, backdrop behavior, and restoration of focus to the triggering image. Place the existing Carousel inside the dialog for ordered slides, arrow-key handling, swipe gestures, and boundary-aware navigation. Synchronize the carousel to the clicked image index each time the dialog opens rather than keeping a separate duplicate image list or creating one dialog per tile.

The dialog will include a visually hidden title, a labeled close control at the top-right, and a bottom control bar containing previous/next buttons and the current `index / total` position. Controls use the existing Button variants and Phosphor icons.

Alternative considered: implement modal, focus, keyboard, and swipe behavior with custom state and pointer handlers. That would duplicate capabilities already provided by installed, accessible primitives and increase interaction risk.

### Separate the full-screen stage from the fitted image

Make the dialog and image stage fill the viewport, reserving space for the close control and bottom navigation. Render each image with `object-contain`, constrained by both the stage width and height, so landscape and portrait assets remain fully visible without distortion or page scrolling. The stage is full-width; an image uses the full width when its aspect ratio permits and otherwise leaves neutral backdrop space around it.

Alternative considered: force every image to `width: 100%; height: auto`. Portrait assets would exceed shorter viewports and move the bottom controls off-screen, conflicting with persistent navigation.

### Make grid images explicit interactive controls

Render each gallery tile as a semantic button with an accessible label identifying the image and its position. Preserve the existing 4:3 cropped grid presentation and reveal treatment, while adding pointer/focus affordances through existing semantic tokens. The selected trigger remains the element to which focus returns after closing.

Alternative considered: attach click handlers to the existing non-interactive figure. That would omit native keyboard activation and button semantics.

### Stop navigation at collection boundaries

Disable previous on the first image and next on the final image. Do not wrap from the last image to the first. This matches the ordered project narrative and makes the collection boundaries explicit.

## Risks / Trade-offs

- [The existing Carousel API may initialize before the requested opening index is applied] → Synchronize through its exposed API on open and verify reopening from different grid tiles.
- [Large source images may increase memory use when many slides render at once] → Preserve Next.js image optimization and responsive sizing; avoid eager priority loading for all lightbox slides.
- [A full-screen overlay can conflict with control placement on mobile safe areas] → Include safe-area-aware spacing in the fixed top and bottom control regions.
- [Animations can cause discomfort] → Keep transitions restrained and honor reduced-motion preferences through existing primitives and motion configuration.
- [No browser automation is authorized by project instructions] → Validate with static checks and focused non-browser tests; leave interactive browser inspection to an explicitly requested follow-up.

## Migration Plan

1. Add the client gallery component using the current `ProjectImage` contract.
2. Replace only the project-detail image grid mapping with the gallery component.
3. Run formatting/linting, type/build checks, and available non-browser tests.
4. Roll back by restoring the original image mapping and removing the isolated gallery component; no data migration is required.

## Open Questions

None. Boundary navigation, fitting behavior, control placement, and interaction scope are defined for implementation.
