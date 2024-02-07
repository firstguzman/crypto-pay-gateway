import { AxiosError } from 'axios'

export interface GeneralApiProblem {
  kind: string
  scope: string
  code?: number
}

export function getGeneralApiProblem(error: AxiosError): GeneralApiProblem {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    switch (error.response.status) {
      case 403:
        return {
          kind: 'unauthorized',
          scope: 'Axios - ResponseError',
          code: error.response.status,
        }
      case 404:
        return {
          kind: 'invalid-data',
          scope: 'Axios - ResponseError',
          code: error.response.status,
        }
      case 500:
        return {
          kind: 'server',
          scope: 'Axios - ResponseError',
          code: error.response.status,
        }
      default:
        return {
          kind: 'unknown',
          scope: 'Axios - ResponseError',
          code: error.response.status,
        }
    }
  } else if (error.request) {
    // The request was made but no response was received
    switch (error.message) {
      case 'Network Error':
        return { kind: 'invalid-request', scope: 'Axios - RequestError' }
      default:
        return {
          kind: 'unknown',
          scope: 'Axios - RequestError',
        }
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    return { kind: error.message, scope: 'Axios - UnknownError' }
  }
}
