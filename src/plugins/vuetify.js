import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import zhHans from 'vuetify/es5/locale/zh-Hans'

Vue.use(Vuetify)

const opts = {
  theme: {
    dark: true,
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
}

export default new Vuetify(opts)
