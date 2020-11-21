<template>
    <div class="hotSearch">
        <p class="title">热搜榜</p>
        <div class="hotSearch" v-for="(item, index) in hots" :key="index">
            <van-cell-group>
                <van-cell
                        class="my-cell"
                        :title-style="{fontWeight: index < 3 ? 'Bold' : 'normal', fontSize: '15px'}"
                        :title="item.searchWord"
                        @click="getHotSearch(item.searchWord)"
                        :value="item.score"
                        :label="item.content"
                        value-class="rightText"
                        label-class="labelText"
                        :border="false">
                    <template #icon><p class="indexIcon" :class="{redText:index<3}">{{ index + 1 }}</p>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import { GetHotSearchDetailApi, GetSearchApi } from '../../../http/all-api'
import { Cell, CellGroup } from 'vant'

export default {
  name: 'hotSearch',
  data () {
    return {
      hots: []
    }
  },
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },
  created () {
    this.getHotSearchData()
  },
  methods: {
    getHotSearchData () {
      GetHotSearchDetailApi().then(res => {
        // console.log(res);
        this.hots = res.data.data
      })
    },
    getHotSearch (val) {
      GetSearchApi(val, '1018').then(res => {
        // console.log(res);
        const lists = res.data.result
        // console.log(lists);
        // let lists = res;
        // console.log(lists);
        // console.log(res);
        // eslint-disable-next-line vue/custom-event-name-casing
        this.$emit('isSearchResultFunc', true)
        this.$store.commit('searchResultList', lists)

        this.$store.state.search.historyList.unshift(val)
        const hisList = this.$store.state.search.historyList

        const newarr = Array.from(new Set(hisList))

        this.$store.commit('historyBianLiList', newarr)
        this.$store.commit('searchWordFunc', val)
        this.$store.commit('addWord', val)
      })
    }
  }
}
</script>

<style scoped lang="less">
    .hotSearch {
        width: 100vw;
        padding: 15px;

        .title {
            font-weight: bold;
            font-size: 45px;
            margin-left: 16px;
            margin-top: 6px;
            margin-bottom: 30px;
        }

        .rightText {
            font-size: 36px;
            color: #cecece;
            width: 0;
            height: 80px;
        }

        .labelText {
            font-size: 36px;
            color: #979797;
        }

        .indexIcon {
            text-align: center;
            padding: 30px 40px 20px 20px;
        }

        .redText {
            color: #c2463a;
        }
    }
</style>
