import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //   },
  // },
  // // Set base to your repository name for GitHub Pages deployment
  // // For custom domain or root deployment, change to '/'
  base: '/kiy0der-blog/',
})
