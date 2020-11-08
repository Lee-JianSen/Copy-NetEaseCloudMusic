import types from '../types'
import { GetMusicDetail, GetMusicUrlAPI } from '../../http/all-api'
import { Toast } from 'vant'
import { createMusicInfo } from '../../../model/dataInfo/musicInfo'
import { unique } from '../../tool/utils'

const musicPlay = {
  state: {
    musicId: null,
    musicUrl: null,
    isPlay: false,
    changeIcon: false,
    musicAllDetail: {},
    playList: []
  },
  mutations: {
    // musicId
    [types.CHANGE_MUSIC_ID] (state, newId) {
      state.musicId = newId
    },

    [types.CHANGE_MUSIC_URL] (state, newUrl) {
      state.musicUrl = newUrl
    },

    // 正在播放
    [types.IS_PLAY] (state) {
      state.isPlay = true
    },

    [types.NOT_PLAY] (state) {
      state.isPlay = false
    },

    [types.SHOW_ICON] (state, val) {
      if (val !== undefined) {
        state.changeIcon = val
      } else {
        state.changeIcon = !state.changeIcon
      }
    },

    [types.UPDATE_MUSIC_ALL_DETAIL] (state, { type, val }) {
      state.musicAllDetail[type] = val
    },

    [types.JOIN_PLAY_LIST] (state, data) {
      state.playList.push(data)
      state.playList = unique(state.playList)
    }
  },
  actions: {
    getMusicUrl (context, musicId) {
      GetMusicUrlAPI(musicId)
        .then(res => {
          if (res.data.data[0].url !== null) {
            context.commit('changeMusicUrl', res.data.data[0].url)
            context.commit('IsPlaying')
            context.commit('showIcon', false)
            context.commit('update_musicAllDetail', {
              type: 'musicUrl',
              val: res.data.data[0].url
            })
            // state.musicAllDetail.musicUrl = res.data.data[0].url;
          } else {
            Toast('获取音乐播放地址失败')
            context.commit('NotPlaying')
            context.commit('showIcon')
            context.commit('changeMusicUrl', '')
          }
        }).catch(error => {
          Toast('获取音乐播放地址失败')
          console.log('获取音乐url失败')
          console.log(error)
        })
    },
    getMusicDetail (context, musicId) {
      console.log(context)
      GetMusicDetail(musicId)
        .then(res => {
          let musicInfo
          res.data.songs.forEach(item => {
            musicInfo = createMusicInfo(item)
            const playList = {}
            for (const item in musicInfo) {
              // eslint-disable-next-line no-prototype-builtins
              if (musicInfo.hasOwnProperty(item)) {
                context.commit('update_musicAllDetail', {
                  type: item,
                  val: musicInfo[item]
                })
              }
            }
            //
            for (const item in musicInfo) {
              // eslint-disable-next-line no-prototype-builtins
              if (musicInfo.hasOwnProperty(item)) {
                playList[item] = musicInfo[item]
              }
            }
            context.commit('joinPlayList', playList)
          })
        })
        .catch(error => {
          console.log('获取音乐名字出错')
          console.log(error.message)
        })
    }
  }
}
export default musicPlay
