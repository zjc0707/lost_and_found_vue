// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './config/routerConfig'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min"
import './config/axiosConfig'
import common from './common/common'
import permission from "./common/permission";
import api from './common/api'
import store from './store'
import constant from "./common/constant";
Vue.prototype.api = api;
Vue.prototype.COMMON = common;
Vue.prototype.constant = constant;
Vue.prototype.permission = permission;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
