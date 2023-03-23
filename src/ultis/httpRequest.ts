import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosRequestTransformer,
} from "axios";

interface InternalAxiosRequestConfig extends AxiosRequestConfig {
  headers: {
    Authorization?: string;
  };
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

class Api {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_SERVICE_URL,
    });

    //Add Authorization header to request
    const requestTransformer: AxiosRequestTransformer = (data, headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      return data;
    };
    //The requestTransformer function will be called every time a request is made using this instance of axios.
    this.axiosInstance.defaults.transformRequest = [requestTransformer];

    //before take response
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.axiosInstance(originalRequest));
              });
            });
          }
          originalRequest._retry = true;
          this.isRefreshing = true;

          return new Promise((resolve, reject) => {
            const token = localStorage.getItem("refresh_token");
            this.axiosInstance
              .post<TokenResponse>("/refresh_token", { refresh_token: token })
              .then((response) => {
                localStorage.setItem("token", response.data.access_token);
                localStorage.setItem(
                  "refresh_token",
                  response.data.refresh_token
                );

                this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
                originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

                this.refreshSubscribers.forEach((callback) =>
                  callback(response.data.access_token)
                );
                this.refreshSubscribers = [];

                resolve(this.axiosInstance(originalRequest));
              })
              .catch((error) => {
                this.refreshSubscribers = [];
                reject(error);
              })
              .finally(() => {
                this.isRefreshing = false;
              });
          });
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

export default new Api();
