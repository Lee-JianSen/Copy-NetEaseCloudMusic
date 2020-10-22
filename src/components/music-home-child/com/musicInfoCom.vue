<template>
    <div class="musicInfo">
        <van-cell-group :border="false">
            <van-cell
                    class="mc-cell"
                    :center="true"
                    :border="false"
                    v-for="(value,index) in musicInfo"
                    :key="index"
                    title-class="ov titleText"
                    @click="cellClick(value.id)">
                <template #title>
                    <p class="ov titleText">
                        {{value.name}}
                    </p>
                </template>
                <template #label>
                    <p class="ov labelTextStyle">
                        <span class="mvBox" v-if="value.mvId!==0&value.mvId!==null">mv</span>
                        {{value.singer}}—
                        <span class="titleAlias">
                            {{value.album}}</span>
                    </p>
                </template>
                <template #icon>
                    <van-image
                            class="leftImage"
                            width="50" height="50"
                            radius="5"
                            :src="value.picUrl" alt="">
                    </van-image>
                </template>
                <template #right-icon>
                    <slot name="right-icon" :index1="index"/>
                </template>
            </van-cell>
        </van-cell-group>
    </div>

</template>

<script>
    import {Cell, CellGroup, Image as VanImage} from "vant";

    export default {
        name: "musicInfoCom",
        props: {
            musicInfo: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            cellClick(id) {
                if (id !== null) {
                    this.$emit('cellClick', id)
                } else {
                    this.$toast('暂无资源');
                }
            }
        },
        components: {
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [VanImage.name]: VanImage,
        }
    }
</script>

<style scoped lang="less">
    .musicInfo {
        .mc-cell {
            width: 100vw;
            margin: 30px 15px 0 0;
        }

        .leftImage {
            margin-left: 30px;
            margin-right: 30px;
        }

        .rightImage {
            padding-right: 40px;
        }

        .titleText {
            width: 650px;
            font-weight: 600;
            font-size: 38px;
            .overTextEllipsis();


            .titleAlias {
                color: #a7a6a7;
                font-size: 36px;
            }

            .mvBox {
                display: inline-block;
                padding: 0 8px;
                color: #c2463a;
                border: 1px solid #c2463a;
                border-radius: 6px;
            }
        }

        .labelTextStyle {
            width: 800px;
            font-size: 30px;
            .overTextEllipsis();
        }
    }
</style>