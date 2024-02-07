import Config from '../config'
import { http } from '../http'

export interface CurrenciesAPI {
  symbol: string
  name: string
  min_amount: string
  max_amount: string
  image: string
  blockchain: string
}

export function handleErrorMessage(code: number) {
  if (code === 403) {
    return 'The authentication credentials where not provided'
  } else {
    return 'Some internal error happened. Try again or, if the problem persists, contact us.'
  }
}

export async function fetchCurrencies() {
  try {
    const url = `${Config.API_URL}currencies`

    const result = await http.get<CurrenciesAPI[]>(url)

    return result
  } catch (error: any) {
    throw handleErrorMessage(error.code as number)
  }
}
