import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navCollapsed: true,
    token: ''
  },
  mutations: {
    switchCollapase (state) {
      state.navCollapsed = !state.navCollapsed
    },
    set_token(state, userInfo) {
      state.token = userInfo.token;
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo.userInfo))
      Cookies.set('userToken', userInfo.token, {expires: 7});
      Cookies.set('userName', userInfo.userInfo.userName, {expires: 7});
    },
    del_token(state) {
      state.token = ''
      window.localStorage.removeItem('userInfo')
      Cookies.set('userToken', '');
      Cookies.set('userName', null);
    },
    showCollapase (state) {
      state.navCollapsed = false;
    },
    unShowCollapase (state) {
      state.navCollapsed = true;
    },
  },
  actions: {

  }
})
