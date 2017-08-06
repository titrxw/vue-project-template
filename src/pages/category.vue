<template>
  <div class="category">
    <Category :categoryList="menuList">
      <div v-for="(item,index) in menuList" :slot="index"  :key="index">
        <header class="menu_detail_header">
            <section class="menu_detail_header_left">
                <strong class="menu_item_title">{{item.name}}</strong>
                <span class="menu_item_description">{{item.description}}</span>
            </section>
        </header>
        <div v-if="item.category" class="menu_detail_list">
          <grid :rows="4">
              <grid-item :link="{ path: 'search?category=' + citem.id}" :label="citem.title" v-for="(citem, index) in item.category" :key="index">
                  <img slot="icon" :src="citem.icon"></img>
              </grid-item>
          </grid>
        </div>
        <section v-for="(goods,index) in item.goods" @click="goodDetail(goods.id)" :key="index" class="menu_detail_list">
          <section class="menu_good_img" >
              <img :src="goods.image_path">
              <span class="desc">如果他否认公司发货 </span>
          </section>
        </section>
      </div>
    </Category>
  </div>
</template>
<script>
import Category from '../components/category'
import { Grid, GridItem } from 'vux'
export default {
  components: {
    Grid,
    GridItem,
    Category
  },
  data () {
    return {
      menuList: [
        {
          text: '测试',
          type: 1,
          icon: require('../assets/images/coupon.png'),
          description: 'dfdsf',
          category: [
            {
              id: 1,
              icon: require('../assets/images/coupon.png'),
              title: '分类',
              path: ''
            },
            {
              id: 1,
              icon: require('../assets/images/coupon.png'),
              title: '分类',
              path: ''
            },
            {
              id: 1,
              icon: require('../assets/images/coupon.png'),
              title: '分类',
              path: ''
            },
            {
              id: 1,
              icon: require('../assets/images/coupon.png'),
              title: '分类',
              path: ''
            }
          ],
          goods: [
            {
              id: 1,
              image_path: require('../assets/images/coupon.png'),
              name: '商品',
              url: ''
            },
            {
              id: 1,
              image_path: require('../assets/images/coupon.png'),
              name: '商品',
              url: ''
            },
            {
              id: 1,
              image_path: require('../assets/images/coupon.png'),
              name: '商品',
              url: ''
            }
          ]
        },
        {
          text: '测试',
          type: 1,
          icon: require('../assets/images/coupon.png'),
          description: 'dfdsf',
          category: [
            {
              icon: require('../assets/images/coupon.png'),
              title: '分类',
              path: ''
            },
            {
              icon: require('../assets/images/coupon.png'),
              title: '分类',
              path: ''
            }
          ],
          goods: [
            {
              image_path: require('../assets/images/coupon.png'),
              name: '商品',
              url: ''
            }
          ]
        },
        {
          text: '测试',
          type: 1,
          icon: require('../assets/images/coupon.png'),
          description: 'dfdsf',
          category: [
            {
              icon: require('../assets/images/coupon.png'),
              title: '分类',
              path: ''
            },
            {
              icon: require('../assets/images/coupon.png'),
              title: '分类',
              path: ''
            }
          ],
          goods: [
            {
              image_path: require('../assets/images/coupon.png'),
              name: '商品',
              url: ''
            }
          ]
        }
      ]
    }
  },
  methods: {
    goodDetail (id) {
      this.$router.push({path: 'goodDetail?id=' + id})
    }
  }
}
</script>
<style>
</style>
