import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig<T>) => InternalAxiosRequestConfig<T>;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
interface RequestConfig<T = AxiosResponse>
  extends InternalAxiosRequestConfig,
    Omit<InternalAxiosRequestConfig, "headers"> {
  interceptors?: RequestInterceptors<T>;
  showLoading?: boolean;
  isFormData?: boolean;
  isToken?: boolean;
  headers?: any;
}
interface CallbackConfig extends InternalAxiosRequestConfig<any>, RequestConfig {}
