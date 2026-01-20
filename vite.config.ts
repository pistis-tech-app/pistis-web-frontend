import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'redirect-without-trailing-slash',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/pistis-delete-account') {
            res.writeHead(302, { Location: '/pistis-delete-account/' });
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  base: '/pistis-delete-account/',
})
