// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// import vercel from '@astrojs/vercel';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://effulgent-syrniki-1b536e.netlify.app',
  integrations: [react(), mdx(), sitemap(), tailwind()],
  adapter: netlify({
    edgeMiddleware: true
  }),
  output: 'server'
});