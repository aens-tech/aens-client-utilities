import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import 'dotenv/config'

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  output: 'hybrid',
  integrations: [mdx(), sitemap(), tailwind(), icon(), react()],
  server: {
    port: parseInt(process.env.PORT) || 4321, host: true
  }
});