<style lang="scss">
  @import '~assets/css/base.scss';
  $bg:$--cs--menu-item-fill;
  $cl:$--color-text-placeholder;
  $hoverBg:$--cs--menu-item-hover-fill;
  $hoverCl:$--color-white;
  $activeBg:$--color-primary;
  $activeCl:$--color-white;
  $logoSize:48px;

  #sidebar { 
    height:100%; 
    .el-menu-vertical-demo{
      height:100%; color:$cl; background:$bg; border:0 none; 
      &:not(.el-menu--collapse) { width: 200px; }
      .el-submenu__title,
      .el-menu-item {
        color:$cl; background:$bg;
        &.is-active { color:$activeCl; background:$activeBg; }
        &:focus, &:hover { 
          background:$hoverBg; 
          color:$hoverCl;
        }
        i { color:inherit; }
      }
      .brand {
        &.is-active, &:hover, &:active { background:$bg!important; color:$activeCl!important; }
        i { display:inline-block; margin-left:-12px; @include square($logoSize); background:url('~/assets/img/logo.png') no-repeat center/cover; }
        span { margin-left:12px; font-size:24px; color:#fff; }
      }
      .el-menu-item-group__title { display:none; }
    }
  }
</style>

<template>
  <div id="sidebar">
    <el-menu 
      :router="true"
      class="el-menu-vertical-demo" 
      @open="handleOpen" 
      @close="handleClose" 
      :collapse="isSidebarCollapsed"
      :default-openeds="defaultOpens"
    >
      <el-menu-item index="/" class="brand">
        <i class=""></i>
        <span slot="title">晴空万里宝</span>
      </el-menu-item>
      <template v-for="(item,i) in navs">
        <!-- 导航组 -->
        <el-submenu
          v-if="item.children"
          :key="`nav-${i}`"
          :index="`${i+1}`" 
        >
          <template slot="title">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.text}}</span>
          </template>
          <el-menu-item-group aria-expanded="false">
            <el-menu-item 
              v-for="(sItem,j) in item.children" 
              :key="`nav-${i}-${j}`" 
              :index="sItem.path"
              :class="$route.path===sItem.path?'is-active':''"
            >
              <i :class="`el-icon-${sItem.icon}`"></i>
              <span slot="title">{{sItem.text}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 导航 -->
        <el-menu-item 
          v-else
          :key="`nav-${i}`"
          :index="item.path"
          :class="$route.path===item.path?'is-active':''"
        >
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{item.text}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        navs:[
          // {icon:'more',  text:'首页', path:'/'},
          {icon:'goods', text:'下单', path:'/addorder'},
          {icon:'search', text:'查询订单', path:'/query', },
          {icon:'date',  text:'我的账户', path:'/account', expanded:true, children:[
            {icon:'date', text:'账户余额', path:'/account/balance'},
            {icon:'date', text:'账户资料', path:'/account/profile'},
          ]}
        ]
      };
    },
    computed: {
      defaultOpens() {
        let path = this.$route.path;

        // 根据 path, 要么不展开, 要么只展开一个
        // let idx  = 0;
        // this.navs.some((n,i)=>{
        //   return n.children && n.children.some(c=>{
        //     return c.path === path;
        //   }) && (idx=i);
        // });
        // return [String(idx+1)];

        // 根据 expanded 和 path, 可能展开多个
        let list = [];
        this.navs.forEach((n,i)=>{
          if ( 
            n.expanded ||
            (n.children && n.children.some(c=>c.path===path) )
          ) {
            list.push(String(i+1));
          }
        });
        return list;
      },
      isSidebarCollapsed() {
        return this.$store.state.isSidebarCollapsed
      },
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      navTo(path) {
        // console.log(path);
      }
    }
  }
</script>
