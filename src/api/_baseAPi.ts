import { store } from "@redux/store";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export default class BaseApi {
  private static isInterceptorSet = false;
  // private static isHandlingError = false;

  private static setInterceptor() {
    if (!BaseApi.isInterceptorSet) {
      axios.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: any) => {
          if (
            error.response?.status === 401 &&
            (error.response?.data?.message === "Session Expired!" ||
              error.response?.data?.message ===
                "Invalid token - decoding error" ||
              error.response?.data?.message === "Authorization token missing" ||
              error.response?.data?.message === "User not in our system" ||
              error.response?.data?.message === "Unauthorized User Access!")
          ) {
            // if (!BaseApi.isHandlingError) {
            //   BaseApi.isHandlingError = true;

            //   BaseApi.isHandlingError = false;
            //   RemoveDuplicateToast(
            //     error.response?.data?.message,
            //     "session-expired-toast",
            //   )
            // }
          }
          return Promise.reject(error);
        },
      );

      BaseApi.isInterceptorSet = true;
    }
  }

  private static mergeRequestConfig(
    config?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const baseConfig: AxiosRequestConfig = {
      baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
      headers: {},
    };

    const user = store.getState().user_store?.userInfo as any;

    const auth_token = user?.token?.access_token?.token;
    
    if (auth_token) {
      baseConfig.headers!["Authorization"] = `Bearer ${auth_token}`;
    }

    return { ...baseConfig, ...config };
  }

  static async post(url: string, body: any, config?: AxiosRequestConfig) {
    BaseApi.setInterceptor();
    const finalConfig = BaseApi.mergeRequestConfig(config);
    return axios.post(url, body, finalConfig);
  }

  static async get(url: string, config?: AxiosRequestConfig) {
    BaseApi.setInterceptor();
    const finalConfig = BaseApi.mergeRequestConfig(config);
    return axios.get(url, finalConfig);
  }

  static async patch(url: string, body: any, config?: AxiosRequestConfig) {
    BaseApi.setInterceptor();
    const finalConfig = BaseApi.mergeRequestConfig(config);
    return axios.patch(url, body, finalConfig);
  }

  static async put(url: string, body: any, config?: AxiosRequestConfig) {
    BaseApi.setInterceptor();
    const finalConfig = BaseApi.mergeRequestConfig(config);
    return axios.put(url, body, finalConfig);
  }

  static async delete(url: string, body?: any, config?: AxiosRequestConfig) {
    BaseApi.setInterceptor();
    const finalConfig = BaseApi.mergeRequestConfig(config);
    if (body) finalConfig.data = body;
    return axios.delete(url, finalConfig);
  }
}
