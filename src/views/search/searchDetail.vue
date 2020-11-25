<template>
    <div>
        <search @isSearchResultFunc="isSearchResultFunc" :isShow="isSearchResult" />

        <scroll
                class="content"
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true"
                @scroll="ListenScroll">
            <div>
                <div v-if="!isSearchResult">
                    <div>
                        <img
                                src="../../assets/jietu.jpg"
                                alt=""
                                style="width: 100%;height: auto" />
                        <historcal-record @isSearchResultFunc="isSearchResultFunc" />
                        <hot-search @isSearchResultFunc="isSearchResultFunc" />
                    </div>
                </div>
                <div v-if="isSearchResult">
                    <search-tabbar @backtop="getbacktop" />
                </div>
                <search-suggest v-show="$store.state.search.searchResultShow"
                                @isSearchResultFunc="isSearchResultFunc" />
            </div>
        </scroll>
    </div>
</template>

<script>
import search from '../../components/search/searchChild/search'
import hotSearch from '../../components/search/searchChild/hotSearch'
import Scroll from '../../components/common/scroll'
import historcalRecord from '../../components/search/searchChild/historcalRecord'
import searchSuggest from '../../components/search/searchChild/searchSuggest'
import searchTabbar from '../../components/search/searchResultChild/searchTabbar'

export default {
  name: 'searchDetail',
  mounted () {
    this.$nextTick(() => {
      if (this.$store.state.audioEl) {
        this.$refs.scroll.$el.style.height = 92 + 'vh'
      }
    })
  },
  data () {
    return {
      isSearchResult: false,
      backTop: '',
      scrollOnce: true
    }
  },

  components: {
    search,
    hotSearch,
    Scroll,
    historcalRecord,
    searchSuggest,
    searchTabbar
  },
  methods: {
    isSearchResultFunc (val) {
      this.isSearchResult = val
    },
    getbacktop () {
      this.$refs.scroll.scrollTo(0, 0, 400)
    },
    ListenScroll (position) {
      if (this.$store.state.audioEl && this.scrollOnce) {
        this.scrollOnce = false
        this.$refs.scroll.$el.style.height = 92 + 'vh'
        this.$refs.scroll.refresh()
      }
    }
  }
}
</script>

<style scoped lang="less">
    .content {
        .scrollStyle(130px);
    }
</style>
