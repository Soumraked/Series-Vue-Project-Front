import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueDisqus from 'vue-disqus'

import VueSession from 'vue-session'

import Crypto from 'crypto-js'

Vue.use(Crypto)

Vue.use(VueSession)
 
Vue.directive('title', {
  inserted: (el, binding) => document.title = binding.value,
  update: (el, binding) => document.title = binding.value
})

Vue.use(VueDisqus)
 
Vue.use(VueAxios, axios)

// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'https://us-central1-monosotakos.cloudfunctions.net/api';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
