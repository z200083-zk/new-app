import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/base.css'
import { Select, Option } from 'element-ui';

Vue.use(Select)
Vue.use(Option)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
