import axios from 'axios'
import qs from 'qs'

export function request(config) {
  // 1创建axios实例
  const instance = axios.create({
    // 部署用baseURL
    baseURL: 'http://172.20.103.125:8081', 
    // 测试用baseURL
    // baseURL: 'http://127.0.0.1:8081',
    timeout: 5000,
    transformRequest:[function(data){
      data = qs.stringify(data);
      return data;
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  
  // 2.1请求拦截
  instance.interceptors.request.use(config => {
    console.log(config)
    return config
  }, err => {
    console.log(err)
  })
  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  }) 
  // 3.发送真正的网络请求
  return instance(config)
}