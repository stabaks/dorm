import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Fragment from 'vue-fragment'
// 动态添加路由
import { getMenuData } from "./common/api";
import { menusToRoutes } from "./common/utils"
//引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入
import { GetUrlRelativePath } from './common/utils'
Vue.config.productionTip = false

Vue.use(Fragment.Plugin)
Vue.use(ElementUI);

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to,from,next) => {
  NProgress.start();
  next();
  // 这样每次都会添加一次路由   需要改进
  getMenuData().then(res => {
    if (res.data.length !== 0 && res.data) {
      const newRoute = menusToRoutes([...res.data]);
      router.options.routes = newRoute;
      router.addRoutes(newRoute);
    }
  });
  // if (store.token) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //      // if current page is home will not trigger   afterEach hook, so manually handle it
  //   } else {
  //     const fromPath = GetUrlRelativePath(window.location.href)
  //     if (!store.token) {
  //       store.dispatch('GetInfo').then(res => { // 拉取用户信息
  //         const roles = res.data.roles
  //         store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
  //           router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
  //           next({ path: fromPath })
  //         })
  //       }).catch((err) => {
  //         store.dispatch('FedLogOut').then(() => {
  //           Message.error(err || 'Verification failed, please login again')
  //           next({ path: '/' })
  //         })
  //       })
  //     } else {
  //       next()
  //     }
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
