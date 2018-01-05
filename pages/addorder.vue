<style lang="scss">
  @import '~assets/css/base.scss';
  #page-addorder {
    $mainWidth:800px;
    .huge { 
      font-size:36px; 
      &.danger { color:$--color-danger; }
    }
    #process-bar { 
      @extend .flex-dir-row;
      padding:30px 150px; 
      // width:$mainWidth;
      li {
        display:flex;
        flex:1;
        $line:32px;
        line-height:$line;
        font-size:16px;
        i { 
          display:inline-block; 
          margin-right:5px;
          @include square($line);
          line-height:inherit;
          text-align:center;
          vertical-align:top;
          color:inherit;
          border:1px solid $--border-color-base; 
          @extend .disc;
        }
        span {line-height:inherit; }
        b { flex:1; margin:15px 10px; /*background:$--border-color-base;*/ @include border('top'); }
        &:last-child { 
          flex:none; 
          b { display:none; }
        }
        &.wait  {
          color:$--color-text-secondary;
          i {  border-color:$--color-text-secondary; }
        }
        &.doing {
          i { color:#fff; background:$--color-primary; border-color:$--color-primary; }
          span { font-weight:bold; color:$--color-text-primary; }
        }
        &.done  {
          color:$--color-text-secondary;
          i { color:#fff; background:$--color-success; border-color:$--color-success; }
        }
      }
    }
    #main {
      display:flex;
      @include border('top');
      .explain {
        margin-right:40px; width:140px;
        h3 { color:$--color-text-primary; }
        p  { margin-top:5px; color:$--color-text-secondary; }
      }
      .payout-standard {
        table {
          width:100%;
          border-collapse:collapse;
          thead { font-weight:bold; }
          td { height:54px; text-align:center; @include border(false); }
        }
      }
      .btns-confirm {
        button:first-child { margin-left:612px; }
      }
      & > div { flex:1; }
      // 行程
      #safeguard {
        @extend .flex-dir-row;
        #safeguard-info {
          flex:1;
          width:$mainWidth;
          & > div {
            padding:$common-gap;
            @extend .flex-dir-row;
            .el-input-group { width:auto; }
            // 行程
            &.travel {
              .picker { 
                flex:1; 
                // min-width:583px;
                > li {
                  @extend .flex-dir-row; 
                  margin-bottom:10px;
                  height:40px;
                  .date { margin-right:20px; width:280px; }
                  .city { 
                    width:280px;
                  }
                  .control { 
                    // height:auto; direction:rtl; 
                    display:flex;
                    flex-direction:row;
                    button { flex:1; margin-left:12px; height:100%; }
                  }
                }
              }
            }
            // 资费
            &.tarrif {
              a { margin:0 24px; line-height:36px; text-decoration:none; }
              // .el-input-number { 
                // span { display:none; }
                // input { padding:0; width:120px; }
              // }
              .el-input-group { margin-left:24px; width:200px; 
                input { text-align:center; }
              }
              .row,
              .custom { display:flex; flex-direction:row; }
              .custom {
                a { color:$--color-text-secondary; }
                .el-input { 
                  width:100px; 
                  input { text-align:center; }
                }
              }
              .coupon {
                .tips { margin:15px 0 5px 0; cursor:pointer; }
                .el-input-group { margin:0; width:300px; }
              }
              // 自定义的默认不显示
              // .tarrif-custom {
                // top:3px; 
                // width:97px;
                // // .el-input-group__prepend { height:36px; border-radius:4px; @include border('right'); cursor: pointer; }
                // input { width:100px; }
                // .el-input-group__prepend { background:transparent; border:0; }
                // &.custom-disable {
                //   // .el-input-group__prepend { border-top-right-radius: 0; border-bottom-right-radius: 0; border-right:0; }
                //   // .el-input-group__prepend { border-radius:4px; @include border('right'); }
                //   input { visibility: hidden; }
                // }
              // }
            }
            &.insured {
              .input-group { 
                @extend .flex-dir-row; 
                .el-input-group { 
                  flex:1;
                  &:first-child { 
                    margin-right:24px; 
                    input { width:165px; }
                  }
                }
              }
            }
          }
        }
        #safeguard-border {
          width:1px;
          @include border('left');
        }
        #safeguard-detail {
          .explain {
            margin-right:0; width:auto;
          }
          width:420px;
          table  {
            width:100%;
            td { width:50%; }
          }
          & > div { margin-bottom:30px; }
        }
      }
      // 计划确认
      #confirm,
      #complete {
        .explain { width:105px; }
        & > div { 
          @extend .flex-dir-row; 
          padding:$common-gap;
          width:$mainWidth;
          &:not(:last-child) { @include border('bottom'); }
          // &:not(:last-child) { margin-bottom:$common-gap; }
        }
        .info { 
          padding:0;
          width:auto;
          & > div {
            @extend .flex-dir-row; 
            padding:$common-gap;
          }
          .travel { 
            min-width:370px; @include border('right'); 
            li {
              white-space: nowrap;
              margin-bottom:12px;
              line-height:24px;
              i { display:inline-block; width:24px; text-align:center; background:$--border-color-base; border-radius:50%; }
            }
          }
          .payout {
            flex:1; 
            .payout-preview { 
              width:420px;
              table { 
                width:100%; 
                tbody tr { height:57px; }
              }
              p { margin-left:-145px; }
              // flex:1 
            }
            .payout-standard {
              margin-left:30px;
              width:245px;
              table td { height:36px; background:#fff; }
            }
          }
        }
        .tarrif,
        .insured {
          // line-height:26px;
          // & > *:not(:last-child) { margin-right:20px; }
          p { margin-right:20px; }
          .huge { line-height:26px; }
          .el-alert { padding:0 8px; width:auto;  }
        }
      }
      // 完成
      #complete {
        padding:$common-gap;
        & > div {
          background:$--font-color-disabled-base;
          width:100%;
          border-bottom:0 none !important;
        }
        .payment-result { 
          flex-direction:column;
          background:#fff;
          width:100%; 
          text-align:center;
          i { font-size:80px; color:$--color-success; }
        }
      }
      // 支付
      #payment {

      }
    }
    // .el-cascader-menu { min-width:240px!important; max-height:204px; }
  }
  .payout-popup {
    padding:0; 
    .el-alert__description { white-space:nowrap; }
  }
  .dialog-payment {
    b { font-weight:bold; }
    .radius3 { @include border(false); border-radius:3px; }
    .radius5 { @include border(false); border-radius:5px; }
    .el-dialog { background:#f5f5f5; @extend .radius5; }
    .el-dialog__title { font-size:24px; color:#317eac; }
    .el-dialog__body { padding:8px 20px; }
    .info {
      padding:12px;
      background:#fff;
      @extend .radius3;
      p { margin-bottom:5px; }
    }
    .method {
      margin-top:24px;
      background:#fff;
      @extend .radius3;
      h3 { 
        padding:0 12px;
        font-weight:normal;
        font-size:18px; 
        line-height:42px;
        color:#317eac; 
        @include border('bottom');
        span { font-size:12px; color:$--color-text-regular; }
      }
      &>div { 
        padding:12px;
        h4 { font-size:18px; font-weight:normal; line-height:40px; }
      }
      label {
        .el-radio__input { display:none; }
        .el-radio__label {
          position:relative; display:inline-block; padding:0; width:178px; height:62px;
          @include border(false);
          img { display:block; float:left; }
        }
        &.is-checked {
          .el-radio__label { border-color:#ff4c2b; }
          .el-radio__label:after { position: absolute; right: 0;bottom: 0;width: 19px;height: 19px;background: url('~assets/img/order/icon-checked.png') no-repeat;content: "\200B"; }
        }
      }
    }
  }
  .wx-dialog-payment {
    .el-dialog {
      @include border(false);
      border-radius:5px;
    }
    .el-dialog__body { 
      position:relative; width:778px; height:570px; 
      background:url('~assets/img/order/bg-pay-wechat.png') no-repeat center; 
      img { position: absolute; top: 132px; left: 90px; }
      a { text-decoration:none; color:#2fa4e7; }
      .countdown { 
        position: absolute; top:-34px; left:120px; 
      }
      .hideModal {
        position: absolute; left: 20px; bottom: 17px; font-size: 18px;
      }
    }
  }
</style>

<template>
  <div id="page-addorder" class="panel">
    <ul id="process-bar">
      <li 
        v-for="(p,i) in process.data"
        :key="`porcess-${i}`"
        :class="process.index===i?'doing':(process.index>i?'done':'wait')"
      >
        <i>{{i+1}}</i>
        <span>{{p.text}}</span>
        <b></b>
      </li>
    </ul>
    <div id="main">
      <!-- 第一步 输入信息 -->
      <div v-if="process.name==='safeguard'" id="safeguard" class="step-panel">
        <div id="safeguard-info">
          <!-- 确定行程 -->
          <div class="travel">
            <div class="explain">
              <h3>
                <i class="el-icon-date"></i>
                旅行行程
              </h3>
              <p>
                旅游行程最少3天，日期连续不间断
              </p>
            </div>
            <ul class="picker">
              <li v-for="(t,i) in travel" :v-key="`travel-d${i}`">
                <el-date-picker
                  class="date"
                  type="date"
                  placeholder="选择日期"
                  :editable="false"
                  :disabled="i!==0"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="t.date"
                  :picker-options="dateOptions"
                  @change="datePicked($event, i)"
                ></el-date-picker>
                <el-cascader
                  class="city"
                  placeholder="试试搜索：新加坡"
                  filterable
                  v-model="t.city"
                  :options="cityOptions"
                  :clearable="true"
                  @change="cityPicked($event, i)"
                ></el-cascader>
                <div class="control" v-if="i>=2">
                  <el-button v-if="i>2" size="small" type="danger" plain @click="delTravel(i)">删除</el-button>
                  <el-button size="small" type="primary" @click="addTravel">添加</el-button>
                </div>
              </li>
            </ul>
          </div>
          <!-- 选择金额 -->
          <div class="tarrif">
            <div class="explain">
              <h3><i class="el-icon-date"></i> 旅行行程</h3>
              <p>保费越多，保障金额越高，上限为￥10000</p>
            </div>
            <div>
              <div class="row">
                <el-radio-group v-model="tarrifs.tarrif" size="medium" @change="changeTarrif">
                  <el-radio-button 
                    v-for="(t,i) in tarrifs.data" 
                    :v-key="`tarrif-${i}`"
                    :label="t"
                  ></el-radio-button>
                </el-radio-group>
                <div class="custom">
                  <a href="javascript:void(0)" @click="tarrifs.custom.enable=!tarrifs.custom.enable">其它价格</a>
                  <el-input
                    v-if="tarrifs.custom.enable"
                    :min="5" 
                    :max="200"
                    size="medium"
                    placeholder="5 ~ 200"
                    v-model="tarrifs.custom.value"
                    :autofocus="true"
                    @change="changeTarrif($event,'isCustom')" 
                  ></el-input>
                </div>
              </div>
              <!-- 优惠券 -->
              <div class="coupon">
                <p href="javascript:void(0)" 
                  class="tips" 
                  :class="`text-${coupon.isCollapsed? 'empty':(coupon.state==='fail'?'danger':coupon.state)}`"
                  @click="coupon.isCollapsed=!coupon.isCollapsed"
                >
                  <i :class="`el-icon-caret-${coupon.isCollapsed?'bottom':'top'}`"></i>
                  <span v-if="coupon.isCollapsed">
                    {{coupon.text['empty']}}
                  </span>
                  <span v-else>
                    {{coupon.state==='empty'?'':coupon.code}}
                    {{coupon.text[coupon.state]}}{{coupon.amount>0?coupon.amount:''}}
                  </span>
                </p>
                <el-input 
                  v-if="!coupon.isCollapsed"
                  placeholder="请输入优惠码"
                  v-model="coupon.input"
                  :debounce="300"
                >
                  <el-button slot="append" icon="el-icon-loading" v-if="coupon.checking">验证中</el-button>
                  <el-button slot="append" @click="checkCouponCode" v-else>确定</el-button>
                </el-input>
              </div>
            </div>
          </div>
          <!-- 被保人信息填写 -->
          <div class="insured">
            <div class="explain">
              <h3><i class="el-icon-date"></i> 确认被保人信息</h3>
              <p>保费越多，保障金额越高，上限为￥10000</p>
            </div>
            <div class="input-group">
              <el-input 
                v-model="insured.name" 
                placeholder="请输入内容"
                size="medium"
                clearable
              ><template slot="prepend">被保人姓名</template></el-input>
              <el-input 
                v-model="insured.mobile" 
                placeholder="请输入内容"
                :maxlength="11"
                size="medium"
                clearable
              ><template slot="prepend">手机号</template></el-input>
            </div>
          </div>
          <!-- 提交按钮 -->
          <div class="btns-confirm">
            <el-button type="primary" @click="nextStep(process.name)">提交</el-button>
            <el-button @click="prevStep">取消</el-button>
          </div>
        </div>
        <div id="safeguard-border"></div>
        <div id="safeguard-detail" class="panel" v-loading="contractInfo.loading">
          <div class="explain">
            <h3>保障计划</h3>
            <p>每次修改旅行时间和目的地，保障计划都会实时更新</p>
          </div>
          <template v-if="!contractInfo.threshold">
            <div>
              <br>没有数据时的文案提示
              <br>没有数据时的文案提示
              <br>没有数据时的文案提示
            </div>
          </template>
          <template v-else>
            <!-- :data="[contractInfo]" -->
            <div class="payout-preview">
              <table>
                <thead>
                  <tr>
                    <td>
                      最高保障金额
                      <el-popover trigger="click" placement="top" popper-class="payout-popup">
                        <el-alert
                          title="消息提示的文案"
                          type="info"
                          description="文字说明文字说明文字说明文字说明文字说明文字说明"
                          :closable="false"
                          show-icon>
                        </el-alert>
                        <span slot="reference"><i class="el-icon-question"></i></span>
                      </el-popover>
                    </td>
                    <td>
                      触发标准
                      <el-popover trigger="hover" placement="top" popper-class="payout-popup">
                        <el-alert
                          title="消息提示的文案"
                          type="info"
                          description="文字说明文字说明文字说明文字说明文字说明文字说明"
                          :closable="false"
                          show-icon>
                        </el-alert>
                        <span slot="reference"><i class="el-icon-question"></i></span>
                      </el-popover>
                    </td>
                  </tr>
                </thead>
                <tbody class="huge danger">
                  <tr>
                    <td>{{contractInfo.maxPayoutAmount? `￥${ computedPayoutRule[computedPayoutRule.length-1].fee }`:''}}</td>
                    <td>{{contractInfo.threshold? `> ${contractInfo.threshold} mm`:''}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="date">
              <h4>保障时间</h4>
              <p class="huge">{{formatDate(travel[0].date)}} - {{formatDate(travel[travel.length-1].date)}}</p>
            </div>
            <div class="city">
              <h4>保障目的地个数</h4>
              <p class="huge">
                <span>{{travel.length}}</span>
                {{computedCities.map(c=>c.label).join('、')}}
              </p>
            </div>
            <div class="explain">
              <h3>赔付标准</h3>
              <p>旅游行程中只要当天降水量超过触发标准，就认为这天触发。具体触发天数和赔付金额对应如下表。</p>
            </div>
            <div class="payout-standard">
              <table>
                <thead>
                  <tr>
                    <td>触发天数</td>
                    <td>赔付金额</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(p,i) in computedPayoutRule">
                    <td>{{p.day}}</td>
                    <td>{{p.fee}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="payout-explain">
              <p>最终赔付金额以行程中天气实况所达到的最大触发天数为准</p>
              <p v-for=""></p>
            </div>
          </template>
        </div>
      </div>
      <div v-if="process.name==='payment'" id="payment" class="step-panel">
      </div>
      <!-- 第二步 确认保障计划 & 第三步 完成 内容共用 -->
      <div 
        v-else-if="process.name==='confirm'||process.name==='complete'"
        :id="process.name"
        class="step-panel"
        >
        <div 
          v-if="process.name==='complete'" 
          class="payment-result" 
          :class="payment.state==='none'?'':payment.state"
        >
          <!-- 支付成功 -->
          <template v-if="payment.state==='success'">
            <i class="el-icon-circle-check-outline"></i>
            <h4>下单成功</h4>
            <p>旅行行程结束后，系统将自动进行判断赔付结果。 订单在下单当天（自然日）可以取消。</p>
          </template>
          <!-- 支付失败 -->
          <template v-else-if="payment.state==='fail'">
            <i class="el-icon-circle-close-outline"></i>
            失败
          </template>
          <!-- 支付超时 -->
          <template v-else-if="payment.state==='timeout'">
            <i class="el-icon-circle-close-outline"></i>
            超时
          </template>
        </div>
        <div class="info">
          <div class="travel">
            <div class="explain"><h3><i class="el-icon-date"></i> 旅行行程</h3></div>
            <ul>
              <li v-for="(t,i) in travel">
                <i>{{i+1}}</i>
                {{formatDate(t.date,{keepYear:true,separator:'-'})}} {{computedCities[i].label}}
              </li>
            </ul>
          </div>
          <div class="payout">
            <div class="explain"><h3><i class="el-icon-date"></i> 旅行行程</h3></div>
            <div class="payout-preview">
              <table>
                <thead>
                  <tr>
                    <td>
                      最高保障金额
                      <el-popover trigger="click" placement="top" popper-class="payout-popup">
                        <el-alert
                          title="消息提示的文案"
                          type="info"
                          description="文字说明文字说明文字说明文字说明文字说明文字说明"
                          :closable="false"
                          show-icon>
                        </el-alert>
                        <span slot="reference"><i class="el-icon-question"></i></span>
                      </el-popover>
                    </td>
                    <td>
                      触发标准
                      <el-popover trigger="hover" placement="top" popper-class="payout-popup">
                        <el-alert
                          title="消息提示的文案"
                          type="info"
                          description="文字说明文字说明文字说明文字说明文字说明文字说明"
                          :closable="false"
                          show-icon>
                        </el-alert>
                        <span slot="reference"><i class="el-icon-question"></i></span>
                      </el-popover>
                    </td>
                  </tr>
                </thead>
                <tbody class="huge danger">
                  <tr>
                    <td>{{contractInfo.maxPayoutAmount? `￥${ (contractInfo.maxPayoutAmount/100).toFixed(2) }`:''}}</td>
                    <td>{{contractInfo.threshold? `> ${contractInfo.threshold} mm`:''}}</td>
                  </tr>
                </tbody>
              </table>
              <p>旅游行程中只要当天降水量超过触发标准，就认为这天触发。具体触发天数和赔付金额对应如下表。</p>
            </div>
            <div class="payout-standard">
              <table>
                <thead>
                  <tr>
                    <td>触发天数</td>
                    <td>赔付金额</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(p,i) in computedPayoutRule">
                    <td>{{p.day}}</td>
                    <td>{{p.fee}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="tarrif">
            <div class="explain"><h3><i class="el-icon-date"></i> 旅行行程</h3></div>
            <p class="huge danger">￥{{tarrifs.tarrif}}</p>
        </div>
        <div class="insured">
          <div class="explain"><h3><i class="el-icon-date"></i> 被保人信息</h3></div>
          <p>{{insured.name}}</p>
          <p class="huge danger">
            {{insured.mobile}}
          </p>
          <el-alert
            v-if="process==='confirm'"
            title="手机号填错了会导致赔付款无法到账，请再三确认。"
            type="info"
            show-icon
            :closable="false"
          ></el-alert>
        </div>
        <div class="btns-confirm" v-if="process.name==='confirm'">
          <el-button type="primary" @click="nextStep(process.name)">提交</el-button>
          <el-button @click="prevStep">取消</el-button>
        </div>
      </div>
      <!-- 第三步 -->
      <div v-else-if="process.name==='complete'" id="complete" class="step-panel">
      </div>
    </div>
    <el-dialog
      width="800px"
      class="dialog-payment"
      title="您的订单已提交成功! 付款咯~"
      :visible.sync="paymentDialog"
    >
      <div class="info">
        <p><b>订单号：</b> {{orderInfo.outTradeNo}}</p>
        <p><b>保障人：</b> {{insured.name}} {{insured.mobile}}</p>
        <p><b>保障地：</b> {{computedCities.map(c=>c.label).join('、')}}</p>
        <p><b>保障时间：</b> {{formatDate(travel[0].date,{keepYear:true,separator:'-'})}} <b>至</b> {{formatDate(travel[travel.length-1].date,{keepYear:true,separator:'-'})}}</p>
      </div>
      <div class="method">
        <h3>请选择以下支付方式
          <span>剩余支付时间 <b ref="tqbPaymentCountdown" class="text-danger">00:09:12</b>, 逾期订单将自动取消
          <b>订单成功支付后保障即刻生效，不得退货/退款</b></span>
        </h3>
        <div>
          <h4>支付<b class="text-danger">￥{{1}}</b></h4>
          <div class="checkbox">
            <el-radio-group v-model="payment.method">
              <el-radio :label="`wx`">
                <img src="~assets/img/order/icon-pay-wechat.png" />
              </el-radio>
              <el-radio :label="'ali'">
                <img src="~assets/img/order/icon-pay-alipay.png" />
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pay">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="800px"
      class="wx-dialog-payment"
      title="微信支付"
      :visible.sync="wxPaymentDialog"
    >
      <p class="countdown">
        距离二维码过期剩余<b ref="wxQrcodeLifeCycle" class="text-danger">00:20:00</b>，过期后请点击
        <a href="javascript:void(0)" @click="refreshWxQrcode">刷新</a> 重获二维码
      </p>
      <img :src="payment.wechat.qrcode" width="225" alt="">
      <a href="javascript:void(0);" class="hideModal" @click="wxPaymentDialog=false">&lt; 选择其它支付方式</a>
    </el-dialog>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import CountDown from '~/assets/js/countdown'
export default {
  data() {
    return {
      // 进度条
      process:{
        // state: wait/doing/done
        index:0,
        // name :'confirm',
        name : 'safeguard',
        data : [
          { name:'safeguard', text:'输入行程，保费和被保人' },
          { name:'confirm',   text:'确认保障计划' },
          { name:'complete',  text:'完成' },
        ]
      },
      // 产品信息, 从 store | localStorage 获取
      production: this.$store.getters.production,
      // 行程信息: 日期 & 城市
      dateOptions:{
        disabledDate:time=>{
          let dateTime = time.getTime(),
              nowTime  = Date.now(),
              minLimit = this.production.leastDays * 86400000,
              maxLimit = this.production.maxBuyDays * 86400000;
          return (
               dateTime < nowTime + minLimit
            || dateTime > nowTime + maxLimit
          );
        }
      },
      cityOptions:[],
      travel:[
        { date:'', city:[] },
        { date:'', city:[] },
        { date:'', city:[] }
      ],
      // 合约详情
      contractInfo: {},
      orderInfo   : {},
      // 资费选择
      tarrifs: {
        tarrif: 10,
        custom: {
          enable:false,
          value  :'',
        },
        data  : [10, 20, 50, 100]
      },
      coupon: {
        isCollapsed:true,
        state :'empty',
        code  :'',
        input :'',
        amount:0,
        checking:false,
        text: {
          'empty':'优惠金额将在支付时直接抵扣',
          'success':'，优惠码金额 ￥',
          'fail':'，优惠码无效'
        }
      },
      // 被保人
      insured: {
        name:'',
        mobile:''
      },
      // 支付, 状态有: none(初始状态)|success|fail|timeout
      payment: {
        state:'none',
        method:'wx',
        wechat: {
          qrcode:'http://s.jiathis.com/qrcode.php?url=weixin://wxpay/bizpayurl?pr=ofGq54F',
        },
        alipay: {

        }
      },
      paymentDialog: false,
      wxPaymentDialog: false,
      checkPaymentVarias: {
        timer : -1,
        couter: 0,
        delay : 1000,
        max   : 1200
      }

      // mock
      ,contractInfo: {"threshold": "10","contractId": "167812121","payoutRuleParam": "1:2|2:3","maxPayoutAmount": 12000}
      ,travel:JSON.parse('[{"date":"2018-01-05","city":["t2000","t2100","t2101"]},{"date":"2018-1-3","city":["t2000","t2100","t2101"]},{"date":"2018-1-4","city":["t2000","t2100","t2101"]}]')
      ,tarrifs:JSON.parse('{"tarrif":10,"custom":10,"data":[10,20,50,100]}')
      ,insured:JSON.parse('{"name":"名字","mobile":"13131313131"}')
    }
  }, 
  computed: {
    computedCities() {
      return this.travel.map(t=>this.getCity(t.city)).filter(c=>!!c);
    },
    computedPayoutRule() {
      return this.contractInfo.payoutRuleParam? 
        this.contractInfo.payoutRuleParam.split('|').map(r=>{
          let temp = r.split(':');
          return { day:temp[0], fee:this.tarrifs.tarrif*temp[1] };
        }):
        [];
    },
    computedPaymentFee() {
      return (this.tarrifs.custom||this.tarrifs.tarrif) * 100 - 
      (this.coupon.isCollapsed? 0 : this.coupon.amount) * 100;
    }
  },
  methods: {
    nextStep(name) {
      if ( name === 'safeguard' ) {
        let text = '';
        if ( !this.contractInfo.threshold ) text = '订单信息有误';
        else if ( !this.insured.name || !this.insured.mobile ) text = '请填写用户信息';
        else if ( !this.checkMobileValidity(this.insured.mobile) ) text = '手机号无效';
        if ( text ) {
          this.$message.closeAll();
          return this.$message.error('提交失败, '+text);
        }
        this.gotoStep( this.process.index + 1 );
      } else if (name === 'confirm') {
        let couponCode   = this.coupon.isCollapsed? '': (this.coupon.state === 'success'? this.coupon.code: '');
        this.$http.post('addOrder', {
          mid:'pc',
          contractId : this.contractInfo.contractId,
          orderPrice : this.computedPaymentFee,
          couponCode : couponCode,
          insuredInfo: `${this.insured.name}:${this.insured.mobile}`,
          mobile     : this.insured.mobile
        })
          .then(resp=>{
            if ( resp.state !== 1 ) {
              throw resp.message;
            }
            this.orderInfo = resp.data;
            if ( resp.data.immediatePay === 1 ) {
              this.paymentDialog = true;
              this.$nextTick(()=>{
                CountDown.closeBySign('tqbPaymentCountdown');
                CountDown.openTimeCountBySeconds({
                  Ele: this.$refs.tqbPaymentCountdown,
                  // CountDownSeconds:1200,
                  CountDownSeconds:20,
                  Sign   : 'tqbPaymentCountdown',
                  Divider: ':',
                  EndFunc: ()=>{
                    this.paymentDialog   = false;
                    this.wxPaymentDialog = false;
                    this.payment.state   = 'timeout';
                    this.gotoStep( this.process.index + 1 );
                  }
                });
              })
            } else {
              this.payment.state = 'success';
              this.gotoStep( this.process.index + 1 );
            }
          })
      }
    },
    prevStep() {
      let p = this.process;
      if ( p.index === 0 ) return;
      p.name = p.data[--p.index].name;
    },
    gotoStep(n) {
      let p = this.process;
      p.index = n;
      p.name = p.data[n].name;
    },
    datePicked(val, idx) {
      console.log(val);
      if ( val ) {
        let date = new Date(val);
        this.travel.forEach((d,i)=>{
          if ( i===0 ) return;
          date.setDate( date.getDate()+1 );
          d.date = [date.getFullYear(), date.getMonth()+1, date.getDate()].join('-');
        })
      } else {
        this.travel.forEach((d,i)=>{
          d.date = null;
        });
      }
      this.$nextTick(this.loadContractInfo)
    },
    cityPicked(val, idx) {
      this.travel.some((d,i)=>{
        if ( idx < i ) {
          if ( d.city && d.city.length ) return true;
          d.city = val;
        }
        return false;
      })
      this.$nextTick(this.loadContractInfo)
    },
    getCity(val) {
      try {
        return this.cityOptions.filter(area=>area.value===val[0])[0]
          .children.filter(country=>country.value===val[1])[0]
          .children.filter(city=>city.value===val[2])[0];
      } catch(e) {
        return {};
      }
    },
    addTravel() {
      this.travel.push({date:null, city:[]});
      this.datePicked(this.travel[0].date, 0);
      this.travel[ this.travel.length-1 ].city = this.travel[this.travel.length-2].city;
    },
    delTravel(i) {
      this.travel.splice(i, 1);
      this.datePicked(this.travel[0].date, 0);
    },
    formatDate(datestr, opt={}) {
      if ( !datestr ) return '';

      let d = new Date(datestr);
      let s = opt.separator||'.';
      let y = !!opt.keepYear;
      return `${y?d.getFullYear()+s:''}${ this.prefixZero(d.getMonth()+1) }${s}${ this.prefixZero(d.getDate()) }`;
    },
    prefixZero(n) {
      return n>9? n: '0'+n;
    },
    loadContractInfo() {
      // 如果没有填满, 则不获取订单
      if ( !this.travel.every(d=>d.date&&d.city&&d.city.length) ) {
        return;
        return this.contractInfo? 
            this.contractInfo = { message:'行程信息有误, 请核实' }: 
            undefined;
      }

      this.contractInfo.loading = true;

      this.$http.post('getContract', {
        productId:this.production.productId,
        times: this.travel.map(t=>this.formatDate(t.date, {keepYear:true, separator:'-'})).join(','),
        cityIds:this.computedCities.map(c=>c.value).join(','), 
      })
      .then(resp=>{ this.contractInfo = resp.state===1? resp.data: {}; });
    },
    changeTarrif(val, isCustom) {
      if ( !isCustom ) {
        this.tarrifs.tarrif = val;
        this.tarrifs.custom.value = '';
      } else {
        val = parseInt(val, 10);
        if ( isNaN(val) ) {
          this.tarrifs.tarrif = this.tarrifs.data[0];
        } else {
          if ( val > 200 ) {
            val = 200;
          } else if ( val < 5 ) {
            val = 5;
          }
          this.tarrifs.custom.value = val;
        }
      }
    },
    checkMobileValidity(n) {
      return (/^1[345678]\d{9}$/).test(n);
    },
    checkCouponCode() {
      let mobile  = this.insured.mobile,
          coupons = this.coupon.input.trim(),
          productId = this.production.productId,
          text      = '';

      if ( !coupons ) {
        this.coupon.state = 'empty';
        this.coupon.amount = 0;
        this.coupon.code   = ''
        this.coupon.checking = false;
        return 
      }
      else if ( !mobile ) text = '请先输入手机号'
      else if ( !this.checkMobileValidity(mobile) ) text = '手机号码无效'
      else if ( !productId ) text = '请求出错, 请登录'
      if (text) {
        this.$message.closeAll();
        this.$message.error(text);
        return;
      }

      if ( this.coupon.checking ) return;
      this.coupon.checking = true;
      this.coupon.code     = this.coupon.input;

      this.$http.post('findCoupons', { mobile, coupons, productId })
        .then(resp=>{
          console.log( resp )
          if ( resp.state !==1 ) {
            throw '错误'
          }
          let data = resp.data;
          if ( data && data.discountAmount ) {
            this.coupon.state = 'success';
          } else {
            this.coupon.state = 'fail';
          }
          this.coupon.amount = ((data.discountAmount||0)/100).toFixed(2);
          this.coupon.checking = false;
        })
        .catch(err=>{
          this.coupon.checking = false;
        })
    },
    pay() {
      if ( this.payment.method === 'wx' ) {
        // this.paymentDialog = false;
        this.wxpay();
      } else {
        this.alipay();
      }
      this.checkPaymentState();
    },
    wxpay() {
      this.wxPaymentDialog = true;
      this.$http.post('PAY_WECHAT', {
          outTradeNo: this.orderInfo.outTradeNo,
          totalFee  : this.orderInfo.totalFee,
          body      : '晴空万里宝'
        })
        .then(resp=>{
          this.payment.wechat.qrcode = resp.data.code_url;
          this.$nextTick(()=>{
            CountDown.closeBySign('wxQrcodeLifeCycle');
            CountDown.openTimeCountBySeconds({
                Ele: this.$refs.wxQrcodeLifeCycle,
                // CountDownSeconds:1200,
                CountDownSeconds:20,
                Divider: ':',
                Sign   : 'wxQrcodeLifeCycle',
                EndFunc: function () {
                }
            });
          });
        })
    },
    alipay() {
      this.$http.post('PAY_ALIPAY', {
        outTradeNo  : this.orderInfo.outTradeNo,
        totalAmount : this.orderInfo.totalFee,
        subject     : '晴空万里宝',
        // returnUrl   : location.origin+location.pathname.replace(/\/[\w\-]+\.html$/, '/pay-successfully')
        returnUrl  : 'http://www.baidu.com'
      })
        .then(resp=>{
          var div = document.createElement('div');
          document.body.appendChild(div);
          div.innerHTML = data;

          var newWin = window.open();
          newWin.location = 
              div.querySelector('form').getAttribute('action')
              +'&'+div.querySelector('input').name+'='
              +div.querySelector('input').value;

          document.body.removeChild(div);
        })
    },
    refreshWxQrcode() {
      this.wxpay();
    },
    resetPaymentChecking() {
      this.checkPaymentVarias = {
        timer : -1,
        couter: 0,
        delay : 1000,
        max   : 1200
      };
    },
    checkPaymentState(stopChecking) {
      let { delay, max } = this.checkPaymentVarias;
      if ( stopChecking || this.checkPaymentVarias.counter++ === max ) {
        return this.resetPaymentChecking();
      }
      this.$http.post('CHECK_PAYMENT_STATE', { params:{ innerOrderId:this.orderInfo.outTradeNo } })
        .then(resp=>{
          if ( resp.data.state !== 1 ) {
            return console.log('....');
          }
          console.log( resp.data.data.payState )
          if ( resp.data.payState === 1 ) {
            this.paymentDialog   = false;
            this.wxPaymentDialog = false;
            this.payment.state   = 'success';
            this.gotoStep( this.process.index + 1 );
            this.resetPaymentChecking();
          } else {
            this.checkPaymentVarias.timer = setTimeout(this.checkPaymentState, delay);
          }
        })
    }
  },
  mounted() {
    // this.loadContractInfo()
    // 读取城市数据
    this.$http.post('getCitys')
    //  this.$http({
    //     // 设置请求可以携带cookie
    //     withCredentials: true,
    //     method: "post",
    //     url: "http://ts.baotianqi.cn/sellerCity/getData"
    //   })
      .then(resp=>{
        if ( resp.state !== 1 ) {
          this.cityOptions = [{ value:-1, label:'城市数据加载失败', disabled:true }];
          throw '获取城市数据失败'
        }
        return resp.data;
      })
      .then(data=>{
        this.cityOptions = data.areaList.map(area=>{return { 
          // 区域
          value   : area.id, 
          label   : area.name, 
          disabled: area.children.length===0,
          // 国家
          children: area.children.length===0? null: area.children.map(country=>{return { 
              value   : country.id, 
              label   : country.name, 
              disabled: country.children.length===0,
              // 城市
              children: country.children.length===0? null: country.children.map(city=>{return { 
                  value : city.id, 
                  label : city.name 
                };
              })};
          })};
        })
      })
      .catch(err=>{
        console.log(err);
      })
  }
}
</script>
