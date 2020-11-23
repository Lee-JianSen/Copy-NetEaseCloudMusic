npm
<template>
    <div class="home">
        <tab-control
                :title="['推荐', '视频']"
                @tabClick="tabClick"
                ref="tabControl1"
        >
        </tab-control>
        <scroll
                class="content"
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true"
                @scroll="homeScroll"
                :pull-down-refresh="{
        threshold: 10,
        stop: 20
      }"
                @pullingDown="pullingDown"
        >
            <div>
                <div class="load" v-if="isLoading">
                    <van-loading size="24px" color="#c2463a">加载中...</van-loading>
                </div>
                <recommend
                        v-if="this.currentType === 'recommend'"
                        :bannerList="bannerList"
                        :songListInfoList="songListInfoList"
                        :recommendMusic="recommendMusic"
                        :topTitle1="topTitle1"
                        :btnMore1="btnMore1"
                        :officialSongList="officialSongList"
                        :officialSongInfoList="officialSongInfoList"
                        :topTitle2="topTitle2"
                        :btnMore2="btnMore2"
                        :yunCun="yunCun"
                        :liveList="liveList"
                        :liveInfoList="liveInfoList"
                        :topTitle3="topTitle3"
                        :btnMore3="btnMore3"
                        :newMusic="newMusic"
                        :newDisc="newDisc"
                />
                <video-home
                        v-if="this.currentType === 'video'"
                        :video-list="videoList"
                        :player-options="playerOptions"
                />
            </div>
        </scroll>
    </div>
</template>

<script>
// @ is an alias to /src
import TabControl from '../../components/music-home-child/tabControl'
import Scroll from '../../components/common/scroll'
import Recommend from '../../components/music-home-child/recommend'
import VideoHome from '../video/video-home'
import {
  GetBannerAPI,
  GetHomeFindAPI,
  GetVideoAPI,
  GetVideoDetailInfoAPI
} from '../../http/all-api'
import { Loading } from 'vant'
import { createVideo } from '../../../model/dataInfo/videoInfo'
import { debounce } from '../../tool/utils'
import { createSongList } from '../../../model/songList'
import {
  createNewMusicOrDisc,
  createRecommendMusicInfo
} from '../../../model/recommendMusicInfo'

export default {
  name: 'Home',

  created () {
    this.getBannerData()
    this.getHomeData()
  },
  data () {
    return {
      active: 0,
      currentType: 'recommend',
      toChangeHeight: false,
      bannerList: [],
      // 推荐歌单
      // recommendSongList: [],
      // 推荐歌单详情 图片/文案
      songListInfoList: [],
      // 推荐歌曲
      recommendMusic: [],
      // 推荐歌单的标题
      topTitle1: '',
      // 推荐歌单更多按钮文案
      btnMore1: '',
      // 官方歌单
      officialSongList: {},
      officialSongInfoList: [],
      // 官方歌单顶部标题
      topTitle2: '',
      // 官方歌单更多按钮文案
      btnMore2: '',
      // 云村
      yunCun: [],
      // 直播
      liveList: {},
      liveInfoList: [],
      topTitle3: '',
      btnMore3: '',
      // 新歌，新碟
      newMusic: [],
      newDisc: [],

      videoList: [],
      playerOptions: [],

      isLoading: false
    }
  },
  methods: {
    // 为下拉刷新初始化数据
    initData () {
      // 推荐歌单
      // recommendSongList: [],
      // 推荐歌单详情 图片/文案
      this.songListInfoList = []
      // 推荐歌曲
      this.recommendMusic = []
      // 推荐歌单的标题
      this.topTitle1 = ''
      // 推荐歌单更多按钮文案
      this.btnMore1 = ''
      // 官方歌单
      this.officialSongList = {}
      this.officialSongInfoList = []
      // 官方歌单顶部标题
      this.topTitle2 = ''
      // 官方歌单更多按钮文案
      this.btnMore2 = ''
      // 云村
      this.yunCun = []
      // 直播
      this.liveList = {}
      this.liveInfoList = []
      this.topTitle3 = ''
      this.btnMore3 = ''
      // 新歌，新碟
      this.newMusic = []
      this.newDisc = []
    },
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'recommend'
          break
        case 1:
          this.currentType = 'video'
          this.getVideoData()
          break
      }
    },
    homeScroll: debounce(function (position) {
      if (this.$store.state.musicPlay.musicId !== null && !this.toChangeHeight) {
        this.toChangeHeight = true
        this.$refs.scroll.$el.style.height = 80 + 'vh'
        this.$refs.scroll.refresh()
      }
    }, 100),

    async getBannerData () {
      this.bannerList = []
      await GetBannerAPI(1)
        .then(res => {
          if (res.data.banners.length !== 0) {
            // 将接口返回时轮播图数据解构加入新数组中
            this.bannerList.push(...res.data.banners)
          }
        })
        .catch(err => {
          console.log('轮播图网络请求失败')
          console.log(err)
        })
    },
    getHomeData () {
      GetHomeFindAPI()
        .then(res => {
          this.initData()
          let recommendSongList
          let recommendMusicObj
          let officialSongList
          let newMusicOrDec
          if (this.$store.state.login.isLogin) {
            recommendSongList = res.data.data.blocks[0]
            recommendMusicObj = res.data.data.blocks[1]
            officialSongList = res.data.data.blocks[2]
            newMusicOrDec = res.data.data.blocks[3]
          } else {
            recommendSongList = res.data.data.blocks[1]
            recommendMusicObj = res.data.data.blocks[2]
            officialSongList = res.data.data.blocks[4]
            newMusicOrDec = res.data.data.blocks[6]
            this.yunCun.push(...res.data.data.blocks[10].creatives)
          }
          // 推荐歌单数据
          recommendSongList.creatives.forEach(item => {
            const data = createSongList(item)
            this.songListInfoList.push(data)
          })

          // 推荐音乐数据
          recommendMusicObj.creatives.forEach((item, index) => {
            this.recommendMusic.push([])
            item.resources.forEach(value => {
              this.recommendMusic[index].push(
                createRecommendMusicInfo({
                  titleData: recommendMusicObj,
                  data: value
                })
              )
            })
          })

          // 官方歌单数据
          officialSongList.creatives.forEach(item => {
            const data = createSongList(item)
            this.officialSongInfoList.push(data)
          })

          // 新歌新碟
          newMusicOrDec.creatives
            .slice(0, 2)
            .forEach((item, index) => {
              this.newMusic.push([])
              item.resources.forEach(value => {
                this.newMusic[index].push(createNewMusicOrDisc(value))
              })
            })
          newMusicOrDec.creatives
            .slice(2, 4)
            .forEach((item, index) => {
              this.newDisc.push([])
              item.resources.forEach(value => {
                this.newDisc[index].push(createNewMusicOrDisc(value))
              })
            })

          // this.liveList = res.data.data.blocks[4];
          // this.liveInfoList.push(...this.liveList.extInfo.roomInfoList);

          if (recommendSongList.uiElement !== undefined) {
            this.topTitle1 = recommendSongList.uiElement.subTitle.title
            this.btnMore1 = recommendSongList.uiElement.button.text
          } else {
            return ''
          }
          if (officialSongList.uiElement !== undefined) {
            this.topTitle2 = officialSongList.uiElement.subTitle.title
            this.btnMore2 = officialSongList.uiElement.button.text
          } else {
            return ''
          }
          // 直播
          // if (this.liveList.uiElement !== undefined) {
          //     this.topTitle3 = this.liveList.uiElement.mainTitle.title;
          //     // this.btnMore3 = this.liveList.uiElement.button.text;
          // } else {
          //     return ''
          // }
          return res
        })
        .catch(error => {
          console.log('首页-发现出错')
          console.dir(error)
        })
    },
    async getVideoData () {
      this.videoList = []
      await GetVideoAPI().then(res => {
        const result = res.data.datas
        console.log(result)
        result.forEach(item => {
          this.videoList.push(createVideo(item.data))
        })
        if (this.videoList.length !== 0) {
          this.videoList.forEach(item => {
            GetVideoDetailInfoAPI(item.vid)
              .then(res => {
                const data = res.data
                item.praisedCount = data.likedCount
                item.shareCount = data.shareCount
                item.commentCount = data.commentCount
                item.isLiked = data.liked
              })
              .catch(error => {
                console.log('获取点赞信息失败')
                console.log(error)
              })
          })
        }
      })
      for (let i = 0; i < this.videoList.length; i++) {
        const arr = {
          url: this.videoList[i].srcUrl,
          cover: this.videoList[i].coverUrl,
          muted: false,
          loop: false,
          preload: 'auto',
          volume: 1,
          autoplay: false,
          mutex: true
        }
        this.playerOptions.push(arr)
      }
    },
    pullingDown () {
      this.isLoading = true
      if (this.currentType === 'recommend') {
        this.getBannerData()
        this.getHomeData()
      } else {
        this.getVideoData()
      }
      this.$refs.scroll.finishPullDown()
      this.$refs.scroll.refresh()
      this.isLoading = false
      console.log('刷新')
    }
  },
  components: {
    TabControl,
    Scroll,
    Recommend,
    VideoHome,
    [Loading.name]: Loading
  }
}
</script>
<style scoped lang="less">
    .load {
        padding-top: 15px;
        text-align: center;
    }

    .content {
        .scrollStyle(220px);
    }
</style>
