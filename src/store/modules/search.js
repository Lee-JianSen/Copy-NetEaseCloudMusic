const search = {
  state: {
    historyList: [],
    searchResult: [],
    searchResultShow: false,
    searchResultList: [],
    keyWords: '',
    addWord: '',
    searchWord: ''
  },
  mutations: {
    historyBianLiList (state, data) {
      state.historyList = data
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
      state.keyWords = item
    },
    searchWord (state, val) {
      state.keyWords = val
    },
    addWord (state, val) {
      state.addWord = val
    },
    cutWord (state) {
      state.addWord = ''
    },
    searchWordFunc (state, val) {
      state.searchWord = val
    }
  }
}

export default search
