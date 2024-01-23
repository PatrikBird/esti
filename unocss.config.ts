import { defineConfig } from 'unocss'

// Presets
// https://unocss.dev/presets/
import PresetAttributify from '@unocss/preset-attributify'
import PresetIcons from '@unocss/preset-icons'
import PresetTypography from '@unocss/preset-typography'
import PresetUno from '@unocss/preset-uno'
import PresetWebFonts from '@unocss/preset-web-fonts'
import TransformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  shortcuts: [
    {
      myLink: 'font-semibold cursor-pointer text-blue-600 no-underline hover:underline dark:text-blue-400',
      secondaryBtn: 'inline-flex items-center justify-center rounded-md bg-white border border-zinc-200 p-5 text-sm font-medium shadow-sm hover:bg-zinc-100 focus:(outline-none ring-1 ring-zinc-500 ring-offset-2 ring-offset-zinc-100) dark:(border-none border-zinc-700 bg-zinc-800 hover:bg-zinc-700 focus:ring-offset-zinc-900)',
      fancyGradient: 'dark:bg-gradient-to-r dark:from-emerald-400 dark:via-sky-500 dark:to-blue-600 dark:bg-clip-text dark:text-transparent',
      // tooltipText: 'p2 text-xs bg-zinc-800 text-white dark:(text-zinc-800 bg-zinc-100)'
    },
    [/^size-(\w+)$/, ([_, num]) => `h-${num} w-${num}`],
  ],
  presets: [
    PresetAttributify({
    }),
    PresetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      prefix: 'i-',
      scale: 1.5,
      warn: true,
    }),
    PresetTypography({
      selectorName: 'prose',
    }),
    PresetUno({
      /* Inherits: @unocss/preset-wind, @unocss/preset-mini */
    }),
    PresetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'Inter:400,600,800',
      },
    }),
  ],
  theme: {
    breakpoints: {
      'xs': '470px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'xxl': '1536px',
    },
  },
  transformers: [
    transformerVariantGroup(),
    TransformerDirectives({
    }),
  ],
})
