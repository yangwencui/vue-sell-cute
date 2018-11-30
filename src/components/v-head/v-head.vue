<template>
  <div class="head" >
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports" >
          <support-icon :size="1" :type="seller.supports[0].type"></support-icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="supports-count" @click="showDetail">
          <span class="count" >
            {{seller.supports.length}}个
          </span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" >
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="detail" v-show="visible">
      <div class="detail-wrapper clearfic" >
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <v-line :titleName="name1"></v-line>
        </div>
        <ul v-if="seller.supports" class="detail-supports">
          <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
            <support-icon :size="2" :type="seller.supports[index].type"></support-icon>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
        <v-line :titleName="name2"></v-line>
        <div class="detail-bulletin">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="detail-close "  @click="closeDetail">
        <span class="icon-close"></span>
      </div>
    </div>
  </div>
</template>

<script>
import supportIcon from '../../components/support-icon/support-icon'
import star from '../../components/start/star'
import VLine from '../../components/head-detail/v-line'
export default {
  name: 'v-head',
  data () {
    return {
      name1: '优惠信息',
      name2: '商家公告',
      visible: false
    }
  },
  props: {
    seller: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    showDetail () {
    //   this.headerDetailComp = this.headerDetailComp || this.$createHeaderDetail({
    //     $props: {
    //       seller: 'seller'
    //     }
    //   })
    //   this.headerDetailComp.show()
      this.visible = true
     },
    closeDetail () {
      this.visible = false
    }
  },
  components: {
    supportIcon,
    star,
    VLine
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../comment/stylus/mixin.styl'
  @import '../../comment/stylus/variable.styl'
  .head
    color: $color-white
    background: $color-background-ss
    position :relative
    overflow :hidden
    .content-wrapper
      position :relative
      padding: 24px 12px 18px 24px
      font-size :0px
      .avatar
        display :inline-block
        vertical-align :top
        img
          border-radius :2px
      .content
        display :inline-block
        font-size :14px
        margin-left :16px
        .title
          margin :4px 0px 8px 0px
          width: 100%;
          .brand
            display :inline-block
            vertical-align :top
            width :30px
            height :18px
            bg-image("brand")
            background-size:30px 18px
            background-repeat :no-repeat
          .name
            margin-left :6px
            font-size: $fontsize-large
            font-weight :bold
        .description
          margin-bottom 10px
          line-height :10px
          font-size :$fontsize-small
        .supports
          display :flex
          align-items :center
          .support-icon
            margin-right :4px
          .text
            line-height :12px
            font-size :$fontsize-small-s

      .supports-count
        position :absolute
        right:12px
        bottom :14px
        padding :0 8px
        height :24px
        line-height :24px
        border-radius :14px
        background :rgba(0,0,0,0.2)
        text-align :center
        .count
          vertical-align :top
          font-size :10px
        .icon-keyboard_arrow_right
          font-size :10px
          line-height :24px
          margin-left 2px
    .bulletin-wrapper
      position :relative
      height :28px
      line-height :28px
      padding :0 22px 0 12px
      background :rgba(7,17,27,0.2)
      white-space :nowrap
      overflow :hidden
      text-overflow :ellipsis
      .bulletin-title
        display :inline-block
        vertical-align :top
        width :22px
        height :12px
        margin-top :8px
        bg-image("bulletin")
        background-size :22px 12px
        background -nope
      .bulletin-text
        vertical-align :top
        margin: 0 4px;
        font-size :10px
      .icon-keyboard_arrow_right
        position :absolute
        font-size :10px
        right :12px
        top :8px
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      backdrop-filter: blur(10px)
      opacity: 1
      background: rgba(7, 17, 27, 0.8)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
        .detail-supports
           width: 80%
           margin: 0 auto
           .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                 margin-bottom: 0
              .text
                 line-height: 16px
                 font-size: 12px
        .detail-bulletin
           width: 80%
           margin: 0 auto
           .content
             padding: 0 12px
             line-height: 24px
             font-size: 12px

      .detail-close
         position: relative
         width: 32px
         height: 32px
         margin: -64px auto 0 auto
         clear: both
         font-size: 32px
</style>
