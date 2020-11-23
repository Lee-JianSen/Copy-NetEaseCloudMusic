<!--云村-->
<template>
    <div class="yunCun">
        <div class="topTitle">
            <h4 @click="TopClick">云村精选</h4>
            <btn-more title="查看更多" @click.native="TopClick" />
        </div>

        <horizontal-scroll ref="hScroll">
            <div ref="list" class="list">
                <div
                        v-for="(item, index) in yunCun"
                        :key="index"
                        class="gridItem">
                    <div class="playCount">
                        {{ item.creativeExtInfoVO.playCount | playCount }}次播放
                    </div>
                    <div class="songListInfo" @click="SongListClick(item.id)">
                        <van-image
                                fit="fill"
                                radius="5px"
                                height="120px"
                                :src="item.uiElement.image.imageUrl"
                        />
                        <p class="text">{{ item.uiElement.mainTitle.title }}</p>
                    </div>
                </div>
            </div>
        </horizontal-scroll>
    </div>
</template>

<script>
import HorizontalScroll from '../common/horizontalScroll'
import { initScroll } from '../../tool/mixin'
import BtnMore from '../common/btnMore'
import { Icon, Image as VanImage } from 'vant'

export default {
  name: 'yuncun',
  mixins: [initScroll],
  props: {
    yunCun: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.itemWidth = 30
        this.itemMargin = 5
        this.initPics()
        this.$refs.hScroll.refresh()
      }, 600)
    })
  },
  methods: {
    TopClick () {
      this.$toast('暂无更多')
    },
    SongListClick (id) {
      this.$toast('暂无页面')
    }
  },
  components: {
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    HorizontalScroll,
    BtnMore
  },
  filters: {
    playCount (num) {
      if (num >= 100000000) {
        num = Math.round(num / 10000000) / 10 + '亿'
      } else if (num >= 10000) {
        num = Math.round(num / 1000) / 10 + '万'
      }
      return num
    }
  }
}
</script>

<style scoped lang="less">
    .yunCun {
        padding: 30px;

        .topTitle {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }

        h4 {
            font-size: 44px;
        }

        .list {
            display: flex;
            justify-content: space-around;
        }

        .text {
            height: 90px;
            width: 300px;
            line-height: 52px;
            font-size: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            background-color: rgba(241, 241, 241, 0.7);
            color: rgba(119, 119, 119, 1);
            padding: 10px;
            word-wrap: break-word;
            white-space: pre-wrap;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }

    .gridItem {
        width: 100vw;
        position: relative;
        margin-right: 30px;
    }

    .playCount {
        position: absolute;
        bottom: 135px;
        left: 20px;
        z-index: 999;
        font-size: 36px;
        color: white;
    }
</style>
