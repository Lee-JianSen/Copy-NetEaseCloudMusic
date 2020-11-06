<template>
    <div class="newMusicOrDisc">
        <div class="topTitle">
            <h4>
        <span @click="showNewMusic" :class="{ notSelectColor: !isShowMusic }"
        >新歌</span>
                | <span
                    @click="showNewMusic"
                    :class="{ notSelectColor: isShowMusic }">新碟</span>
            </h4>
            <btn-more title="更多" />
        </div>
        <horizontal-scroll ref="hScroll">
            <div ref="list" class="list">
                <recommend-music-com
                        v-show="isShowMusic"
                        :recommend-music="newMusic"
                        @playMusicClick="getMusicId"
                />
                <recommend-music-com v-show="!isShowMusic" :recommend-music="newDisc" />
            </div>
        </horizontal-scroll>
    </div>
</template>

<script>
// vant导入
import { Cell, CellGroup, Image as VanImage, Icon } from 'vant'
import { initScroll, getMusicId } from '../../tool/mixin'
import BtnMore from '../common/btnMore'
import HorizontalScroll from '../common/horizontalScroll'
import recommendMusicCom from './com/recommendMusicCom'

export default {
  name: 'newMusciOrDisc',
  mixins: [initScroll, getMusicId],
  props: {
    newMusic: {
      type: Array,
      default () {
        return []
      }
    },
    newDisc: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.itemWidth = 25
      this.itemMargin = 5
      setTimeout(() => {
        this.initPics()
        this.$refs.hScroll.refresh()
      }, 600)
    })
  },
  data () {
    return {
      isShowMusic: true
    }
  },
  methods: {
    // getMusicId(musicId) {
    //     // 音乐id
    //     console.log(musicId);
    //     this.$store.commit('changeMusicId', musicId);
    //
    //     this.musicCheck(musicId);
    // },
    showNewMusic () {
      this.isShowMusic = !this.isShowMusic
    }
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    BtnMore,
    HorizontalScroll,
    recommendMusicCom
  }
}
</script>

<style scoped lang="less">
    .newMusicOrDisc {
        margin: 50px 30px;

        .topTitle {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            text-align: center;

            .notSelectColor {
                font-size: 36px;
                color: #a7a6a7;
            }
        }
    }
</style>
