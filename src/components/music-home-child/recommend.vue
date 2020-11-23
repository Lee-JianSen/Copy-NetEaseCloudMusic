<!--推荐-->
<template>
    <div class="recommendPage">
        <van-swipe
                class="my-swipe"
                :autoplay="3000"
                indicator-color="#c2463a"
                :stop-propagation="false">
            <van-swipe-item v-for="(item, index) in bannerList" :key="index">
                <div class="bannerBox">
          <span
                  class="text"
                  :style="{ color: 'white', 'background-color': '#c2463a' }">
            {{ item.typeTitle }}</span>
                    <img
                            class="bannerImg"
                            :src="item.pic"
                            @click="BannerImgClick(item)"
                            alt="" />
                </div>
            </van-swipe-item>
        </van-swipe>
        <!--        轮播图下面的推荐-->
        <music-sort />
        <!--        推荐歌单-->
        <recommended-song-list
                v-if="songListInfoList.length > 0"
                :recommend-song-list="songListInfoList"
                :top-title="topTitle1"
                :btn-more="btnMore1" />
        <!--        推荐音乐-->
        <recommend-music
                v-if="Object.keys(recommendMusic).length > 0"
                :recommend-music="recommendMusic" />
        <!--   官方歌单-->
        <official-song-list
                v-if="officialSongInfoList.length > 0"
                :official-song-list="officialSongInfoList"
                :top-title="topTitle2"
                :btn-more="btnMore2" />

        <yun-cun v-if="yunCun.length>0" :yun-cun="yunCun" />
<!--        <yun-cun :yun-cun="yunCun" />-->
        <new-musci-or-disc
                v-if="newMusic.length > 0 && newDisc.length > 0"
                :new-disc="newDisc"
                :new-music="newMusic" />

        <!--                <live-->
        <!--                        v-if="liveInfoList.length>0"-->
        <!--                        :live-list="liveInfoList"-->
        <!--                        :top-title="topTitle3"-->
        <!--                        :btn-more="btnMore3"-->
        <!--                ></live>-->
    </div>
</template>

<script>
// 引入vant组件的轮播图
import { Swipe, SwipeItem, Loading } from 'vant'

// 引入组件
import MusicSort from './musicSort'
import RecommendedSongList from './recommendedSongList'
import RecommendMusic from './recommendMusic'
import OfficialSongList from './officialSongList'
import YunCun from './yunCun'
import NewMusciOrDisc from './newMusciOrDisc'

export default {
  name: 'recommend',
  data () {
    return {}
  },
  props: {
    bannerList: {
      type: Array,
      default () {
        return []
      }
    },
    recommendSongList: {
      type: Array,
      default () {
        return []
      }
    },
    songListInfoList: {
      type: Array,
      default () {
        return []
      }
    },
    recommendMusic: {
      type: Array,
      default () {
        return []
      }
    },
    topTitle1: String,
    btnMore1: String,

    officialSongList: {
      type: Object,
      default () {
        return {}
      }
    },
    officialSongInfoList: {
      type: Array,
      default () {
        return []
      }
    },
    topTitle2: String,
    btnMore2: String,

    yunCun: {
      type: Array,
      default () {
        return []
      }
    },

    liveList: {
      type: Object,
      default () {
        return {}
      }
    },
    liveInfoList: {
      type: Array,
      default () {
        return []
      }
    },

    topTitle3: String,
    btnMore3: String,

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
  methods: {
    BannerImgClick (item) {
      if (item.url !== null) {
        window.location.href = item.url
      } else {
        this.$toast('暂无数据')
      }
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Loading.name]: Loading,
    MusicSort,
    RecommendedSongList,
    RecommendMusic,
    OfficialSongList,
    YunCun,
    NewMusciOrDisc
  }
}
</script>

<style scoped lang="less">
    .my-swipe .van-swipe-item {
        margin-top: 30px;
        height: 500px;
    }

    .van-swipe-item {
        position: relative;
    }

    .bannerBox {
        width: 80vw;

        .bannerImg {
            margin: 0 15px 0 20px;
            width: 96vw;
            height: 500px;
        }

        .text {
            display: block;
            position: absolute;
            bottom: 0;
            right: 21px;
            font-size: 34px;
            padding: 10px;
            border-top-left-radius: 15px;
        }
    }

    .cont {
        list-style: none;
        white-space: nowrap;
        font-size: 12px;
        text-align: center;
        padding-right: 0.24rem;

        .cont-item {
            position: relative;
            display: inline-block;
            padding: 0.06rem 0 0.2rem;
            width: 600px;
            margin: 0 0.1rem;

            .cont-img {
                overflow: hidden;
                /*width: 600px;*/
                height: 0;
                padding-bottom: 100%;

                .img {
                    width: 100%;
                }
            }
        }
    }
</style>
