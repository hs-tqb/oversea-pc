<style lang="scss" scoped>
  @import '~assets/css/base.scss';
</style>

<template>
  <div id="page-query">
    <div></div>
    <div></div>
    <el-table
      :data="dealList? dealList.rows: []"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        type="index"
        :index="index">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    _________
    <div>{{dealList.rows[0]}}</div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  data() {
    return {
      params: {
        innerOrderId:'',
        mobile :'',
        date   :[],
        orderState:'all',
        trigger:'all',
        payout:'',
        pagination:0
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }],
      dealList:null
    }
  },
  computed: {
  },
  beforeMount() {
    this.$http.post('GET_DEAL_LIST', {page:1})
      .then(resp=>{
        this.dealList = resp.data;
      })
  }
}
</script>
