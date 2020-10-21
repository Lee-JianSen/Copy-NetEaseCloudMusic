<!--每日歌曲推荐-->
<template>
    <div class="dayMusic" v-if="musicInfo.length!==0">
        <div ref="topNav" class="topNav">
            <van-icon size="24" @click="goBack" color="#fff" name="arrow-left"/>
            <p class="navTitle">每日推荐</p>
        </div>
        <div v-show="isShowTop" class="musicTop">
            <div class="leftBox" @click="allPlayBtn">
                <van-icon size="24" name="play-circle-o"/>
                <p class="musicTopTitle">全部播放</p>
            </div>
            <div class="rightBox">
                <p>多选</p>
            </div>
        </div>
        <scroll
                class="content"
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true"
                :bounce="false"
                @scroll="musicListScroll">

            <div>
                <van-image
                        height="200"
                        cover
                        :src="musicInfo[1].picUrl" alt="">
                </van-image>
                <div ref="tabControl" class="musicTop">
                    <div class="leftBox" @click="allPlayBtn">
                        <van-icon size="24" name="play-circle-o"/>
                        <p class="musicTopTitle">全部播放</p>
                    </div>
                    <div class="rightBox">
                        <p>多选</p>
                    </div>
                </div>
                <music-info-com :music-info="musicInfo" @cellClick="getMusicId">
                    <template #right-icon="getIndex">
                        <van-icon @click.stop="musicDetailShow(getIndex.index1)" name="ellipsis" class="rightImage"/>
                    </template>
                </music-info-com>
            </div>
        </scroll>
        <active-sheet
                :is-show-detail="isShowDetail"
                :music-detail="musicDetail"
                @clickOverlay="clickOverlay"/>
    </div>
</template>

<script>
    import scroll from "../../../components/common/scroll";
    import musicPlay from "../../../components/common/musicPlay";
    import musicInfoCom from "../../../components/music-home-child/com/musicInfoCom";
    import activeSheet from "../../../components/common/activeSheet";
    import {GetRecommendSongAPI} from "../../../http/all-api";
    import {createMusicInfo} from "../../../../model/dataInfo/musicInfo";
    import {Image as VanImage, Icon} from 'vant';

    export default {
        name: "dayMusic",
        beforeCreate() {
            this.$toast.loading({
                message: '加载中',
                forbidClick: true,
                duration: 0
            });
        },
        async created() {
            await this.getMusicInfo();
            this.$toast.clear();
            if (this.isMusicPlay) this.$refs.scroll.$el.style.height = 92 + '%';
            this.$refs.scroll.refresh();
        },
        computed: {
            isMusicPlay() {
                return this.$store.state.musicId !== null
            },
            getLength: {
                get() {
                    return this.$store.state.playList.length + 1
                }
            }
        },
        data() {
            return {
                musicInfo: [],
                musicDetail: {},
                isShowTop: false,
                isShowDetail: false
            }
        },
        methods: {
            getMusicInfo() {
                GetRecommendSongAPI().then(res => {
                    const result = res.data.data.dailySongs;
                    result.forEach(item => {
                        this.musicInfo.push(createMusicInfo(item));
                    });
                    return res;
                }).catch(err => {
                    console.log(err);
                })
            },
            getMusicId(musicId) {
                // 音乐id
                console.log(musicId);
                this.$store.commit('changeMusicId', musicId);
                this.musicCheck(musicId);
                this.$refs.scroll.$el.style.height = 92 + '%';
                this.$refs.scroll.refresh();
                this.$store.commit('changeMusicIndex', this.getLength);
            },
            goBack() {
                this.$router.go(-1);
            },
            musicListScroll(position) {
                let opacity = Math.abs(Math.round(position.y) / 200);
                this.$refs.topNav.style.background = `rgba(0,0,0,${opacity})`;
                // this.$refs.topNav.style.color = `rgba(255,255,255,${opacity})`;
                if (position.y === 0) {
                    this.$refs.topNav.style.height = 185 + 'px'
                } else {
                    this.$refs.topNav.style.height = 'auto'
                }
                this.isShowTop = position.y <= -153;
            },
            allPlayBtn() {
                let allId = [];

                this.musicInfo.forEach(item => {
                    allId.push(item.id);
                });
                this.getMusicId(allId[0]);
                allId = allId.join(',');
                this.$store.state.musicIndex = 0;
                this.$store.dispatch('getMusicUrl', allId);
                this.$store.dispatch('getMusicDetail', allId);
            },
            clickOverlay() {
                this.isShowDetail = false;
            },
            musicDetailShow(index) {
                this.musicDetail = this.musicInfo[index];
                this.isShowDetail = !this.isShowDetail;
            },

        },
        components: {
            scroll,
            musicPlay,
            activeSheet,
            musicInfoCom,
            [VanImage.name]: VanImage,
            [Icon.name]: Icon,

        }
    }
</script>

<style scoped lang="less">
    .ovtext() {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .dayMusic {
        width: 100vw;

        .topNav {
            display: flex;
            position: relative;
            z-index: 200;
            padding: 30px;
            align-items: flex-start;
            backdrop-filter: blur(10px);
            background-color: rgba(0, 0, 0, 0.2);
            height: 465px;

            .navTitle {
                padding-top: 3px;
                padding-left: 30px;
                color: #f7f8fa;

            }
        }

        .content {
            .scrollStyle();
        }
    }

    .ov {
        .ovtext();
    }

    .musicTop {
        position: relative;
        z-index: 200;
        display: flex;
        padding: 40px 30px;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;

        .leftBox {
            display: flex;
            align-items: center;

            .musicTopTitle {
                padding-left: 30px;

            }
        }

    }

</style>
