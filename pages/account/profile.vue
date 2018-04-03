<style lang="scss">
  @import '~assets/css/base.scss';
  #page-account-profile {
    .inner-panel {
      margin:0 24px;
      padding:24px 0;
      &:not(:last-child) { @include border('bottom'); }

      h3 { margin-bottom:15px; font-weight:700; font-size:16px; color:$--color-text-primary; }
      p:not(:last-child) { margin-bottom:10px; }
    }
    // .el-progress-bar { padding-right:0; }
    .el-progress-bar { position:absolute; top:-22px; left:0; width:100%; }
    .step {
      text-align:center;
      h4 { font-weight:400; color:$--color-primary; }
      &.step-1 {
        img { display:block; margin:0 auto; }
      }
      &.step-2 {
        .input { 
          margin:24px auto 36px auto; width:300px; 
          .el-input:not(:last-child) { margin-bottom:24px; }
        }
      }
    }
    // 微信二维码
    // #mappCode {
    //   width:420px; height:584px;
    // }
  }
</style>

<template>
  <div id="page-account-profile">
    <div class="panel" v-if="merchantInfo.merchantId">
      <div class="inner-panel">
        <h3>商户资料</h3>
        <p>
          <span>商户号：{{merchantInfo.merchantId}}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>商户名称：{{merchantInfo.merchantName}}</span>
        </p>
      </div>
      <div class="inner-panel">
        <h3>管理员信息</h3>
        <p>
          <span>登录帐号：{{merchantInfo.userName}}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a href="javascript:void(0)" @click="changePassword">修改密码</a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>姓名：{{merchantInfo.realName}}</span>
        </p>
      </div>
      <div class="inner-panel">
        <h3>财务信息</h3>
        <p class="tips">提现款将以微信转账的方式支付到您的微信账户中。为保证您能正常收到提现款， 请务必保证您已关注天气宝微信号（不得取关），并已绑定手机号。</p>
        <p>
          <span>提现打款方式：微信</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>微信绑定手机：{{merchantInfo.mobile}}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>微信绑定状态：<i v-if="mappCode.isBind" class="text-success">已绑定</i><i class="text-danger" v-else>未绑定</i></span>
        </p>
        <p v-if="merchantInfo.merchantId && !mappCode.isBind">
          <el-button type="primary" @click="dialogBind.show=true">立即绑定</el-button>
        </p>
      </div>
      <div class="inner-panel" v-if="mappCode.isBind">
        <h3>推广小程序二维码</h3> 
        <p>游客微信扫码后自主购买天气保障。购买成功后，分成佣金将结算到你的账户余额中。</p>
        <div id="mappCode" ref="mappWrapper" 
          :style="`width:${mappCode.bgSize.width}px; height:${mappCode.bgSize.height}px; margin-bottom:12px;`"
        >
          <div style="height:0; overflow:hidden;">
            <img ref="mappBg"   src="~/assets/img/profile/bg-mapp.jpg" />
            <img ref="mappCode" src="" crossorigin="anonymous"/>
          </div>
          <canvas ref="mappCanvas" :width="mappCode.bgSize.width" :height="mappCode.bgSize.height"></canvas>
        </div>
        <el-button type="primary" @click="downloadMAppCode" v-if="mappCode.dataURL">
          &nbsp;&nbsp;&nbsp;&nbsp;下载&nbsp;&nbsp;&nbsp;&nbsp;
        </el-button>
      </div>
    </div>
    <el-dialog title="完善收款信息" :visible.sync="dialogBind.show" @close="resetDialogBindParams">
      <el-progress :percentage="dialogBind.step/3*100" status="success" :show-text="false"></el-progress>

      <div class="step step-1" v-if="dialogBind.step===1">
        <h4>在天气宝公众号里绑定您希望收款的手机号，绑定后不允许修改</h4>
        <img src="~/assets/img/profile/guide.png">
        <el-button type="success" @click="nextStep">下一步</el-button>
      </div>
      <div class="step step-2" v-else-if="dialogBind.step===2">
        <div class="input">
          <el-input placeholder="手机号" v-model.trim="dialogBind.mobile" :maxlength="11"></el-input>
          <el-input placeholder="验证码" v-model.trim="dialogBind.vfcode">
            <template slot="append">
              <el-button @click="sendVFCode">{{dialogBind.vfcodeText}}</el-button>
            </template>
          </el-input>
        </div>
        <el-button type="success" @click="getWXUserInfo" :disabled="!enableGoingToNextStep.result">下一步</el-button>
      </div>
      <div class="step step-3" v-else-if="dialogBind.step===3">
        <h4>确认您手机号绑定的微信账号，提现款将通过微<br>信转账的方式支付到您的微信账号中</h4>
        <br>
        <img :src="wxUserInfo.headimgurl" width="50" style="background:width:50px;"/>
        <br>用户昵称：{{wxUserInfo.nickname}}
        <br>所在城市：{{wxUserInfo.city}}
        <br>
        <br>
        <el-button type="normal" plain @click="dialogBind.step-=1">不是这个微信，返回修改</el-button>
        <el-button type="success" @click="bindWXAccount">确认</el-button>
      </div>
      <div class="step step-4" v-else-if="dialogBind.step===4">
        <h4>以后就等着提现款微信到账吧！</h4>
        <img src="~/assets/img/profile/receipt.jpg" />
        <br>
        <el-button type="success" @click="resetDialogBindParams">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      merchantInfo:this.$store.getters.merchantInfo,
      dialogBind: this.getDefaultDialogBindParams(),
      wxUserInfo:null,
      mappCode: {
        isBind  : false,
        bgSize  : { width:420, height:584 },
        codeSize: { width:250, height:250 },
        offset  : { x:85, y:249 },
        dataURL : '',
      }
    }
  },
  computed: {
    enableGoingToNextStep() {
      let d = this.dialogBind, obj;
      if ( !this.checkMobileValidation(d.mobile) ) {
        obj = { result:false, text:'手机号码错误' }
      } else if ( !d.vfcode ) {
        obj = { result:false, text:'请输入验证码' }
      }

      return obj || {result:true};
    }
  },
  methods: {
    getDefaultDialogBindParams() {
      return {
        step:1,
        show:false,

        mobile:'',
        vfcode:'',
        vfcodeText:'发送验证码',
        vfcodeCounter:60,
        vfcodeTimer:-1,
        vfcodeHasSent:false,
      }
    },
    resetDialogBindParams() {
      this.dialogBind = this.getDefaultDialogBindParams();
    },
    nextStep(s) {
      this.dialogBind.step += 1;
    },
    changePassword() {
      dialogChangePasswrod.show = true;
    },
    checkMobileValidation(m) {
      return /^1[3456789]\d{9}$/.test(m);
    },
    sendVFCode() {
      if ( !this.checkMobileValidation( this.dialogBind.mobile ) ) {
        this.$message.closeAll();
        this.$message.error('手机号码错误')
        return;
      }
      if ( this.dialogBind.vfcodeHasSent ) return;
      this.$http.post('GET_CODE', {mobile:this.dialogBind.mobile})
      .then(resp=>{
        if ( resp.state === 1 ) {
          this.vfcodeCountdown();
          this.dialogBind.vfcodeHasSent = true;
        }
      })
    },
    vfcodeCountdown() {
      let d = this.dialogBind;
      d.vfcodeText = d.vfcodeCounter+'s后重新获取';
      if ( --d.vfcodeCounter === 0 ) {
        d.vfcodeText = '发送验证码'
        d.vfcodeCounter = 60;
        d.vfcodeHasSent = false;
      } else {
        d.vfcodeTimer = setTimeout(this.vfcodeCountdown, 1000);
      }
    },
    getWXUserInfo() {
      let d = this.dialogBind;
      this.$http.post('WX_USER_INFO', {mobile:d.mobile, verifyCode:d.vfcode})
      .then(resp=>{
        if ( resp.state === 1 ) {
          this.wxUserInfo = resp.data;
          this.nextStep();
        }
      })
    },
    // 绑定微信账户
    bindWXAccount() {
      // console.log('bind wx account');
      let d = this.dialogBind;
      this.$http.post('BIND_ACCOUNT', {mobile:d.mobile, merchantId:this.merchantInfo.merchantId})
      .then(resp=>{
        if ( resp.state ===1 ) {
          this.nextStep();
        }
      })
    },
    generateMAppCode() {
      let { bgSrc, bgSize, codeSize, offset } = this.mappCode;
      let bg      = this.$refs.mappBg,
          code    = this.$refs.mappCode,
          context = this.$refs.mappCanvas.getContext('2d'),
          loaded  = 0

      bg.onload = code.onload = ()=>{
        // if ( ++loaded !== 2 ) return;
        context.drawImage(bg, 0, 0, bgSize.width, bgSize.height);
        context.drawImage(code, offset.x, offset.y, codeSize.width, codeSize.height);
        this.mappCode.dataURL = this.$refs.mappCanvas.toDataURL('image/jpeg', 1);
      };
      bg.onerror = code.onerror = ()=>{
        this.$message.error('获取二维码出错 ('+
        `http://ts.baotianqi.cn/sellerMerchant/getWaferQrCode?token=${localStorage.token}` +
        ') 请联系管理员'
        );
      };
      code.src = `http://ts.baotianqi.cn/sellerMerchant/getWaferQrCode?token=${localStorage.token}`;
    },
    downloadMAppCode() {
      var save_link      = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      save_link.href     = this.mappCode.dataURL;
      save_link.download = '小程序二维码-'+JSON.parse(localStorage.merchantInfo).merchantId+'.jpg';
    
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      save_link.dispatchEvent(event);
    }, 
    loadAccountData() {
      this.$http.post('MERCHANT_ACCOUNT_INFO')
      .then(resp=>{
        if ( resp.state !== 1 ) return;
        this.accountInfo = resp.data;
        if ( resp.data.isBind ) {
          this.mappCode.isBind = true;
          this.$nextTick(this.generateMAppCode);
        }
      })
    },
  },
  mounted() {
    this.loadAccountData();
  }
}
</script>
