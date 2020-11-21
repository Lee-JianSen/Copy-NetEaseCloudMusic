<template>
    <div>
        <div
                ref="bigPlayer"
                :style="{
          'background-image': `url(${musicInfo.picUrl})`,
          'animation-play-state': animationShow}"
                class="audio-com-box-max">
            <div class="musicContent">
                <div class="nav">
                    <van-cell
                            class="mc-cell"
                            :center="true"
                            :border="false"
                            :title="musicInfo.name === '' ? '正在播放电台' : musicInfo.name"
                            :label="musicInfo.singer"
                            title-class="titleText"
                            label-class="labelText">
                        <template #icon>
                            <van-icon
                                    @click="pushPop"
                                    color="#fff"
                                    size="24"
                                    name="arrow-down"/>
                        </template>
                    </van-cell>
                </div>
                <div
                        class="albumPic isrotate"
                        v-show="!isShowLrc"
                        @click="showLrc"
                        :style="{ 'animation-play-state': animationShow }">
                    <van-image
                            round
                            width="12rem"
                            height="12rem"
                            :src="musicInfo.picUrl"/>
                </div>
                <div class="lrcBox" v-show="isShowLrc" @click="showLrc">
                    <scroll class="contentLrc" ref="lyricList" :probe-type="3">
                        <div v-if="JSON.stringify(currentLyric) !== '{}'" class="lyric">
                            <p
                                    v-for="(line, index) in lines"
                                    ref="lyricLine"
                                    :key="index"
                                    :class="{ current: currentLineNum === index }"
                                    class="text">
                                {{ line.txt }}
                            </p>
                        </div>
                        <div v-else class="lyric">
                            <p
                                    v-for="line in lines"
                                    ref="lyricLine"
                                    :key="line.time"
                                    class="text">
                                {{ line.txt }}
                            </p>
                        </div>
                    </scroll>
                </div>
                <div class="musicController">
                    <div class="musicTopBtn">
                        <van-icon
                                :badge="commentCount === 0 ? '99+' : commentCount"
                                name="comment-o"
                                size="32px"
                                color="#bfbfbf"
                                @click="commentBtn"/>
                        <van-icon name="like-o" size="32px" color="#bfbfbf"/>
                    </div>
                    <div class="musicSlider">
                        <p class="currentTime">{{ getCurrentTime | formatSecond }}</p>
                        <van-slider
                                active-color="#c2463a"
                                v-model="currentTime2"
                                :max="getMaxTime"
                                @change="onChangeTime"
                                @input="onChanging">
                            <template #button>
                                <div class="custom-button"></div>
                            </template>
                        </van-slider>
                        <p class="maxTime">{{ getMaxTime | formatSecond }}</p>
                    </div>
                    <div class="musicAllBtn">
                        <img
                                v-show="playType === 1"
                                @click="changePlayType"
                                src="../../assets/cycle_list.png"
                                height="32"
                                width="32" alt=""/>
                        <img
                                v-show="playType === 2"
                                @click="changePlayType"
                                src="../../assets/random.png"
                                height="32"
                                width="32" alt=""/>
                        <img
                                v-show="playType === 3"
                                @click="changePlayType"
                                src="../../assets/loop.png"
                                height="32"
                                width="32" alt=""/>
                        <img
                                src="../../assets/previous.png"
                                height="32"
                                width="32"
                                @click="previousMusic" alt=""/>
                        <van-icon
                                v-show="changeIcons"
                                name="play-circle-o"
                                size="32px"
                                color="#bfbfbf"
                                @click.stop=" changeIcon"/>
                        <van-icon
                                v-show="!changeIcons"
                                name="pause-circle-o"
                                size="32px"
                                color="#bfbfbf"
                                @click.stop="changeIcon"/>
                        <img
                                src="../../assets/next.png"
                                alt=""
                                height="32"
                                width="32"
                                @click="nextMusic"/>
                        <img
                                src="../../assets/more.png"
                                alt=""
                                height="32"
                                width="32"
                                @click="more"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import scroll from './scroll'
import { Cell, Icon, Image as VanImage, Slider } from 'vant'
import { GetMusicLyricAPI } from '../../http/all-api'
import Lyric from 'lyric-parser'
import { realFormatSecond } from '../../tool/utils'

export default {
  name: 'maxMusicPlay',
  created () {
    this.Lyric(this.$store.state.musicPlay.musicId)
  },
  updated () {
    if (!this.isChangeTime) {
      this.currentTime2 = this.$store.state.currentTimer
    }
  },
  data () {
    return {
      animationShow: '',
      playType: 1,
      currentTime2: 0,
      isChangeTime: false,
      currentLyric: {},
      currentLineNum: 0,
      isShowLrc: false,
      lines: []
    }
  },
  computed: {
    musicId: {
      get () {
        return this.$store.state.musicPlay.musicId
      },
      set (nv) {
        return (this.$store.state.musicPlay.musicId = nv)
      }
    },
    changeIcons: {
      get () {
        return this.$store.state.musicPlay.changeIcon
      },
      set (nv) {
        return (this.$store.state.musicPlay.changeIcon = nv)
      }
    },
    getCurrentTime: {
      get () {
        return this.$store.state.currentTimer
      },
      set (nv) {
        return (this.$store.state.currentTimer = nv)
      }
    },
    getMaxTime: {
      get () {
        return this.$store.state.maxTimer
      },
      set (nv) {
        return (this.$store.state.maxTimer = nv)
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
    playList: {
      get () {
        return this.$store.state.musicPlay.playList
      },
      set (nv) {
        return (this.$store.state.musicPlay.playList = nv)
      }
    },
    commentCount: {
      get () {
        if (this.$store.state.commentCount >= 999) return '99+'
        return this.$store.state.commentCount
      },
      set (nv) {
        return (this.$store.state.commentCount = nv)
      }
    },
    audioEl () {
      return this.$store.state.audioEl
    }
  },
  methods: {
    pushPop () {
      this.$router.go(-1)
    },
    changeIcon () {
      this.animationShow =
          this.$store.state.musicPlay.isPlay ? 'paused' : 'running'
      console.log(this.animationShow)
      this.audioEl.startPlayOrPause()
      this.$store.commit('showIcon')
      if (Object.keys(this.currentLyric).length) {
        // this.currentLyric.togglePlay()
        this.$store.state.musicPlay.isPlay
        // eslint-disable-next-line multiline-ternary
          ? this.currentLyric.stop() : this.currentLyric.seek(this.audioEl.getCurrentTime() * 1000)
      }
    },
    // 拖动过程中，不改变滑块的值，才不会在拖动时滑块闪烁
    onChanging () {
      this.isChangeTime = true
    },
    onChangeTime (time) {
      console.log(time)
      this.currentTime2 = time
      this.isChangeTime = false
      this.audioEl.changeCurrentTime(time)
      if (Object.keys(this.currentLyric).length !== 0) {
        this.currentLyric.seek(this.audioEl.getCurrentTime() * 1000)
      }
    },
    nextMusic () {
      switch (this.playType) {
        case 1:
          console.log('执行列表循环下一首')
          this.audioEl.listLoop(0)
          break
        case 2:
          console.log('执行随机播放下一首')
          this.audioEl.randomPlay(0)
          break
        case 3:
          console.log('单曲下一首')
          this.audioEl.listLoop(0)
          break
      }
      this.$router.go(-1)
    },
    previousMusic () {
      if (this.playType === 1 || this.playType === 3) {
        // 单曲和列表循环的上一首
        this.audioEl.listLoop(-1)
      } else {
        // 随机上一首
        this.audioEl.randomPlay(-1)
      }
      this.$router.go(-1)
    },
    more () {
      this.show = !this.show
      this.openSheet()
    },
    musicDetailClick (item, index) {
      this.$store.commit('changeMusicId', item.id)
      this.$store.commit('changeMusicIndex', index)

      this.$router.go(-1)
      this.playList.forEach(value => {
        value.isColor = false
      })
      item.isColor = true
    },
    // 打开面板查找是否有相同的url，有就显示播放中的颜色
    openSheet () {
      // 排它
      this.playList.forEach(item => {
        item.isColor = false
      })
      const index = this.playList.findIndex(value => {
        return value.id === parseInt(this.musicId)
      })
      this.playList[index].isColor = true
    },
    removeBtn (index, item) {
      this.$delete(this.playList, index)
      if (this.$store.state.musicPlay.musicId === item.id) {
        this.$store.commit('changeMusicIndex', index - 1)
        this.nextMusic()
        this.playList.forEach(item => {
          item.isColor = false
        })
        setTimeout(() => {
          const index1 = this.playList.findIndex(value => {
            return value.id === parseInt(this.musicId)
          })
          this.playList[index1].isColor = true
        }, 1000)
      }
    },
    Lyric (id) {
      this.line = []
      GetMusicLyricAPI(id).then(res => {
        if (res.data.lrc !== undefined) {
          const lrc = res.data.lrc.lyric
          this.currentLyric = new Lyric(lrc, this.handleLyric)
          this.lines.push(...this.currentLyric.lines)
        } else {
          this.lines.push({
            time: 0,
            txt: '暂无歌词'
          })
        }
      }).catch(error => {
        console.log('获取歌词失败')
        console.log(error)
      })
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLineNum = lineNum
      // 若当前行大于3,开始滚动
      if (this.$refs.lyricList !== undefined) {
        if (lineNum > 5) {
          const lineEl = this.$refs.lyricLine[lineNum - 2]
          // 过了第3句歌词开始滚动歌词
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
      }
    },
    showLrc () {
      this.isShowLrc = !this.isShowLrc
      console.log(this.isShowLrc && Object.keys(this.currentLyric).length)
      if (this.isShowLrc && Object.keys(this.currentLyric).length !== 0) {
        this.$store.state.musicPlay.isPlay
        // eslint-disable-next-line multiline-ternary
          ? this.currentLyric.seek(this.audioEl.getCurrentTime() * 1000) : this.currentLyric.stop()
      }
    },
    changePlayType () {
      this.playType = this.playType + 1 > 3 ? 1 : this.playType + 1
    },
    commentBtn () {
      this.$router.push(
        {
          path: '/commentMusic',
          query: {
            musicName: this.musicInfo.name,
            singer: this.musicInfo.singer,
            musicPic: this.musicInfo.picUrl,
            id: this.$route.query.musicId
          }
        })
    }
  },
  filters: {
    // 将整数转化成分秒
    formatSecond (second = 0) {
      return realFormatSecond(second)
    }
  },
  components: {
    scroll,
    [Slider.name]:
      Slider,
    [Icon.name]:
      Icon,
    [VanImage.name]:
      VanImage,
    [Cell.name]:
      Cell
  }
}
</script>

<style scoped lang="less">
    @keyframes rotatePic {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .audio-com-box-max {
        position: relative;
        z-index: 2047;
        width: 100vw;
        align-items: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: 100% 100%;
        overflow: hidden;

        .musicContent {
            width: 100vw;
            height: 100vh;
            z-index: 999;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(50px);

            .lrcBox {
                text-align: center;

                .contentLrc {
                    width: 90vw;
                    height: 52vh;
                    margin: 10vh auto;
                    overflow: hidden;

                    .lyric {
                        color: white;

                        .text {
                            height: 120px;
                            font-size: 40px;
                            white-space: pre-wrap;
                        }

                        .current {
                            /*transition: font-size 0.5s;*/
                            font-size: 50px;
                            color: #c2463a;
                        }
                    }
                }
            }

            .musicController {
                position: absolute;
                bottom: 0;
                padding-bottom: 150px;

                .musicTopBtn {
                    margin-bottom: 20px;
                    text-align: center;

                    i {
                        margin: 30px;
                    }
                }

                .musicSlider {
                    display: flex;
                    margin: 0 100px;
                    align-items: center;
                    justify-content: space-between;
                    color: white;

                    .currentTime {
                        padding-right: 30px;
                    }

                    .maxTime {
                        padding-left: 30px;
                    }

                    .custom-button {
                        width: 26px;
                        height: 26px;
                        font-size: 10px;
                        line-height: 18px;
                        text-align: center;
                        background-color: #ffffff;
                        border-radius: 100px;
                    }
                }

                .musicAllBtn {
                    display: flex;
                    width: 100vw;
                    height: 300px;
                    align-items: center;
                    justify-content: space-around;
                }
            }

        }

        .nav {
            padding-left: 30px;
            padding-top: 30px;

            .mc-cell {
                background-color: transparent;

                .titleText {
                    margin-left: 40px;
                    width: 500px;
                    font-weight: 600;
                    font-size: 40px;
                    color: #f7f8fa;

                    .titleTextName {
                        color: #a7a6a7;
                        font-size: 26px;
                    }
                }
            }
        }

        .albumPic {
            display: flex;
            width: 700px;
            height: 700px;
            background-color: rgb(15, 14, 19);
            border-radius: 400px;
            margin: 0 auto;
            justify-content: center;
            align-items: center;
            position: relative;
            top: 150px;
        }

        .isrotate {
            animation: rotatePic 30s linear 0.2s infinite;
        }
    }
</style>
