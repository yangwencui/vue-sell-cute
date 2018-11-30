<template>
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
    <div class="detail-close "  @click="visible=false">
      <span class="icon-close"></span>
    </div>
  </div>

</template>

<script>
  import VLine from './v-line'
  import star from '../../components/start/star'
  import supportIcon from '../../components/support-icon/support-icon'
  export default {
    props: {
      seller: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        name1: '优惠信息',
        name2: '商家公告',
        visible: false
      }
    },
    methods: {
      show () {
        this.visible = true
      }
    },
    components: {
       VLine,
       star,
       supportIcon
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../comment/stylus/mixin.styl'
  @import '../../comment/stylus/variable.styl'
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
        .title
          display: flex
          width: 80%
          margin: 28px auto 24px auto
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          .text
            padding: 0 12px
            font-weight: 700
            font-size: 14px

          .detail-supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .detail-icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat
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
