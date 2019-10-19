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
// import { GetUrlRelativePath } from './common/utils'
// import Message from '../node_modules/element-ui/packages/message/index'
Vue.config.productionTip = false

Vue.use(Fragment.Plugin)
Vue.use(ElementUI);

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
  // 这样每次都会添加一次路由   需要改进
  // getMenuData().then(res => {
  //   if (res.data.length !== 0 && res.data) {
  //     const newRoute = menusToRoutes([...res.data]);
  //     router.options.routes = newRoute;
  //     router.addRoutes(newRoute);
  //   }
  // });
    if (to.path === '/login') {
      next({ path: '/login' })
      // if current page is home will not trigger   afterEach hook, so manually handle it
    } else {
      getMenuData().then(res => {
        if (res.data.length !== 0 && res.data) {
          const newRoute = menusToRoutes([...res.data]);
          router.options.routes = newRoute;
          router.addRoutes(newRoute);
          
        }
      })
    }
  
})

router.afterEach(() => {
  NProgress.done()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
