<template>
    <div>
        <!--        单曲-->
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
                        style="width:80px;height: 24px;float: right;margin-right: 10px;">

                    <span style="color: black;font-size: 10px">播放全部</span></van-button>
            </div>
            <div v-for="(item,index) in $store.state.search.searchResultList.song.songs"
                 :key="item.id">
                <van-cell
                        class="my-cell"
                        @click="getMusicId(item.id)"
                        label-class="labelStyle"
                        title-class="titleStyle">
                    <template #title>
                        <span>{{ item.name }}</span>
                        <span class="titleSecond" v-if="item.alia.length !== 0">({{ item.alia[0] }})</span>
                    </template>
                    <template #label>
            <span v-for="(value, indey) in item.ar" :key="indey">
              <span v-if="index !== 0">/</span>{{ value.name }}</span>
                        <span>{{ ' - ' + item.al.name }}</span>
                        <span v-if="item.alia.length !== 0"> ({{ item.alia[0] }})</span>
                    </template>
                </van-cell>
            </div>
            <img src="../../../assets/jietu.jpg" style="width: 100%;height: auto" />
            <!--        歌单-->
            <div style="height: 30px;">
                <span style="margin-left: 18px;font-weight: bold;">歌单</span>
            </div>
            <div v-for="item in $store.state.search.searchResultList.playList.playLists" :key="item.id">
                <van-card @click="getSongListData(item.id)">
                    <template #thumb><img :src="item.coverImgUrl" style="width: 80px;height: 80px" /></template>
                    <template #desc>
                        <div style="margin-top: 4px">
              <span>
                {{
                  item.trackCount +
                    '首' +
                    ' by ' +
                    item.creator.nickname +
                    ',' +
                    '播放' +
                    Math.round((item.playCount / 10000) * Math.pow(10, 1)) /
                      Math.pow(10, 1) +
                    '万次'
                }}</span>
                        </div>
                    </template>
                    <template #title>
                        <div style="font-size: 16px">{{ item.name }}</div>
                    </template>
                    <template #tags>
                        <div v-for="(biaoqian,index) in item.officialTags" style="margin-top: 8px" :key="index">
                            <van-tag
                                    plain
                                    type="danger"
                                    style="background-color:#FFDCDB;font-size: 12px;float: left;margin-left: 5px"
                            >
                                {{ biaoqian }}
                            </van-tag>
                        </div>
                    </template>
                </van-card>
            </div>
            <div style="font-size: 14px;text-align: center;margin-top: 8px">
                {{ $store.state.search.searchResultList.playList.moreText }}
            </div>
            <img src="../../../assets/jietu.jpg" style="width: 100%;height: auto" />

            <!--        视频-->
            <div style="height: 30px;">
                <span style="margin-left: 18px;font-weight: bold;">视频</span>
            </div>
            <div v-for="(item,index) in $store.state.search.searchResultList.video.videos"
                 :key="index.playTime">
                <van-card @click="getVideoDetailData(item.vid)">
                    <template #thumb>
                        <img :src="item.coverUrl" style="width: 130px;height: auto" />
                        <span style="position: absolute;left: 85px;color: white">{{Math.round((item.playTime / 10000) * Math.pow(10, 1)) / Math.pow(10, 1)}}万</span>
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
                        <span v-for="(creator,indey) in item.creator" :key="indey">{{ creator.userName }}</span>
                    </template>
                </van-card>
            </div>
            <div style="font-size: 14px;text-align: center;margin-top: 8px">
                {{ $store.state.search.searchResultList.video.moreText }}
            </div>
            <!--       相关搜索-->
            <div style="height: 30px;margin-top: 10px">
                <span style="margin-left: 18px;font-weight: bold;">相关搜索</span>
            </div>
            <div class="historyFather">
                <div
                        v-for="(item,index) in $store.state.search.searchResultList.sim_query.sim_querys"
                        :key="index"
                        @click="relevantSearch(item.keyword)"
                        style="background-color:#F3F3F3;font-size: 15px"
                        class="historySon">
                    {{ item.keyword }}
                </div>
            </div>
            <!--               歌手-->
            <div style="height: 30px;margin-top: 10px">
                <span style="margin-left: 18px;font-weight: bold;">歌手</span>
            </div>
            <div v-for="item in $store.state.search.searchResultList.artist.artists"
                 :key="item.name">
                <van-cell>
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #icon><img :src="item.img1v1Url" class="getgold_top_head_img" /></template>
                    <template #title>
                        <div>
                            <div style="position: relative;top: 22px;left: 14px">
                                <span>{{ item.name }}</span>
                                <span v-for="(name,indey) in item.alia" :key="indey">{{ name }}</span>
                            </div>
                        </div>
                    </template>
                </van-cell>
            </div>
            <!--            专辑-->
            <div style="height: 30px;margin-top: 10px">
                <span style="margin-left: 18px;font-weight: bold;">专辑</span>
            </div>
            <div v-for="(item,index) in $store.state.search.searchResultList.album.albums" :key="index+20">
                <van-cell>
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #icon>
                        <img :src="item.picUrl" style="width: 80px;height: auto;" />
                    </template>
                    <template #title>
                        <div>
                            <div style="position: relative;top: 20px;left: 14px">
                                <span>{{ item.name }}</span>
                                <span v-for="(name,indey) in item.alia" :key="indey">{{ name }}</span>
                            </div>
                        </div>
                    </template>
                    <template #label>
                        <div style="position: relative;top: 15px;left: 14px">
                            <span>{{ item.artist.name }} </span>
                            <span> {{ item.publishTime | formatDate }}</span>
                        </div>
                    </template>
                </van-cell>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon, Button, Card, Tag, Cell, CellGroup } from 'vant'

import { formatDuring, formatDate } from '../../../tool/utils'

import { GetSearchApi } from '../../../http/all-api'

import { getMusicId } from '../../../tool/mixin'

export default {
  name: 'SearchTabbarZongHe',
  mixins: [getMusicId],
  methods: {
    getVideoDetailData (vid) {
      this.$router.push({
        path: '/videoDetail',
        query: {
          vid: vid
        }
      })
    },
    relevantSearch (item) {
      GetSearchApi(item, '1018').then(res => {
        const lists = res.data.result
        // eslint-disable-next-line vue/custom-event-name-casing
        this.$emit('isSearchResultFunc', true)
        this.$store.commit('searchResultList', lists)
        this.$store.commit('searchWordFunc', item)
        const IsShow = false
        this.$store.commit('searchResultShow', IsShow)
        this.$store.commit('addWord', item)
        this.$emit('backtop')
      }).catch(error => {
        console.log(error)
      })
    },
    getSongListData (id) {
      this.$router.push({
        path: '/daySongList',
        query: {
          id: id
        }
      })
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
  filters: {
    // 将整数转化成分秒
    formatDuring (second = 0) {
      return formatDuring(second)
    },
    formatDate (time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy.MM.dd')
    }
  }
}
</script>

<style scoped lang="less">
    .searchResultList {
        margin: 30px 50px;
    }

    .my-cell {
        padding: 30px;
    }

    .titleStyle {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .labelStyle {
        width: 600px;
        font-size: 36px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .titleSecond {
        font-size: 40px;
        color: #bebfc0;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100px;
    }

    .search-icon {
        position: relative;
        top: 30px;
    }

    .historyFather {
        margin: 0 6px 0 20px;
        flex-direction: row;
        flex-wrap: wrap;
        display: flex;
    }

    .historySon {
        margin: 12px 12px 6px 12px;
        padding: 12px 30px 12px 30px;
        background-color: #f3f3f3;
        border-radius: 100000px;
        height: 60px;
        white-space: normal;
        text-align: center;
        line-height: 60px;
    }

    .getgold_top_head_img {
        height: 200px;
        width: 200px;
        border-radius: 50%;
        margin-left: 10px;
    }
</style>
