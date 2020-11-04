import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/style/tailwind.css'
import VueCountdown from '@chenfengyuan/vue-countdown'

Vue.component(VueCountdown.name, VueCountdown)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
