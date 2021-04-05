import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus';
// 加载动画的设置
let loading: any

const startLoading = () => {
  interface Opactions {
    lock: boolean;
    text: string;
    background: string
  }
  const opactons: Opactions = {
    lock: true,
    text: "正在加载...",
    background: 'rgba(0,0,0,0.7)'
  }
  loading = ElLoading.service(opactons)
}
const endLoading = () => {
  loading.close()
}

// 请求拦截
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  // Do something before request is sent
  startLoading()
  return config;
}, error => {
  // Do something with request error
  endLoading()
  return Promise.reject(error);
});

// 相应拦截
axios.interceptors.response.use((response: AxiosResponse<any>) => {
  // Do something before response is sent
  endLoading()
  return response;
}, error => {
  // Do something with response error
  endLoading()
  return Promise.reject(error);
});

export default axios;
