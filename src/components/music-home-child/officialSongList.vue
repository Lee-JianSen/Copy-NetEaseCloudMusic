<!--官方歌单组件-->
<template>
    <div class="officialSongList">
        <div class="topTitle">
            <h4 @click="TopClick">{{topTitle}}</h4>
            <btn-more :title="btnMore" @click.native="TopClick"/>
        </div>

        <horizontal-scroll ref="hScroll">
            <div ref="list" class="list">
                <div class="songListCom">
                    <song-list-com
                            v-for="(item,index) in officialSongList"
                            :key="item.id"
                            :songListData="item"/>
                </div>
            </div>
        </horizontal-scroll>

    </div>

</template>
<script>
    // 横向滚动组件
    import HorizontalScroll from "../common/horizontalScroll";
    import {initScroll} from "../../tool/mixin";
    import BtnMore from "../common/btnMore";
    //引入vant组件 Grid宫格布局
    import {Image as VanImage, Icon} from 'vant';

    //  网络请求方法
    import {GetHotPlayList} from "../../http/all-api";
    import songListCom from "./songListCom";

    export default {
        name: "officialSongList",
        mixins: [initScroll],
        props: {
            officialSongList: {
                type: Array,
                default: []
            },
            topTitle: String,
            btnMore: String
        },
        mounted() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.itemWidth = 28;
                    this.itemMargin = 5;
                    this.initPics();
                    this.$refs.hScroll.refresh()
                }, 600);
            });
        },
        methods: {
            TopClick() {
                console.log('更多歌单');
                this.$router.push({
                    path: '/allPlayList'
                })
            },

        },
        components: {
            HorizontalScroll,
            BtnMore,
            songListCom
        },

    }
</script>

<style scoped lang="less">
    .officialSongList {
        padding: 30px;

        .topTitle {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }

        h4 {
            font-size: 44px;
        }

        .songListCom {
            display: flex;
            justify-content: space-around;
        }
    }

</style>

