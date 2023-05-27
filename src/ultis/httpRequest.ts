import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getCookie, setCookie } from 'typescript-cookie'
import { ENV } from '~/config'
import { useAth } from '~/contexts'
import { Auth } from '~/types/auth.type'

interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request?: any
}

interface ApiError extends AxiosError {
  config: any
}

class Api {
  private axiosInstance: AxiosInstance
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: ENV.BASE_API,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    // request
    // add token to request
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const jwtToken: Auth = getCookie('cudotiem') && JSON.parse(getCookie('cudotiem') as string)
        if (jwtToken) {
          config.headers['Authorization'] = `Bearer ${jwtToken.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    // response
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: ApiError) => {
        if (error.response && error.response.status === 401) {
          try {
            const response = await this.axiosInstance.get('/refreshToken')
            const newToken = response.data.token

            setCookie('cudotiem', newToken)

            const originalRequest = error.config
            return this.axiosInstance(originalRequest)
          } catch (err) {
            // handle error
            return Promise.reject(error)
          }
        }
        return Promise.reject(error)
      }
    )
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<T>(url, config)
    return this.handleResponse(response)
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<T>(url, data, config)
    return this.handleResponse(response)
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<T>(url, data, config)
    return this.handleResponse(response)
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<T>(url, config)
    return this.handleResponse(response)
  }

  private handleResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: response.config,
      request: response.request
    }
  }
}

export default new Api()
