import axios from "../interceptor/HttpInterceptor"

export default class HttpHandler {
  constructor() {
  }
  /**
   *
   * 自定义get请求
   *
   */
  get(url, params, config) {
    if (!params) {
      params = {};
    }
    return axios.get(url,{params: params},config);
  }
  /**
   *
   * 自定义post请求
   *
   */
  post(url, params, type, config) {
    if (!params) {
      params = {};
    }
    if(!config){
      config = {};
    }
    return axios.post(url, params, config);
  }
}

