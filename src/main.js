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
import './common/css/style.css'
import './assets/style.scss'
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
  store.commit('showLoading');
  next();
    if (to.path === '/login') {
      next({ path: '/login' })
    } else {
      store.commit("routeItemToCardList", to);
      store.commit("getCurrentCard");
      if (from.path === '/' || from.path === '/login') {
        getMenuData().then(res => { // 再次请求当前资源加载入菜单
          if (res.data.length !== 0 && res.data) {
            const newRoute = menusToRoutes([...res.data]);
            router.options.routes = newRoute;
            router.addRoutes(newRoute);
          }
        });
      }
      
    }
  
})

router.afterEach(() => {
  NProgress.done()
  store.commit('hideLoading');
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
