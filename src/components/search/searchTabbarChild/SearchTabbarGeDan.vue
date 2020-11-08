<template>
    <div>
        <van-cell
                v-for="item in songsList"
                :key="item.id"
                class="my-cell"
                @click="getSongListData(item.id)">
            <template #icon>
                <van-image
                        width="70"
                        height="70"
                        radius="5"
                        cover
                        :src="item.coverImgUrl" />
            </template>
            <template #label>
                <div class="label">
            <span>
              {{
                item.trackCount +
                  '首' +
                  ' by ' +
                  item.creator.nickname +
                  ',' +
                  ' 播放' +
                  Math.round((item.playCount / 10000) * Math.pow(10, 1)) /
                    Math.pow(10, 1) +
                  '万次'
              }}</span>
                </div>
            </template>
            <template #title>
                <p class="title">{{ item.name }}</p>
            </template>
        </van-cell>
    </div>
</template>

<script>
import { GetSearchApi } from '../../../http/all-api'
import { Button, Cell, CellGroup, Icon, Tag, Image as VanImage } from 'vant'

export default {
  name: 'SearchTabbarGeDan',
  data () {
    return {
      songsList: []
    }
  },
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [VanImage.name]: VanImage
  },
  created () {
    GetSearchApi(this.$store.state.search.addWord, '1000')
      .then(res => {
        this.songsList = res.data.result.playlists
        console.log(this.songsList)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    getSongListData (id) {
      this.$router.push({
        path: '/daySongList',
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
        font-size: 40px;
        padding: 0 30px;
        .overTextEllipsis(@width:70vw)
    }

    .label {
        font-size: 36px;
        padding: 0 30px;
    }
</style>
