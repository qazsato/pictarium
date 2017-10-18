import Vue from 'vue';
import App from './App.vue'
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ja';
import 'element-ui/lib/theme-default/index.css';
Vue.use(Element, {locale});

window.onload = function () {
  new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
  });
}
