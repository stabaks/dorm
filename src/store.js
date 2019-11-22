import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie';
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navCollapsed: true,
    token: '',
    isLoadingShow: false,
    cardList: [],
    currentCard: 0
  },
  mutations: {
    switchCollapase(state) {
      state.navCollapsed = !state.navCollapsed
    },
    set_token(state, userInfo) {
      state.token = userInfo.token;
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo.userInfo))
      Cookies.set('userToken', userInfo.token, {
        expires: 7
      });
      Cookies.set('userName', userInfo.userInfo.userName, {
        expires: 7
      });
    },
    del_token(state) {
      state.token = ''
      window.localStorage.removeItem('userInfo')
      Cookies.set('userToken', '');
      Cookies.set('userName', null);
    },
    showCollapase(state) {
      state.navCollapsed = false;
    },
    unShowCollapase(state) {
      state.navCollapsed = true;
    },
    showLoading(state) {
      state.isLoadingShow = true;
    },
    hideLoading(state) {
      state.isLoadingShow = false;
    },
    routeItemToCardList(state, routeItem) {
      console.log(routeItem);
      if (!state.cardList.some(cardItem => cardItem.title === routeItem.name) && routeItem.name && routeItem.path !== '/home' && '/404') { // 去重
        const cardItem = {
          title: routeItem.name,
          path: routeItem.path
        };
        state.cardList.push(cardItem);
        setTimeout(() => {
          state.currentCard = state.cardList.length - 1;
        }, 100);
        console.log(state.currentCard);
      }
    },
    getCurrentCard(state) {
      state.cardList.forEach((card, index) => {
        if (router.currentRoute.path === card.path) {
          state.currentCard = index
        }
      })
    },
    resetCardList(state) {
      state.cardList = [];
    },
    // setCurrentCard(state, cardName) {
    //   // state.currentCard = 
    //   console.log(cardName);
    // }
  },
  getters: {
    // getCurrentCard: state => {
    //   // console.log(router.currentRoute.path);
    //   state.cardList.forEach((card, index) => {
    //     if (router.currentRoute.path === card.path) {
    //       state.currentCard = index
    //     }
    //   })
    // }
  }
})