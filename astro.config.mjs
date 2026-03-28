// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

//import org from "astro-org";

// https://astro.build/config
export default defineConfig({
    site: "https://blog.yoyojambo.com",
    image: {
        domains: ["avatars.githubusercontent.com"]
    },
    integrations: [mdx(), sitemap()],
    adapter: cloudflare({
        platformProxy: {
            enabled: true,
        },
    }),
});
