var MODULE_NAME = "sellerCommon/";

export default {
   // 登录接口
   login: MODULE_NAME + "login",
   // 退出接口
   LOGOUT: MODULE_NAME + "logout",
   
   // 注册接口
   REGISTER: MODULE_NAME + "register",
   // 获取验证码接口
   GET_CODE: MODULE_NAME + "getCode",

   // 修改密码/重置密码
   CHANGE_PASSWORD: MODULE_NAME + "changePassword",

   // 商户信息
   USER_INFO: MODULE_NAME + "getMerchantUserInfo",

   // 订单列表
   GET_DEAL_LIST: MODULE_NAME + "getDealList",
   // 订单详情
   FIND_ORDER: MODULE_NAME + "findOrder",
   // 触发信息
   FIND_ORDER_TRIGGER: "usercenter/findOrderTrigger",

  /**
   * 获取赔付记录
   * @param innerOrderId  *
   */
  FIND_PAYOUT_RECORD: 'sellerMerchant/findPayOutRecord',

   // 取消订单
   CANCEL_DEAL: MODULE_NAME + "cancelDeal",

   // 获取收入统计数据
   GET_STATISTICS: MODULE_NAME + "getStatistics",

   // 获取城市列表（树状）
   getCitys: "sellerCity/getCitys",
   // 获取热门城市
   GET_HOT_CITY: "sellerCity/getHotCity",

   // 查询合约接口
   getContract: MODULE_NAME + "getContract",
   
   // 提交订单
   addOrder: MODULE_NAME + "newAddOrder",

   // 支付
   /**
    * 微信支付
    * @param outTradeNo 订单号
    * @param totalFee   金额, 分
    * @param body       商品描述, 固定为"晴空万里宝"
    */
   PAY_WECHAT: 'http://pay.baotianqi.cn/wxpay/nativepay',
   /**
    * 支付宝支付
    * @param outTradeNo    订单号
    * @param totalAmout    金额, 分
    * @param subject       订单标题, 固定为"晴空万里宝"
    * @param body          订单描述, 选填
    * @param returnUrl     支付成功跳转url
    */
   PAY_ALIPAY: 'http://pay.baotianqi.cn/alipay/pay',
   /**
    * 查询订单支付状态
    * @param innerOrderId 订单号
    * @param token
    */
   CHECK_PAYMENT_STATE: MODULE_NAME + 'fingPayState',

   /**
    * 发送邮件
    * @param email 邮箱号
    * @param file  要转pdf地址
    * @param email  email
    * @param orderId  id
    * @return success or error
    */
   // SEND_MAIL: 'message/mailSenderInfo/mailSend'
   SEND_MAIL: 'http://message.baotianqi.cn/mailSenderInfo/mailSend'

   // 个人账户
   /**
    * 交易记录
    * @param page          当前页数
    * @param pageSize      每页行数
    * ??
    */
   , DIVIDED_LIST: 'sellerMerchant/findDividedList'
   /**
    * 提现记录
    * @param page
    * @param pageSize
    * ??
    */
   , WITHDRAWAL_LIST: 'sellerMerchant/findWithdrawList'
   /**
    * 退款记录
    * @param page
    * @param pageSize
    * ??
    */
   , REFUND_LIST: 'sellerMerchant/findRefundList'
   /**
    * 提现
    * @param merchantId        商户 id
    * @param withdrawAmount    提现金额
    * ??
    */
   , DO_WITHDRAW: 'sellerMerchant/withdraw'
   /**
    * 余额信息
    */
   , MERCHANT_ACCOUNT_INFO: MODULE_NAME + 'getMerchantAccountInfo'
   /**
    * 检查微信绑定状态, 并获取信息
    * @param mobil
    * @param verifyCode
    */
   , WX_USER_INFO: MODULE_NAME + 'checkWxUserInfo'

   /**
    * 绑定提现账户
    * @param merchantId
    * @param openId
    */
   , BIND_ACCOUNT: MODULE_NAME + 'bindAccount'


   /**
    * 站内信获取
    * @param page 当前页
    * @param rows 每页消息数
    * @param merchantId
    */
   , GET_NOTICE: 'outinsidemail/mlist'


   /**
    * 站内信获取
    * @param id
    * @param state             0：未读，1：已读
    * @param delState          0：未删除，1：已删除
    */
   , SET_NOTICE_STATE: 'outinsidemail/mupdate'

   /** 检查优惠码
    * @param mobile
    * @param coupons
    * @param productId
    */
 , findCoupons: 'sellerMerchant/findCoupons'

  // 支付
  /**
   * 微信支付
   * @param outTradeNo 订单号
   * @param totalFee   金额, 分
   * @param body       商品描述, 固定为"晴空万里宝"
   */
 , 'http://pay.baotianqi.cn/wxpay/nativepay': 'payment/wxpay'
  /**
   * 支付宝支付
   * @param outTradeNo    订单号
   * @param totalAmout    金额, 分
   * @param subject       订单标题, 固定为"晴空万里宝"
   * @param body          订单描述, 选填
   * @param returnUrl     支付成功跳转url
   */
 , 'http://pay.baotianqi.cn/alipay/pay': 'payment/alipay'
}