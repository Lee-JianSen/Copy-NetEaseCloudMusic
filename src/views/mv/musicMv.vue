<template>
    <div class="musicMv">
        <comm-nav title="MV详情"></comm-nav>
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
                    <h4>{{ mvDetail.title }}</h4>
                    <p>
                        {{ mvDetail.playCount | playCount }}播放
                        <span>{{ mvDetail.publishTime }}发布</span>
                    </p>
                    <p class="desc">
                        {{ mvDetail.desc }}
                    </p>
                    <div class="orderInfo">
                        <div
                                class="musicSort-item"
                                :class="{ like: mvDetailInfo.liked }"
                                @click="goodClick"
                        >
                            <van-icon size="24" name="good-job-o" />
                            <p>{{ mvDetailInfo.likedCount | playCount }}</p>
                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="send-gift-o" />
                            <p>{{ mvDetail.subCount | playCount }}</p>
                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="comment-o" />
                            <p>{{ mvDetailInfo.commentCount | playCount }}</p>
                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="cluster-o" />
                            <p>{{ mvDetailInfo.shareCount | playCount }}</p>
                        </div>
                    </div>
                    <van-cell
                            class="myCell"
                            center
                            :title="mvDetail.singer"
                            value-class="valueText"
                    >
                        <template #icon>
                            <van-image
                                    class="avatarPic"
                                    width="2rem"
                                    height="2rem"
                                    round
                                    :src="mvDetail.img1v1Url"
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
                                :key="index"
                                title-class="titleText"
                                @click="ToDetail(index)"
                        >
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
                                        height="4.5rem"
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
                    <div v-if="hotComment.length > 0" class="hot">
                        <div v-for="(item, index) in hotComment" :key="index">
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
                                            @click="goodCommentClick(index, 0)"
                                    >
                                        <p>{{ item.likedCount | playCount }}</p>
                                        <van-icon size="20" name="good-job-o" />
                                    </div>
                                </template>
                            </van-cell>
                            <div class="contentText">
                                <p>{{ item.content }}</p>
                            </div>
                            <van-divider />
                        </div>
                    </div>
                    <div v-if="hotComment.length === 0">
                        <p class="notComment">暂无精彩评论</p>
                    </div>
                    <h4>最近评论</h4>
                    <div v-if="newComment.length > 0" class="new">
                        <div>
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
                                <van-divider />
                            </div>
                        </div>
                    </div>
                    <div v-if="newComment.length === 0">
                        <p class="notComment">暂无最近评论</p>
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from '../../components/common/scroll'
import commNav from '../../components/nav/commNav'
import { Cell, Divider, Icon, Image as VanImage } from 'vant'
import { formatDate, formatDuring, unique } from '../../tool/utils'
import {
  GetMVDetailAPI,
  GetMVDetailInfoAPI,
  GetMVUrlAPI,
  GetResourceLikeAPI,
  GetVideoRelatedAPI,
  GetMvCommentAPI,
  GetLikeAPI
} from '../../http/all-api'
import { createMvInfo } from '../../../model/dataInfo/mvInfo'
import { createVideoRelated } from '../../../model/dataInfo/videoRelatedInfo'
import { createCommentHotInfo } from '../../../model/dataInfo/commentInfo'

export default {
  name: 'music-mv',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$toast.loading({
        message: '加载中',
        forbidClick: true,
        duration: 0
      })
      vm.getMvUrlData(vm.$route.query.mvId)
      vm.getMvDetailData(vm.$route.query.mvId)
      vm.getMvDetailInfoData(vm.$route.query.mvId)
      vm.getVideoRelatedData(vm.$route.query.mvId)
      vm.getMvCommentData({
        id: vm.$route.query.mvId,
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
      mvDetail: {},
      mvDetailInfo: {},
      videoRelated: [],
      hotComment: [],
      newComment: [],
      newLimit: 20
    }
  },
  methods: {
    // 视频播放地址
    getMvUrlData (id) {
      GetMVUrlAPI(id)
        .then(res => {
          const mvUrl = res.data.data.url
          this.playerOptions.url = mvUrl
          this.$refs.vueMiniPlayer.$video.src = mvUrl
          this.$refs.vueMiniPlayer.$video.autoplay = true
        })
        .catch(error => {
          console.log('获取播放地址失败')
          this.$toast.fail({
            message: '获取mv数据失败'
          })
          console.log(error)
        })
    },
    // 获取mv简介
    getMvDetailData (id) {
      GetMVDetailAPI(id)
        .then(res => {
          this.mvDetail = createMvInfo(res.data.data)
          console.log(this.mvDetail)
        })
        .catch(error => {
          console.log('获取mv详情失败')
          console.log(error)
        })
    },
    // 点赞及其他信息
    getMvDetailInfoData (id) {
      GetMVDetailInfoAPI(id)
        .then(res => {
          const data = res.data
          this.mvDetailInfo.likedCount = data.likedCount
          this.mvDetailInfo.shareCount = data.shareCount
          this.mvDetailInfo.commentCount = data.commentCount
          this.mvDetailInfo.liked = data.liked
        })
        .catch(error => {
          console.log('获取点赞信息失败')
          console.log(error)
        })
    },
    // 相关视频
    getVideoRelatedData (id) {
      this.videoRelated = []
      GetVideoRelatedAPI(id)
        .then(res => {
          const result = res.data.data
          console.log(result)
          result.forEach(item => {
            this.videoRelated.push(createVideoRelated(item))
          })
          console.log(this.videoRelated)
        })
        .catch(error => {
          console.log('相关视频请求失败')
          console.log(error)
        })
    },
    getMvCommentData ({ id, limit }) {
      GetMvCommentAPI(id, limit)
        .then(res => {
          const resultHot = res.data.hotComments
          const resultNew = res.data.comments
          if (this.hotComment.length < 15) {
            resultHot.forEach(item => {
              this.hotComment.push(createCommentHotInfo(item))
            })
          }
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
    onVideoPlay () {
      console.log('开始播放')
    },
    handleFullscreen () {
      console.log('全屏播放')
    },
    pullingUp () {
      this.newLimit += 20
      this.getMvCommentData({
        id: this.$route.query.mvId,
        limit: this.newLimit
      })
    },
    async ToDetail (index) {
      const vid = this.videoRelated[index].vid
      console.log(vid)
      if (this.videoRelated[index].type === 1) {
        this.$router.push({
          path: '/videoDetail',
          query: {
            vid: vid
          }
        })
      } else {
        console.log('mv')
        this.$toast.loading({
          message: '加载中',
          forbidClick: true,
          duration: 0
        })
        await this.getMvUrlData(vid)
        await this.getMvDetailData(vid)
        await this.getMvDetailInfoData(vid)
        await this.getVideoRelatedData(vid)
        this.hotComment = []
        this.newComment = []
        await this.getMvCommentData({
          id: vid,
          limit: this.newLimit
        })
        this.$toast.clear()
      }
    },
    goodClick () {
      const vid = this.$route.query.mvId
      let t
      if (this.mvDetailInfo.liked) {
        // 取消点赞
        t = 0
      } else {
        // 点赞
        t = 1
      }
      GetResourceLikeAPI({
        id: vid,
        t: t,
        type: 1
      })
        .then(res => {
          console.log('点赞成功')
        })
        .catch(error => {
          console.log('点赞失败')
          console.log(error)
        })
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
        id: this.$route.query.mvId,
        cid: cid,
        t: t,
        type: 1
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
    .musicMv {
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

                .desc {
                    white-space: pre-wrap;
                    line-height: 50px;
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
