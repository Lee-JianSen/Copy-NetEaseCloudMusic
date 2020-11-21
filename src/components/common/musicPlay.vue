<template>
    <div class="musicPlay">
        <audio-com ref="audio" :audio-src="changeMusicUrls" />
        <!--        迷你播放器-->
        <div class="audio-com-box-min" @click.stop="pushToMaxMusicPlay">
            <van-image round width="30px" height="30px" :src="musicInfo.picUrl" />
            <div class="musicName">
                <p>{{ musicInfo.name === '' ? '正在播放电台' : musicInfo.name }}</p>
                <p class="tip">左右滑动可切换上下首</p>
            </div>
            <div class="musicIcon">
                <van-icon
                        v-show="changeIcons"
                        name="play-circle-o"
                        size="24px"
                        color="#bfbfbf"
                        @click.stop="$refs.audio.startPlayOrPause(-1), ChangeIcon()" />
                <van-icon
                        v-show="!changeIcons"
                        name="pause-circle-o"
                        size="24px"
                        color="#bfbfbf"
                        @click.stop="$refs.audio.startPlayOrPause(-1), ChangeIcon()" />
                <img
                        src="../../assets/more.png"
                        height="28"
                        width="28"
                        @click.stop="isMore"
                        alt="" />
            </div>
        </div>

        <transition name="move2">
            <div class="mask" v-show="show" @click.stop="isMore">
                <history-music-list class="list" @click.native="isMore" v-show="show" />
            </div>
        </transition>
    </div>
</template>

<script>
// 格式化音乐时间
import { Icon, Image as VanImage, Slider, Cell } from 'vant'
import AudioCom from './audioCom'
import historyMusicList from './historyMusicList'

export default {
  name: 'musicPlay',
  props: {
    musicId: {
      type: Number,
      default () {
        return null
      }
    }
  },
  mounted () {
    // 请求音乐播放地址，音乐信息，歌词
    console.log(this.musicId)
    this.$store.dispatch('getMusicUrl', this.musicId)
    this.$store.dispatch('getMusicDetail', this.musicId)
  },
  data () {
    return {
      show: false,
      selectColor: false,
      nextId: 0
    }
  },

  watch: {
    // 监听音乐id的变化
    musicId: {
      deep: true,
      handler (nv, ov) {
        this.$store.dispatch('getMusicUrl', nv)
        this.$store.dispatch('getMusicDetail', nv)
        this.$store.commit('NotPlaying')
      }
    }
  },
  computed: {
    changeIcons: {
      get () {
        return this.$store.state.musicPlay.changeIcon
      },
      set (nv) {
        return (this.$store.state.musicPlay.changeIcon = nv)
      }
    },
    changeMusicUrls: {
      get () {
        return this.$store.state.musicPlay.musicUrl
      },
      set (nv) {
        return (this.$store.state.musicPlay.musicUrl = nv)
      }
    },
    musicInfo: {
      get () {
        return this.$store.state.musicPlay.musicAllDetail
      },
      set (nv) {
        return (this.$store.state.musicPlay.musicAllDetail = nv)
      }
    },
    musicIndex1: {
      get () {
        return this.$store.state.musicIndex
      },
      set (nv) {
        return (this.$store.state.musicIndex = nv)
      }
    },
    playing1: {
      get () {
        return this.$store.state.musicPlay.isPlay
      },
      set (nv) {
        return (this.$store.state.musicPlay.isPlay = nv)
      }
    },
    playList: {
      get () {
        return this.$store.state.musicPlay.playList
      },
      set (nv) {
        return (this.$store.state.musicPlay.playList = nv)
      }
    }
  },
  methods: {
    ChangeIcon () {
      this.$store.commit('showIcon')
    },
    isMore () {
      this.show = !this.show
    },
    pushToMaxMusicPlay () {
      this.$router.push({
        path: '/big-music-play',
        query: { musicId: this.musicId }
      })
    }
  },
  components: {
    [Slider.name]: Slider,
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    AudioCom,
    [Cell.name]: Cell,
    historyMusicList
  }

}
</script>

<style scoped lang="less">
    .move2-enter-active,
    .move2-leave-active {
        transition: transform 0.7s;
    }

    /* 显示前或隐藏后的效果 */
    .move2-enter,
    .move2-leave-to {
        transform: translateY(100%);
    }

    .musicPlay {
        position: absolute;
        bottom: 0;
        z-index: 999;

        .mask {
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.6);
            text-align: center;

            .list {
                width: 100vw;
                position: absolute;
                left: 0;
                bottom: 0;
            }
        }

        .audio-com-box-min {
            width: 94.9vw;
            border: 1px solid #e5e5e5;
            border-radius: 10px;
            padding: 15px 25px;
            display: flex;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.99);
            // 音乐 歌手名字
            .musicName {
                flex: 3;
                padding-left: 25px;
                font-size: 36px;
                font-weight: 600;

                p {
                    width: 600px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .tip {
                    margin-top: 15px;
                    font-size: 24px;
                    color: #a7a6a7;
                }
            }

            /*音频图标*/

            .musicIcon {
                flex: 1;

                img {
                    margin-top: 15px;
                    margin-left: 50px;
                }
            }
        }
    }

</style>
