import Vue from 'vue';
import App from './App.vue';
import './plugins/element.js';
import router from './router';

Vue.config.productionTip = false;

//引用接口
import http from "../http";

//在main.js引入 过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  return `${y}-${m}-${d}`
})


// 在原型上加上 http
Vue.prototype.$http = http;

Vue.mixin({
  methods: {
    getAuthorization() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
