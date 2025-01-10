// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { waitForState } from '$lib/util/svelte/wait/index.js';

import { createPngResponse } from './mocks.js';

// > Mocks

beforeEach(() => {
	global.fetch = vi.fn();
});

afterEach(() => {
	// @ts-ignore
	delete global.fetch;
});

import ImageLoader from './ImageLoader.svelte.js';

describe('ImageLoader', () => {
	it('should load an image file via a chunked stream', async () => {
		// @ts-ignore
		fetch.mockResolvedValue(createPngResponse());

		const url = 'http://localhost/mock-png';

		/** @type {ImageLoader} */
		let imageLoader;

		const cleanup = $effect.root(() => {
			imageLoader = new ImageLoader({ url });

			expect(imageLoader.loaded).toEqual(false);

			imageLoader.load();
		});

		await waitForState(() => {
			return imageLoader.loaded;
		});

		// @ts-ignore
		expect(imageLoader.loaded).toEqual(true);

		// @ts-ignore
		expect(imageLoader.progress).toEqual({
			bytesLoaded: 67,
			size: 67,
			loaded: true
		});

		// @ts-ignore
		const blob = imageLoader.getBlob();

		expect(blob.size).toEqual(67);
		expect(blob.type).toEqual('image/png');

		cleanup();
	});
});
