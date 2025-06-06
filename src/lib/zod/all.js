/**
 * The following namespace style import can be used to acces the named exports
 * and als the JSdoc typedefs
 *
 * @example
 *
 * import * as Zods from '<path-to>/zod/all.js';
 *
 * JSdoc:
 * `@param {Zods.Name} name
 * `@param {Zods.Timeout} t
 *
 * Assert style:
 * Zods.String.parse(name);
 *
 * Parse style:
 * const name = Zods.Name.parse('Jens ');
 *
 * Use default export 'z':
 * // eslint-disable-next-line no-unused-vars
 * import z, * as Zods from '<path-to>/zod/all.js';
 *
 * z.string().parse(name);
 */

import { z } from 'zod';

export * from './generic.js';
export * from './javascript.js';
export * from './user.js';
export * from './web.js';

export default z;
