<style lang="scss">
  // @import '~assets/css/base.scss';
  .comp-orderDetail {
    // table { width:100%!important; }
    h3 { font-size:36px; }
    h4 { margin-top:20px; font-size:30px; }
    h3, h4 { margin-bottom:10px; line-height:1.2; font-weight:500; color:#317eac; }
    p { margin:10px 0; }
    a { 
      text-decoration:none; color:#2fa4e7; 
      &:hover { text-decoration:underline; }
    }
    .el-table td, .el-table th { padding:8px 0; }
  }
</style>

<template>
  <div class="comp-orderDetail" v-if="!!orderInfo && !!triggerInfo && !!payoutRecord">
      <h3>晴天万里宝</h3>
      <p>
        <b class="label">订&ensp;单&ensp;号：</b>
        {{orderId}}
      </p>
      <p>
        <b class="label">保障时间：</b>
        {{safeguard.dateRange[0]}} 至 {{safeguard.dateRange[1]}}
      </p>
      <p>
        <b class="label">保障城市：</b>
        {{safeguard.city.join('、')}}
      </p>
      <h4>购买信息</h4>
      <p>
        <b class="label">渠&ensp;道&ensp;号：</b>
        {{orderInfo.merchantId}}
      </p>
      <p>
        <b class="label">被保障人：</b>
        {{orderInfo.insuredName[0]}} <span class="text-danger">{{orderInfo.insuredMobile[0]}}</span>
      </p>
      <p>
        <b class="label">购买时间：</b>
        {{orderInfo.buyTime}}
      </p>
      <p>
        <b class="label">单&ensp;&ensp;&ensp;&ensp;价：</b>
        <span class="text-danger">￥{{ moneyFormatter(orderInfo.price) }}</span> / 人
      </p>
      <p>
        <b class="label">保障人数：</b>
        {{orderInfo.insuredName.length}} 人
      </p>
      <p>
        <b class="label">订单金额：</b>
        ￥{{ moneyFormatter(orderInfo.price*orderInfo.insuredName.length) }}
      </p>
      <p>
        <b class="label">优惠金额：</b>
        ￥{{ moneyFormatter(orderInfo.discountAmount) }}
      </p>
      <p>
        <b class="label">支付金额：</b>
        <span class="text-danger">￥{{ moneyFormatter(orderInfo.payFee) }}</span>  
      </p>
      <h4>判定结果</h4>
      <p>
        <b class="label">触发状态：</b>
        {{ triggerExplain }}
      </p>
      <p>
        <b class="label">赔付金额：</b>
        ￥{{ moneyFormatter(orderInfo.payout) }}
      </p>
      <h4>赔付记录</h4>
      <template v-if="payoutRecord.length">
        <p v-for="r in payoutRecord">
          {{r.operationTime.split('.')[0] + ' 微信零钱到账 ￥' + moneyFormatter(r.realPayoutFee)}}
        </p>
      </template>
      <template v-else>
        <p>无记录</p>
      </template>
      <h4>判断标准</h4>
      <!-- 触发标准 -->
      <el-table :data="triggerStandar" style="width:100%;" border stripe>
        <el-table-column prop="cityName" label="城市"></el-table-column>
        <el-table-column label="触发标准">
          <template scope="scope">
            <span style="margin-left: 10px">日降雨 > {{ scope.row.triggerRuleParam }} mm</span>
          </template>
        </el-table-column>
      </el-table>
      <p v-for="s in triggerStandar">{{s.cityId}} {{s.cityName}}气象站</p>
      <!-- 赔付标准 -->
      <el-table :data="triggerPayoutStandar" style="width:100%;" :show-header="false" border stripe>
        <el-table-column>
          <template scope="scope">
            触发 {{scope.row.day}} 天
          </template>
        </el-table-column>
        <el-table-column>
          <template scope="scope">
            赔付金额为 ￥{{moneyFormatter(scope.row.amount)}} 元
          </template>
        </el-table-column>
      </el-table>
      <h4>天气实况</h4>
      <el-table :data="triggerInfo.trigger" style="width:100%;" border stripe>
        <el-table-column label="日期" prop="realWeatherDate"></el-table-column>
        <el-table-column label="地点" prop="cityName"></el-table-column>
        <el-table-column width="80" label="查询实况">
          <template scope="scope">
            <a :href="scope.row.weatherUrl" target="_blank">查看详情</a>
          </template>
        </el-table-column>
      </el-table>
      <h4>规则详情</h4>
      <p>1.降水量的定义：<br>指定地点的当日24小时的累计降水量，单位为mm，精度为0.1mm。</p>
      <p>2.是否触发的判定：<br/>如果指定日期和地点的当日累计降水量实况大于对应的触发标准，则判定为触发。如果当日累计降水量小于等于对应的触发标准，判定为不触发。例如，北京2017-10-1和上海2017-10-2的降水量触发标准分为10mm、12mm，而北京2017-10-1的降水实况值为11mm，上海2017-10-2的降水实况值为5mm，则判断结果为北京触发，上海不触发。</p>
      <p>3.天气实况数据来源：<br/>港澳台及海外城市的天气实况数据以当地气象局发布的该城市的天气指标实测值为准，该指标可在当地气象局官网查询。</p>
      <p>4.赔付金额的领取：<br/>整体行程结束后，天气宝将在10个工作日内，将赔付金额通过微信转账到被保障人的微信账户中。被保障人须提前关注天气宝公众号（微信公众号搜索“天气宝”），并在公众号中绑定购买时填写的手机号，详细操作见公众号内帮助提示。</p></p>
  </div>
</template>

<script>
import lodash from 'lodash'
export default {
  props:['orderId'],
  data() {
    return {
      orderInfo:null,
      triggerInfo:null,
      payoutRecord:null,
      prevId:'',
    }
  },
  methods: {
    loadData() {
      this.orderInfo = this.triggerInfo = null;
      // 需要3个接口的数据.....................
      Promise.all([
        new Promise((res,rej)=>{
          this.$http.post('FIND_ORDER', {innerOrderId:this.orderId}).then(resp=>res(resp))
        }),
        new Promise((res,rej)=>{
          this.$http.post('FIND_ORDER_TRIGGER', {innerOrderId:this.orderId}).then(resp=>res(resp))
        }),
        new Promise((res,rej)=>{
          this.$http.post('FIND_PAYOUT_RECORD', {innerOrderId:this.orderId}).then(resp=>res(resp))
        })
      ])
      .then(resps=>{
        // 如果有某个接口数据返回 state!==1, 则返回
        if ( resps.some(r=>r.state!==1) ) return;
        
        this.orderInfo = resps[0].data;
        this.triggerInfo = resps[1].data;
        this.payoutRecord = resps[2].data || [];
      })
    },
    moneyFormatter(m) {
      return (m/100).toFixed(2);
    }
  },
  computed: {
    safeguard() {
      return (function(contracts, obj={}) {
        obj.dateRange = [ contracts[0].sDate, contracts[contracts.length-1].eDate ];
        obj.city      = lodash.uniq(contracts, 'city').map(c=>c.city);
        return obj;
      }(this.orderInfo.order.contracts))
    },
    triggerExplain() {
      let orderInfo = this.orderInfo;
      return orderInfo.order.triggerCheckState === 0? 
      '订单等待判定中':
      ( orderInfo.payout === 0? '未达到赔款标准': `应赔付 ${
        this.moneyFormatter(orderInfo.payout)
      } 元`)
    },
    triggerStandar() {
      // 去重
      return lodash.uniq(this.triggerInfo.contract, 'cityName');
    },
    triggerPayoutStandar() {
      return this.triggerInfo.contract[0].payoutRuleParam
        .split('|').map((r,t)=>{
          t = r.split(':');
          return {day:t[0], amount:t[1]}
        });
    }
  },

  // 更新数据
  beforeUpdate() {
    if ( this.prevId && this.prevId!==this.orderId ) {
      this.loadData();
    }
    this.prevId = this.orderId;
  },
  created() {
    this.loadData();
  }
}
</script>
