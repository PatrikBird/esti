import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.directive('visible', (el, binding) => {
    el.style.visibility = binding.value ? 'visible' : 'hidden'
  })
}
