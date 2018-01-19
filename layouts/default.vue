<style lang="scss" scoped>
  @import '~assets/css/base.scss';

  #layout-root { 
    min-height:100vh; 
    @extend .flex-dir-row;
    #layout-right { 
      @extend .flex-1; 
      width :calc( 100vh - 200px );
      height:100vh;
      // background:#f5f5f5;
      
      &.sidebarCollapsed {
          width: calc( 100vw - 64px );
      }
      // overflow-x: auto;
      overflow:hidden;
      #layout-main { 
        width:100%;
        height:calc( 100vh - 50px );
        overflow:auto; 
        .page-container { 
          display:flex;
          flex-direction:column;
          // min-width:1280px; 
          min-height:100%;
          background:#fff;
          border:20px solid #e5e5e5;
        }

        // #page-container {
          // margin:$common-gap; 
        // }
      }
    }
  }
</style>

<template>
  <div id="layout-root" :data-page="$route.name">
    <div id="layout-left">
      <sidebar/>
    </div>
    <div id="layout-right" :class="isSidebarCollapsed?'sidebarCollapsed':''">
      <topbar/>
      <div id="layout-main" >
        <nuxt class="page-container"/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from '~/plugins/axios'
Vue.prototype.$http = axios

import sidebar from '~/components/sidebar.vue'
import topbar  from '~/components/topbar.vue'

export default {
  components: {
    sidebar,
    topbar
  },
  computed: {
    isSidebarCollapsed() {
      console.log('')
      return this.$store.state.isSidebarCollapsed;
    }
  },
}
</script>
