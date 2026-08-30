import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true, // exposes the dev server on your local network (e.g. http://192.168.x.x:5173) so you can open it on your phone
  },
});
