<template>
    <div>
        <div class="gridItem">
            <div class="playCount">
                <van-icon name="service-o" color="#eee" />
                {{ songListData.playCount | playCount }}
            </div>

            <div class="songListInfo" @click="SongListClick(songListData.id)">
                <van-image
                        fit="cover"
                        radius="5px"
                        :src="imageUrlSize(songListData)"
                        @load="imageLoadEnd"
                />
                <div class="text">{{ songListData.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon, Image as VanImage } from 'vant'

export default {
  name: 'songListCom',
  props: {
    songListData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    imageUrlSize () {
      return function (item) {
        return item.coverImgUrl + '?param=120y120'
      }
    }
  },
  methods: {
    imageLoadEnd () {
      // eslint-disable-next-line vue/custom-event-name-casing
      this.$emit('imageLoadEnd')
    },
    SongListClick (id) {
      console.log('歌单点击跳转')
      console.log(id)
      this.$router.push({
        path: '/daySongList',
        query: { id }
      })
    }
  },
  components: {
    [VanImage.name]: VanImage,
    [Icon.name]: Icon
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
    .gridItem {
        position: relative;
        margin-right: 30px;
    }

    .playCount {
        position: absolute;
        top: 1px;
        right: 10px;
        z-index: 999;
        font-size: 36px;
        color: #eeeeee;
    }

    .text {
        width: 300px;
        font-size: 34px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        white-space: pre-wrap;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
