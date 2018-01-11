<style lang="scss">
  @import '~assets/css/base.scss';
  #page-account-balance {
    .panel { padding:$common-gap; }
    #balance-info {
      .border { margin:12px 0; @include border('bottom'); }
      .withdrawal { 
        margin:12px 0;
        h3 { margin-right:50px; font-weight:500; font-size:30px; line-height:38px; }
      }
      .record span { margin-right:50px; }
    }
    #record-list {
      h3 { font-weight:500; font-size:20px; }
    }
    .pagination-wrapper {
      position: relative;
      margin: 12px 0;
      height: 32px;
      .el-pagination {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate3d(-50%,0,0);
      }
    }
  }
</style>

<template>
  <div id="page-account-balance">
    <!-- 余额 & 提现 信息 -->
    <div id="balance-info" class="panel">
      <el-popover trigger="hover" placement="top" popper-class="payout-popup">
        <span slot="reference">账户余额 <i class="el-icon-question"></i></span>
        <div><i class="el-icon-question"></i>文字文字</div>
      </el-popover>
      <div class="flex-dir-row withdrawal">
        <h3>￥78</h3>
        <el-button type="primary">提现</el-button>
      </div>
      <div class="border"></div>
      <div class="record">
        <span>提现中金额</span>
        <span>￥</span>
        <span>提现中金额</span>
        <span>￥</span>
      </div>
    </div>
    <div id="record-list" class="panel">
      <h3>资金记录</h3>
      <el-tabs v-model="tab" @tab-click="switchTab">
        <el-tab-pane name="trading">
          <span slot="label"><i class="el-icon-date"></i> 交易记录</span>
          <el-radio-group v-model="tradingParams.payState" @change="radioChange" size="small">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="0">未支付</el-radio-button>
            <el-radio-button label="1">已支付</el-radio-button>
          </el-radio-group>
          <el-table
            stripe
            highlight-current-row
            v-if="tradingData"
            style="width: 100%"
            :data="tradingData.rows"
            :default-sort="{prop:'date', order:'descending'}"
          >
            <el-table-column
              width="50"
              label="序号">
              <template scope="scope">
                {{ tradingData.pageSize*(tradingData.page-1) + scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column prop="gmtCreate" label="时间" width="160" sortable></el-table-column>
            <el-table-column prop="innerOrderId" label="订单号" width="160"></el-table-column>
            <el-table-column prop="payFee" label="支付金额" width="100" :formatter="moneyFormatter" sortable>
            </el-table-column>
            <el-table-column prop="dividedAmount" label="分成金额" width="100" :formatter="moneyFormatter" sortable>
            </el-table-column>
            <el-table-column label="业务种类" width="80">
              <template scope="scope">交易</template>
            </el-table-column>
            <el-table-column label="状态" width="65">
              <template scope="scope">
                <span v-if="scope.row.payState===1" class="text-success">已支付</span>
                <span v-else class="text-danger">未支付</span>
              </template>
            </el-table-column>
            <el-table-column prop="describe" label="备注"></el-table-column>
          </el-table>
          <div class="pagination-wrapper">
            <el-pagination
              v-if="tradingData"
              @size-change="paginationSizeChange"
              @current-change="paginationChange"
              :current-page="tradingData.page"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="tradingData.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tradingData.total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane name="withdrawal">
          <span slot="label"><i class="el-icon-date"></i> 提现记录</span>
          <el-radio-group v-model="withdrawalParams.state" @change="radioChange" size="small">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="0">进行中</el-radio-button>
            <el-radio-button label="1">已完成</el-radio-button>
            <el-radio-button label="2">失败</el-radio-button>
          </el-radio-group>
          <el-table
            stripe
            highlight-current-row
            v-if="withdrawalData"
            style="width: 100%"
            :data="withdrawalData.rows"
            :default-sort="{prop:'date', order:'descending'}"
          >
            <el-table-column
              width="50"
              label="序号">
              <template scope="scope">
                {{ withdrawalData.pageSize*(withdrawalData.page-1) + scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column prop="gmtCreate" label="时间" sortable></el-table-column>
            <el-table-column prop="withdrawAmount" label="提现金额" :formatter="withdrawalMoneyFormatter" sortable>
            </el-table-column>
            <el-table-column label="业务种类">
              <template scope="scope">提现</template>
            </el-table-column>
            <el-table-column label="状态">
              <template scope="scope">
                <div v-html="parseWithdrawState(scope.row)"></div>
              </template>
            </el-table-column>
            <el-table-column prop="describe" label="备注"></el-table-column>
          </el-table>
          <div class="pagination-wrapper">
            <el-pagination
              v-if="withdrawalData"
              @size-change="paginationSizeChange"
              @current-change="paginationChange"
              :current-page="withdrawalData.page"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="withdrawalData.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="withdrawalData.total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab             :'trading',
      prevTab         :'trading',
      tradingParams   :this.getDefaultTradingParams(),
      withdrawalParams:this.getDefaultWithdrawalParams(),
      tradingData     :null,
      withdrawalData  :null,
    }
  },
  computed: {
    currentTabParams() {
      this.loadData();
      return this[this.tab+'Params'];
    }
  },
  methods: {
    getDefaultTradingParams() {
      return { payState:'', page:1, pageSize:20, url:'DIVIDED_LIST' };
    },
    getDefaultWithdrawalParams() {
      return { state:'', page:1, pageSize:20, url:'WITHDRAWAL_LIST' };
    },
    loadData() {
      let opt = this[`${this.tab}Params`];
      this.$http.post(opt.url, opt)
      .then(resp=>{
        this[this.tab+'Data'] = resp.data;
      })
    },
    moneyFormatter(row, col) {
      return '￥' + (row[col.property]/100).toFixed(2);
    },
    withdrawalMoneyFormatter(row, col) {
      return '-￥' + (row[col.property]/100).toFixed(2);
    },
    radioChange(val) {
      if ( this.tab ==='trading' ) {
        this.currentTabParams.payState = val;
      } else {
        this.currentTabParams.state = val;
      }
      this.loadData();
    },
    paginationChange(val) {
      this.currentTabParams.page = val;
      this.loadData();
    },
    paginationSizeChange(size) {
      this.currentTabParams.page = 1;
      this.currentTabParams.pageSize = size;
      this.loadData();
    },

    parseWithdrawState(row) {
      var state = row.auditState==2? 0
            : ( row.auditState===1? 
                ( row.withdrawState===1? 2: 1 )
              : 1 );
      // return state === 0? '失败': ( state===1? '进行中': '已完成' );
      return state===0? 
                '<span class="text-danger">失败</span>':
                ( state===1? '进行中': '<span class="text-success">已完成</span>')
    },
    switchTab(tab) {
      if ( tab.name === this.prevTab ) return;
      this.prevTab = tab.name;
      this.loadData();
    },
  },
  beforeMount() {
    this.loadData();
  }
}
</script>
