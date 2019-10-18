import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navCollapsed: true,
    token:''
  },
  mutations: {
    switchCollapase (state) {
      state.navCollapsed = !state.navCollapsed
    },
    set_token(state, token) {
      state.token = token
      Cookies.set('userToken', token, {expires: 7});
    },
    del_token(state) {
      state.token = ''
      Cookies.set('userToken', '');
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
