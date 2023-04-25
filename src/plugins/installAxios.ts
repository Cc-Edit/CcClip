import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import errorCode from '@/data/errorCode';
import { Constant } from '@/data/constant';

// 初始化超时时间
const axiosInstance = axios.create({
  timeout: 30000
});
// 请求拦截，补充 accessToken
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = sessionStorage.getItem(Constant.TokenKey);
    const userId = sessionStorage.getItem(Constant.Uid);
    if (accessToken) {
      Object.assign(config.headers, {
        token: accessToken ? `${accessToken}` : '',
        uid: userId ? `${userId}` : ''
      });
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 处理响应的错误信息
 * @param error
 * @returns {Promise<never>}
 */
const handleResponseError = (error: AxiosError) => {
  if (error?.message?.includes?.('timeout')) {
    console.log('请求超时');
  } else if (error?.response?.status === 401) {
    // 状态编码为401，无权限，需要重定向到login页面
  } else if (error?.response?.status === 403) {
    // 状态编码为403，无权限，需要提示用户当前操作权限不足
    console.error('权限不足，无法执行此操作。');
  } else {
    console.log(
      errorCode?.[error?.response?.status as keyof typeof errorCode] ?? error.message ?? 'error'
    );
  }
  return Promise.reject(error);
};

/**
 * 处理响应
 * @param response
 * @returns {Promise<never>}
 */
const handleResponseSuccess = (response: AxiosResponse) => {
  const res = response.data;
  if (res?.status === 200) {
    return Promise.resolve(res.data);
  } else {
    return Promise.reject(res);
  }
};

// 响应拦截, 处理错误码和跳转拦截
axiosInstance.interceptors.response.use(
  handleResponseSuccess,
  handleResponseError
);

const request = <ResponseType = unknown>(url: string, options?: AxiosRequestConfig<unknown>): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      ...options
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};

export { axiosInstance, request };