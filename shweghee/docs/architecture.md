# Farmart Home Style 7 Architecture

## Scope
- Static homepage implementation with modular `HTML/CSS/JS`.
- Direct migration path to WordPress custom blocks.

## Component Contract
- One folder per section inside `src/components`.
- One public initializer per section: `init<Component>(rootEl, config)`.
- Logic hooks use `data-*` attributes, not presentational classes.

## CSS Rules
- BEM naming for all section styles.
- Shared tokens in `src/styles/core/tokens.css`.
- Keep utilities minimal and generic.
- Prevent cross-component selectors.

## JavaScript Rules
- `src/scripts/app.js` owns composition/bootstrap only.
- `src/scripts/core/*` contains reusable utilities.
- Component scripts own their own events and rendering.

## WordPress Bridge
- `data-block` identifies future block slug.
- `data-field` marks serializable block attributes.
- `data-list` and `data-item-id` define repeatable content groups.

## Runtime
- `loadHomeData()` fetches `home.mock.json` with fallback object.
- `guardInit()` prevents duplicate component initialization.
- `app.js` passes shared `homeData` into each `init<Component>(rootEl, homeData)`.
