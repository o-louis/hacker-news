import Vue from 'vue'
import App from './App.vue'
import routes from './routes/index'
import VueRouter from 'vue-router'

Vue.config.productionTip = false;

Vue.use(VueRouter);

var router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
