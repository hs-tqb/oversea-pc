import axios from 'axios'
import apis from './apis'
import env  from '~/env.config'


axios.defaults.baseURL = env.baseURL;

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // if ( store.state.token ) {
    // config.headers.Authorization = `token ${store.state.token}`
  // }
  try {
    ( config.params || (config.params={}) ).token = window.localStorage.getItem('token');
  } catch(e) {
  }
  
  config.url = apis[config.url];
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})


axios.fetch = (url, params={})=>{
  return new Promise((res,rej)=>{
    axios(url,params)
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
