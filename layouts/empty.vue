<style>

</style>

<template>
  <nuxt class="page-container"/>
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
