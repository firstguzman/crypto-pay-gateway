import { useEffect, useState } from 'react'
import { CurrenciesAPI, fetchCurrencies } from '../../api/currencies'
import { Currencies } from '../../types/currencies'

function parseCurrenciesAPI(currenciesList: CurrenciesAPI[]): Currencies[] {
  return currenciesList.map((currency, index) => ({
    ...currency,
    minAmount: currency.min_amount,
    maxAmount: currency.max_amount,
    imageURL: currency.image,
    id: index + 1,
  }))
}

export function useGetCurrenciesList() {
  const [data, setData] = useState<Currencies[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setError('')
    ;(async () => {
      try {
        const response = await fetchCurrencies()
        setData(parseCurrenciesAPI(response))
      } catch (error) {
        setError(error as string)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return { data, isLoading, error }
}
