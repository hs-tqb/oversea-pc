<style lang="scss">
  @import '~assets/css/base.scss';
  #page-query {
    .el-table,
    .el-table__body-wrapper, 
    .el-table__footer-wrapper, 
    .el-table__header-wrapper { min-width:100%; width:auto; overflow: visible; }
    .el-table .cell { white-space:nowrap; }
    .el-table__row td { width:180px; }

    .filter-wrapper {
      // .inner-wrapper { display:flex; flex-direction:row; }
      padding:12px;
      .inner-wrapper { margin:8px 0; }
      .el-input { width:230px; }
      span.label:not(:first-child) { margin-left:48px; }
    }

    .pagination-wrapper { 
      position:relative; margin:12px 0; height:32px;
      .el-pagination { 
        position: absolute; left:50%; top:0; transform:translate3d(-50%,0,0);
      }
    }
  }
  .dialog-orderDetail {
    .el-dialog__header { @include border('bottom'); }
  }
</style>

<template>
  <div id="page-query">
    <div class="filter-wrapper">
      <div class="inner-wrapper">
        <span class="label">订单号：</span>
        <el-input v-model="params.innerOrderId" size="small">
          <!-- <template slot="prepend">订单号</template> -->
        </el-input>
        <span class="label">被保人手机：</span>
        <el-input v-model="params.buyerMobile" size="small">
          <!-- <template slot="prepend">手机号</template> -->
        </el-input>
        <span class="label">下单日期：</span>
        <el-date-picker
          v-model="datePickerOptions.dateRange"
          type="datetimerange"
          size="small"
          :picker-options="datePickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="datePicked"
          align="right">
        </el-date-picker>
      </div>
      <div class="inner-wrapper">
        <span class="label">订单状态：</span>
        <el-radio-group v-model="params.payState" size="small">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">有效</el-radio-button>
          <el-radio-button label="0">无效</el-radio-button>
        </el-radio-group>
        <span class="label">判定结果：</span>
        <el-radio-group v-model="params.triggerState" size="small">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">应赔付</el-radio-button>
          <el-radio-button label="0">无须赔付</el-radio-button>
        </el-radio-group>
        <span class="label">赔付款支付状态：</span>
        <el-radio-group v-model="params.payoutState" size="small">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">已打款</el-radio-button>
          <el-radio-button label="0">未打款</el-radio-button>
        </el-radio-group>
      </div>
      <div class="btn-group">
        <el-button type="primary" @click="loadDealList(false)">查询</el-button>
        <el-button @click="loadDealList(true)">重置</el-button>
      </div>
    </div>
    <div v-loading="dealListLoading">
      <el-table
        stripe
        highlight-current-row
        :data="!!dealList? dealList.rows: []"
        :default-sort="{prop:'date', order:'descending'}"
        @row-click="showOrderDetail"
        >
        <el-table-column
          width="50"
          label="序号">
          <template scope="scope">
            {{ params.pageSize*(params.page-1) + scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="innerOrderId"
          width="140"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="insuredMobile"
          width="110"
          label="被保人手机">
        </el-table-column>
        <el-table-column
          prop="insuredNames"
          width="100"
          label="被保人姓名">
        </el-table-column>
        <el-table-column
          prop="cityIds"
          label="目的地">
        </el-table-column>
        <el-table-column
          prop="orderPrice"
          width="100"
          :formatter="moneyFormatter"
          label="订单金额"
          sortable>
        </el-table-column>
        <el-table-column
          prop="gmtCreate"
          label="下单日期"
          width="120"
          :formatter="dateFormatter"
          sortable>
        </el-table-column>
        <el-table-column
          prop="minStime"
          width="120"
          label="保障开始日期"
          sortable>
        </el-table-column>
        <el-table-column
          prop="maxEtime"
          width="120"
          label="保障结束日期"
          sortable>
        </el-table-column>
        <!-- order.payState == 1 ? '正常': '已取消' -->
        <el-table-column
          label="订单状态">
          <template scope="scope">
            <!-- <span :class="payStateParser(scope.row.payState)">
              {{ payStateFormatter(scope.row.payState) }}
            </span> -->
            <el-tag :type="payStateParser(scope.row.payState)">
              {{payStateFormatter(scope.row.payState)}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="realPayoutFee"
          width="120"
          :formatter="moneyFormatter"
          label="已赔付金额(元)"
          sortable>
        </el-table-column>
        <el-table-column
          prop="payoutFee"
          width="120"
          :formatter="moneyFormatter"
          label="应赔付金额(元)"
          sortable>
        </el-table-column>
        <el-table-column
          prop="dividedAmount"
          width="120"
          :formatter="moneyFormatter"
          label="分成金额(元)"
          sortable>
        </el-table-column>
        <el-table-column
          label="操作" width="120">
          <template scope="scope">
            <el-button type="text" size="small">详情</el-button>
            <el-button type="text" size="small" v-if="scope.row.payState===1" @click.stop="sendContract(scope.row)">发送合约</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  
    <div class="pagination-wrapper" v-if="!!dealList">
      <el-pagination
        @size-change="paginationSizeChange"
        @current-change="paginationChange"
        :current-page="params.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dealList.total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="orderDetail.show" top="50px" width="700px" title="订单详情" custom-class="dialog-orderDetail">
      <order-detail :orderId="orderDetail.orderId"></order-detail>
    </el-dialog>
    <el-dialog 
      :visible.sync="sendContractParams.show" 
      title="您可以" width="600px" custom-class="dialog-sendContract"
      :before-close="resetSentContractParams"
    >
      <p>
        发送合约到邮箱：
        <el-input placeholder="" v-model.trim="sendContractParams.mail" style="width:auto;">
          <template slot="append">
            <el-button type="primary" @click="doSendContract">发送</el-button>
          </template>
        </el-input>
        <span v-if="sendContractParams.isMailChecked" :class="sendContractTipsClass">
          &nbsp;&nbsp;&nbsp;{{sendContractTips}}
        </span>
      </p>
      <p>或者</p>
      <p>
        下载合约到本地：<el-button type="primary" @click="downloadContract">下载</el-button>
        <span 
          v-if="sendContractParams.isDownloading" 
          id="downloadContractTips" 
          :class="sendContractParams.hasDownloaded?'text-success':'text-primary'"
        >
          &nbsp;&nbsp;&nbsp;
          {{
            sendContractParams.hasDownloaded? 
            '下载成功：晴空万里宝合约_'+sendContractParams.innerOrderId+'.pdf':
            '下载中...'
          }}
        </span>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import orderDetail from '~/components/orderDetail'
export default {
  data() {
    return {
      params: this.getDefaultParams(),
      datePickerOptions: {
        dateRange:'',
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      dealList:null,
      dealListLoading:true,
      orderDetail: {
        show:false,
        orderId:'',
      },
      sendContractParams: {
        innerOrderId:'',
        show:false,
        mail:'',
        isMailChecked:false,
        isMailValid:false,
        isSending: false,
        isSentFailed:false,
        isSentSuccess:false,
        textCheckFailed:'邮箱格式错误, 请检查',
        textSending:'发送中...',
        textSentFailed:'发送失败，请稍后重试',
        textSentSuccess:'发送成功',

        isDownloading:false,
        hasDownloaded:false,
      }
    }
  },
  components: {
    orderDetail: orderDetail
  },
  computed: {
    sendContractTips() {
      let params = this.sendContractParams;
      let text   = '';
      if ( params.isMailValid ) {
        if ( params.isSending ) {
          text = params.textSending;
        } else if ( params.isSentSuccess ) {
          text = params.textSentSuccess;
        } else if ( params.isSentFailed ) {
          text = params.textSentFailed;
        }
      } else {
        text = params.textCheckFailed;
      }
      return text;
    },
    sendContractTipsClass() {
      let params = this.sendContractParams;
      let text   = 'text-';
      if ( params.isMailValid ) {
        if ( params.isSending ) {
          text += 'normal';
        } else if ( params.isSentSuccess ) {
          text += 'success';
        } else if ( params.isSentFailed ) {
          text += 'danger';
        }
      } else {
        text += 'danger';
      }
      return text;
    },
  },
  methods: {
    showOrderDetail(row) {
      this.orderDetail.orderId = row.innerOrderId;
      this.orderDetail.show = true;
    },
    payStateParser(code) {
      // console.log(row, col);
      return code === 1? 'success': 'danger'
    },
    payStateFormatter(code) {
      // return (row[col.property])===1? '正常':'已取消'
      return code === 1? '正常': '已取消'
    },
    moneyFormatter(row, col) {
      return (row[col.property]/100).toFixed(2);
    },
    dateFormatter(row,col) {
      return (row[col.property]).split(' ')[0]
    },
    getDefaultParams() {
      this.datePickerOptions && (this.datePickerOptions.dateRange='');
      return {
        innerOrderId:undefined,
        buyerMobile :undefined,
        stime   :undefined,
        etime   :undefined,
        payState:undefined,
        triggerState:undefined,
        payoutState:undefined,
        page:1,
        pageSize:20
      };
    },
    loadDealList(inDefault) {
      this.dealListLoading = true;
      if ( inDefault ) {
        this.params = this.getDefaultParams();
      }
      this.$http.post('GET_DEAL_LIST',  this.params )
      .then(resp=>{
        this.dealList = resp.data;
        this.dealListLoading = false;
      })
    },
    // 筛选 - 日历控制
    datePicked(dates, d) {
      this.params.stime = this.calendarDateFormatter(dates[0]);
      this.params.etime = this.calendarDateFormatter(dates[1]);
    },
    calendarDateFormatter(d) {
      return `${d.getFullYear()}-${this.prefixZero(d.getMonth()+1)}-${this.prefixZero(d.getDate())}`;
    },
    prefixZero(n) {
      return n>9? n: '0'+n;
    },
    // 页码控制
    paginationChange(page) {
      this.params.page = page;
      this.loadDealList();
    },
    paginationSizeChange(pageSize) {
      this.params.pageSize = pageSize;
      this.loadDealList();
    },
    sendContract(row) {
      this.sendContractParams.innerOrderId  = row.innerOrderId;
      this.sendContractParams.mail = window.localStorage.getItem(row.innerOrderId) || '';
      this.sendContractParams.show = true;
    },
    doSendContract() {
      let params = this.sendContractParams;
      if ( params.isSending ) return;
      params.isSending     = true;

      params.isMailChecked = true;
      if ( !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test( params.mail ) ) {
        return params.isSending = false;
        params.isMailValid   = false;
      }

      params.isMailValid   = true;
      window.localStorage.setItem(params.innerOrderId, params.mail)

      this.$http.post('SEND_MAIL', {
        innerOrderId: params.innerOrderId,
        file   : 'http://ts.baotianqi.cn/mail/pdfPage',
        email  : params.mail
      })
      .then(resp=>{
        params.isSending    = false;
        if ( resp.state !== 1 ) {
          throw resp.message;
        } else {
          params.sentFailed = false;
          params.isSentSuccess = true;
        }
      })
      .catch(err=>{
        params.isSending     = false;
        params.sentFailed    = true;
        params.isSentSuccess = false;
      })
    },
    downloadContract() {
      let params = this.sendContractParams;
      params.isDownloading = true;
      var iframe = document.createElement('iframe');
      iframe.style.width = '0px';
      iframe.style.height= '0px';
      document.body.appendChild(iframe);
      iframe.src = '/pdf?innerOrderId=' + params.innerOrderId;
      window.__contractDownloadCompleted = false;
      this.checkDownloadCompletionState(()=>{
        this.sendContractParams.hasDownloaded = true;
      })
    },
    checkDownloadCompletionState(callback) {
      if ( window.__contractDownloadCompleted ) {
        callback && callback();
      } else {
        setTimeout(()=>{
          this.checkDownloadCompletionState(callback)
        }, 300);
      }
    },
    resetSentContractParams(done) {
      let params = this.sendContractParams;
      params.isMailChecked = false;
      params.isMailValid   = false;
      params.isSending     = false;
      params.isSentFailed  = false;
      params.isSentSuccess = false;
      params.isDownloading = false;
      params.hasDownloaded = false;
      done();
    }
  },
  beforeMount() {
    this.loadDealList();
  }
}
</script>
