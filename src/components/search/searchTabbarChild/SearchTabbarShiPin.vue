<template>
    <div>
        <div v-for="(item,index) in videos" :key="index">
            <van-card @click="getVideoDetailData(item.vid, item.type)">
                <template #thumb>
                    <img :src="item.coverUrl" style="width: 130px;height: auto" />
                    <span style="position: absolute;left: 85px;color: white">{{
              Math.round((item.playTime / 10000) * Math.pow(10, 1)) / Math.pow(10, 1)}}万</span>
                </template>
                <template #title>
                    <div
                            style="font-size: 14px;margin-left: 46px;white-space: pre-wrap;margin-top: 4px;margin-bottom: 6px"
                    >
                        {{ item.title }}
                    </div>
                </template>
                <template #tags>
                    <span style="margin-left: 46px;">{{item.durationms | formatDuring}}</span>
                    <span> by </span>
                    <span v-for="creator in item.creator" :key="creator.userName">{{ creator.userName }}</span>
                </template>
            </van-card>
        </div>
    </div>
</template>

<script>
import { Icon, Button, Card, Tag, Cell, CellGroup } from 'vant'

import { formatDuring } from '../../../tool/utils'

import { GetSearchApi } from '../../../http/all-api'

export default {
  name: 'SearchTabbarShiPin',
  data () {
    return {
      videos: []
    }
  },
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  created () {
    GetSearchApi(this.$store.state.search.addWord, '1014')
      .then(res => {
        this.videos = res.data.result.videos
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  },
  filters: {
    // 将整数转化成分秒
    formatDuring (second = 0) {
      return formatDuring(second)
    }
  },
  methods: {
    getVideoDetailData (vid, type) {
      if (type === 1) {
        this.$router.push({
          path: '/videoDetail',
          query: {
            vid: vid
          }
        })
      } else if (type === 0) {
        this.$router.push({
          path: '/music-mv',
          query: {
            mvId: vid
          }
        })
      }
    }
  }
}
</script>
