<!--每日推荐音乐-->
<template>
    <div class="recommendMusic">
        <div class="topTitle">
            <h4>{{ recommendMusic[0][0].mainTitles }}</h4>
            <btn-more title="播放全部" @click.native="allPlayBtn" />
        </div>
        <horizontal-scroll ref="hScroll">
            <div ref="list">
                <recommend-music-com
                        :recommend-music="recommendMusic"
                        @playMusicClick="getMusicId" />
            </div>
        </horizontal-scroll>
    </div>
</template>

<script>
import { initScroll, getMusicId } from '../../tool/mixin'
import BtnMore from '../common/btnMore'
import HorizontalScroll from '../common/horizontalScroll'
import RecommendMusicCom from './com/recommendMusicCom'

export default {
  name: 'recommendMusic',
  mixins: [initScroll, getMusicId],
  props: {
    recommendMusic: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.itemWidth = 53
      this.itemMargin = 8
      setTimeout(() => {
        this.initPics()
        this.$refs.hScroll.refresh()
      }, 600)
    })
  },

  computed: {},
  methods: {
    allPlayBtn () {
      let allId = []
      console.log(this.recommendMusic)
      this.recommendMusic.creatives.forEach(value => {
        value.resources.forEach(item => {
          allId.push(item.resourceId)
        })
      })
      this.getMusicId(allId[0])
      allId = allId.join(',')
      this.$store.state.musicIndex = 0
      this.$store.dispatch('getMusicUrl', allId)
      this.$store.dispatch('getMusicDetail', allId)
    }
  },
  components: {
    BtnMore,
    HorizontalScroll,
    RecommendMusicCom
  }
}
</script>

<style scoped lang="less">
    .recommendMusic {
        margin: 50px 30px;

        .topTitle {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            text-align: center;
        }
    }
</style>
