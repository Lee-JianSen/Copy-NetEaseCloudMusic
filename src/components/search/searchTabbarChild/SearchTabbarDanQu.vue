<template>
    <div>
        <div style="margin-top: 10px;height: 30px;">
            <span style="margin-left: 18px;font-weight: bold;">单曲</span>
            <van-button
                    round
                    type="info"
                    plain
                    hairline
                    color="#BEBFC0"
                    size="mini"
                    style="width:80px;height: 24px;float: right;margin-right: 10px;display: inline-block;vertical-align: middle">
                <van-icon name="play-circle-o" color="black" style="margin-top: 2px" />
                <span style="color: black">播放全部</span></van-button>
        </div>
        <div v-for="(item,index) in songsList" :key="item.id">
            <van-cell
                    class="my-cell"
                    @click="getMusicId(item.id)"
                    title-class="titleStyle"
                    label-class="labelStyle">
                <template #title>
                    <span>{{ item.name }}</span>
                    <!--                    <span class="titleSecond">-->
                    <!--            ({{ item.alias[0] }})</span>-->
                </template>
                <template #label>
                    <p>{{item.songer}} - {{item.album}}</p>
                </template>
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-icon
                            @click.stop="musicDetailShow(index)"
                            name="ellipsis"
                            class="search-icon"
                            size="18px" />
                </template>
            </van-cell>
        </div>
        <active-sheet
                :is-show-detail="isShowDetail"
                :music-detail="musicDetail"
                @clickOverlay="clickOverlay"
        />
    </div>
</template>

<script>
import { Icon, Button, Cell, CellGroup } from 'vant'

import { GetSearchApi } from '../../../http/all-api'

import { getMusicId } from '../../../tool/mixin'
import { createSearchMusicInfo } from '../../../../model/dataInfo/searchMusicInfo'
import activeSheet from '../../common/activeSheet'

export default {
  name: 'SearchTabbarDanQu',
  mixins: [getMusicId],
  data () {
    return {
      songsList: [],
      musicInfo: [],
      musicDetail: {},
      isShowDetail: false
    }
  },
  created () {
    GetSearchApi(this.$store.state.addWord)
      .then(res => {
        // console.log(res);
        const lists = res.data.result.songs
        lists.forEach(item => {
          this.songsList.push(createSearchMusicInfo(item))
        })
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    musicDetailShow (index) {
      this.musicDetail = this.songsList[index]
      this.isShowDetail = !this.isShowDetail
    },
    clickOverlay () {
      this.isShowDetail = false
    }
  },
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    activeSheet
  }
}
</script>

<style scoped lang="less">
    .titleStyle {
        font-size: 44px;
        .overTextEllipsis();
    }

    .my-cell {
        padding: 30px;
    }

    .labelStyle {
        width: 500px;
        font-size: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .titleSecond {
        font-size: 44px;
        color: #bebfc0;
    }

    .search-icon {
        position: relative;
        top: 30px;
    }
</style>
