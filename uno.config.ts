import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerVariantGroup } from 'unocss'

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'r-button': 'bg-transparent transition-colors rounded-md px-1em ring ring-current text-gray-800 dark:text-gray-200 hover:(text-gray)',
    'r-input': 'flex-1 px-1em py-.2em outline-none rounded-md bg-transparent transition-colors ring ring-current text-gray-800 dark:text-gray-200 focus:text-gray',
  },
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Inter', 'Noto Sans Simplified Chinese'],
        mono: ['Fira Mono:400,700'],
        hand: ['Dancing Script'],
      },
    }),
    presetAttributify (),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        'icon-park-outline': () => import('@iconify-json/icon-park-outline/icons.json').then(i => i.default),
        'simple-icons': () => import('@iconify-json/simple-icons/icons.json').then(i => i.default),
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})
