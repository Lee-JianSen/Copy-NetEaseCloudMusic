<template>
    <div>
        <van-tabs :swipeable="true">
            <van-tab v-for="(item,index) in tabbarList" :key="index" :title="item">
                <div v-if="index === 0">
                    <SearchTabbarZongHe @backtop="backTop"/>
                </div>
                <div v-if="index ===1">
                    <SearchTabbarDanQu/>
                </div>
                <div v-if="index===2">
                    <SearchTabbarShiPin/>
                </div>
                <div v-if="index===3">
                    <SearchTabbarGeShou/>
                </div>
                <div v-if="index===4">
                    <SearchTabbarZhuanJi/>
                </div>
                <div v-if="index===5">
                    <SearchTabbarGeDan/>
                </div>
                <div v-if="index===6">
                    <SearchTabbarDianTai/>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import SearchTabbarZongHe from "./searchTabbarChild/SearchTabbarZongHe";
    import SearchTabbarDanQu from "./searchTabbarChild/SearchTabbarDanQu";
    import SearchTabbarShiPin from "./searchTabbarChild/SearchTabbarShiPin";
    import SearchTabbarGeShou from "./searchTabbarChild/SearchTabbarGeShou";
    import SearchTabbarZhuanJi from "./searchTabbarChild/SearchTabbarZhuanJi";
    import SearchTabbarGeDan from "./searchTabbarChild/SearchTabbarGeDan";
    import SearchTabbarDianTai from "./searchTabbarChild/SearchTabbarDianTai";
    import {Cell, CellGroup} from 'vant';
    import {Tab, Tabs} from 'vant';

    export default {
        name: "searchTabbar",
        data() {
            return {
                tabbarList: ['综合', '单曲',  '视频', '歌手', '专辑', '歌单', '主播电台'],

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
            [Tabs.name]: Tabs,

        },
        methods: {
            backTop() {
                this.$emit('backtop')
            }
        }
    }
</script>

<style scoped>

</style>
