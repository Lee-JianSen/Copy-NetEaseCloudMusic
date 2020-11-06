<template>
    <div v-if="Object.keys(musicDetail).length !== 0">
        <van-action-sheet v-model="showDetail1" @click-overlay="clickOverlay">
            <div class="musicDetail">
                <van-cell-group>
                    <van-cell
                            class="mc-cell"
                            :center="true"
                            :border="false"
                            label-class="ov"
                            title-class="ov titleText"
                    >
                        <template #title>
                            <p class="ov titleText">歌曲:{{ musicDetail.name }}</p>
                        </template>
                        <template #label>
                            <p class="ov">
                                {{ musicDetail.singer }}
                            </p>
                        </template>
                        <template #icon>
                            <van-image
                                    class="leftImage"
                                    width="50"
                                    height="50"
                                    radius="5"
                                    :src="musicDetail.picUrl"
                                    alt=""
                            />
                        </template>
                    </van-cell>
                    <van-cell
                            class="cellItem"
                            size="large"
                            :center="true"
                            v-for="(item, index) in cellItem1"
                            :icon="item.icon"
                            :value="item.title"
                            :key="index"
                            value-class="cellText"
                            @click.stop="musicDetailClick(index)"
                    >
                    </van-cell>
                </van-cell-group>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
import { ActionSheet, Cell, CellGroup, Icon, Image as VanImage } from 'vant'

export default {
  name: 'activeSheet',
  props: {
    musicDetail: {
      type: Object,
      default () {
        return {}
      }
    },
    isShowDetail: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  computed: {
    showDetail1: {
      get () {
        return this.isShowDetail
      },
      set (ov, nv) {
        return (this.$parent.isShowDetail = nv)
      }
    }
  },
  data () {
    return {
      showDetail: false,
      cellItem1: [
        {
          icon: 'comment-o',
          title: '查看评论'
        },
        {
          icon: 'cluster-o',
          title: '分享'
        },
        {
          icon: 'user-o',
          title: '查看mv'
        },
        {
          icon: 'smile-o',
          title: '查看专辑'
        }
      ]
    }
  },
  methods: {
    clickOverlay () {
      // eslint-disable-next-line vue/custom-event-name-casing
      this.$emit('clickOverlay')
    },
    musicDetailClick (index) {
      // eslint-disable-next-line vue/no-mutating-props
      this.$parent.isShowDetail = !this.$parent.isShowDetail
      switch (index) {
        case 0:
          this.$router.push({
            path: '/commentMusic',
            query: {
              musicName: this.musicDetail.name,
              singer: this.musicDetail.singer,
              musicPic: this.musicDetail.picUrl,
              id: this.musicDetail.id
            }
          })
          break
        case 1:
          console.log('分享')
          break
        case 2:
          console.log('查看mv')
          console.log(this.musicDetail.mvId)
          if (this.musicDetail.mvId !== 0 && this.musicDetail.mvId !== null) {
            this.$router.push({
              path: '/music-mv',
              query: {
                mvId: this.musicDetail.mvId
              }
            })
          } else {
            this.$toast('抱歉,暂无MV')
          }

          break
        case 3:
          console.log('查看专辑')
          this.$router.push({
            path: '/album',
            query: { id: this.musicDetail.albumId }
          })
          break
      }
    }
  },
  components: {
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon
  }
}
</script>

<style scoped lang="less">
    .musicDetail {
        padding: 16px 16px 30px;
        .activeSheetStyle();

        .cellItem {
            padding: 30px 30px;
        }

        .cellText {
            font-weight: bold;
            padding-left: 20px;
            font-size: 38px;
        }
    }
</style>
