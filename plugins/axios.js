import axios from 'axios'
import qs from 'qs'
import apis from './apis'
import env  from '~/env.config'
import { Message } from 'element-ui'


// 默认配置
let baseURL = env.baseURL;
let instance = axios.create({
  // baseURL:baseURL,
  // 请求数据修改
  transformRequest: [
    data=>qs.stringify(data)
  ],
});

// 请求拦截
instance.interceptors.request.use(httpRequest =>{
  if ( httpRequest.method === 'post' ) {
    ( httpRequest.data? httpRequest.data: (httpRequest.data={}) )
      .token = localStorage.getItem('token');
  } else if ( httpRequest.method === 'get' ) {
    ( httpRequest.params?httpRequest.params:(httpRequest.params={}) )
    .token = localStorage.getItem('token');
  }
  httpRequest.url = baseURL + apis[httpRequest.url];
  return httpRequest;
});


// 响应拦截器
let respData, errorCode, message;
instance.interceptors.response.use(
  httpResponse=>{
    respData  = httpResponse.data;
    errorCode = respData.errorCode;
    message   = '';
    if ( errorCode == 1050 || errorCode == 1052 ) {
      message = `${respData.message}
      <button type="button" style="margin-left:60px;" class="el-button el-button--primary el-button--small" onclick="Message.closeAll();$nuxt._router.push('/login');">
        <span>重新登录</span>
      </button>`;
    } else if ( respData.state !== 1 ) {
      if ( typeof respData === 'object' ) {
        message = respData.message;
      }
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
  }, 
  error=>{
    Message.error({
      message: error.toString()
    })
    return Promise.reject(error)
  }
);


export default instance;
