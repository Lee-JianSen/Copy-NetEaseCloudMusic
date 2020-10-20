<template>
    <div class="allPlayList">
        <div class="topContent">
            <div class="bg"></div>
            <div id="topContent">
                <div ref="topNav" class="topNav">
                    <van-icon size="24" @click="goBack" color="#000" name="arrow-left"/>
                    <p class="navTitle">歌单广场</p>
                </div>
            </div>
        </div>
        <div class="cc">
            <scroll
                    class="content"
                    ref="scroll"
                    :probe-type="3"
                    :pull-up-load="true"
                    @pullingUp="pullingUp"
            >
                <van-tabs
                        v-model="active"
                        animated
                        swipeable
                        :scrollspy="true"
                        title-active-color="#c2463a"
                        @change="activeChange"
                        background="transparent">
                    <van-tab v-for="(item,index) in allType"
                             :key="item.name"
                             :title="item.title"
                             :name="item.name">
                        <van-grid class="gridItem" :border="false" :column-num="3">
                            <van-grid-item
                                    class="gridItems"
                                    :key="indey"
                                    v-for="(value,indey) in item.data">
                                <song-list-com :song-list-data="value"/>
                            </van-grid-item>
                        </van-grid>
                    </van-tab>
                </van-tabs>
            </scroll>
        </div>

    </div>
</template>

<script>
    import scroll from "../../components/common/scroll";
    import {Icon, Tab, Tabs, Image as VanImage, Grid, GridItem} from 'vant';
    import songListCom from "../../components/music-home-child/songListCom";
    import {GetHotPlayList, GetHighqualityAPI} from "../../http/all-api";
    import {createAllPlayInfo} from "../../../model/dataInfo/allPlayInfo";
    import {debounce, unique} from "../../tool/utils";

    export default {
        name: "allPlayList",
        beforeCreate() {
            this.$toast.loading({
                message: '加载中',
                forbidClick: true,
                duration: 0
            });
        },
        async created() {
            await this.getAllPlayListData({limit: this.limit, cat: '全部', dataType: this.allType[0].data})
            this.$toast.clear();
        },
        data() {
            return {
                active: 0,
                limit: 51,
                allType: [
                    {
                        title: '推荐',
                        name: 'tj',
                        data: []
                    }, {
                        title: '精品',
                        name: 'jp',
                        data: []
                    }, {
                        title: '华语',
                        name: 'hy',
                        data: []
                    }, {
                        title: '流行',
                        name: 'lx',
                        data: []
                    }, {
                        title: '摇滚',
                        name: 'yg',
                        data: []
                    }, {
                        title: '民谣',
                        name: 'my',
                        data: []
                    }
                ],
                maxCount: 0,
            }
        },
        computed: {
            imageUrlSize() {
                return function (item) {
                    return item.coverImgUrl + '?param=150y150'
                }
            }
        },
        methods: {
            imageLoadEnd() {
                debounce(this.$refs.scroll.refresh, 500);
            },
            goBack() {
                this.$router.go(-1)
            },
            async getAllPlayListData({limit, cat, order, dataType}) {
                await GetHotPlayList({limit: limit, cat: cat, order: order}).then(res => {
                    console.log(res);
                    if (res.data.playlists.length !== 100) {
                        let result = res.data.playlists;
                        result.forEach(item => {
                            dataType.push(createAllPlayInfo(item))
                        })
                    } else {
                        console.log(this.maxCount);
                        this.$toast('没有更多了');
                        return;
                    }


                    return dataType;
                }).catch(err => {
                    console.log(err);
                });
            },
            activeChange(name, title) {

                switch (name) {
                    case 'tj':
                        this.limit = 51;
                        if (this.allType[0].data.length === 0) this.getAllPlayListData({
                            limit: 51,
                            cat: '全部',
                            dataType: this.allType[0].data
                        });
                        break;
                    case 'jp':
                        this.limit = 21;
                        GetHighqualityAPI({limit: 21, cat: '全部'}).then(res => {
                            let result = res.data.playlists;
                            result.forEach(item => {
                                this.allType[1].data.push(createAllPlayInfo(item))
                            });
                            return result;
                        }).catch(error => {
                            console.log('获取精品歌单报错');
                            console.log(error);
                        });
                        break;
                    case 'hy':
                        this.limit = 51;
                        if (this.allType[2].data.length === 0) this.getAllPlayListData({
                            limit: 51,
                            cat: '华语',
                            dataType: this.allType[2].data
                        });
                        break;
                    case 'lx':
                        this.limit = 51;
                        if (this.allType[3].data.length === 0) this.getAllPlayListData({
                            limit: 51,
                            cat: '流行',
                            dataType: this.allType[3].data
                        });
                        break;
                    case  'yg':
                        this.limit = 51;
                        if (this.allType[4].data.length === 0) this.getAllPlayListData({
                            limit: 51,
                            cat: '摇滚',
                            dataType: this.allType[4].data
                        });
                        break;
                    case 'my':
                        this.limit = 51;
                        if (this.allType[5].data.length === 0) this.getAllPlayListData({
                            limit: 51,
                            cat: '民谣',
                            dataType: this.allType[5].data
                        });
                        break;
                }
            },
            SongListClick(id) {
                console.log('歌单点击跳转');
                console.log(id);
                this.$router.push({
                    path: '/daySongList',
                    query: {id}
                })
            },
            // 上拉加载
            async pullingUp() {
                this.limit += 20;
                switch (this.active) {
                    case 'tj':
                        await this.getAllPlayListData({limit: this.limit, cat: '全部', dataType: this.allType[0].data});
                        this.allType[0].data = unique(this.allType[0].data);
                        this.$refs.scroll.finishPullUp();
                        break;
                    case 'jp':
                        await GetHighqualityAPI({limit: this.limit, cat: '全部'}).then(res => {
                            let result = res.data.playlists;
                            if (res.data.playlists.length === 100) {
                                this.$toast('没有更多歌单了');
                                return;
                            }
                            result.forEach(item => {
                                this.allType[1].data.push(createAllPlayInfo(item))
                            });
                        }).catch(error => {
                            console.log('获取精品歌单报错');
                            console.log(error);
                        });
                        this.allType[1].data = unique(this.allType[1].data);
                        this.$refs.scroll.finishPullUp();
                        break;
                    case 'hy':
                        await this.getAllPlayListData({limit: this.limit, cat: '华语', dataType: this.allType[2].data});
                        this.allType[2].data = unique(this.allType[2].data);
                        this.$refs.scroll.finishPullUp();
                        break;
                    case 'lx':
                        await this.getAllPlayListData({limit: this.limit, cat: '流行', dataType: this.allType[3].data});
                        this.allType[3].data = unique(this.allType[3].data);
                        this.$refs.scroll.finishPullUp();
                        break;
                    case  'yg':
                        await this.getAllPlayListData({limit: this.limit, cat: '摇滚', dataType: this.allType[4].data});
                        this.allType[4].data = unique(this.allType[4].data);
                        this.$refs.scroll.finishPullUp();
                        break;
                    case 'my':
                        this.getAllPlayListData({limit: this.limit, cat: '民谣', dataType: this.allType[5].data});
                        this.allType[5].data = unique(this.allType[5].data);
                        this.$refs.scroll.finishPullUp();
                        break;
                }
            },
        },
        components: {
            songListCom,
            scroll,
            [Icon.name]: Icon,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [VanImage.name]: VanImage,
            [GridItem.name]: GridItem,
            [Grid.name]: Grid,
        },
        filters: {
            playCount(num) {
                if (num >= 100000000) {
                    num = Math.round(num / 10000000) / 10 + '亿'
                } else if (num >= 10000) {
                    num = Math.round(num / 1000) / 10 + '万'
                }
                return num;
            }
        }
    }
</script>

<style scoped lang="less">
    .allPlayList {
        width: 100vw;

        .topNav {
            display: flex;
            position: relative;
            z-index: 200;
            padding: 30px;
            align-items: center;
            font-weight: bold;

            .navTitle {
                padding-left: 30px;
            }
        }

        #topContent {
            width: 100vw;
            position: absolute;
            top: 0;
        }

        .bg {
            width: 100vw;
            height: 20vh;
            background: darkgrey;
            filter: blur(300px);
            overflow: hidden;
        }

        .content {
            .scrollStyle(120px);

            .van-grid-item__content {
                padding: 16px 4px;
            }

            .gridItem {
                width: 100vw;
                position: relative;
                padding: 16px 5px;

                .gridItems {
                    height: 95%;
                }

                .text {
                    width: 300px;
                    font-size: 30px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-wrap: break-word;
                    white-space: pre-wrap;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .playCount {
                    position: absolute;
                    top: 45px;
                    right: 40px;
                    z-index: 999;
                    font-size: 36px;
                    color: #eeeeee;

                }
            }
        }

    }
</style>
