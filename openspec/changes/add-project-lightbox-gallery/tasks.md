## 1. Gallery Foundation

- [x] 1.1 Read the relevant bundled Next.js guides in `node_modules/next/dist/docs/` for Server/Client Component boundaries and image rendering before writing application code.
- [x] 1.2 Create a typed `ProjectGallery` client component that accepts the existing ordered `ProjectImage[]` data.
- [x] 1.3 Render the existing 4:3 project grid as semantic, labeled image buttons while preserving image order, cropping, and reveal presentation.

## 2. Lightbox Viewer

- [x] 2.1 Compose a controlled Dialog that opens from any grid image at its selected index and restores focus to that trigger when closed.
- [x] 2.2 Compose the installed Carousel inside a full-viewport dialog and synchronize its selected slide whenever the gallery opens or changes.
- [x] 2.3 Render every lightbox image with Next.js Image in a full-width, height-constrained `object-contain` stage that supports landscape, portrait, and narrow viewports without cropping.
- [x] 2.4 Add a labeled top-right close button and safe-area-aware bottom controls for previous, next, and the current `index / total` indicator.
- [x] 2.5 Implement disabled first/last boundary states without wrapping, including the single-image state.
- [x] 2.6 Verify the composed primitives support Escape, focus containment, left/right arrow keys, and horizontal swipe navigation, adding only the missing integration logic.
- [x] 2.7 Use semantic design tokens and reduced-motion-aware transitions consistent with the existing zero-radius visual system.

## 3. Project Page Integration

- [x] 3.1 Replace the project-detail route's direct image mapping with `ProjectGallery` while keeping the route, metadata, project content, and contact section server-rendered.
- [x] 3.2 Confirm closing the gallery preserves the current project page and scroll context.

## 4. Verification

- [ ] 4.1 Exercise the gallery state logic for opening different indices, navigating both directions, boundary disabling, closing, and a single-image collection using available non-browser checks.
- [ ] 4.2 Review dialog titles, control labels, focus behavior, image alt text, and semantic button markup against the accessibility scenarios.
- [ ] 4.3 Run `pnpm lint` and `pnpm build`, resolve all failures, and do not perform browser automation unless the user separately authorizes it.
