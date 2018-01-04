<style lang="scss" scoped>
  @import '~assets/css/base.scss';
  // p { color: @danger; }
</style>

<template>
  <div id="page-container">
    <p class="puzipuzi">{{$route.name}}</p>
    <el-button type="primary" @click="req">默认按钮</el-button>
    <nuxt-link to="/test/a">首页</nuxt-link>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  data () {
    // console.log( '__________' );
    // console.log( this.$route )
    // console.log( '__________' );
    return {
      // text: JSON.stringify(this)
      text:'111'
    }
  },
  methods: {
    req (e) {
      axios.post('test/getData', {
          key: '1'
        })
        .then(resp => {
          console.log(resp.data.data)
        })
    }
  }
}
</script>
