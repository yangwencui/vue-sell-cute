<template>
  <div class="tab">
    <cube-tab-bar
      :showSlider=true
      :useTransition="false"
      ref="tabBar"
      v-model="selectedLabel"
      :data="tabs"
      class="border-bottom-1px">
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop="false"
        :auto-play="false"
        :show-dots="false"
        :initial-index="index"
        ref="slide"
      @change="onChange"
      @scroll="onScroll"
      :options="slideOptions">
        <cube-slide-item  v-for="(tab,index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data" ref="component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      tabs: {
        type: Array,
        default () {
          return []
        }
      },
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        index: this.initialIndex,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0
        }

      }
    },
    computed: {
      selectedLabel: {
        get () {
          return this.tabs[this.index].label
        },
        set (newVal) {
          this.index = this.tabs.findIndex(value => {
            return value.label === newVal
          })
        }
      }
    },
    mounted () {
      this.onChange(this.index)
    },
    methods: {
      onChange (current) {
        this.index = current
        const component = this.$refs.component[current]
        // console.log(component)
        component.fetch && component.fetch()
      },
      onScroll (pos) {
         // console.log(this.$refs.tabBar.$el.clientWidth)
         // console.log(this.$refs.slide.slide)
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const transform = -pos.x / slideWidth * tabBarWidth
        this.$refs.tabBar.setSliderTransform(transform)
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../comment/stylus/variable.styl'
  .tab
    >>> .cube-tab
      padding :10px 0
    display :flex
    flex-direction column
    height :100%
    .slide-wrapper
      flex :1
      overflow :hidden
</style>
