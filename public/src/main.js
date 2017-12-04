import Vue from 'vue';
import VueRouter from 'vue-router'
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ja';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(VueRouter)
Vue.use(Element, {locale});

import AppTop from './components/AppTop.vue';
import AppPhoto from './components/AppPhoto.vue';
import AppSlide from './components/AppSlide.vue';
const router = new VueRouter({
  routes: [
    { path: '/', component: AppTop },
    { path: '/photos', component: AppPhoto },
    { path: '/slide', component: AppSlide }
  ]
});

window.onload = function () {
  const app = new Vue({
    router
  }).$mount('#app');
};
