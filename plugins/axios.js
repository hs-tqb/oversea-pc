import axios from 'axios'
import qs from 'qs'
import apis from './apis'
import env  from '~/env.config'
import { Message } from 'element-ui'

// axios.defaults.baseURL = env.baseURL;

let instance = axios.create({
  baseURL:env.baseURL,
  // 请求数据修改
  transformRequest: [
    function (data={}) {
      try {
        data.token = localStorage.getItem('token')
      } catch (e) {
      }
      return qs.stringify(data);
    }
  ],
  // 响应数据修改
  // transformResponse: [function (resp) {
  //   return resp;
  // }]
});


// http响应拦截器
let respData, errorCode, message;
instance.interceptors.response.use(httpResponse =>{
    respData  = httpResponse.data;
    errorCode = respData.errorCode;
    message   = '';
    if ( errorCode == 1050 || errorCode == 1052 ) {
      message = `登录已过期, 您可以选择重新登录
      <button type="button" style="margin-left:10px;" class="el-button el-button--primary el-button--small" onclick="Message.closeAll();$nuxt._router.push('/login');">
        <span>重新登录</span>
      </button>`;
    } else if ( respData.state !== 1 ) {
      message = respData.message;
    }
    if ( !!message ) {
      Message.closeAll();
      window.Message = Message;
      Message.error({
        dangerouslyUseHTMLString: true,
        showClose:true,
        message: message
      });
    }
    return respData;
  }, error => {
    loadinginstace.close()
    Message.error({
    message: error
  })
  return Promise.reject(error)
 })

export default instance;
