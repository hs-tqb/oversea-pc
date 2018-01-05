import axios from 'axios'
import qs from 'qs'
import apis from './apis'
import env  from '~/env.config'
import { Message } from 'element-ui'

// axios.defaults.baseURL = env.baseURL;
let baseURL = env.baseURL;
let instance = axios.create({
  // baseURL:baseURL,
  // 请求数据修改
  transformRequest: [
    data=>qs.stringify(data)
  ],
});

let method, data, params;
instance.interceptors.request.use(httpRequest =>{
  method = httpRequest.method;
  data   = httpRequest.data;
  params = httpRequest.params;
  try {
    if ( method === 'get' ) {
      params.token = localStorage.getItem('token');
    } else if ( method === 'post' ) {
      data.token = localStorage.getItem('token');
    }
    httpRequest.url = baseURL + apis[httpRequest.url];
  } catch(err) {
  } finally {
    return httpRequest;
  }
});


// http响应拦截器
let respData, errorCode, message;
instance.interceptors.response.use(
  httpResponse=>{
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
  }, 
  error=>{
    Message.error({
      message: error.toString()
    })
    return Promise.reject(error)
  }
);


export default instance;
