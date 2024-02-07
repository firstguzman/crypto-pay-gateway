export interface ApiGenericResponse {
  data: any
  status: number
  statusTex?: string
}

/**
 * The options used to configure axios.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we time out the request.
   */
  timeout: number

  /**
   * indicates the type of data that the server will respond with
   */
  responseType: 'arraybuffer' | 'document' | 'json' | 'text' | 'stream'
}
