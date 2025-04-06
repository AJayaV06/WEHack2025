import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        headers: {
            // WARNING: Development only! Allows 'unsafe-eval' for HMR/dev tools and connects to Google API.
            // Review and tighten CSP for production builds.
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://generativelanguage.googleapis.com"
        }
    }
})