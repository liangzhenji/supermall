import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FaastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//事件总线
Vue.prototype.$bus = new Vue()

//解决移动端延迟
FaastClick.attach(document.body)

//懒加载
Vue.use(VueLazyLoad)

Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

