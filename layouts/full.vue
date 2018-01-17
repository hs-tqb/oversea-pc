<style lang="scss">
  @import '~assets/css/base.scss';

  #layout-root { 
    height:100vh; 
    #layout-main { height:100%; }
  }
</style>

<template>
  <div id="layout-root" :data-page="$route.name">
    <div id="layout-main" >
      <nuxt class="page-container"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from '~/plugins/axios'
Vue.prototype.$http = axios

export default {
  data() {
    return {}
  }
}
</script>
