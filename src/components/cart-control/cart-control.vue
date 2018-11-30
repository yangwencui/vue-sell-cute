<template>
  <div class="cart-control">
    <transition name="move">
        <div  @click.stop="decrease" class="cart-decrease" v-show=" food.count>0" >
          <span class="inner icon-remove_circle_outline"></span>
        </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle"  @click.stop="add"></div>
  </div>
</template>

<script>
  const EVENT_ADD = 'add'
  export default {
    name: 'cart-control',
    props: {
      food: {
        type: Object
        }
    },
    created () {
    },
    methods: {
      add (event) {
        console.log('click')
        if (!this.food.count) {
          this.$set(this.food, 'count', 1)
          this.food.count = 1
        } else {
          this.food.count++
        }
        this.$emit(EVENT_ADD, event.target)
      },
      decrease () {
        if (this.food.count > 0) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
 .cart-control
   font-size :0
   .cart-decrease
     display :inline-block
     padding :6px
     .inner
       display :inline-block
       line-height :24px
       font-size :$fontsize-large-xxx
       color : $color-blue
       transition :all 0.4s linear
       transform :rotate(0)
     &.move-enter-active ,&.move-leaver-active
       transition :all 0.4s linear
     &.move-enter ,&.move-leaver-acticve
       opacity :0
       transform :translate3d(24px,0,0)
       .inner
        transform :rotate(180deg)
   .cart-count
     display :inline-block
     vertical-align :top
     width :12px
     line-height :24px
     padding-top:4px
     text-align :center
     font-size :$fontsize-small-s
     color :$color-grey
   .cart-increase
     display :inline-block
     font-size :$fontsize-large-xxx
     padding :6px
     line-height :24px
     color : $color-blue
</style>
