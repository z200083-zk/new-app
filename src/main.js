import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/base.css'
import { Select, Option, Card, Form, Input, Button, FormItem, RadioGroup, RadioButton, Message } from 'element-ui';

Vue.use(Select)
Vue.use(Option)
Vue.use(Card)
Vue.use(Form)
Vue.use(Button)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.component(Message.name, Message)

Vue.config.productionTip = false
Vue.prototype.$message = Message


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
