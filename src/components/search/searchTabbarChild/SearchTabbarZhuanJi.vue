<template>
    <div>
        <div>
            <van-cell class="my-cell"
                      v-for="item in zhuanjis"
                      :key="item.id"
                      @click="pushAlbum(item.id)">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #icon>
                    <img :src="item.picUrl" style="width: 60px;height: auto;" />
                </template>
                <template #title>
                    <div>
                        <p class="title">{{ item.name }}</p>
                        <span v-for="(name,index) in item.alia" :key="index">{{ name }}</span>
                    </div>
                </template>
                <template #label>
                    <div>
                        <p class="label"> {{ item.artist.name }}
                            <span> {{ item.publishTime | formatDate }}</span>
                        </p>
                    </div>
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script>
import { GetSearchApi } from '../../../http/all-api'
import { Icon, Button, Card, Tag, Cell, CellGroup } from 'vant'

import { formatDate } from '../../../tool/utils'

export default {
  name: 'SearchTabbarZhuanJi',
  data () {
    return {
      zhuanjis: []
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
    GetSearchApi(this.$store.state.addWord, '10')
      .then(res => {
        this.zhuanjis = res.data.result.albums
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  },
  filters: {
    formatDate (time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy.MM.dd')
    }
  },
  methods: {
    pushAlbum (id) {
      this.$router.push({
        path: '/album',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
    .my-cell {
        padding: 30px;
    }

    .title {
        font-size: 42px;
        padding: 0 30px;
        .overTextEllipsis(@width: 75vw);
    }
    .label{
        font-size: 40px;
        padding: 0 30px;
    }
</style>
