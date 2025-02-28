/**
 * Generates text-based spacing units with with different scaling
 * units (ut, ct, ht)
 *
 * @param {number[]} values
 *   Array of pixel values to generate text-based spacing units for
 *
 * @returns {{[key: string]: string}}
 *   Generated text-based spacing units with ut, ct, and ht suffixes
 *
 * @throws {Error} If values is not an array or contains non-numeric values
 *
 * @example
 * generateTextBasedSpacing([1, 2, 4, 8])
 * // Returns:
 * // {
 * //   '1ut': 'calc(1px * var(--scale-text-ui))',
 * //   '2ut': 'calc(2px * var(--scale-text-ui))',
 * //   '1ct': 'calc(1px * var(--scale-text-content))',
 * //   '2ct': 'calc(2px * var(--scale-text-content))',
 * //   '1ht': 'calc(1px * var(--scale-text-heading))',
 * //   '2ht': 'calc(2px * var(--scale-text-heading))'
 * // }
 */
export function generateTextBasedSpacing(values) {
  if (!Array.isArray(values)) {
    throw new Error('values must be an array');
  }

  return values.reduce((units, value) => {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error(`Invalid spacing value: ${value}. Must be a number.`);
    }

    // Generate UI text spacing units
    units[`${value}ut`] = `calc(${value}px * var(--scale-text-ui))`;

    // Generate content text spacing units
    units[`${value}ct`] = `calc(${value}px * var(--scale-text-content))`;

    // Generate heading text spacing units
    units[`${value}ht`] = `calc(${value}px * var(--scale-text-heading))`;

    return units;
  }, {});
}

/**
 * Generates viewport-based spacing units with different scaling
 * units (p, vp, wp, hp)
 *
 * @param {number[]} values
 *   Array of pixel values to generate viewport-based spacing units for
 *
 * @returns {Object.<string, string>}
 *   Generated viewport-based spacing units:
 *   - p:  UI points (clamped scaling)
 *   - vp: Viewport points (min of width/height)
 *   - wp: Width points
 *   - hp: Height points
 *
 * @throws {Error} If values is not an array or contains non-numeric values
 *
 * @example
 * generateViewportBasedSpacing([1, 2, 4])
 * // Returns:
 * // {
 * //   '1p': 'calc(1px * var(--scale-ui))',
 * //   '1vp': 'calc(1px * var(--scale-viewport))',
 * //   '1wp': 'calc(1px * var(--scale-w))',
 * //   '1hp': 'calc(1px * var(--scale-h))'
 * // }
 */
export function generateViewportBasedSpacing(values) {
  if (!Array.isArray(values)) {
    throw new Error('values must be an array');
  }

  return values.reduce((units, value) => {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error(`Invalid spacing value: ${value}. Must be a number.`);
    }

    // Viewport points (min of width/height)
    units[`${value}vp`] = `calc(${value}px * var(--scale-viewport))`;
    // Width points
    units[`${value}wp`] = `calc(${value}px * var(--scale-w))`;
    // Height points
    units[`${value}hp`] = `calc(${value}px * var(--scale-h))`;
    // UI points
    units[`${value}p`] = `calc(${value}px * var(--scale-ui))`;
    return units;
  }, {});
}

/**
 * Generates semantic text style definitions for a specific text category
 * (content, UI, or heading). Each style includes a scaled font size and
 * line height.
 *
 * @param {{[key: string]: {size: number, lineHeight?: number}}} sizes
 *   Set of text sizes to generate styles for
 *
 * @param {'content' | 'ui' | 'heading'} category
 *   Text category to generate styles for
 *
 * @returns {{[key: string]: [string, {lineHeight: number}]}}
 *   Generated text styles in Tailwind format
 *
 * @throws {Error} If a size has an invalid size or lineHeight
 *
 * @example
 * const TEXT_CONTENT_SIZES = {
 *   sm: { size: 16, lineHeight: 1.5 },
 *   base: { size: 20, lineHeight: 1.5 },
 *   lg: { size: 24, lineHeight: 1.4 }
 * };
 *
 * generateTextStyles(TEXT_CONTENT_SIZES, 'content');
 * // Returns:
 * // {
 * //   'content-sm':
 * //     ['calc(16px * var(--scale-text-content))', { lineHeight: 1.5 }],
 * //   'content-base':
 * //     ['calc(20px * var(--scale-text-content))', { lineHeight: 1.5 }],
 * //   'content-lg':
 * //     ['calc(24px * var(--scale-text-content))', { lineHeight: 1.4 }]
 * // }
 */
export function generateTextStyles(sizes, category) {
  if (!sizes || typeof sizes !== 'object') {
    throw new Error('sizes must be an object');
  }

  if (!['content', 'ui', 'heading'].includes(category)) {
    throw new Error('category must be one of: content, ui, heading');
  }

  return Object.entries(sizes).reduce((result, [variant, config]) => {
    // Validate config
    if (!config || typeof config !== 'object') {
      throw new Error(
        `Invalid size config for "${variant}": must be an object`
      );
    }

    if (typeof config.size !== 'number') {
      throw new Error(
        `Invalid size for "${category}-${variant}": must be a number`
      );
    }

    if (
      config.lineHeight !== undefined &&
      typeof config.lineHeight !== 'number'
    ) {
      throw new Error(
        `Invalid lineHeight for "${category}-${variant}": must be a number`
      );
    }

    const { size, lineHeight = 1.5 } = config;

    result[`${category}-${variant}`] = [
      `calc(${size}px * var(--scale-text-${category}))`,
      { lineHeight }
    ];

    return result;
  }, {});
}

/**
 * Generates border radius styles with UI scaling
 *
 * @param {{[key: string]: string | {size: number}}} sizes
 *   Set of radius sizes to generate, either as:
 *   - Object with size property (e.g., { size: 10 })
 *   - Direct string value (e.g., '0px', '9999px')
 *
 * @returns {Object.<string, string>}
 *   Generated border radius styles in Tailwind format
 *
 * @throws {Error} If a value has an invalid type
 *
 * @example
 * const RADIUS_SIZES = {
 *   none: '0px',
 *   sm: { size: 10 },
 *   md: { size: 15 },
 *   full: '9999px'
 * };
 *
 * generateBorderRadiusStyles(RADIUS_SIZES)
 * // Returns:
 * // {
 * //   'none': '0px',
 * //   'sm': 'calc(10px * var(--scale-ui))',
 * //   'md': 'calc(15px * var(--scale-ui))',
 * //   'full': '9999px'
 * // }
 */
export function generateBorderRadiusStyles(sizes) {
  if (!sizes || typeof sizes !== 'object') {
    throw new Error('sizes must be an object');
  }

  return Object.entries(sizes).reduce((result, [variant, value]) => {
    if (typeof value === 'object' && value !== null) {
      // Handle {size: 10} format
      if (typeof value.size !== 'number') {
        throw new Error(
          `Invalid radius size for "${variant}": size must be a number`
        );
      }
      result[variant] = `calc(${value.size}px * var(--scale-ui))`;
    } else if (typeof value === 'string') {
      // Handle direct strings (like '0px' or '9999px')
      result[variant] = value;
    } else {
      throw new Error(
        `Invalid radius value for "${variant}": ` +
          `must be an object with size property or a string`
      );
    }
    return result;
  }, {});
}

/**
 * Generates border width styles with text-based scaling and explicit naming
 *
 * @param {{[key: string]: {size: number}}} sizes
 *   Set of border width sizes to generate
 *
 * @param {string} prefix
 *   Prefix to add before each variant name (default: 'width')
 *
 * @returns {{[key: string]: string}}
 *   Generated border width styles in Tailwind format
 *
 * @throws {Error} If a size has an invalid type
 *
 * @example
 * const BORDER_WIDTH_SIZES = {
 *   thin: { size: 1 },
 *   normal: { size: 2 },
 *   thick: { size: 4 }
 * };
 *
 * generateBorderWidthStyles(BORDER_WIDTH_SIZES, 'width')
 * // Returns:
 * // {
 * //   'width-thin': 'calc(1px * var(--scale-text))',
 * //   'width-normal': 'calc(2px * var(--scale-text))',
 * //   'width-thick': 'calc(4px * var(--scale-text))'
 * // }
 */
export function generateBorderWidthStyles(sizes, prefix = 'width') {
  if (!sizes || typeof sizes !== 'object') {
    throw new Error('sizes must be an object');
  }

  return Object.entries(sizes).reduce((result, [variant, value]) => {
    if (typeof value === 'object' && value !== null) {
      if (typeof value.size !== 'number') {
        throw new Error(
          `Invalid border width size for "${variant}": size must be a number`
        );
      }

      result[`${prefix}-${variant}`] =
        `calc(${value.size}px * var(--scale-text))`;
    } else {
      throw new Error(
        `Invalid border width value for "${variant}": ` +
          `must be an object with size property`
      );
    }
    return result;
  }, {});
}

/**
 * Generates stroke width styles with UI scaling and explicit naming
 *
 * @param {{[key: string]: {size: number}}} sizes
 *   Set of stroke width sizes to generate
 *
 * @param {string} prefix
 *   Prefix to add before each variant name (default: 'width')
 *
 * @returns {{[key: string]: string}}
 *   Generated stroke width styles in Tailwind format
 *
 * @throws {Error} If a size has an invalid type
 *
 * @example
 * const STROKE_WIDTH_SIZES = {
 *   thin: { size: 1 },
 *   normal: { size: 2 },
 *   thick: { size: 4 }
 * };
 *
 * generateStrokeWidthStyles(STROKE_WIDTH_SIZES, 'width')
 * // Returns:
 * // {
 * //   'width-thin': 'calc(1px * var(--scale-ui))',
 * //   'width-normal': 'calc(2px * var(--scale-ui))',
 * //   'width-thick': 'calc(4px * var(--scale-ui))'
 * // }
 */
export function generateStrokeWidthStyles(sizes, prefix = 'width') {
  if (!sizes || typeof sizes !== 'object') {
    throw new Error('sizes must be an object');
  }

  return Object.entries(sizes).reduce((result, [variant, value]) => {
    if (typeof value === 'object' && value !== null) {
      if (typeof value.size !== 'number') {
        throw new Error(
          `Invalid stroke width size for "${variant}": size must be a number`
        );
      }

      result[`${prefix}-${variant}`] =
        `calc(${value.size}px * var(--scale-ui))`;
    } else {
      throw new Error(
        `Invalid stroke width value for "${variant}": ` +
          `must be an object with size property`
      );
    }
    return result;
  }, {});
}
