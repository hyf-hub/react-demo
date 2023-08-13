// $axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
// import route from "@/router";
import router from "@/router/browserRouter";
import { getCache } from "@/utils";
import { Loading } from "@/utils/react/loading/loading";
import { message } from "antd";
import axios, { AxiosInstance } from "axios";
import { RequestConfig, RequestInterceptors } from "types/axios";
// import store from '@/store'
// import throttle from 'lodash/throttle'
// 避免太频繁的弹窗
// const ElMessage = throttle(_ElMessage, 1000)
class Request {
  instance: AxiosInstance;
  interceptors?: RequestInterceptors;
  showLoading = false;
  loading = new Loading();
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    // this.showLoading = config.showLoading ?? true
    // 全局的请求拦截
    this.instance.interceptors.request.use(
      (config: RequestConfig) => {
        if (config.isFormData) {
          config.transformRequest = [
            function (data) {
              let ret = "";
              for (const it in data) {
                ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
              }
              ret = ret.substring(0, ret.lastIndexOf("&"));
              return ret;
            },
          ];
        }
        // 对GET方法的请求参数重新编码
        if (String(config.method).toUpperCase() === "GET" && config.params) {
          let url = config.url + "?";
          for (const propName of Object.keys(config.params)) {
            const value = config.params[propName];
            // 对字段名编码
            const part = encodeURIComponent(propName) + "=";
            // 如果字段值不为空
            if (value !== null && typeof value !== "undefined") {
              // 如果字段值为对象
              if (typeof value === "object") {
                for (const key of Object.keys(value)) {
                  if (value[key] !== null && typeof value[key] !== "undefined") {
                    const params = propName + "[" + key + "]";
                    const subPart = encodeURIComponent(params) + "=";
                    url += subPart + encodeURIComponent(value[key]) + "&";
                  }
                }
              } else {
                url += part + encodeURIComponent(value) + "&";
              }
            }
          }
          url = url.slice(0, -1);
          config.params = {};
          config.url = url;
        }
        return config;
      },
      (err) => {
        console.log("全局request失败拦截");
        return err;
      },
    );
    // 全局的响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();
        const { code } = res.data;
        // token 过期
        if (code === 401) {
          message.warning({ content: "请重新登录" });
          router.navigate("/login");

          return res;
        }
        // 错误会提示对应的msg
        // if (code === 500) {
        //   ElMessage({ message: '服务异常！', type: 'error' })
        // }
        return res;
      },
      (err) => {
        message.warning({ content: "请重新登录" });
        // route.replace("/login");
        const content = /timeout/.test(String(err))
          ? "连接超时,请稍后再试!"
          : "服务器异常,请稍后再试";
        message.error({ content });
        this.loading?.close();
        return err;
      },
    );
    this.hook();
  }
  request<T = any>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 默认显示loading
      this.showLoading = config.showLoading ?? true;
      // 默认是携带token的
      const isToken = config.isToken ?? true;
      if (isToken) {
        config.headers = config.headers ?? {};
        config.headers.token = getCache("token");
      }
      // 是否添加Loading
      if (this.showLoading) {
        // const loading = <Spin></Spin>;
        // document.body.appendChild(loading);
        // this.loading = Spin().service({
        //   // lock: true,
        //   text: "加载中",
        //   background: "transparent",
        //   // target: document.getElementById('appHome')
        // });
        this.loading.show();
      }
      // 单个request的拦截
      if (config.interceptors?.requestInterceptor) {
        // 这里拦截单个request的请求时 将config传过去 在单个请求函数返回需要修改的config 然后再传给实例
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then((response) => {
          // 如果单个请求有响应拦截
          if (config.interceptors?.requestInterceptor) {
            if (config.interceptors?.responseInterceptor) {
              response = config.interceptors?.responseInterceptor(response);
            }
          }
          resolve(response);
        })
        .catch((error) => {
          console.warn("请求失败", error);
          reject(error);
        });
    });
  }
  get<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }
  delete<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }
  put<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PUT" });
  }
  hook() {
    // 实列的拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );
  }
}
export default Request;
