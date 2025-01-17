import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import ChakraComponents from './playground/build/components.json'
import path from 'path'

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  optimizeDeps: {
    exclude: ['@popperjs/core', '@vueuse/core', '@vueuse/motion'],
  },
  build: {
    target: 'modules',
  },
  server: {
    watch: {
      ignored: ['**/*snapshots*'],
    },
  },
  plugins: [
    vue(),
    Pages({
      pagesDir: path.relative(__dirname, '../packages'),
      extensions: ['vue'],
      extendRoute(route, parent) {
        if (route.path === '/') {
          return route
        }
        const [groupRaw] = route.name!.split('-examples-')
        const [_, group] = groupRaw.split('c-')
        return {
          ...route,
          groupRaw,
          groupPath: `/${group}`,
          group,
        }
      },
    }),
    Components({
      resolvers: [
        (name: string) => {
          if (name in ChakraComponents) {
            return {
              importName: name,
              path: `@chakra-ui/vue-next`,
            }
          }
        },
      ],
    }),
  ],
})
