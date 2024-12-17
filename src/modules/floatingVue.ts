import type { UserModule } from '~/types'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

export const install: UserModule = ({ app }) => {
  app.use(FloatingVue)
}
