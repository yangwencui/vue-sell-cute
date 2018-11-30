<template>
 <div class="goods">
   <div class="scroll-nav-wrapper">
     <cube-scroll-nav
       :side=true
       :data="goods"
       :options="scrollOptions"
       v-if="goods.length"
     >
       <template slot="bar" slot-scope="props">
         <cube-scroll-nav-bar
           direction="vertical"
           :labels="props.labels"
           :txts="barTxts"
           :current="props.current"
         >
           <template slot-scope="props">
             <div class="text">
               <support-ico
                 v-if="props.txt.type>0"
                 :size=2
                 :type="props.txt.type"
               ></support-ico>
               <span>{{props.txt.name}}</span>
               <span class="num" v-if="props.txt.count">
                  <bubble :num="props.txt.count"></bubble>
                </span>
             </div>
           </template>
         </cube-scroll-nav-bar>
       </template>
       <cube-scroll-nav-panel
         v-for="good in goods"
         :key="good.name"
         :label="good.name"
         :title="good.title"
       >
         <ul>
           <li v-for="food in good.foods"
               :key="food.name"
                class="food-item"
           >
             <div class="icon">
               <img :src="food.icon" width="57" height="57">
             </div>
             <div class="content">
               <h2 class="name">{{food.name}}</h2>
               <p  class="desc">{{food.description}}</p>
               <div class="extra">
                 <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
               </div>
               <div class="prize">
                 <span class="now" >¥{{food.price}}</span><span class="old" v-show="food.oldPrice" style="text-decoration: line-through; font-size: 10px; color: rgb(147, 153, 159)">¥{{food.oldPrice}}</span>
               </div>
               <div class="cartcontrol-wrapper">
                 <cartcontrol :food="food" @add="onAdd"></cartcontrol>
               </div>
             </div>
           </li>
         </ul>
       </cube-scroll-nav-panel>
     </cube-scroll-nav>
   </div>
  <div class="shop-cart-wrapper">
    <shop-cart
      :selectFood="selectFoods"
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
      ref="shopcart"></shop-cart>
  </div>
 </div>
</template>

<script>
  import { getGoods } from '../../api'
  import ShopCart from '../../components/shopcart/shopcart'
  import Cartcontrol from '../../components/cart-control/cart-control'
  import Bubble from '../../components/bubble/bubble'
  import SupportIco from '../support-icon/support-icon'
  export default {
    name: 'goods',
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        goods: [],
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      seller () {
        return this.data.seller
      },
      selectFoods () {
        let ret = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              ret.push(food)
            }
          })
        })
        return ret
      },
      barTxts () {
        let ret = []
        this.goods.forEach((good) => {
          const { type, name, foods } = good
          let count = 0
          foods.forEach((food) => {
            count += food.count || 0
          })
          ret.push({
            type,
            name,
            count
          })
        })
        console.log(ret)
        return ret
      }
    },
    methods: {
      fetch () {
        getGoods().then((goods) => {
          this.goods = goods
        })
      },
      onAdd (target) {
        this.$refs.shopcart.drop(target)
      }
    },
    components: {
      SupportIco,
      ShopCart,
      Cartcontrol,
      Bubble
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../comment/stylus/variable.styl'
  @import "../../comment/stylus/mixin.styl"
  .goods
    position :relative
    text-align :left
    height :100%
    .scroll-nav-wrapper
      position :absolute
      width :100%
      top :0
      left:0
      bottom : 48px
    >>>  .cube-scroll-nav-bar
       width : 80px
       white-space :normal
       overflow :hidden
    >>>   .cube-scroll-nav-bar-item
      padding: 0 10px;
      display :flex
      align-items :center
      height :56px
      line-height :14px
      font-size: $fontsize-small
      background: $color-background-ssss
      .text
        flex :1
        position :relative
      .num
        position :absolute
        right :-8px
        top :-10px
      .support-ico
        display :inline-block
        vertical-align :top
        margin-right :4px
    >>> .cube-scroll-nav-bar-item_active
      background: $color-white
      color: $color-dark-grey
    >>> .cube-scroll-nav-panel-title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid $color-col-line
      font-size: $fontsize-small
      color: $color-grey
      background: $color-background-ssss
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      position: relative
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
        img
          height: auto
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: $fontsize-medium
          color: $color-dark-grey
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
           position :absolute
           right :0
           bottom :1px

    .shop-cart-wrapper
      position: absolute
      left: 0
      bottom: 0
      z-index: 50
      width: 100%
      height: 48px
</style>
