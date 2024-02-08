import { useEffect, useState } from 'react'

import { OrderInformationAPI, getOrderInfo } from '../../api/orders'
import { Order } from '../../types/orders'

function parseOrderInformationAPI(orderInfo: OrderInformationAPI): Order {
  return {
    address: orderInfo.address,
    cryptoAmount: orderInfo.crypto_amount,
    currencyId: orderInfo.currency_id,
    expiredTime: orderInfo.expired_time,
    fiat: orderInfo.fiat,
    fiatAmount: orderInfo.fiat_amount,
    identifier: orderInfo.identifier,
    merchantDevice: orderInfo.merchant_device,
    notes: orderInfo.notes,
    status: orderInfo.status,
    creationDate: orderInfo.created_at,
  }
}

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
