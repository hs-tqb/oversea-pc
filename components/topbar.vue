<style lang="scss" scoped>
  @import '~assets/css/base.scss';
  $h:50px;
  #topbar { 
    height:$h; background:$--color-white; 
    button { margin:0; height:$h; border:0 none; }
    .avatar {
      position: relative;
      i { 
        display:inline-block; vertical-align:middle;
        @include square(26px); @include bg-center('~/static/img/logo.png'); @extend .disc; }
      }
  }
</style>

<template>
  <div id="topbar">
    <div class="fl">
      <el-button @click="toggleSidebarCollapse">
        <i :class="`el-icon-d-arrow-${isSidebarCollapsed?'right':'left'}`"></i>
      </el-button>
    </div>
    <div class="fr">
      <el-button>
        <el-badge value="10" class="item">
          <i class="el-icon-bell"></i>
        </el-badge>
      </el-button>
      <el-button class="avatar">
        <i></i> 昵称昵称
      </el-button>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
// import store from '~/store/index.js'

export default {
  data() {
    return {
    }
  },
  computed: {
    isSidebarCollapsed() {
      return this.$store.state.isSidebarCollapsed
    },
  },
  methods: {
    toggleSidebarCollapse(e) {
      this.$store.commit('setSidebarCollapseState', !this.isSidebarCollapsed);
    }
  }
}
</script>
