<!--每日推荐歌单-->
<template>
    <div class="songList">
        <div class="topTitle">
            <h4 @click="TopClick">{{topTitle}}</h4>
            <btn-more :title="btnMore" @click.native="TopClick"/>
        </div>

        <horizontal-scroll ref="hScroll">
            <div ref="list" class="list">
                <div class="songListCom">
                    <song-list-com
                            v-for="(item,index) in recommendSongList"
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
    import songListCom from "./songListCom";

    export default {
        name: "recommendedSongList",
        mixins: [initScroll],
        props: {
            recommendSongList: {
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

            })
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
    .songList {
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
