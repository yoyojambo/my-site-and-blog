// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    site: "https://yoyojambo.com",
    image: {
        domains: ["avatars.githubusercontent.com"]
    },
	output: "static",
	adapter: cloudflare(),
    integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			theme: "monokai",
			langs: [],
			wrap: true
		},
	},
});
