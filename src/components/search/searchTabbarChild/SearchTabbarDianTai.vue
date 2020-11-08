<template>
    <div class="Dj">
        <van-cell
                v-for="(item,index) in diantais"
                :key="index"
                class="my-cell"
                @click="pushDianTai(item.id)">
            <template #icon>
                <van-image width="70"
                           height="70"
                           radius="5"
                           cover
                           :src="item.picUrl" />
            </template>
            <template #title>
                <div>
                    <div class="title">
                        <span>{{ item.name }}</span>
                        <span v-for="(name,indey) in item.alia" :key="indey+10">{{ name }}</span>
                    </div>
                </div>
            </template>
            <template #label>
                <div style="position: relative;left: 14px">
                    <span>{{ item.dj.nickname }} </span>
                </div>
            </template>
        </van-cell>
    </div>
</template>

<script>
import { GetSearchApi } from '../../../http/all-api'
import { Icon, Button, Tag, Cell, CellGroup, Image as VanImage } from 'vant'

export default {
  name: 'SearchTabbarDianTai',
  data () {
    return {
      diantais: []
    }
  },
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [VanImage.name]: VanImage
  },
  created () {
    GetSearchApi(this.$store.state.search.addWord, '1009')
      .then(res => {
        this.diantais = res.data.result.djRadios
        console.log(this.diantais)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    pushDianTai (id) {
      this.$router.push({
        path: '/Dj-detail',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
    .Dj {
        margin: 20px 30px;

        .title {
            padding-left: 30px;
            .overTextEllipsis(@width: 70vw);
        }

        .my-cell {
            padding: 20px 0;
        }
    }

</style>
