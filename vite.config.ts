import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},

	// https://github.com/prisma/prisma/issues/12504#issuecomment-1285883083
	resolve: {
		alias: {
		  ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
		}
	}
});