<template>
    <div>
        <div class="father" v-if="$store.state.search.searchResult">
            <van-cell-group>
                <van-cell
                        v-for="(item, index) in $store.state.search.searchResult"
                        :title="item.keyword"
                        :key="index"
                        icon="search"
                        @click="searchsuggest(item.keyword)"
                />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import { GetSearchApi } from '../../../http/all-api'
import { Cell, CellGroup } from 'vant'

export default {
  name: 'searchSuggest',
  created () {
    console.log(this.$store.state.search.searchResult.length)
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {
    searchsuggest (val) {
      GetSearchApi(val, '1018')
        .then(res => {
          const lists = res.data.result
          // eslint-disable-next-line vue/custom-event-name-casing
          this.$emit('isSearchResultFunc', true)
          this.$store.commit('searchResultList', lists)
          const IsShow = false
          this.$store.commit('searchResultShow', IsShow)
          this.$store.commit('addWord', val)

          this.$store.state.search.historyList.unshift(val)
          const hisList = this.$store.state.search.historyList
          const newarr = Array.from(new Set(hisList))
          this.$store.commit('historyBianLiList', newarr)
          this.$toast.clear()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="less">
    .father {
        position: absolute;
        top: 0;
        left: 12%;
        width: 77%;
        box-shadow: 2px 2px 10px #909090;
    }
</style>
