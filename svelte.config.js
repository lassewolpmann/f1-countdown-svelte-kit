import adapter from '@sveltejs/adapter-auto';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({ typescript: true, scss: true}),

	kit: {
		adapter: adapter(),
		alias: {
			$lib: 'src/lib',
			$models: 'src/models',
		}
	}
};

export default config;
