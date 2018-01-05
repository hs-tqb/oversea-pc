<style lang="scss" scoped>
  @import '~assets/css/base.scss';
  #page-login {
    display:flex;
    flex-direction:column;
    height:100%;
    #bg { 
      position:relative;
      height:700px; 
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
      #login-form {
        position:absolute; top:180px; right:0;
        padding:40px 50px;
        width:400px; height:365px;
        font-size:14px; color:#666;
        background:#fff;
        & > * { display:block; margin:15px 0; }
        h3 { margin:0; font-size:20px; font-weight:normal; text-align:center; }
        p { 
          text-align:right; 
          span {cursor: pointer;} 
        }
        button { width:100%; }
      }
      #promise {
        position: absolute; top:265px;
        font-size:18px; line-height:35px;
        h1 { margin-bottom:18px; }
      }
    }
    #footer {
      flex:1;
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
        <div id="login-form">
          <h3>商家登录</h3>
          <el-input
            placeholder="用户名/手机号"
            :maxlength="11"
            v-model.trim="username"
            clearable>
          </el-input>
          <el-input
            type="password"
            placeholder="密码"
            v-model.trim="password"
            clearable>
          </el-input>
          <p><span>忘记密码</span></p>
          <el-button type="success" @click="doLogin">登录</el-button>
          <el-button type="success" plain>注册</el-button>
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
  </div>
</template>

<script>
import version from '~/version.config'

export default {
  layout:'full',
  data() {
    return {
      version : version,
      username:'',
      password:''
    }
  },
  methods: {
    doLogin() {
      if ( !this.username || !this.password ) {
        return this.$alert( '帐号和密码不能为空');
      }
      this.$http.post('login', {
        userName:this.username, 
        password:this.password 
      })
      // 验证数据获取状态
      .then(resp=>{
        console.log(resp);
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
    }
  },
  mounted() {
    if ( process.env.NODE_ENV === 'development' ) {
      this.username = '15914094691';
      this.password = '111111';
    }
  }
}
</script>
