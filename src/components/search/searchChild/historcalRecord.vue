<template>
    <div>
        <div v-if="this.$store.state.search.historyList.length !== 0">
            <van-cell title="历史记录" style="padding-top: 0;padding-left: 15px" title-class="title">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-icon
                            name="delete"
                            class="delete-icon"
                            @click="deleteIcon"
                            size="18px"
                    />
                </template>
            </van-cell>
            <div class="historyFather">
                <div
                        v-for="(item, index) in this.$store.state.search.historyList"
                        :key="index"
                        class="historySon"
                        @click="historysearch(item)"
                >
                    <p style="font-size: 14px">{{ item }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon, Dialog, Cell, CellGroup } from 'vant'

import { GetSearchApi } from '../../../http/all-api'

export default {
  name: 'historcalRecord',
  methods: {
    deleteIcon () {
      Dialog.confirm({
        title: '确定清空全部历史记录？'
      })
        .then(() => {
          this.$store.commit('historyClean')
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
    historysearch (item) {
      GetSearchApi(item, '1018')
        .then(res => {
          const lists = res.data.result
          // eslint-disable-next-line vue/custom-event-name-casing
          this.$emit('isSearchResultFunc', true)
          this.$store.commit('searchResultList', lists)
          this.$store.commit('searchWordFunc', item)
          const IsShow = false
          this.$store.commit('searchResultShow', IsShow)
          this.$store.commit('addWord', item)
          this.$toast.clear()
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
}
</script>

<style scoped>
    .title {
        font-weight: bolder;
        font-size: 50px;
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
</style>
