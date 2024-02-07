import Config from '../config'
import { http } from '../http'

enum Fiat {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
  ARS = 'ARS',
  AUD = 'AUD',
  BGN = 'BGN',
  BOB = 'BOB',
  BRL = 'BRL',
  CAD = 'CAD',
  CHF = 'CHF',
  CLP = 'CLP',
  COP = 'COP',
  DKK = 'DKK',
  DOP = 'DOP',
  GEL = 'GEL',
  HUF = 'HUF',
  ISK = 'ISK',
  JPY = 'JPY',
  KRW = 'KRW',
  MXN = 'MXN',
  NOK = 'NOK',
  NZD = 'NZD',
  PEN = 'PEN',
  PLN = 'PLN',
  PYG = 'PYG',
  RON = 'RON',
  SEK = 'SEK',
  SGD = 'SGD',
  SVC = 'SVC',
  UYU = 'UYU',
}

export interface CreateOrderAPI {
  expected_output_amount: number
  input_currency: string
  notes: string
}

export interface OrderSuccessResponse {
  identifier: string
  reference: string
  payment_uri: string
  web_url: string
  address: string
  tag_memo: string
  input_currency: string
  expected_input_amount: number
  rate: number
  notes: string
  fiat: Fiat
  language: string
}

export function handleErrorMessage(code: number) {
  if (code === 403) {
    return 'The authentication credentials where not provided'
  } else if (code === 404) {
    return 'Invalid currency or minimum amount not reached. Url redirection or symbol missed. DNI Image is missed.'
  } else {
    return 'Some internal error happened. Try again or, if the problem persists, contact us.'
  }
}

export async function postOrder(payload: CreateOrderAPI) {
  try {
    const url = `${Config.API_URL}orders/`

    const result = await http.post<OrderSuccessResponse>(url, payload)

    return result
  } catch (error: any) {
    throw handleErrorMessage(error.code as number)
  }
}
