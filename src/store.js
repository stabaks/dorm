import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navCollapsed: false
  },
  mutations: {
    switchCollapase (state) {
      state.navCollapsed = !state.navCollapsed
    }
  },
  actions: {

  }
})
