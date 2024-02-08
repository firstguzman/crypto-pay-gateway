import { OrderInformationAPI } from '../api/orders'
import { Order } from '../types/orders'

export function parseOrderInformationAPI(
  orderInfo: OrderInformationAPI,
): Order {
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
    tagMemo: orderInfo.tag_memo,
  }
}
