import { useState } from 'react'
import { postOrder } from '../../api/orders'

export function useCreateOrder() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const createOrder = async (
    amount: number,
    currency: string,
    notes: string,
  ) => {
    try {
      setIsLoading(true)
      const orderResult = await postOrder({
        expected_output_amount: amount,
        input_currency: currency,
        notes: notes,
      })
      return orderResult
    } catch (error) {
      setError(error as string)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { createOrder, isLoading, error }
}
