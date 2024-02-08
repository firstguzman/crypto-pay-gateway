import { useEffect, useState } from 'react'
import { OrderInformationAPI } from '../../api/orders'
import Config from '../../config'
import { Order } from '../../types/orders'
import { parseOrderInformationAPI } from '../../utils/parseOrderInformationAPI'

interface WebsocketMessage {
  data: string
  isTrusted: boolean
}

export function useGetUpdatesOfOrderInformation(
  dependencies: any[],
  identifier?: string,
) {
  const [messageReceived, setMessageReceived] = useState<Order>()

  useEffect(() => {
    if (identifier) {
      const ws = new WebSocket(`${Config.WS_URL}${identifier}`)

      ws.onmessage = (e: WebsocketMessage) => {
        const orderInformation: OrderInformationAPI = JSON.parse(e.data)

        setMessageReceived(parseOrderInformationAPI(orderInformation))
      }

      return () => {
        ws.close()
      }
    }
  }, dependencies)

  return { messageReceived }
}
