<template>
    <div>
        <van-tabs :swipeable="true">
            <van-tab v-for="(item, index) in tabbarList" :key="index" :title="item">
                <div v-if="index === 0">
                    <search-tabbar-zong-he @backtop="backTop" />
                </div>
                <div v-if="index === 1">
                    <search-tabbar-dan-qu />
                </div>
                <div v-if="index === 2">
                    <search-tabbar-shi-pin />
                </div>
                <div v-if="index === 3">
                    <search-tabbar-ge-shou />
                </div>
                <div v-if="index === 4">
                    <search-tabbar-zhuan-ji />
                </div>
                <div v-if="index === 5">
                    <search-tabbar-ge-dan />
                </div>
                <div v-if="index === 6">
                    <search-tabbar-dian-tai />
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import SearchTabbarZongHe from '../searchTabbarChild/SearchTabbarZongHe'
import SearchTabbarDanQu from '../searchTabbarChild/SearchTabbarDanQu'
import SearchTabbarShiPin from '../searchTabbarChild/SearchTabbarShiPin'
import SearchTabbarGeShou from '../searchTabbarChild/SearchTabbarGeShou'
import SearchTabbarZhuanJi from '../searchTabbarChild/SearchTabbarZhuanJi'
import SearchTabbarGeDan from '../searchTabbarChild/SearchTabbarGeDan'
import SearchTabbarDianTai from '../searchTabbarChild/SearchTabbarDianTai'
import { Cell, CellGroup, Tab, Tabs } from 'vant'

export default {
  name: 'searchTabbar',
  data () {
    return {
      tabbarList: ['综合', '单曲', '视频', '歌手', '专辑', '歌单', '主播电台']
    }
  },
  components: {
    SearchTabbarZongHe,
    SearchTabbarDanQu,
    SearchTabbarShiPin,
    SearchTabbarGeShou,
    SearchTabbarZhuanJi,
    SearchTabbarGeDan,
    SearchTabbarDianTai,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  methods: {
    backTop () {
      this.$emit('backtop')
    }
  }
}
</script>

<style scoped></style>
