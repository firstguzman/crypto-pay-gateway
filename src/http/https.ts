import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Config from '../config'
import { createAxiosClient } from './createAxiosClient'
import { ApiConfig, ApiGenericResponse } from './http.types'
import { getGeneralApiProblem } from './httpProblem'

/**
 * Configuring the axios instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL || '',
  timeout: 10000,
  responseType: 'json',
}

class Http {
  instance: AxiosInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.instance = createAxiosClient({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      responseType: this.config.responseType,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const resp: AxiosResponse<ApiGenericResponse> = await this.instance.get(
        url,
        config,
      )

      return resp.data as T
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw getGeneralApiProblem(error)
      }
      throw error
    }
  }

  post = async <T>(
    url: string,
    body: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    try {
      const resp: AxiosResponse<ApiGenericResponse> = await this.instance.post(
        url,
        body,
        config,
      )

      return resp.data as T
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw getGeneralApiProblem(error)
      }
      throw error
    }
  }
}

export const http = new Http()
