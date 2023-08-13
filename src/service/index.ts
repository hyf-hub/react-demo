import $Request from "./request";
import { BASE_URL, TIME_OUT } from "./config";
import { message } from "antd";
// import { AxiosRequestConfig } from 'axios'
const Request = new $Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // FIXME TS类型错误
  // @ts-ignore
  headers: undefined,
  interceptors: {
    responseInterceptorCatch: (error) => {
      console.log("requestResponseCatch", error);
    },
    responseInterceptor: (res) => {
      if (res.data?.code === 500) {
        message.error(res.data?.msg || "请求异常");
      }
      return res.data;
    },
  },
});
export default Request;
