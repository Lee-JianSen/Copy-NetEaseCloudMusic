<template>
    <div class="moreBox">
        <div class="musicList">
            <van-cell value-class="title1" :value="title1" />
            <scroll class="content" ref="scroll" :probe-type="3">
                <div>
                    <van-cell
                            class="cellItem"
                            size="large"
                            :center="true"
                            v-for="(item, index) in playList"
                            :key="item.id"
                            :value-class="{ cellText: true, selectColor: item.isColor }"
                            @click="musicDetailClick(item, index)"
                    >
                        <template #default>
                            <p>
                                {{ musicInfo.name === '' ? '电台音频' : item.name }}
                                <span>—{{ item.singer }}</span>
                            </p>
                        </template>
                        <template #right-icon>
                            <van-icon name="cross" @click.stop="removeBtn(index, item)" />
                        </template>
                    </van-cell>
                </div>
            </scroll>
        </div>
    </div>
</template>

<script>
import scroll from './scroll'
import { Cell, Icon } from 'vant'

export default {
  name: 'historyMusicList',
  computed: {
    musicId: {
      get () {
        return this.$store.state.musicPlay.musicId
      },
      set (nv) {
        return (this.$store.state.musicPlay.musicId = nv)
      }
    },
    title1 () {
      return '当前播放(' + this.$store.state.musicPlay.playList.length + ')'
    },
    playList: {
      get () {
        return this.$store.state.musicPlay.playList
      },
      set (nv) {
        return (this.$store.state.musicPlay.playList = nv)
      }
    },
    musicInfo: {
      get () {
        return this.$store.state.musicPlay.musicAllDetail
      },
      set (nv) {
        return (this.$store.state.musicPlay.musicAllDetail = nv)
      }
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    musicDetailClick (item, index) {
      this.$store.commit('changeMusicId', item.id)
      this.$store.commit('changeMusicIndex', index)

      this.playList.forEach(value => {
        value.isColor = false
      })
      item.isColor = true
    },
    // 打开面板查找是否有相同的url，有就显示播放中的颜色
    openSheet () {
      // 排它
      console.log(this.playList)
      this.playList.forEach(item => {
        console.log(item)
        item.isColor = false
      })
      const index = this.playList.findIndex(value => {
        return value.id === parseInt(this.musicId)
      })
      console.log(index)
      this.playList[index].isColor = true
    },
    more () {
      this.show = !this.show
      this.openSheet()
    },
    removeBtn (index, item) {
      this.$delete(this.playList, index)
      if (this.$store.state.musicPlay.musicId === item.id) {
        this.$store.commit('changeMusicIndex', index - 1)
        this.nextMusic()
        this.playList.forEach(item => {
          item.isColor = false
        })
        setTimeout(() => {
          const index1 = this.playList.findIndex(value => {
            return value.id === parseInt(this.musicId)
          })
          this.playList[index1].isColor = true
        }, 1000)
      }
    }
  },
  components: {
    scroll,
    [Icon.name]: Icon,
    [Cell.name]: Cell

  }
}
</script>

<style scoped lang="less">

    .moreBox {
        position: relative;
        z-index: 2048;

        .musicList {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50vh;
            padding: 16px 16px 30px;
            background-color: #fff;
            border-top-left-radius: 50px;
            border-top-right-radius: 50px;

            .title1 {
                padding: 30px 20px;
                font-size: 40px;
                font-weight: bold;
            }

            .content {
                width: 100vw;
                overflow: hidden;
                position: absolute;
                top: 150px;
                left: 0;
                bottom: 0;
            }

            .cellItem {
                color: #c2463a;
                padding: 30px 30px;
            }

            .cellText {
                font-weight: bold;
                padding-left: 20px;
                font-size: 38px;

                p {
                    width: 600px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                span {
                    font-size: 30px;
                }
            }

            .selectColor {
                color: #c2463a;
            }
        }
    }
</style>
