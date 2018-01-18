<style lang="scss">
  #page-preview {
    .explain {
      font-size:20px;
      text-align:center;
    }
  }
</style>


<template>
  <div id="page-preview">
    <div class="explain panel">
      <p v-if="audit===0" class="text-primary">
        您的账号正在审核中，请耐心等待。
        <br>审核通过后将开通所有功能。
        <br>请您保持手机畅通，我们的工作人员将与您联系。
      </p>
      <p v-else-if="audit===1" class="text-success">审核成功</p>
      <p v-else-if="audit===2" class="text-danger">
        抱歉，您的账号未通过审核，无法为您开通产品。
        <br>请联系天气宝客服
        <br><a href="mailto:service@utianqi.com">service@utianqi.com</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 审核中:0; 审核成功:1; 审核失败:2; 
      audit:this.$store.state.merchantInfo.verifyState
    }
  }
}
</script>
