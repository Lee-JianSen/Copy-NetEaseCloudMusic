import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import actions from './actions'
import mutations from './mutations'

// 导入模块
import login from './modules/login'
import musicPlay from './modules/musicPlay'
import search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      paths: ['login', 'search']
    })
  ],
  state: {
    // 用途：顶部判断是否是home还是视频且切换颜色
    currentIndexRouter: 1,
    isShowDrawer: false,
    userInfo: {},
    currentTimer: 0,
    maxTimer: 0,
    musicIndex: 0,
    commentCount: 0,
    audioEl: null

  },
  mutations,
  actions,
  modules: {
    login,
    musicPlay,
    search
  }
})
