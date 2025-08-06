// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

// Import the necessary remark plugins
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm'; // <-- Import this

// https://vitejs.dev/config/
export default defineConfig({
  base: '/telferbta-new-website/',
  plugins: [
    react(),
    mdx({
      // Add remarkGfm to your existing plugins array
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    }),
  ],
});