/**
 * Design System Configuration
 * Using CSS Custom Properties (variables) for consistent scaling
 *
 * @note
 * Make sure to import scaling.vars.postcss in your application.
 * It contains CSS variables used by the Tailwind theme extensions defined
 * below
 *
 * e.g. in your app.postcss:
 *
 * // @import "../src/lib/tailwind/extend/scaling/vars.postcss";
 *
 * Base units:
 * --scale-w: 0.052vw  (Viewport Width Point)
 * --scale-h: 0.09259vh (Viewport Height Point)
 * --scale-viewport: min(var(--scale-w), var(--scale-h)) (Viewport Point)
 * --scale-ui: clamp(0.3, var(--scale-viewport), 2) (UI Point)
 * --scale-text-content: clamp(0.75, var(--scale-viewport), 1.5) (Content Text)
 * --scale-text-heading: clamp(0.75, var(--scale-viewport), 2.25) (Heading Text)
 * --scale-text-ui: clamp(0.5, var(--scale-viewport), 1.25) (UI Text)
 *
 * --
 *
 * UI Points (p) - Clamped scaling values
 * Based on viewport scaling with minimum and maximum bounds
 * to ensure usability across all screen sizes
 *
 * > PREFERRED METHOD FOR UI ELEMENT SCALING
 *
 * Examples:
 * 5p  = 5px  at design size (clamps between 1.5px and 10px)
 * 10p = 10px at design size (clamps between 3px and 20px)
 * 20p = 20px at design size (clamps between 6px and 40px)
 *
 * Used for:
 * - Component padding and margins
 * - Interface element sizing
 * - Any UI element that needs responsive scaling with guardrails
 *
 * --
 *
 * Text-Based Spacing Units (ut, ct, ht)
 * Scaled by their respective text scaling variables
 *
 * > PREFERRED METHOD FOR TEXT-RELATED SPACING
 *
 * Examples:
 * 4ut = calc(4px * var(--scale-text-ui))       // UI text spacing
 * 4ct = calc(4px * var(--scale-text-content))  // Content text spacing
 * 4ht = calc(4px * var(--scale-text-heading))  // Heading text spacing
 *
 * Used for:
 * - ut: Button padding, form spacing, UI component margins
 * - ct: Paragraph margins, list spacing, content gaps
 * - ht: Heading margins, title spacing
 *
 * --
 *
 * Viewport Points (vp, wp, hp) - Responsive scaling values
 * vp: Uses min of width/height scaling
 * wp: Uses width-based scaling (1920px reference)
 * hp: Uses height-based scaling (1080px reference)
 *
 * > ALTERNATIVE SCALING METHODS
 *
 * Examples:
 * 10vp = calc(10px * var(--scale-viewport))
 * 10wp = calc(10px * var(--scale-w))
 * 10hp = calc(10px * var(--scale-h))
 *
 * Used for:
 * - Interface scaling that needs to fit both width and height
 * - Maintaining aspect ratio of design
 * - Preventing overflow in either direction
 */
import {
  generateTextBasedSpacing,
  generateViewportBasedSpacing,
  generateTextStyles,
  generateBorderRadiusStyles,
  generateBorderWidthStyles,
  generateStrokeWidthStyles
} from './util.js';

import {
  TEXT_POINT_SIZES,
  VIEWPORT_POINT_SIZES,
  TEXT_CONTENT_SIZES,
  TEXT_HEADING_SIZES,
  TEXT_UI_SIZES,
  RADIUS_SIZES,
  BORDER_SIZES,
  STROKE_SIZES
} from './config.js';

/* == Internals */

const TEXT_BASED_SPACING = generateTextBasedSpacing(TEXT_POINT_SIZES);
const VIEWPORT_BASED_SPACING =
  generateViewportBasedSpacing(VIEWPORT_POINT_SIZES);

/* == Exports */

export const spacing = {
  ...VIEWPORT_BASED_SPACING,
  ...TEXT_BASED_SPACING
};

export const fontSize = {
  ...TEXT_BASED_SPACING,

  // Named styles
  ...generateTextStyles(TEXT_CONTENT_SIZES, 'content'),
  ...generateTextStyles(TEXT_HEADING_SIZES, 'heading'),
  ...generateTextStyles(TEXT_UI_SIZES, 'ui')
};

export const borderRadius = {
  // Named styles
  ...generateBorderRadiusStyles(RADIUS_SIZES)
};

export const borderWidth = {
  // Named styles
  ...generateBorderWidthStyles(BORDER_SIZES, 'width')
};

export const strokeWidth = {
  // Named styles
  ...generateStrokeWidthStyles(STROKE_SIZES, 'width')
};
