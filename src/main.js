import Vue from "vue";

// 按需引入 element-ui 组件
import "element-ui/lib/theme-chalk/index.css";//element-ui的css
import "./helper/registerElementComponents.js";
import ElementUI from 'element-ui' //element-ui的全部组件
Vue.use(ElementUI) //使用elementUI

import App from "./App.vue";
import router from "./router";
import "@/assets/style/reset.css";
import "@/assets/style/global.css";

// 注册自定义组件
import "@/helper/registerGlobalComponents.js";

// 引入请求实例
import request from "@/helper/request";

// 日期格式化过滤器

import { formatDate } from "@/helper/utilities";

// 引入loading组件

import Loading from "@/components/Loading/main";
import PopupProgress from "@/components/popup-progress";
import Message from "@/components/message";

// 开发环境捕获错误插件

// import NotificationPlugin from "./helper/notification.plugin";

// -----------zhou----------------
import axios from 'axios'
import NProgress from 'nprogress' // 引入nprogress插件
import store from './store'
Vue.prototype.$axios = axios
// axios.defaults.baseURL = 'http://localhost:9001'
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

if (process.env.NODE_ENV !== "production") {
  Vue.createElement = new Vue().$createElement;
  // Vue.use(NotificationPlugin);
  Vue.config.devtools = true;
}

// 创建axios实例
axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: 'http://localhost:9001',
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})
// 感觉这一段没有用
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.$http = axios.create({
  baseURL: "/api",
  headers:{
    post: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
  }
})

/**
 *  axios请求拦截器
 */
axios.interceptors.request.use(config => {
  NProgress.start() // 设置加载进度条(开始..)
  config.headers.Authorization = window.sessionStorage.getItem('JWT_TOKEN');
  console.log("config",config);
  return config;
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(
    function (response) {
      NProgress.done() // 设置加载进度条(结束..)
      if (response.data.code == 40300) { //如果返回的code==40300说明token错误或者token过期
        window.sessionStorage.clear();
        var vm = new Vue();
        vm.$message.error("您的登入状态已失效,请您重新登入~")
        return router.push("/login");
      } else {
        return Promise.resolve(response.data);
      }
    },
    function (error) {
      return Promise.reject(error)
    }
)

// 使用loading 组件

Vue.use(Loading);
Vue.use(PopupProgress);
Vue.use(Message);

// 注册日期格式化过滤器

Vue.filter("formatDate", formatDate);

Vue.config.productionTip = false;
Vue.prototype.request = request;

let vue  = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

export default vue;
