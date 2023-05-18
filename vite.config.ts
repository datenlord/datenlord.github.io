import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vitePluginMDFormat from './plugin/vite-plugin-md-format'
import { resolve } from 'path'

const srcPath = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/datenlord/',
  resolve: {
    alias: {
      '@/': `${srcPath}/`,
    },
  },
  plugins: [vitePluginMDFormat(), react()],
})
