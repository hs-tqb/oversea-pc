
<style lang="scss" scoped>

</style>

<template>
  <div id="page-container">
    <div>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    getData() {
      this.$http.post('GET_NOTICE')
      .then( async (resp)=>{
        let a = await this.getData2();
      })
    },
    getData2() {
      return this.$http.post('USER_INFO')
    }
  },
  mounted() {
    // console.log('zzzz');
    this.getData();
    // console.log('as')
  }
}
</script>
