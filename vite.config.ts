import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vitePluginMDFormat from './plugin/vite-plugin-md-format'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vitePluginMDFormat(), react()],
})
