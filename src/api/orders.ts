import Config from '../config'
import { http } from '../http'
import { Fiat, Status } from '../types/orders'

export interface CreateOrderAPI {
  expected_output_amount: number
  input_currency: string
  notes: string
}

export interface OrderSuccessAPI {
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

export interface Transaction {
  confirmed: boolean
  currency: string
  amount: number
  tx_hash: string
  block: number
  created_at: string
}

export interface OrderInformationAPI {
  identifier: string
  reference: string | null
  created_at: string
  edited_at: string
  status: Status
  fiat_amount: number
  crypto_amount: number
  unconfirmed_amount: number
  confirmed_amount: number
  currency_id: string
  merchant_device_id: number
  merchant_device: string
  address: string
  tag_memo: string
  url_ko: string | null
  url_ok: string | null
  url_standby: string | null
  expired_time: string
  good_fee: boolean
  notes: string
  rbf: boolean
  safe: boolean
  fiat: Fiat
  language: string
  percentage: number
  received_amount: number
  balance_based: string
  internal_data: string | null
  transactions: Transaction[]
}

export function handleErrorMessage(code: number, message?: string) {
  if (code === 403) {
    return 'The authentication credentials where not provided'
  } else if (code === 404) {
    return 'Invalid currency or minimum amount not reached. Url redirection or symbol missed. DNI Image is missed.'
  } else if (code === 429) {
    return message
  } else {
    return 'Some internal error happened. Try again or, if the problem persists, contact us.'
  }
}

export async function postOrder(payload: CreateOrderAPI) {
  try {
    const url = `${Config.API_URL}orders/`

    const result = await http.post<OrderSuccessAPI>(url, payload)

    return result
  } catch (error: any) {
    throw handleErrorMessage(error.code as number, error.message.detail)
  }
}

export async function getOrderInfo(identifier: string) {
  try {
    const url = `${Config.API_URL}orders/info/${identifier}`

    const result = await http.get<OrderInformationAPI[]>(url)

    return result
  } catch (error: any) {
    throw handleErrorMessage(error.code as number, error.message.detail)
  }
}
