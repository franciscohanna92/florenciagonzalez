## Why

Project detail pages currently present images only as a static grid, which makes it difficult to inspect architectural and interior-design work at a useful size or move through a project as a coherent visual sequence. A focused lightbox gallery will improve image viewing on pointer and touch devices without changing the existing project content model.

## What Changes

- Make every image in a project detail gallery an interactive trigger that opens the selected image in a full-screen lightbox.
- Present project images at the largest size that fits the available viewport while preserving each image's aspect ratio.
- Add persistent previous and next controls at the bottom of the lightbox, with boundary-aware disabled states and a visible position indicator.
- Add a close control and support standard keyboard interactions, including Escape and arrow-key navigation.
- Support touch-friendly interaction, including swipe navigation, while maintaining accessible dialog and carousel semantics.
- Keep project pages server-rendered and isolate gallery interaction in a dedicated client component.

## Capabilities

### New Capabilities

- `project-lightbox-gallery`: Covers opening project images in a full-screen viewer, navigating the ordered image set, responsive image presentation, closing the viewer, and accessible pointer, keyboard, and touch interaction.

### Modified Capabilities

None.

## Impact

- Affects the project detail route and introduces a reusable client-side project gallery component.
- Reuses the existing project image data, Next.js image rendering, and installed shadcn/Base UI Dialog, Carousel, and Button components.
- Requires no API, schema, content-data, or new package changes.
- Adds interaction-focused component tests or equivalent automated checks for gallery state and accessibility behavior.
