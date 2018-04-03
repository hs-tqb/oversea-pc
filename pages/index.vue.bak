<style lang="scss">
  // @import '~assets/css/base.scss';
  $border:rgba(233, 233, 233, 1);
  #page-home {
    min-width:1172px;
    #dashboard { 
      background:#e5e5e5;
      .list {
        display:flex; flex-direction:row;
        margin-bottom:24px;
        // justify-content:space-between; align-items:center;
      }
      .item { 
        padding:24px; width:265px; background:#fff; border:1px solid $border;
        &:not(:first-child) { margin-left:24px; }
        h3 { 
          font-weight:normal; line-height:1; font-size:14px; 
          span { float:right; }
        }
        strong { font-weight:normal; font-size:30px; line-height:58px; color:#333; }
        .index {
          padding:12px 0; border-top:1px solid $border;
          p { 
            position:relative; float:left; font-size:12px;
            &:last-child { float:right; }
            span:before { display:inline-block; margin:0 3px; vertical-align:2px; border:5px solid transparent;  content:''; }
            &.up span:before { border-top:0; border-bottom-color:green; }
            &.down span:before { border-bottom:0; border-top-color:red; }
          }
        }
      }
    }
  }
</style>

<template>
  <div id="page-home">
    <div id="dashboard" v-if="statistics">
      <div class="list">
        <div class="item">
          <h3>今日销售额
          <el-popover trigger="hover" placement="top" popper-class="payout-popup">
            <span slot="reference"><i class="el-icon-question"></i></span>
            <div><i class="el-icon-question"></i>文字文字</div>
          </el-popover>
          </h3>
          <strong>￥{{statistics.todayOrderAmount}}</strong>
          <div class="index">
            <p :class="parseTrend(statistics.orderAmountTB)">周同比 <span>{{statistics.orderAmountTB}}%</span> </p>
            <p :class="parseTrend(statistics.orderAmountHB)">日环比 <span>{{statistics.orderAmountHB}}%</span> </p>
          </div>
        </div>
        <div class="item">
          <h3>今日分成金额
          <el-popover trigger="hover" placement="top" popper-class="payout-popup">
            <span slot="reference"><i class="el-icon-question"></i></span>
            <div><i class="el-icon-question"></i>文字文字</div>
          </el-popover>
          </h3>
          <strong>￥{{statistics.todayDivided}}</strong>
          <div class="index">
            <p :class="parseTrend(statistics.dividedTB)">周同比 <span>{{statistics.dividedTB}}%</span> </p>
            <p :class="parseTrend(statistics.dividedHB)">日环比 <span>{{statistics.dividedHB}}%</span> </p>
          </div>
        </div>
        <div class="item">
          <h3>今日订单数
          <el-popover trigger="hover" placement="top" popper-class="payout-popup">
            <span slot="reference"><i class="el-icon-question"></i></span>
            <div><i class="el-icon-question"></i>文字文字</div>
          </el-popover>
          </h3>
          <strong>{{statistics.orderCnt}}</strong>
          <div class="index">
            <p :class="parseTrend(statistics.orderCntTB)">周同比 <span>{{statistics.orderCntTB}}%</span> </p>
            <p :class="parseTrend(statistics.orderCntHB)">日环比 <span>{{statistics.orderCntHB}}%</span> </p>
          </div>
        </div>
        <div class="item">
          <h3>账户余额
          <el-popover trigger="hover" placement="top" popper-class="payout-popup">
            <span slot="reference"><i class="el-icon-question"></i></span>
            <div><i class="el-icon-question"></i>文字文字</div>
          </el-popover>
          </h3>
          <strong>￥6,560.83</strong>
          <div class="index">
            <p :class="parseTrend()">周同比 <span>12%</span> </p>
            <p :class="parseTrend()">日环比 <span>12%</span> </p>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="item">
          <h3>累计总销售额
          <el-popover trigger="hover" placement="top" popper-class="payout-popup">
            <span slot="reference"><i class="el-icon-question"></i></span>
            <div><i class="el-icon-question"></i>文字文字</div>
          </el-popover>
          </h3>
          <strong>￥6,560.83</strong>
        </div>
        <div class="item">
          <h3>累计分成金额
          <el-popover trigger="hover" placement="top" popper-class="payout-popup">
            <span slot="reference"><i class="el-icon-question"></i></span>
            <div><i class="el-icon-question"></i>文字文字</div>
          </el-popover>
          </h3>
          <strong>￥6,560.83</strong>
        </div>
        <div class="item">
          <h3>累计订单数
          <el-popover trigger="hover" placement="top" popper-class="payout-popup">
            <span slot="reference"><i class="el-icon-question"></i></span>
            <div><i class="el-icon-question"></i>文字文字</div>
          </el-popover>
          </h3>
          <strong>￥6,560.83</strong>
        </div>
      </div>
    </div>
    <div id="trend-chart">
      <canvas ref="canvas" width="500" height="300"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from '~/assets/js/chart';

export default {
  data() {
    return {
      statistics: null,
      account   : null
    }
  },
  methods: {
    parseTrend(unit) {
      return unit<0? 'down': 'up';
    }
  },
  beforeMount() {
    // 取数据
    Promise.all([
      this.$http.post('getHomeStatistics'),
      this.$http.post('MERCHANT_ACCOUNT_INFO')
    ])
    .then(resps=>{
      if ( resps[0].state === 1 ) {
        this.statistics = resps[0].data;
      }
      if ( resps[1].state === 1 ) {
        this.account = resps[1].data;
      }
    });

    // console.log(Chart);
    // let chart = new Chart( this.$refs['canvas'].getContext('2d') );
    console.log( this.$refs )
  },
  mounted() {
    let data = {
      labels : ["January","February","March","April","May","June","July"],
      datasets : [
        {
          fillColor : "rgba(220,220,220,0.5)",
          strokeColor : "rgba(220,220,220,1)",
          pointColor : "rgba(220,220,220,1)",
          pointStrokeColor : "#fff",
          data : [65,59,90,81,56,55,40]
        },
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : [28,48,40,19,96,27,100]
        }
      ]
    };
    let chart = new Chart( this.$refs.canvas.getContext('2d') );
    // console.log( chart )
    chart.Line(data, {});
  }
}
</script>
