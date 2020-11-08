<template>
    <div class="searchBox">
        <form action="/">
            <div v-if="$store.state.search.addWord === ''">
                <van-search
                        v-model="value"
                        :show-action="true"
                        :placeholder="this.$store.state.search.keyWords"
                        @search="onSearch"
                        @input="onInput"
                        @blur="onBlur"
                        @focus="onFocus"
                        :clearable="false">
                    <template #left>
                        <van-icon
                                size="22"
                                @click="goBack"
                                color="black"
                                name="arrow-left"
                                style="margin-right: 10px" />
                    </template>
                    <template #action>
                        <van-icon
                                size="22"
                                color="black"
                                name="search"
                                style="position: relative;top: 6px"
                                @click="onSearch" />
                    </template>
                    <template #right-icon>
                        <van-icon
                                size="22"
                                color="black"
                                name="cross"
                                @click="cleanLabel" />
                    </template>
                </van-search>
            </div>
            <div v-if="$store.state.search.addWord !== ''">
                <van-search
                        v-model="$store.state.search.addWord"
                        :show-action="true"
                        :placeholder="$store.state.search.keyWords"
                        @search="onSearch"
                        @input="onInput"
                        @blur="onBlur"
                        @focus="onFocus"
                        :clearable="false">
                    <template #left>
                        <van-icon
                                size="22"
                                @click="goBack"
                                color="black"
                                name="arrow-left"
                                style="margin-right: 10px" />
                    </template>
                    <template #action>
                        <van-icon
                                size="22"
                                color="black"
                                name="search"
                                style="position: relative;top: 6px"
                                @click="onSearch" />
                    </template>
                    <template #right-icon>
                        <van-icon
                                size="22"
                                color="black"
                                name="cross"
                                @click="cleanLabel" />
                    </template>
                </van-search>
            </div>
        </form>
    </div>
</template>
<script>
import {
  GetSearchGuanJianCiAPI,
  GetSearchSuggestApi,
  GetSearchApi
} from '../../../http/all-api'
import { Icon, Cell, CellGroup, Search } from 'vant'

import { debounce } from '../../../tool/utils'

export default {
  name: 'search',
  props: {
    isShow: Boolean
  },
  data () {
    return {
      value: '',
      historyLists: [],
      list2: []
    }
  },
  created () {
    console.log(this.$store.state.search.addWord)
    this.getSearchData()
    if (this.$store.state.search.addWord !== '') {
      this.value = this.$store.state.search.addWord
    }
  },
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Search.name]: Search
  },
  methods: {
    // 确定搜索时触发
    onSearch (val) {
      if (this.value.replace(/(^\s*)|(\s*$)/g, '') === '') {
        this.value = this.$store.state.search.keyWords
      }
      GetSearchApi(this.value, '1018')
        .then(res => {
          const lists = res.data.result
          // eslint-disable-next-line vue/custom-event-name-casing
          this.$emit('isSearchResultFunc', true)
          this.$store.commit('searchResultList', lists)

          this.this.$store.state.search.historyList.unshift(val)
          const hisList = this.this.$store.state.search.historyList
          const newarr = Array.from(new Set(hisList))
          this.$store.commit('historyBianLiList', newarr)

          this.$store.commit('searchWordFunc', this.value)
          this.$store.commit('addWord', val)
        })
        .catch(error => {
          console.log(error)
        })
      // 点击搜索按钮之后，关闭推荐列表
      const IsShow = false
      this.$store.commit('searchResultShow', IsShow)
    },
    // 输入框获得焦点时触发
    onFocus () {
      const isShow = this.value !== ''

      this.$store.commit('searchResultShow', isShow)
    },
    // 输入框内容变化时触发
    onInput: debounce(function () {
      if (this.value.replace(/(^\s*)|(\s*$)/g, '') !== '') {
        GetSearchSuggestApi(this.value, 'mobile')
          .then(res => {
            const result = res.data.result.allMatch
            this.$store.commit('searchResult', result)
            const isShow = true
            const value = this.value
            this.$store.commit('searchResultShow', isShow, value)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        const isShow = false
        const value = this.value
        this.$store.commit('searchResultShow', isShow, value)
      }
    }, 500),

    // 输入框失去焦点时触发
    onBlur () {
      const isShow = false
      this.$store.commit('searchResultShow', isShow)
    },
    goBack () {
      if (this.isShow) {
        // eslint-disable-next-line vue/custom-event-name-casing
        this.$emit('isSearchResultFunc', false)
        this.$store.commit('cutWord')
        this.value = ''
      } else {
        this.$router.go(-1)
        this.$store.commit('cutWord')
      }
    },
    cleanLabel () {
      this.$store.state.search.addWord === ''
        ? (this.value = '')
        : this.$store.commit('cutWord')
    },
    getSearchData () {
      GetSearchGuanJianCiAPI()
        .then(res => {
          // console.log(res);
          this.$store.state.search.keyWords = res.data.data.realkeyword
        })
        .catch(error => {
          console.log('关键词失败')
          console.log(error)
        })
    }
  }
}
</script>

<style scoped></style>
