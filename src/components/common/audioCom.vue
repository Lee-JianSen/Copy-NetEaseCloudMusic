<template>
    <div class="audioCom">
        <audio
                id="audio"
                ref="audio"
                :src="audioSrc"
                @play="onPlay"
                @pause="onPause"
                @timeupdate="onTimeupdate"
                @loadedmetadata="onLoadedmetadata"
                :autoplay="audioSrc !== ''"
                @ended="onEnded"
                controls="controls"
        />
    </div>
</template>

<script>
import { disorder } from '../../tool/utils'

export default {
  name: 'audioCom',
  props: {
    audioSrc: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.autoPlayMusic()// 调用所有浏览器自动音乐播放的函数
  },
  computed: {
    musicIndex1: {
      get () {
        return this.$store.state.musicIndex
      },
      set (nv) {
        return (this.$store.state.musicIndex = nv)
      }
    },
    playList: {
      get () {
        return this.$store.state.musicPlay.playList
      }
    },
    musicId: {
      get () {
        return this.$store.state.musicPlay.musicId
      }
    }
  },
  data () {
    return {
      isDisorder: false,
      disorderArr: []
    }
  },
  methods: {
    // 解决所有浏览器音乐自动播放的问题
    autoPlayMusic () {
      const _this = this

      /* 自动播放音乐效果，解决浏览器或者APP自动播放问题 */
      function musicInBrowserHandler () {
        _this.musicPlay(true)
        document.body.removeEventListener('touchstart', musicInBrowserHandler)
      }

      document.body.addEventListener('touchstart', musicInBrowserHandler)
    },
    // 音乐状态判断
    musicPlay (isPlay) {
      const media = document.getElementById('audio')
      if (isPlay && media.paused) {
        media.play()
      }
      if (!isPlay && !media.paused) {
        media.pause()
      }
    },
    // 控制音频的播放与暂停
    startPlayOrPause () {
      this.$store.state.musicPlay.isPlay ? this.pause() : this.play()
    },
    // 播放音频
    play () {
      console.log('执行 play')
      this.$refs.audio.play()
    },
    // 暂停音频
    pause () {
      console.log('执行 pause')
      this.$refs.audio.pause()
    },
    onPlay () {
      console.log('执行 onPlay')
      this.$store.commit('IsPlaying')
      this.$store.commit('changeAudioEl', this)
    },
    onPause () {
      console.log('执行 onPause')
      // this.$store.state.musicPlay.changeIcon = false;
      this.$store.commit('NotPlaying')
      this.$store.state.musicCurrentTime = this.$refs.audio.currentTime
    },
    // 当音频当前时间改变后，进度条也要改变,每秒触发一次
    onTimeupdate (el) {
      // console.log(el.target.currentTime);
      this.$store.state.currentTimer = el.target.currentTime
      // this.audio.currentTime =
      // this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
    },
    // 一个音频文件加入到audio时触发
    onLoadedmetadata (el) {
      this.$store.state.maxTimer = el.target.duration || this.$refs.audio.duration
    },
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数，index为当前播放秒数
    changeCurrentTime (index) {
      this.$refs.audio.currentTime = index
    },
    // 播放结束后
    onEnded () {
      console.log(this.$store.state.musicPlay.changeIcon)
      this.$store.commit('showIcon')
      console.log('音乐播放完了')
      switch (this.$parent.playType) {
        case 1:
          console.log('执行列表循环')
          this.listLoop(0)
          break
        case 2:
          console.log('执行随机播放')
          this.randomPlay(0)
          break
        case 3:
          console.log('单曲')
          this.loop()
          break
      }
    },
    getCurrentTime () {
      return this.$refs.audio.currentTime
    },
    // 单曲循环
    loop () {
      this.$refs.audio.currentTime = 0
      this.play()
      this.$store.commit('IsPlaying')
      this.$store.commit('showIcon')
    },
    // 列表循环
    listLoop (type) {
      const index = this.playList.findIndex(value => {
        return value.id === parseInt(this.musicId)
      })
      console.log('这里index')
      console.log(index)
      if (index !== -1) {
        this.musicIndex1 = index
      }
      if (this.playList.length === 1) {
        this.loop()
        return
      }
      if (this.musicIndex1 < this.playList.length) {
        console.log('true listLoopMusic')
        if (type === 0) {
          this.musicIndex1++
          if (this.musicIndex1 >= this.playList.length) {
            this.musicIndex1 = 0
          }
        } else {
          if (this.musicIndex1 > 0) {
            console.log('previousMusic true')
            this.musicIndex1--
          } else {
            console.log('else')
            this.musicIndex1 = this.playList.length - 1
          }
        }
        const nextId = this.playList[this.musicIndex1].id
        this.$store.commit('changeMusicId', nextId)
        this.$store.dispatch('getMusicUrl', nextId)

        this.$store.commit('NotPlaying')
        this.$store.commit('IsPlaying')
        this.$store.commit('showIcon')
      }
    },
    // 随机播放
    randomPlay (type) {
      // 创建新数组，js非基本类型引用为引用传递，打乱数组会影响原数组，所有需要
      // 创建新数组
      let arr
      // 只打乱一次
      if (!this.isDisorder) {
        console.log('打乱了')
        arr = this.playList.slice()
        this.disorderArr = disorder(arr)
        this.isDisorder = true
      }
      if (type === 0) {
        if (this.musicIndex1 < this.playList.length) {
          console.log('true listLoopMusic')
          this.musicIndex1++
          if (this.musicIndex1 >= this.playList.length) {
            this.musicIndex1 = 0
          }
        }
      } else {
        if (this.musicIndex1 > 0) {
          console.log('previousMusic true')
          this.musicIndex1--
        } else {
          console.log('else')
          this.musicIndex1 = this.playList.length - 1
        }
      }
      const nextId = this.disorderArr[this.musicIndex1].id
      console.log('nextId' + nextId)
      this.$store.commit('changeMusicId', nextId)
      this.$store.dispatch('getMusicUrl', nextId)
      this.$store.commit('IsPlaying')
      this.$store.commit('showIcon')
    }
  }
}
</script>

<style scoped lang="less">
    audio {
        display: none;
    }
</style>
