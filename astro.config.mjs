import { defineConfig } from 'astro/config';
export default defineConfig({output:'static',site:process.env.SITE_URL || 'https://keenansec.github.io',base:process.env.BASE_PATH || '/',trailingSlash:'always',markdown:{shikiConfig:{theme:'github-dark'}}});
