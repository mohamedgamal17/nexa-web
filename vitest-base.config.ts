  // Learn more about Vitest configuration options at https://vitest.dev/config/
  import angular from '@analogjs/vite-plugin-angular';

  import { defineConfig } from 'vitest/config';

  export default defineConfig({
    plugins: [angular()],
    test: {
      globals: true,
      environment: 'jsdom', // VERY IMPORTANT
      setupFiles: ['src/test-setup.ts'],
    },
  });
