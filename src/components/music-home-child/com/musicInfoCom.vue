<template>
    <div class="musicInfo">
        <van-cell-group :border="false">
            <van-cell
                    class="mc-cell"
                    :center="true"
                    :border="false"
                    v-for="(value,index) in musicInfo"
                    :key="index"
                    label-class="ov"
                    title-class="ov titleText"
                    @click="cellClick(value.id)">
                <!--                            :title="value.uiElement.mainTitle.title"-->
                <template #title>
                    <p class="ov titleText">
                        {{value.name}}
                    </p>
                </template>
                <template #label>
                    <p class="ov">
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
                this.$emit('cellClick', id)
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
        .activeSheetStyle();
    }
</style>