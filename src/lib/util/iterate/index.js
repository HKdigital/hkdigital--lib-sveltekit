/* ------------------------------------------------------------------ Imports */

import * as expect from '../expect/index.js';
import { smallestFirst, largestFirst } from '../compare/index.js';

import IterableTree from '../../classes/data/IterableTree.js';

/* ------------------------------------------------------------------ Exports */

/**
 * Filter all iterated elements
 *
 * @param {Iterable} iterable
 * @param {function} filterFn
 *
 * @returns {Generator} generator that produces items that pass the filter
 */
export function* filter(iterable, filterFn) {
	expect.iterable(iterable);
	expect.function(filterFn);

	for (const value of iterable) {
		if (filterFn(value)) {
			yield value;
		}
	}
}

// ---------------------------------------------------------------------- Method

/**
 * Map all iterated items
 * - Outputs transformed items
 *
 * @param {Iterable} iterable
 * @param {function} transformFn
 *
 * @returns {Generator} generator that produces transformed items
 */
export function* map(iterable, transformFn) {
	expect.iterable(iterable);
	expect.function(transformFn);

	for (const value of iterable) {
		yield transformFn(value);
	}
}

// ---------------------------------------------------------------------- Method

/**
 * Get an Iterator object that can be used to iterate over all
 * [ path, value ] entries in the object
 *
 * @param {Object} obj - Object to iterate
 *
 * @param {Object} [options] - Iteration options
 *
 * @param {boolean} [options.walkArrays=false]
 *   If set to true, the iterator will also iterate through Array objects
 *
 * @param {object} [options.expandPathKeys=false]
 *   If true, keys in the root object like "some.path.to" will be interpreted
 *   as paths in the object
 *
 * @param {object} [options.outputIntermediateNodes=false]
 *   If true, intermediate object nodes (not leaves) will be outputted too
 *
 * @param {object} [options.ignoreEmptyObjectLeaves=false]
 *   If true, no output will be generated for empty objects at the leaves of
 *   the object tree
 *
 * @return {Iterator} iterator object
 */
export function iterateObjectEntries(obj, options = {}) {
	let objectIterator;

	const depthFirst = undefined === options.depthFirst ? true : options.depthFirst;

	options = Object.assign({}, options);

	delete options.depthFirst;

	if (depthFirst) {
		objectIterator = new IterableTree(obj, options);
	} else {
		throw new Error('NOT IMPLEMENTED YET');

		// objectIterator
		//   = new hk.iterate._BreadthFirstIterableTree( obj, options );
	}

	return objectIterator.entries(); /* entry = [ arrPath, value ] */
}

// ---------------------------------------------------------------------- Method

/**
 * Get an Iterator object that can be used to iterate over all paths in
 * the object
 *
 * @param {Object} obj - Object to iterate
 *
 * @param {Object} [options] - Iteration options
 *
 * @param {boolean} [options.walkArrays=false]
 *   If set to true, the iterator will also iterate through Array objects
 *
 * @param {object} [options.expandPathKeys=false]
 *   If true, keys in the root object like "some.path.to" will be interpreted
 *   as paths in the object
 *
 * @param {object} [options.outputIntermediateNodes=false]
 *   If true, intermediate object nodes (not leaves) will be outputted too
 *
 * @param {object} [options.ignoreEmptyObjectLeaves=false]
 *   If true, no output will be generated for empty objects at the leaves of
 *   the object tree
 *
 * @return {Iterator} iterator object
 */
export function iterateObjectPaths(obj, options = {}) {
	let objectIterator;

	const depthFirst = undefined === options.depthFirst ? true : options.depthFirst;

	options = Object.assign({}, options);

	delete options.depthFirst;

	if (depthFirst) {
		objectIterator = new IterableTree(obj, options);
	} else {
		throw new Error('NOT IMPLEMENTED YET');

		// objectIterator
		//   = new hk.iterate._BreadthFirstIterableTree( obj, options );
	}

	return objectIterator.paths();
}

// ---------------------------------------------------------------------- Method

/**
 * Get an Iterator object that can be used to iterate over all values in
 * the object (at the leaves of the object tree)
 *
 * @param {Object} obj - Object to iterate
 *
 * @param {Object} [options] - Iteration options
 *
 * @param {boolean} [options.walkArrays=false]
 *   If set to true, the iterator will also iterate through Array objects
 *
 * @param {object} [options.expandPathKeys=false]
 *   If true, keys in the root object like "some.path.to" will be interpreted
 *   as paths in the object
 *
 * @param {object} [options.outputIntermediateNodes=false]
 *   If true, intermediate object nodes (not leaves) will be outputted too
 *
 * @param {object} [options.ignoreEmptyObjectLeaves=false]
 *   If true, no output will be generated for empty objects at the leaves of
 *   the object tree
 *
 * @return {Iterator} iterator object
 */
export function iterateObjectValues(obj, options) {
	const objectIterator = new IterableTree(obj, options);

	return objectIterator.values();
}

// ---------------------------------------------------------------------- Method

/**
 * Get a list of objects returned by an iterator in sorted order
 *
 * --
 *
 * @note Sorting requires that all values are evaluated, so all items must be
 *       iterated
 *
 * --
 *
 * @param {Iterable} it - Iterable items
 *
 * @param {function} getValueFn
 *   Function that gets the value from the iterated objects
 *
 * @param {boolean} [reversed=false]
 *   Sort in reversed order
 *
 *
 * @returns {array} objects outputted in sorted order
 */
export async function sortObjects({ it, getValueFn, reversed = false }) {
	expect.iterable(it);
	expect.function(getValueFn);

	const allItems = [];
	const valuesByItem = new WeakMap();

	// -- Gather all items and sort values in arrays

	for (const item of it) {
		allItems.push(item);
		valuesByItem.set(item, getValueFn(item));
	}

	// console.log( { sortValues } );

	// -- Sort all items using sortValues

	let compareFn;

	if (!reversed) {
		compareFn = smallestFirst;
	} else {
		compareFn = largestFirst;
	}

	allItems.sort((itemA, itemB) => {
		const valueA = valuesByItem.get(itemA);
		const valueB = valuesByItem.get(itemB);

		return compareFn(valueA, valueB);
	});

	// -- Return result

	return allItems;
}
