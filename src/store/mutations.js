const mutations = {
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
  }
}
export default mutations
