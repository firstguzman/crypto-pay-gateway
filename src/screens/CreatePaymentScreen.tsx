import { FC, useEffect, useState } from 'react'
import { ViewStyle } from 'react-native'
import { Button, Dropdown, Screen, TextField } from '../components'

import { StackActions } from '@react-navigation/native'
import { useGetCurrenciesList } from '../hooks/currencies/useGetCurrenciesList'
import { useCreateOrder } from '../hooks/orders.ts/useCreateOrder'
import { AppStackScreenProps } from '../navigators'
import { spacing } from '../theme'
import { Currencies } from '../types/currencies'

interface CreatePaymentScreenProps
  extends AppStackScreenProps<'CreatePayment'> {}

export const CreatePaymentScreen: FC<CreatePaymentScreenProps> = ({
  navigation,
}) => {
  const [amount, setAmount] = useState<string>()
  const [currency, setCurrency] = useState<Currencies>()
  const [notes, setNotes] = useState<string>('')

  const [amountError, setAmountError] = useState<string>('')

  const {
    data,
    isLoading: isFetchingCurrencies,
    error: currenciesError,
  } = useGetCurrenciesList()
  const { createOrder, isLoading, error } = useCreateOrder()

  useEffect(() => {
    if (data.length) {
      setCurrency(data[0])
    }
  }, [data])

  const checkCurrencyLimits = () => {
    if (currency === undefined) return

    const floatAmount = parseFloat(amount as string)

    return (
      parseFloat(currency.minAmount) <= floatAmount &&
      floatAmount <= parseFloat(currency.maxAmount)
    )
  }

  const create = async () => {
    if (currency === undefined) return
    const isAmountValid = checkCurrencyLimits()

    if (!isAmountValid) {
      setAmountError(
        `El rango de importe permtido para la moneda seleccionada es de ${currency.minAmount} a ${currency.maxAmount} `,
      )
      return
    }

    const response = await createOrder(
      parseFloat(amount as string),
      currency.blockchain,
      notes,
    )

    if (response) {
      navigation.dispatch(
        StackActions.replace('OrderSummary', {
          identifier: response.identifier,
          paymentUri: response.payment_uri,
        }),
      )
    }
  }

  return (
    <Screen preset="auto" safeAreaEdges={['bottom']} style={$container}>
      <TextField
        value={amount}
        onChangeText={(value) => {
          setAmountError('')
          setAmount(value)
        }}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
        label={'Importe a pagar'}
        placeholder={'Añade importe a pagar'}
        helper={amountError}
        status={amountError ? 'error' : undefined}
      />

      <Dropdown
        value={currency}
        containerStyle={$textField}
        label="Seleccionar moneda"
        searchModalTitle="Seleccionar moneda"
        searchPlaceholder="Buscar"
        items={data}
        onValueChange={setCurrency}
        disabled={!isFetchingCurrencies}
        helper={currenciesError}
        error={Boolean(currenciesError.length)}
      />

      <TextField
        value={notes}
        onChangeText={(value) => setNotes(value)}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        label={'Concepto'}
        placeholder={'Añade descripción del pago'}
        maxLength={512}
      />

      <Button
        onPress={create}
        onLongPress={create}
        text={'Continuar'}
        disabled={!amount || !currency || !notes}
        isLoading={isLoading}
      />
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.md,
  paddingTop: spacing.lg,
}

const $textField: ViewStyle = {
  marginBottom: spacing.xl,
}
