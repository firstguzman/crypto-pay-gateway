import { StackActions } from '@react-navigation/native'
import { FC, useEffect, useState } from 'react'
import { ViewStyle } from 'react-native'
import { Button, Dropdown, Screen, TextField } from '../components'

import { useGetCurrenciesList } from '../hooks/currencies/useGetCurrenciesList'
import { AppStackScreenProps } from '../navigators'
import { spacing } from '../theme'

interface CreatePaymentScreenProps
  extends AppStackScreenProps<'CreatePayment'> {}

export const CreatePaymentScreen: FC<CreatePaymentScreenProps> = ({
  navigation,
}) => {
  const [items, setItems] = useState<any[]>([])

  const [amount, setAmount] = useState<string>()
  const [currency, setCurrency] = useState<string>()
  const [notes, setNotes] = useState<string>()

  const { data, isLoading: isFetchingCurrencies } = useGetCurrenciesList()

  useEffect(() => {
    if (data.length) {
      setItems(
        data.map((element) => ({
          label: element.name,
          value: element.id,
          ...element,
        })),
      )
    }
  }, [data])

  const onSuccessAction = () => {
    navigation.dispatch(StackActions.replace('OrderSummary'))
  }

  return (
    <Screen preset="auto" safeAreaEdges={['bottom']} style={$container}>
      <TextField
        value={amount}
        onChangeText={(value) => setAmount(value)}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
        label={'Importe a pagar'}
        placeholder={'Añade importe a pagar'}
        // helper={error}
        // status={error ? "error" : undefined}
      />

      <Dropdown
        items={items}
        value={currency}
        onValueChange={setCurrency}
        label={'Seleccionar moneda'}
        placeholder={'Selecciona una moneda'}
        searchPlaceholder={'Buscar'}
        dropdownWrapperStyle={$textField}
        disabled={isFetchingCurrencies}
      />

      <TextField
        value={notes}
        onChangeText={(value) => setNotes(value)}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        label={'Concepto'}
        placeholder={'Añade descripción del pago'}
        // helper={error}
        // status={error ? "error" : undefined}
        // onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <Button
        onPress={onSuccessAction}
        onLongPress={onSuccessAction}
        text={'Continuar'}
        disabled={!amount || !currency || !notes}
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
