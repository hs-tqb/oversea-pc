<style lang="scss">
  @import '~assets/css/base.scss';

  #page {  margin:100px;  width:300px; height:500px; outline:1px solid blue;  }
  #page .topbar { position:relative; height:100px; overflow:hidden; }
  #page .topbar .circle { 
    position:absolute; left:50%; z-index:1; transform:translate3d(-50%,-50%,0);
    width:400px; height:200px; border-radius:50%; background:rgba(200,0,0, 1) 
  }
  #page .topbar .inner-wrapper { position:relative; z-index:10; color:#fff; }
</style>


<template>
  <div id="page-preview">
    预览预览


    <!-- <style lang="scss">
      #page {  margin:100px;  width:300px; height:500px; outline:1px solid blue;  }
      #page .topbar { position:relative; height:100px; overflow:hidden; }
      #page .topbar .circle { 
        position:absolute; left:50%; z-index:1; transform:translate3d(-50%,-50%,0);
        width:400px; height:200px; border-radius:50%; background:rgba(200,0,0, 1) 
      }
      #page .topbar .inner-wrapper { position:relative; z-index:10; color:#fff; }
    </style> -->
    <div id="page" style="">
      <div class="topbar">
        <div class="circle"></div>
        <div class="inner-wrapper">
          这里是头部
        </div>
      </div>
      <div class="content">
        这里是内容
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
