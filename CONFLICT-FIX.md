# Plugin Conflict Resolution

## Issue
When the twork-builder plugin is activated, the home page's Swiper slider stops working.

## Root Cause
The plugin's `slider-init.js` was targeting generic classes (`.hero-slider`, `.swiper-slide`) that are also used by the home page's Swiper implementation, causing conflicts.

## Solution
Updated `slider-init.js` to:

1. **Only target plugin-specific classes:**
   - `.twork-hero-slider` (plugin-specific)
   - `.wp-block-twork-hero-slider` (WordPress block class)
   - `[data-twork-slider="true"]` (data attribute selector)
   - Removed: `.hero-slider` (generic, used by home page)

2. **Only target plugin-specific slide classes:**
   - `.twork-hero-slide` (plugin-specific)
   - `.twork-slide` (plugin-specific)
   - Removed: `.swiper-slide` (generic, used by Swiper)

3. **Added Swiper conflict detection:**
   - Skip elements with `.swiper-initialized` class
   - Skip elements with `.swiper-wrapper` (Swiper structure)
   - Check if Swiper library is loaded before interfering

4. **Improved MutationObserver:**
   - Only watch for plugin-specific slider classes
   - Skip elements that already have Swiper initialized

## Result
- Plugin sliders work independently
- Home page Swiper works without interference
- No conflicts between plugin and external Swiper instances
- Better performance (plugin doesn't scan unnecessary elements)

## Testing
1. Activate plugin
2. Verify home page Swiper slider works
3. Verify plugin blocks work
4. Check browser console for conflicts (should be none)
