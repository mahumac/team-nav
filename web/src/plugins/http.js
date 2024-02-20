import axios from 'axios'
import { Notification } from 'element-ui'
import QS from 'qs';

// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.paramsSerializer = param => QS.stringify(param, {indices: false});
  return config;
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    return res.data;
  },
  err => {
    let { message } = err;
    if (message === "Network Error") {
      Notification.error('后端接口连接异常');
      return Promise.reject(err)
    }
    if (message.includes("timeout")) {
      Notification.error('系统接口请求超时');
      return Promise.reject(err)
    }
    if (err.response && err.response.status === 401) {
      location.href =  `${process.env.VUE_APP_PROXY_URL}/login?returnUrl=${encodeURIComponent(window.location.href)}`;
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    }
    Notification.error(err.response.data);
    return Promise.reject(err)
  }
)
service.save = (url, data) => data.id ? service.patch(`${url}/${data.id}`, data) : service.post(url, data);

export default service