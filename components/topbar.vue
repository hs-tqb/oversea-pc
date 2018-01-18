<style lang="scss">
  @import '~assets/css/base.scss';
  $h:50px;
  #topbar { 
    height:$h; background:$--color-white; 
    .el-button--text { padding:0 12px; height:50px; }
    .fl, .fr { padding:0 12px; }
    .el-dialog__body { 
      @include border('top'); @include border('bottom');
      .info {
        padding-left:80px;
        b { margin-right:24px; color:$--color-primary; }
      }
      .input {
        position: relative;
        .el-input:not(:first-child) { margin-top:15px; }
        .passwordVisible { 
          position: absolute; right:0; bottom:-3px; 
          padding-left:10px; padding-right:10px;
          img { width:25px; }
        }
      }
      .notice {
        .content { white-space: pre-wrap; }
        .date { margin:24px 0 -12px 0; text-align:right; }
      }
    }
    /*
    .el-dropdown {
      &.notice { 
      }
      &.merchant {
        // i.avatar { 
          // display:inline-block; 
          // vertical-align:0px;
          // @include square(26px); @include bg-center('~/static/img/logo.png'); @extend .disc;
        // }
      }
    }
    */
  }
  .notice-popper {
    .unread::before { content:'*'; position:absolute; top:12px; left:8px; color:$--color-danger; }
  }
</style>

<template>
  <div id="topbar">
    <div class="fl">
      <el-button type="text" @click="toggleSidebarCollapse">
        <i :class="`el-icon-d-arrow-${isSidebarCollapsed?'right':'left'}`"></i>
      </el-button>
    </div>
    <div class="fr">
      <!-- 通知 -->
      <el-dropdown @command="showNotice" class="notice" custom-class="test2">
        <span class="el-dropdown-link">
          <el-button type="text">
            <el-badge :value="dialogNotice.data.length" class="item">
              <i class="el-icon-bell"></i>
            </el-badge>
          </el-button>
        </span>
        <el-dropdown-menu slot="dropdown" class="notice-popper">
          <el-dropdown-item 
            v-for="(n,i) in dialogNotice.data" 
            :key="`notice-${i}`"
            :command="i" 
            :class="n.state===0?'unread':''"
          >{{n.title}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 用户 -->
      <el-dropdown @command="dropdownCommand" class="merchant">
        <span class="el-dropdown-link">
          <el-button type="text">
            <!-- <i class="avatar"></i> -->
            {{merchantInfo.merchantName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="showMerchantInfo">商户信息</el-dropdown-item>
          <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="text" @click="logout">退出</el-button>
    </div>

    <el-dialog title="商户信息" :visible.sync="dialogshowMerchangInfo.show">
      <div class="info">
        <p><b>商&ensp;&ensp;&ensp;&ensp;户&ensp;&ensp;&ensp;&ensp;号</b>{{merchantInfo.merchantId}}</p>
        <p><b>商&ensp;&ensp;户&ensp;&ensp;名&ensp;&ensp;称</b>{{merchantInfo.merchantName}}</p>
        <p><b>用&ensp;&ensp;&ensp;&ensp;户&ensp;&ensp;&ensp;&ensp;名</b>{{merchantInfo.userName}}</p>
        <p><b>手&ensp;&ensp;&ensp;&ensp;机&ensp;&ensp;&ensp;&ensp;号</b>{{merchantInfo.mobile}}</p>
        <p><b>真&ensp;&ensp;实&ensp;&ensp;姓&ensp;&ensp;名</b>{{merchantInfo.realName}}</p>
        <p><b>商&ensp;&ensp;务&ensp;&ensp;名&ensp;&ensp;称</b>{{merchantInfo.bdName}}</p>
        <p><b>商&ensp;务&ensp;手&ensp;机&ensp;号</b>{{merchantInfo.bdMobile}}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogshowMerchangInfo.show=false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="dialogChangePasswrod.show" width="398px">
      <div class="input">
        <el-input placeholder="请输入手机号" :maxlength="11" v-model="dialogChangePasswrod.mobile"></el-input>
        <el-input placeholder="短信验证码" v-model="dialogChangePasswrod.vfcode">
          <el-button slot="append" @click="sendVFCode">
            {{dialogChangePasswrod.vfcodeText}}
          </el-button>
        </el-input>
        <el-input 
          :type="dialogChangePasswrod.passwordVisible?'text':'password'" 
          placeholder="新密码"
          v-model="dialogChangePasswrod.password"
        ></el-input>
        <el-button type="text" class="passwordVisible" @click="dialogChangePasswrod.passwordVisible = !dialogChangePasswrod.passwordVisible">
          <img src="~assets/img/icon-eye-opened.png" alt="" v-if="dialogChangePasswrod.passwordVisible">
          <img src="~assets/img/icon-eye-closed.png" alt="" v-else>
        </el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doChangePassword" :disable="enableToChangePassword.result">确 定</el-button>
        <el-button @click="dialogChangePasswrod.show=false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog 
      v-if="dialogNotice.show"
      :title="dialogNotice.current.title" 
      :visible.sync="dialogNotice.show" 
      :close-on-click-modal="dialogNotice.current.state===1"
      :show-close="dialogNotice.current.state===1"
    >
      <div class="notice">
        <p class="content">{{dialogNotice.current.content}}</p>
        <p class="date">{{(dialogNotice.current.gmtCreate)}}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateNoticeState">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      merchantInfo:this.$store.getters.merchantInfo,
      dialogshowMerchangInfo: {
        show:false
      },
      dialogChangePasswrod:{
        show:false,
        mobile:'',
        vfcode:'',
        vfcodeText:'发送验证码',
        vfcodeTimer:'',
        vfcodeCounter:60,
        vfcodeCounting:false,
        password:'',
        passwordVisible:false
      },
      dialogNotice: {
        show:false,
        qty:'',
        data:[],
        unread:[],
        current:null,
      }
    }
  },
  computed: {
    isSidebarCollapsed() {
      return this.$store.state.isSidebarCollapsed
    },
    enableToChangePassword() {
      let d = this.dialogChangePasswrod, obj;
      if ( !this.checkMobileValidation(d.mobile) ) {
        obj = { result:false, text:'手机号码错误' }
      } else if (!d.vfcode ) {
        obj = { result:false, text:'请输入验证码'}
      } else if ( !d.password) {
        obj = { result:false, text:'请输入新的密码'}
      }
      return obj || { result:true };
    },
    // unreadNoticies() {
    //   return this.dialogNotice.data.filter(n=>n.state===0);
    // }
  },
  methods: {
    toggleSidebarCollapse(e) {
      this.$store.commit('setSidebarCollapseState', !this.isSidebarCollapsed);
    },
    logout() {
      this.$http.post('LOGOUT')
        .then(resp=>{
          if ( resp.state === 1 ) {
            this.$message.success('退出成功');
            this.$router.push('/login');
          }
        })
    },
    // 弹窗控制
    dropdownCommand(c) {
      this[c]();
    },
    // 显示详情
    showMerchantInfo() {
      this.dialogshowMerchangInfo.show = true;
    },
    // 改密码
    changePassword() {
      this.dialogChangePasswrod.show = true;
    },
    checkMobileValidation(m) {
      return /^1[3456789]\d{9}$/.test(m);
    },
    countdownVFCode() {
      let d = this.dialogChangePasswrod;
      d.vfcodeCounting = true;
      if ( --d.vfcodeCounter === 0 ) {
        d.vfcodeCounter = 60;
        d.vfcodeTimer   = -1;
        d.vfcodeText    = '发送验证码';
        d.vfcodeCounting = false;
        return;
      }
      d.vfcodeText = d.vfcodeCounter + 's后重新获取';
      clearTimeout(d.vfcodeTimer);
      d.vfcodeTimer = setTimeout(this.countdownVFCode, 1000);
    },
    sendVFCode() {
      if ( this.dialogChangePasswrod.vfcodeCounting ) return;
      let mobile = this.dialogChangePasswrod.mobile
      if ( !this.checkMobileValidation(mobile) ) {
        this.$message.closeAll();
        return this.$message.error('手机号码错误');
      } 
      this.$http.post('GET_CODE', {mobile})
      .then(resp=>{
        this.countdownVFCode();
      })
    },
    doChangePassword() {
      if ( !this.enableToChangePassword.result ) {
        this.$message.closeAll();
        this.$message.error(this.enableToChangePassword.text);
        return;
      }
      let d = this.dialogChangePasswrod;
      this.$http.post('CHANGE_PASSWORD', {
        mobile:d.mobile,
        newPassword:d.password,
        confirmassword:d.password,
        verifyCode:d.vfcode
      })
      .then(resp=>{
        if ( resp.state === 1 ) {
          this.$message.closeAll();
          this.$message.success('修改成功, 请重新登录');
          this.$http.post('LOGOUT').then(resp=>{ this.$router.push('/login'); })
        }
      })
    },
    // 消息
    updateNoticeState() {
      let d     = this.dialogNotice;
      let curr = this.dialogNotice.current;
      // 如果是已读, 则不再更新状态
      if ( curr.state === 1 ) {
        d.show    = false;
        d.current = null;
        return;
      }
      // 如果是未读, 作已读标记
      this.$http.post('SET_NOTICE_STATE', {id:curr.id, state:1})
      .then(resp=>{
        if ( resp.state === 1 ) {
          d.show    = false;
          d.current = null;
          this.showUnreadNotice();
        }
      })
    },
    showNotice(idx) {
      let d     = this.dialogNotice;
      let curr  = d.data[idx];
      d.current = curr;
      d.show    = true;
    },
    showUnreadNotice() {
      let d = this.dialogNotice;
      // 只在首页自动显示消息
      if ( this.$route.name !== 'index' ) return;

      if ( d.unread.length ) {
        d.current = d.unread.pop();
        d.show    = true;
      }
    },

    loadNotices() {
      this.$http.post('GET_NOTICE')
      .then(resp=>{
        if ( resp.state===1 ) {
          let d = this.dialogNotice;
          d.data   = resp.data.list || [];
          d.unread = d.data.filter(n=>n.state===0);
          this.showUnreadNotice();
          setTimeout(this.loadNotices, 180000);
        }
      })
      .catch(err=>{
        setTimeout(this.loadNotices, 180000);
      })
    }
  },
  mounted() {
    this.$http.post('USER_INFO')
    .then(resp=>{
      if ( resp.state !== 1 ) return;
      this.merchantInfo = resp.data.merchantInfo;
      this.$store.commit('saveMerchantInfo', resp.data.merchantInfo);

      if ( this.merchantInfo.verifyState!==1 ) {
        this.$route.redirect('/preview');
      } else {
        this.loadNotices();
      }

    });


    window.dialogChangePasswrod = this.dialogChangePasswrod;
  }
}
</script>
