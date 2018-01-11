<style lang="scss">
  @import '~assets/css/base.scss';
</style>

<template>
  <div id="page-">
    
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  asyncData(ctx) {
    ctx.redirect('/account/balance');
  }
}
</script>
