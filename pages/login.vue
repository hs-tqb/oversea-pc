<style lang="scss">
  @import '~assets/css/base.scss';
  #page-login {
    display:flex;
    flex-direction:column;
    height:100%;
    #bg { 
      position:relative;
      height:700px;
      min-height:700px;
      color:#fff;
      background:url('~assets/img/login/bg.png') no-repeat center/cover; 
      .inner { position:relative; margin:0 auto; width:1000px;; height:auto; }
      #product {
        position:relative; top:22px;
        padding-left:163px;
        height:44px;
        line-height:46px;
        font-size:30px;
        font-weight:normal;
        background:url('~assets/img/login/topLogo.png') no-repeat 0 center;
        span { font-size:85%; }
        strong, span { vertical-align:-1px; }
      }
      .input-form {
        position:absolute; right:0;
        padding:40px 50px;
        width:400px; 
        // height:365px;
        font-size:14px; color:#666;
        background:#fff;
        & > *:not(.el-input-group):not(.passwordVisible) { display:block; margin:15px 0; }
        h3 { margin-top:0 !important; font-size:20px; font-weight:normal; text-align:center; }
        p { 
          text-align:right; 
          span {cursor: pointer;} 
        }
        > button:not(.passwordVisible) { margin:0; width:100%; }
        // .el-input-group input { width:auto; background:red !important; }
        .el-input.required:after { position:absolute; right:-15px; top:12px; color:$--color-danger; content:'*'; }
        // .el-button.passwordVisible { 
        //   position:absolute; z-index:100; margin:0; padding:0; padding:0 14px; width:52px; height:52px; 
        //   img { width:100%; }
        // }
        &#login-form {
          top:180px;
          .el-button.passwordVisible { right:45px; top:137px; }
        }
        &#register-form {
          top:80px;
          .el-button.passwordVisible { right:45px; top:192px; }
        }
      }
      #promise {
        position: absolute; top:265px;
        font-size:18px; line-height:35px;
        h1 { margin-bottom:18px; }
      }
    }
    #footer {
      flex:1;
      min-height:397px;
      padding:1px;
      color:#b2b2b2;
      background:#171B26; 
      overflow-x:hidden;
      .inner { position:relative; margin:70px auto; width:1080px; }
      h3 { padding-left:135px; height:36px; line-height:54px; background:url('~assets/img/login/footerLogo.png') no-repeat 0 center; }
      h4 { margin:30px 0 54px 0; width:830px; font-weight:bold; }
      p  { 
        position: relative;
        span { display:inline-block; width:25px; background:url('~assets/img/login/emblem.png') no-repeat 0 center; }
        a { position:absolute; left:350px; top:10px; }
      }
      #qrcode { 
        position: absolute; right:0; top:0; 
        font-size:16px; color:#fff; text-align:center; 
        img { width:172px; }
      }
    }
    .dialogChangePassword {
      .el-dialog__body .el-input:not(:first-child) { margin-top:15px; }
      .el-button.passwordVisible { right:15px; top:184px; }
    }
  }
</style>

<template>
  <div id="page-login">
    <div id="bg">
      <div class="inner">
        <h2 id="product">| <strong>商户后台</strong>&nbsp;<span> V {{version.number}} {{version.type}}</span></h2>
        <div id="promise">
          <h1>海外旅游天气保障</h1>
          <p>旅游遇大雨，就发大红包
          <br/>支持140+海外热门旅游城市，提供最长60天、
          <br/>最大金额￥10000/人的天气保障服务</p>
        </div>
        <div id="login-form" class="input-form" v-show="task==='login'">
          <h3>商家登录</h3>
          <el-input
            placeholder="用户名/手机号"
            :maxlength="11"
            v-model.trim="login.username"
            clearable>
          </el-input>
          <el-input
            :type="login.passwordVisible?'text':'password'"
            placeholder="密码"
            v-model.trim="login.password"
          >
          </el-input>
          <p><span @click="findPassword">忘记密码</span></p>
          <el-button type="success" @click="doLogin">登录</el-button>
          <el-button type="success" @click="task='register'" plain>注册</el-button>
          <el-button type="text" class="passwordVisible" @click="login.passwordVisible = !login.passwordVisible">
            <img src="~assets/img/icon-eye-opened.png" alt="" v-if="login.passwordVisible">
            <img src="~assets/img/icon-eye-closed.png" alt="" v-else>
          </el-button>
        </div>
        <div id="register-form" class="input-form" v-show="task==='register'">
          <h3>注册帐号</h3>
          <el-input
            placeholder="用户名/手机号"
            :maxlength="11"
            class="required"
            v-model.trim="register.mobile"
            clearable>
          </el-input>
          <el-input
            placeholder="验证码"
            class="required"
            v-model.trim="register.verifyCode"
            clearable>
            <template slot="append">
              <el-button @click="sendVFCode('register')">
                {{verifyCode.module==='register'?verifyCode.text:'验证码'}}
              </el-button>
            </template>
          </el-input>
          <el-input
            :type="register.passwordVisible?'text':'password'"
            placeholder="密码"
            class="required"
            v-model.trim="register.password">
          </el-input>
          <el-button type="text" class="passwordVisible" @click="register.passwordVisible = !register.passwordVisible">
            <img src="~assets/img/icon-eye-opened.png" alt="" v-if="register.passwordVisible">
            <img src="~assets/img/icon-eye-closed.png" alt="" v-else>
          </el-button>
          <el-input
            placeholder="怎么称呼您(必填)"
            class="required"
            v-model.trim="register.realName"
            clearable>
          </el-input>
          <el-input
            placeholder="您的公司(必填)"
            class="required"
            v-model.trim="register.companyName"
            clearable>
          </el-input>
          <el-input
            placeholder="邀请码(非必填)"
            v-model.trim="register.inviteCode"
            clearable>
          </el-input>
          <el-button type="success" @click="doRegister">注册</el-button>
          <p><span @click="task='login'">立即登录</span></p>
        </div>
      </div>
    </div>
    <div id="footer">
      <div class="inner">
        <h3>让人们不再为坏天气担心</h3>
        <h4>
          天气宝是一家由数据科学家和金融数学家主导的金融科技公司，拥有业内领先的基于智能算法的动态天气风险定价模型和以大数据驱动          的风险管理系统，为用户提供全自动的异常天气赔偿服务。作为国内天气保障领域的开创者，天气宝致力于解决天气因素给人类生产生活带来的经济损失与影响。
        </h4>
        <p>
          Copyright©eversince2015 天气宝.保留所有权利
          <br/>武汉低温宝信息有限公司 | 鄂ICP备14020279号-2
          <br/><span>&nbsp;</span>鄂公网安备 42018502000573号
          <a href="https://ss.knet.cn/verifyseal.dll?sn=e170106420100661546vb6000000&a=1&pa=0.6091007807242678" target="_blank">
            <img src="http://rr.knet.cn/static/images/logo/cnnic.png" style="border:0;" width="128" height="47" oncontextmenu="return false;" alt="可信网站">
          </a>
        </p>
        <div id="qrcode">
          <img src="~assets/img/login/qrcode.png" alt="">
          <br/>关注“天气宝”微信公众号
          <br/>邮箱：bd@utianqi.com
        </div>
      </div>
    </div>
    <el-dialog title="找回密码" 
      width="398px" class="dialogChangePassword"
      :visible.sync="dialogChangePasswrod.show" 
      @close="resetVfCodeConifig"
      >
      <div class="input">
        <el-input placeholder="请输入手机号" :maxlength="11" v-model="dialogChangePasswrod.mobile"></el-input>
        <el-input placeholder="短信验证码" v-model="dialogChangePasswrod.verifyCode">
          <el-button slot="append" @click="sendVFCode('dialogChangePasswrod')">
            {{verifyCode.module==='dialogChangePasswrod'?verifyCode.text:'验证码'}}
          </el-button>
        </el-input>
        <el-input 
          :type="dialogChangePasswrod.passwordVisible?'text':'password'" 
          placeholder="新密码"
          v-model="dialogChangePasswrod.password"
        >
        </el-input>
        <el-button type="text" class="passwordVisible icon" @click="dialogChangePasswrod.passwordVisible = !dialogChangePasswrod.passwordVisible">
          <img src="~assets/img/icon-eye-opened.png" alt="" v-if="dialogChangePasswrod.passwordVisible">
          <img src="~assets/img/icon-eye-closed.png" alt="" v-else>
        </el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doChangePassword">确 定</el-button>
        <el-button @click="dialogChangePasswrod.show=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import version from '~/version.config'

export default {
  layout:'full',
  data() {
    return {
      version : version,
      task:'login',
      login: {
        username:'',
        password:'',
        passwordVisible:false,
      },
      register: {
        mobile:'',
        verifyCode  :'',
        password:'',
        realName:'',
        companyName :'',
        inviteCode:'',
        passwordVisible:false
      },
      dialogChangePasswrod:{
        show:false,
        mobile:'',
        verifyCode:'',
        password:'',
        passwordVisible:false
      },
      verifyCode: this.getDefaultVfCodeConfig(),
    }
  },
  methods: {
    doLogin() {
      if ( !this.login.username || !this.login.password ) {
        this.$message.closeAll();
        return this.$message.error( '帐号和密码不能为空');
      }
      this.$http.post('login', {
        userName:this.login.username, 
        password:this.login.password 
      })
      // 验证数据获取状态
      .then(resp=>{
        // console.log(resp);
        if ( resp.state !== 1 ) {
          throw resp.message;
        }
        return resp.data;
      })
      // 验证审核状态
      .then(data=>{
        if ( data.verifyState !== 1 ) {
          this.$router.push('/preview');
          throw '审核中';
        }
        return data;
      })
      // 存储数据并跳转
      .then(data=>{
        this.$store.commit('saveMerchantInfo', {
          verifyState  : data.verifyState,
          merchantId   : data.merchantId,
          merchantState: data.merchantState,
        })
        this.$store.commit('saveToken', data.token);
        this.$store.commit('saveProduction', data.productList[0]);
        if ( history.length ) {
          history.back();
        } else {
          this.$router.push('/');
        }
      })
    },
    doRegister() {
      let d = this.register, text = '';
      if ( !this.checkMobileValidation(d.mobile) ) {
        text = '手机号码错误'
      } else if ( !d.verifyCode ) {
        text = '请填写验证码'
      } else if ( !d.password ) {
        text = '请填写密码'
      } else if (!d.realName ) {
        text = '请填写称呼'
      } else if ( !d.companyName ) {
        text = '请填写公司名';
      }
      if ( !!text ) {
        this.$message.closeAll();
        return this.$message.error(text);
      }
      this.$http.post('REGISTER', this.register)
      .then(resp=>{
        if ( resp.state === 1 ) {
          this.$message.closeAll();
          this.$message.success('注册成功！请耐心等待审核');
          this.task = 'login';
        }
      })
    },
    countdownVFCode() {
      let d = this.verifyCode;
      d.counting = true;
      if ( --d.counter === 0 ) {
        return this.resetVfCodeConifig();
      }
      d.text = d.counter + 's后重新获取';
      clearTimeout(d.timer);
      d.timer = setTimeout(this.countdownVFCode, 1000);
    },
    getDefaultVfCodeConfig() {
      return {
        module:'',
        text:'',
        timer:-1,
        counting:false,
        counter:60
      }
    },
    resetVfCodeConifig() {
      console.log('reset');
      clearTimeout( this.verifyCode.timer );
      this.verifyCode = this.getDefaultVfCodeConfig();
    },
    sendVFCode(module) {
      if ( this.verifyCode.counting ) return;
      let mobile = this[module].mobile;
      if ( !this.checkMobileValidation(mobile) ) {
        this.$message.closeAll();
        return this.$message.error('手机号码错误');
      } 

      this.$http.post('GET_CODE', {mobile})
      .then(resp=>{
        this.countdownVFCode();
        this.verifyCode.module = module;
      })
    },
    checkMobileValidation(m) {
      return /^1[3456789]\d{9}$/.test(m);
    },
    findPassword() {
      this.dialogChangePasswrod.show = true;
    },
    enableToChangePassword() {
      let d = this.dialogChangePasswrod, obj;
      if ( !this.checkMobileValidation(d.mobile) ) {
        obj = { result:false, text:'手机号码错误' }
      } else if (!d.verifyCode ) {
        obj = { result:false, text:'请输入验证码'}
      } else if ( !d.password) {
        obj = { result:false, text:'请输入新的密码'}
      }
      console.log( obj );
      return obj || { result:true };
    },
    doChangePassword() {
      let enableToChangePassword = this.enableToChangePassword();
      if ( !enableToChangePassword.result ) {
        this.$message.closeAll();
        this.$message.error(enableToChangePassword.text);
        return;
      }
      let d = this.dialogChangePasswrod;
      this.$http.post('CHANGE_PASSWORD', {
        mobile:d.mobile,
        newPassword:d.password,
        confirmassword:d.password,
        verifyCode:d.verifyCode
      })
      .then(resp=>{
        if ( resp.state === 1 ) {
          this.$message.closeAll();
          this.$message.success('修改成功, 请重新登录');
          this.$http.post('LOGOUT').then(resp=>{ this.$router.push('/login'); })
        }
      })
    },
  },
  mounted() {
    // if ( process.env.NODE_ENV === 'development' ) {
    //   this.login.username = '15914094691';
    //   this.login.password = '111111';
    // }
  }
}
</script>
