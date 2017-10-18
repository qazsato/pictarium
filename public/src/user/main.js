import EXIF from 'exif-js';
import Vue from 'vue';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ja';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue'

Vue.use(Element, {locale});

window.onload = function () {
  const app = new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
  });
}
