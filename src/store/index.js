import Vue from 'vue'
import Vuex from 'vuex'

import { menu } from './menu.js'

Vue.use(Vuex)

const strict = process.env.NODE_ENV === 'development'
export default new Vuex.Store({
  strict,
  modules: { menu }
})
