import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '192.168.1.44+3-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '192.168.1.44+3.pem')),
    },
    host: '192.168.1.44',
    port: 5173
  },
});
