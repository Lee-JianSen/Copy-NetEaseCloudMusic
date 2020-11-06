<template>
    <div v-if="recommendMusic.length !== 0" class="recommendMusicCom">
        <div v-for="(item,index) in recommendMusic" :key="index" class="box4">
            <van-cell-group :border="false">
                <van-cell
                        class="mc-cell"
                        :center="true"
                        :border="false"
                        v-for="(value, indey) in item"
                        :key="indey"
                        :label="labelText(value)"
                        :label-class="{
            ov: true,
            labelTextStyle: isLabelColor,
            labelColor: value.subTitlesType === 'songRcmdTag'
          }"
                        title-class="ov titleText"
                        @click="playMusicClick(value.id)"
                >
                    <template #title>
                        <p class="ov titleText">
                            {{ value.titles }}
                            <span class="titleTextName">- {{ value.singer }}</span>
                        </p>
                    </template>
                    <template #icon>
                        <van-image
                                class="leftImage"
                                width="50"
                                height="50"
                                radius="5"
                                :src="value.imageUrl"
                                alt=""
                        >
                        </van-image>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import { Cell, CellGroup, Image as VanImage } from 'vant'

export default {
  name: 'recommendMusicCom',
  props: {
    recommendMusic: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isLabelColor: true
    }
  },
  computed: {
    labelText () {
      return function (value) {
        if (value.subTitles !== null) {
          return value.subTitles
        } else {
          return ''
        }
      }
    }
  },
  methods: {
    playMusicClick (id) {
      if (id !== null) {
        // eslint-disable-next-line vue/custom-event-name-casing
        this.$emit('playMusicClick', id)
      } else {
        this.$toast('暂无资源')
      }
    }
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [VanImage.name]: VanImage
  }
}
</script>

<style scoped lang="less">
    .recommendMusicCom {
        display: flex;
        justify-content: space-between;

        .box4 {
            display: flex;
            margin-right: 50px;

            .mc-cell {
                margin: 30px 15px 30px 0;
            }

            .leftImage {
                margin-right: 30px;
            }

            .titleText {
                width: 650px;
                font-weight: 600;
                font-size: 38px;

                .titleTextName {
                    color: #a7a6a7;
                    font-size: 26px;
                }
            }

            .labelTextStyle {
                width: 700px;
                font-size: 30px;
            }

            .labelColor {
                width: 210px;
                font-size: 30px;
                background: rgba(247, 230, 230, 1);
                padding: 0 7px;
                color: @theme-color;
                text-align: center;
            }

            .ov {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
</style>
