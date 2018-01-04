import axios from 'axios'
import apis from './apis'
import env  from '~/env.config'
import { Message } from 'element-ui'

axios.defaults.baseURL = env.baseURL;

// 请求拦截
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // if ( store.state.token ) {
    // config.headers.Authorization = `token ${store.state.token}`
  // }
  try {
    ( config.data || (config.data={}) ).token = window.localStorage.getItem('token');
  } catch(e) {
  }
  
  config.url = apis[config.url];
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});

// 响应拦截
axios.interceptors.response.use(data => {// 响应成功关闭loading
  console.log(data)
  let errorCode = data.data.error;
  let message   = '';
  if ( errorCode == 1050 || errorCode == 1052 ) {
    message = `登录已过期, 您可以选择重新登录
    <button type="button" style="margin-left:10px;" class="el-button el-button--primary el-button--small" onclick="Message.closeAll();$nuxt._router.push('/login');">
      <span>重新登录</span>
    </button>`;
  } else if ( data.data.state !== 1 ) {
    message = data.data.message;
  }
  if ( !!message ) {
    Message.closeAll();
    window.Message = Message;
    Message.error({
      dangerouslyUseHTMLString: true,
      showClose:true,
      message: `登录已过期, 您可以选择重新登录
      <button type="button" style="margin-left:10px;" class="el-button el-button--primary el-button--small" onclick="Message.closeAll();$nuxt._router.push('/login');">
        <span>重新登录</span>
      </button>`
    });
  }
  return data.data;
 }, error => {
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
 })



axios.fetch = (url, data={})=>{
  return new Promise((res,rej)=>{
    axios(url,data)
      .then(resp=>{
        res(resp);
      }, err=>{
        rej(err)
      })
      .catch(err=>{
        rej(err);
      });
  });
}

export default axios;

// export default axios.create({
//   baseURL: 'http://localhost:5555',
//   method : 'post',
//   transformRequest: [
//     function (data) {
//       try {
//         data.token = localStorage.getItem('token')
//       } catch (e) {
//       }
//       console.log('-----------');
//       console.log( data )
//       console.log('-----------');
//       return JSON.stringify(data)
//     }
//   ]
//   // transformResponse: [function (data) {
//   //   // 对 data 进行任意转换处理
//   //   return JSON.parse(data)
//   // }]
// })
