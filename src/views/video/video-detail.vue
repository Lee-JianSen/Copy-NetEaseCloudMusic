<template>
    <div class="videoDetail">
        <comm-nav title="视频详情"></comm-nav>
        <scroll
                class="content"
                ref="scroll"
                :pull-up-load="true"
                @pullingUp="pullingUp"
        >
            <div>
                <vue-mini-player
                        ref="vueMiniPlayer"
                        :mutex="true"
                        :video="playerOptions"
                        @videoPlay="onVideoPlay"
                        @fullscreen="handleFullscreen"
                />
                <div class="info">
                    <h4>{{ videoDetail.title }}</h4>
                    <p>
                        {{ $route.query.playTime | playCount }}播放
                        <span>{{ videoDetail.publishTime | formatDate }}</span>
                    </p>

                    <div class="orderInfo">
                        <div
                                class="musicSort-item"
                                :class="{ like: videoDetailInfo.liked }"
                                @click="goodClick"
                        >
                            <van-icon size="24" name="good-job-o" />
                            <p>{{ videoDetailInfo.likedCount | playCount }}</p>
                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="send-gift-o" />
                            <p>{{ videoDetail.subscribeCount | playCount }}</p>
                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="comment-o" />
                            <p>{{ videoDetailInfo.commentCount | playCount }}</p>
                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="cluster-o" />
                            <p>{{ videoDetailInfo.shareCount | playCount }}</p>
                        </div>
                    </div>
                    <van-cell
                            class="myCell"
                            center
                            :title="videoDetail.nickname"
                            value-class="valueText"
                    >
                        <template #icon>
                            <van-image
                                    class="avatarPic"
                                    width="2rem"
                                    height="2rem"
                                    round
                                    :src="videoDetail.avatarUrl"
                            >
                            </van-image>
                        </template>
                    </van-cell>
                </div>
                <div class="divider"></div>
                <div class="relatedVideo">
                    <h4>相关视频</h4>
                    <div class="topBox">
                        <van-cell
                                v-for="(item, index) in videoRelated"
                                class="mc-cell"
                                :center="true"
                                :border="false"
                                :key="index + 5"
                                title-class="titleText"
                                @click="ToDetail(index)"
                        >
                            <!--                            :title="value.uiElement.mainTitle.title"-->
                            <template #title>
                                <p>
                                    {{ item.title }}
                                </p>
                            </template>
                            <template #label>
                                <p class="labelTextStyle">
                                    {{ item.durationms | formatDuring }}&nbsp; by &nbsp;
                                    {{ item.userName }}
                                    <span class="mvBox" v-if="item.type === 0">mv</span>
                                </p>
                            </template>
                            <template #icon>
                                <van-image
                                        class="leftImage"
                                        width="6rem"
                                        height="4.2rem"
                                        radius="5"
                                        :src="item.coverUrl"
                                        alt=""
                                >
                                </van-image>
                            </template>
                        </van-cell>
                    </div>
                </div>
                <div class="marvellousVideo">
                    <h4>精彩评论</h4>
                    <div class="hot" v-if="hotComment.length > 0">
                        <div v-for="(item, index) in hotComment" :key="index">
                            <van-cell
                                    :border="false"
                                    center
                                    title-class="titleText"
                                    value-class="likeCountText"
                                    label-class="timeText">
                                <template #title>
                                    <p>{{ item.nickname }}</p>
                                </template>
                                <template #label>
                                    <p>{{ item.time | formatDate }}</p>
                                </template>
                                <template #icon>
                                    <van-image
                                            class="avatarPic"
                                            round
                                            width="2.3rem"
                                            height="2.3rem"
                                            :src="item.avatarUrl"
                                    >
                                    </van-image>
                                </template>
                                <template #default>
                                    <div
                                            class="valueText"
                                            :class="{ like: item.isLike }"
                                            @click="goodCommentClick(index, 0)">
                                        <p>{{ item.likedCount | playCount }}</p>
                                        <van-icon size="20" name="good-job-o" />
                                    </div>
                                </template>
                            </van-cell>
                            <div class="contentText">
                                <p>{{ item.content }}</p>
                            </div>
                            <van-divider></van-divider>
                        </div>
                        <div v-if="hotComment.length === 0">
                            <p class="notComment">暂无精彩评论</p>
                        </div>
                    </div>
                    <h4>最近评论</h4>
                    <div class="new">
                        <div v-if="newComment.length > 0">
                            <div v-for="(item, index) in newComment" :key="index">
                                <van-cell
                                        :border="false"
                                        center
                                        title-class="titleText"
                                        value-class="likeCountText"
                                        label-class="timeText"
                                >
                                    <template #title>
                                        <p>{{ item.nickname }}</p>
                                    </template>
                                    <template #label>
                                        <p>{{ item.time | formatDate }}</p>
                                    </template>
                                    <template #icon>
                                        <van-image
                                                class="avatarPic"
                                                round
                                                width="2.3rem"
                                                height="2.3rem"
                                                :src="item.avatarUrl"
                                        >
                                        </van-image>
                                    </template>
                                    <template #default>
                                        <div
                                                class="valueText"
                                                :class="{ like: item.isLike }"
                                                @click="goodCommentClick(index, 1)"
                                        >
                                            <p>{{ item.likedCount | playCount }}</p>
                                            <van-icon size="20" name="good-job-o" />
                                        </div>
                                    </template>
                                </van-cell>
                                <div class="contentText">
                                    <p>{{ item.content }}</p>
                                </div>
                                <van-divider></van-divider>
                            </div>
                            <div v-if="newComment.length === 0">
                                <p class="notComment">暂无最近评论</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from '../../components/common/scroll'
import commNav from '../../components/nav/commNav'
import {
  GetVideoDetailAPI,
  GetVideoDetailInfoAPI,
  GetVideoRelatedAPI,
  GetVideoUrlAPI,
  GetVideoCommentAPI,
  GetResourceLikeAPI,
  GetLikeAPI
} from '../../http/all-api'
import { createVideoDetailInfo } from '../../../model/dataInfo/videoDetailInfo'
import { createVideoRelated } from '../../../model/dataInfo/videoRelatedInfo'
import { formatDate, unique, formatDuring } from '../../tool/utils'
import { Cell, Divider, Icon, Image as VanImage } from 'vant'
import { createCommentHotInfo } from '../../../model/dataInfo/commentInfo'

export default {
  name: 'video-detail',
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      vm.$toast.loading({
        message: '加载中',
        forbidClick: true,
        duration: 0
      })
      await GetVideoUrlAPI(vm.$route.query.vid)
        .then(res => {
          const videoUrl = res.data.urls[0].url
          if (videoUrl !== null) {
            vm.playerOptions.url = videoUrl
            vm.$refs.vueMiniPlayer.$video.src = videoUrl
            vm.$refs.vueMiniPlayer.$video.autoplay = true
          }
        })
        .catch(error => {
          console.log('跳转获取视频url失败')
          console.log(error)
        })

      await vm.getVideoDetailData(vm.$route.query.vid)
      await vm.getVideoDetailInfoData(vm.$route.query.vid)
      await vm.getVideoRelatedData(vm.$route.query.vid)
      await vm.getVideoCommentData({
        id: vm.$route.query.vid,
        limit: vm.newLimit
      })
      vm.$toast.clear()
    })
  },
  created () {
    if (this.$store.state.audioEl) {
      this.$store.state.audioEl.pause()
      if (!this.$store.state.musicPlay.changeIcon) this.$store.commit('showIcon')
    }
  },
  computed: {
    vid () {
      return this.$route.query.vid
    }
  },
  data () {
    return {
      playerOptions: {
        url: '',
        cover: '',
        muted: false,
        loop: false,
        preload: 'auto',
        volume: 1,
        autoplay: true,
        mutex: true
      },
      videoDetail: {},
      videoDetailInfo: {},
      videoRelated: [],
      hotComment: [],
      newComment: [],
      newLimit: 20
    }
  },
  methods: {
    // 视频详情
    getVideoDetailData (id) {
      GetVideoDetailAPI(id)
        .then(res => {
          const result = res.data.data
          this.videoDetail = createVideoDetailInfo(result)
        })
        .catch(error => {
          console.log('获取视频详情失败')
          console.log(error)
        })
    },
    getVideoDetailInfoData (vid) {
      GetVideoDetailInfoAPI(vid)
        .then(res => {
          const data = res.data
          this.videoDetailInfo.likedCount = data.likedCount
          this.videoDetailInfo.shareCount = data.shareCount
          this.videoDetailInfo.commentCount = data.commentCount
          this.videoDetailInfo.liked = data.liked
        })
        .catch(error => {
          console.log('获取点赞信息失败')
          console.log(error)
        })
    },
    goodClick (index) {
      const vid = this.vid
      let t
      if (this.videoDetailInfo.liked) {
        // 取消点赞
        t = 0
      } else {
        // 点赞
        t = 1
      }
      GetResourceLikeAPI({
        id: vid,
        t: t,
        type: 5
      })
        .then(res => {
          console.log('点赞成功')
        })
        .catch(error => {
          console.log('点赞失败')
          console.log(error)
        })
    },
    // 视频相关视频
    getVideoRelatedData (id) {
      GetVideoRelatedAPI(id)
        .then(res => {
          this.videoRelated = []
          const result = res.data.data
          result.forEach(item => {
            this.videoRelated.push(createVideoRelated(item))
          })
        })
        .catch(error => {
          console.log('相关视频请求失败')
          console.log(error)
        })
    },
    // 视频评论
    getVideoCommentData ({ id, limit }) {
      GetVideoCommentAPI(id, limit)
        .then(res => {
          const resultHot = res.data.hotComments
          const resultNew = res.data.comments
          resultHot.forEach(item => {
            this.hotComment.push(createCommentHotInfo(item))
          })
          resultNew.forEach(item => {
            this.newComment.push(createCommentHotInfo(item))
          })
          if (this.newComment.length !== 0) {
            this.newComment = unique(this.newComment)
            if (this.newComment.length >= 20) this.$refs.scroll.finishPullUp()
          }
        })
        .catch(error => {
          console.log('视频评论请求失败')
          console.log(error)
        })
    },
    pullingUp () {
      this.newLimit += 20
      this.getVideoCommentData({
        id: this.$route.query.vid,
        limit: this.newLimit
      })
    },
    onVideoPlay () {
      console.log('开始播放')
    },
    handleFullscreen () {
      console.log('全屏播放')
    },
    async ToDetail (index) {
      let videoUrl = null
      const vid = this.videoRelated[index].vid
      if (this.videoRelated[index].type === 0) {
        this.$router.push({
          path: '/music_nv',
          query: {
            vid: vid
          }
        })
      } else {
        this.$toast.loading({
          message: '加载中',
          forbidClick: true,
          duration: 0
        })
        await GetVideoUrlAPI(vid)
          .then(res => {
            videoUrl = res.data.urls[0].url
            console.log(videoUrl)
            if (videoUrl !== null) {
              this.playerOptions.url = videoUrl
              this.$refs.vueMiniPlayer.$video.src = videoUrl
              this.$refs.vueMiniPlayer.$video.autoplay = true
              this.playerOptions.cover = this.videoRelated[index].coverUrl
              this.getVideoDetailData(vid)
              this.getVideoRelatedData(vid)
              this.getVideoDetailInfoData(vid)
              this.hotComment = []
              this.newComment = []
              this.getVideoCommentData({
                id: vid,
                limit: this.newLimit
              })
              this.$toast.clear()
            }
          })
          .catch(error => {
            console.log('跳转获取视频url失败')
            console.log(error)
          })
      }
    },
    goodCommentClick (index, type) {
      // 0 热门   1 新评论
      const cid =
        type === 1 ? this.newComment[index].id : this.hotComment[index].id
      let t
      let typeC
      if (type === 1) {
        if (this.newComment[index].isLike) {
          // 取消点赞
          t = 0
        } else {
          // 未点赞
          t = 1
        }
        typeC = this.newComment[index]
      } else {
        if (this.hotComment[index].isLike) {
          // 取消点赞
          t = 0
        } else {
          // 未点赞
          t = 1
        }
        typeC = this.hotComment[index]
      }
      GetLikeAPI({
        id: this.vid,
        cid: cid,
        t: t,
        type: 5
      })
        .then(res => {
          if (t === 1) {
            typeC.likedCount++
            typeC.isLike = true
          } else {
            typeC.likedCount--

            typeC.isLike = false
          }
          console.log(typeC)
          console.log('点赞成功')
        })
        .catch(error => {
          console.log('点赞失败')
          console.log(error)
        })
    }
  },
  components: {
    Scroll,
    commNav,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
    [Divider.name]: Divider
  },
  filters: {
    formatDate (time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy年MM月dd日')
    },
    playCount (num) {
      if (num >= 100000000) {
        num = Math.round(num / 10000000) / 10 + '亿'
      } else if (num >= 10000) {
        num = Math.round(num / 1000) / 10 + '万'
      }
      return num
    },
    formatDuring (mss) {
      return formatDuring(mss)
    }
  }
}
</script>

<style scoped lang="less">
    .videoDetail {
        .content {
            .scrollStyle(120px);

            .info {
                padding: 30px;

                p {
                    padding-top: 30px;
                    color: #a7a6a7;
                    font-size: 36px;
                }

                h4 {
                    white-space: pre-wrap;
                }

                .orderInfo {
                    width: 95vw;
                    display: flex;
                    justify-content: space-around;
                    margin-top: 50px;

                    .musicSort-item {
                        text-align: center;
                        margin: 0 15px;
                        font-size: 36px;
                    }

                    .like {
                        color: #c2463a;
                    }
                }

                .myCell {
                    padding: 0;
                    margin-top: 50px;

                    .avatarPic {
                        padding-right: 15px;
                    }

                    .valueText {
                        display: flex;
                        justify-content: space-around;
                    }
                }
            }

            .divider {
                width: 100vw;
                height: 30px;
                background-color: rgb(245, 245, 245);
            }

            .relatedVideo {
                padding: 30px;

                .topBox {
                    .videoStyle();
                }

                .mvBox {
                    display: inline-block;
                    padding: 0 8px;
                    color: #c2463a;
                    border: 1px solid #c2463a;
                    border-radius: 6px;
                }
            }
        }

        .marvellousVideo {
            padding: 30px;

            .hot {
                .commentStyle();
            }

            .new {
                .commentStyle();
            }

            .notComment {
                font-size: 42px;
                width: 100vw;
                height: 500px;
                text-align: center;
                line-height: 500px;
                font-weight: bold;
            }
        }
    }
</style>
