// 计算横向可滑动范围
export const initScroll = {
  data () {
    return {
      itemWidth: 0,
      itemMargin: 0
    }
  },
  methods: {
    initPics () {
      // 先判断是否有这个属性
      // 这里之所以要设置宽度，是因为.wrapper和.list的宽度一样大
      // 当.list的宽度大于.wrapper的宽度，才能横向滚动
      const itemWidth = this.itemWidth // 这里是设置列表每一项的宽度
      const margin = this.itemMargin
      // width是整个列表的宽度
      const width = (itemWidth + margin) * 6 - margin
      this.$refs.list.style.width = width + 'vw' // 设置.list的宽度的宽度
    }
  }
}

// 请求音乐播放地址
export const getMusicId = {
  computed: {
    getLength: {
      get () {
        return this.$store.state.musicPlay.playList.length + 1
      }
    },
    isMusicPlay () {
      return this.$store.state.musicPlay.musicId !== null
    }
  },
  methods: {
    getMusicId (musicId) {
      // 音乐id
      console.log(musicId)
      this.$store.commit('changeMusicId', parseInt(musicId))
      this.$store.commit('changeMusicIndex', this.getLength)
      this.$forceUpdate()
      this.musicCheck(musicId)
    }
  }
}
