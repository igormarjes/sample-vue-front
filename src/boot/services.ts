import * as services from 'src/services'

declare module 'vue/types/vue' {
  interface Vue {
    $services: typeof services;
  }
}

export default ({ Vue }) => {
  Vue.prototype.$services = services;
}
