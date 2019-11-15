import Vue from 'vue';
import Router from 'vue-router';
import home from './views/Home';
import login from './views/Login';
import notFound from  '../public/404.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home'
    }
    },{
      path: '/home',
      name: 'home',
      component: home
    },{
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/404',
      name: '404',
      component: notFound
    }
  ]
})
