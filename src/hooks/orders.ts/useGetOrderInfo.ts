import { useEffect, useState } from 'react'
import { getOrderInfo } from '../../api/orders'
import { Order } from '../../types/orders'
import { parseOrderInformationAPI } from '../../utils/parseOrderInformationAPI'

export function useGetOrderInfo(identifier: string) {
  const [data, setData] = useState<Order>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setError('')
    ;(async () => {
      try {
        const response = await getOrderInfo(identifier)

        setData(parseOrderInformationAPI(response[0]))
      } catch (error) {
        setError(error as string)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return { data, isLoading, error }
}
