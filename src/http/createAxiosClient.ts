import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios'
import { Platform } from 'react-native'
import Config from '../config'

export function createAxiosClient(props: CreateAxiosDefaults) {
  const client = axios.create(props)

  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        // IDENTIFIER
        config.headers['X-Device-Id'] = Config.IDENTIFIER

        console.info(
          '\x1b[36m',
          `${Platform.OS.toUpperCase()} - Route: ${config.url} - Method: ${
            config.method ? config.method.toUpperCase() : 'Not specified'
          } - Headers: ${Object.keys(config.headers)}`,
        )

        return config
      } catch (error: any) {
        console.error(error.response)
        return Promise.reject(error)
      }
    },
    (error) => Promise.reject(error),
  )

  return client
}
