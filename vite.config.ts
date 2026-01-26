/// <reference types="vitest" />

import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { Features } from 'lightningcss'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import VueMacros from 'vue-macros/vite'
import VueRouter from 'vue-router/vite'

export default defineConfig(({ command }) => {
  const IS_DEV = process.env.NODE_ENV === 'development'
  const IS_PROD = !IS_DEV
  const IS_BUILD = command === 'build'

  const target = 'baseline widely available with downstream'

  return {
    resolve: {
      tsconfigPaths: true,
    },

    define: {
      // https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,

      IS_PROD,
      IS_DEV,
      IS_BUILD,
    },

    plugins: [
      // https://github.com/vue-macros/vue-macros
      VueMacros({
        plugins: {
          // https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
          vue: Vue({
            script: {
              defineModel: true,
            },
            template: {
              compilerOptions: {
                // hoistStatic: true,
              },
            },
            features: {
              propsDestructure: true,
              optionsAPI: false,
              prodDevtools: false,
            },
          }),
          // https://github.com/vitejs/vite-plugin-vue/blob/main/packages/plugin-vue-jsx
          vueJsx: vueJsx({
            optimize: true,
            transformOn: true,
            tsTransform: 'built-in',
          }),

          // https://github.com/posva/unplugin-vue-router
          vueRouter: VueRouter({
            routesFolder: 'src/pages',
            extensions: ['.vue', '.tsx'],
            /** files to exclude from router scan */
            exclude: ['**/components/**', '*.component.tsx', '*.component.vue'],
            dts: './src/types/typed-router.d.ts',
            /** (filepath: string) => 'sync' | 'async' */
            importMode: 'async',
          }),
        },
      }),

      // https://github.com/unplugin/unplugin-auto-import
      AutoImport({
        imports: [
          {
            vue: [
              'computed',
              'customRef',
              'defineAsyncComponent',
              'defineComponent',
              'effectScope',
              'inject',
              'nextTick',
              'onBeforeMount',
              'onBeforeUnmount',
              'onBeforeUpdate',
              'onMounted',
              'onScopeDispose',
              'onUnmounted',
              'onUpdated',
              'provide',
              'reactive',
              'readonly',
              'ref',
              'shallowReactive',
              'shallowReadonly',
              'shallowRef',
              'toRaw',
              'unref',
              'useCssModule',
              'useCssVars',
              'useId',
              'watch',
              'watchEffect',
              'watchPostEffect',
              'watchSyncEffect',
            ],
            'vue-router': ['useRoute', 'useRouter'],
            '@vueuse/core': ['unrefElement', 'useVModel'],
          },
        ],
        dts: './src/types/auto-imports.d.ts',
        // dirs: ['./src/composables'],
        vueTemplate: true,
      }),

      tailwindcss(),

      // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
      legacy({
        // render legacy chunks for non-modern browsers
        renderLegacyChunks: false,
        targets: target,
        modernTargets: target,
        modernPolyfills: true,
      }),
    ],

    build: {
      // disable inline base64
      assetsInlineLimit: 0,
      // FIXME: esbuild.drop: ['console', 'debugger']
      minify: 'oxc',
      cssMinify: 'lightningcss',
      rolldownOptions: { optimization: { inlineConst: true } },
    },

    css: {
      devSourcemap: true,
      transformer: 'lightningcss',
      lightningcss: {
        // https://lightningcss.dev/transpilation.html#feature-flags
        // Always transpile
        include: (Features.Colors ^ Features.LightDark) | Features.Nesting,

        // Never transpile
        exclude: Features.LogicalProperties | Features.MediaRangeSyntax | Features.LightDark,

        cssModules: {
          pattern: '[hash]',
          dashedIdents: false,
        },
      },
      modules: {
        generateScopedName: '[hash:base64:8]',
      },
    },

    // https://vitejs.dev/config/dep-optimization-options.html
    optimizeDeps: {
      include: ['@vueuse/core'],
    },

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },

    experimental: {
      enableNativePlugin: true,
    },
  }
})
