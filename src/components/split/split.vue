<template>
  <div class="split"></div>
</template>

<script>
  export default {
    name: 'split'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../comment/stylus/variable.styl"
  .split
    width: 100%
    height: 16px
    border-top: 1px solid $color-row-line
    border-bottom: 1px solid $color-row-line
    background: $color-background-ssss
</style>
