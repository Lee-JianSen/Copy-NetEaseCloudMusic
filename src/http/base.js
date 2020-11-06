import { GetMusicCheck } from './all-api'

export default {
  install (Vue) {
    // 检查歌词是否可用
    Vue.prototype.musicCheck = function (musicId) {
      GetMusicCheck(musicId)
        .then(res => {
          if (res.data.success === false) {
            this.$toast(res.data.message)
          }
        })
        .catch(error => {
          console.log('获取音乐是否可用失败')
          console.dir(error)
        })
    }
  }
}
