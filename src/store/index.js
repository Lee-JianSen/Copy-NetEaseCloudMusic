import Vue from 'vue'
import Vuex from 'vuex'

import persistedState from 'vuex-persistedstate'

// 导入模块
import login from './modules/login'
import musicPlay from './modules/musicPlay'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    persistedState({
      storage: window.sessionStorage,
      reducer (val) {
        return {
          token: val.login.token,
          currentIndexRouter: val.currentIndexRouter,
          historyList: val.historyList,
          isLogin: val.login.isLogin
        }
      }
    })
  ],
  state: {
    // 用途：顶部判断是否是home还是视频且切换颜色
    currentIndexRouter: 1,

    isShowDrawer: false,
    changeIcon: false,
    userInfo: {},
    currentTimer: 0,
    maxTimer: 0,
    musicIndex: 0,
    commentCount: 0,
    audioEl: null,
    historyList: [],
    searchResult: [],
    searchResultShow: false,
    searchResultList: [],
    guanjianci: '',
    addWord: '',
    searchWord: ''
  },
  mutations: {
    changeCurrentIndexRouter (state, index) {
      state.currentIndexRouter = index
    },
    toggleDrawer (state) {
      state.isShowDrawer = !state.isShowDrawer
    },
    changeMusicIndex (state, index) {
      state.musicIndex = index
    },
    changeCommentCount (state, count) {
      state.commentCount = count
    },
    changeAudioEl (state, el) {
      state.audioEl = el
    },
    historyBianLiList (state, haha) {
      state.historyList = haha
    },
    historyClean (state) {
      state.historyList = []
    },
    searchResult (state, result) {
      state.searchResult = result
    },
    searchResultShow (state, IsShow, Value) {
      if (Value === '') {
        state.searchResultShow = false
      }
      state.searchResultShow = IsShow
    },
    searchResultList (state, lists) {
      state.searchResultList = lists
    },
    guanjianci (state, item) {
      state.guanjianci = item
    },
    searchWord (state, val) {
      state.guanjianci = val
    },
    addWord (state, val) {
      state.addWord = val
    },
    cutWord (state) {
      state.addWord = ''
      console.log('cutword' + state.addWord)
    },
    searchWordFunc (state, val) {
      state.searchWord = val
    }
  },
  actions: {},
  modules: {
    login,
    musicPlay
  },
  getters: {}
})
