import React, { FC, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  TextStyle,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { TabBar, TabView } from 'react-native-tab-view'
import { Modal, Screen } from '../components'
import { Checkout, PaymentOverview } from '../components/OrderSummary'
import { useGetOrderInfo } from '../hooks/orders.ts/useGetOrderInfo'

import { useNavigation } from '@react-navigation/native'
import { useGetUpdatesOfOrderInformation } from '../hooks/orders.ts/useGetUpdatesOfOrderInformation'
import { AppStackScreenProps } from '../navigators'
import { colors, spacing, typography } from '../theme'
import { Order, Status } from '../types/orders'

const LoadingPlaceholder = () => {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={['bottom']}
      contentContainerStyle={$container}
    >
      <ActivityIndicator size={'large'} color={colors.backgroundPrimary} />
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
  backgroundColor: colors.cards,
  justifyContent: 'center',
}

interface OrderSummaryScreenProps extends AppStackScreenProps<'OrderSummary'> {}

export const OrderSummaryScreen: FC<OrderSummaryScreenProps> = ({ route }) => {
  const identifier = useMemo(() => route.params.identifier, [route])
  const paymentUri = useMemo(() => route.params.paymentUri, [route])
  const { data: order, isLoading } = useGetOrderInfo(identifier)

  const layout = useWindowDimensions()
  const navigation = useNavigation()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'overview', title: 'Resumen del pedido' },
    { key: 'checkout', title: 'Realiza el pago' },
  ])
  const [modalState, setModalState] = useState<{
    open: boolean
    preset: 'success' | 'error'
  }>({ open: false, preset: 'success' })

  const { messageReceived } = useGetUpdatesOfOrderInformation(
    [order],
    order?.identifier,
  )

  const handleMessageReceived = (message: Order) => {
    if (message?.status === Status.EX || message?.status === Status.OC) {
      setModalState({ open: true, preset: 'error' })
      return
    }
    if (message?.status === Status.CO || message?.status === Status.AC) {
      setModalState({ open: true, preset: 'success' })
      return
    }
  }

  const createAnotherOrder = () => {
    setModalState({ ...modalState, open: false })
    navigation.goBack()
  }

  useEffect(() => {
    if (messageReceived !== undefined) {
      handleMessageReceived(messageReceived)
    }
  }, [messageReceived])

  const renderScene = ({
    route,
  }: {
    route: { key: string; title: string }
  }) => {
    switch (route.key) {
      case 'overview':
        return isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <PaymentOverview
            fiatFormatted={`${order?.fiatAmount} ${order?.fiat}`}
            currencyId={order?.currencyId || ''}
            merchant={order?.merchantDevice || ''}
            creationDate={order?.creationDate || ''}
            notes={order?.notes || ''}
          />
        )
      case 'checkout':
        return isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <Checkout
            paymentUri={paymentUri}
            cryptoAmount={order?.cryptoAmount.toString() || ''}
            currencyId={order?.currencyId || ''}
            address={order?.address || ''}
            expiredDate={order?.expiredTime || ''}
            tag={order?.tagMemo || ''}
            onTimeExpired={() => setModalState({ open: true, preset: 'error' })}
          />
        )
    }
  }

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.backgroundPrimary }}
      style={{ backgroundColor: colors.background }}
      labelStyle={$labelStyle}
    />
  )

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />

      <Modal
        animationType="fade"
        visible={modalState.open}
        preset={modalState.preset}
        title="Pago completado"
        description="Lorem ipsum dolor sit amet consectetur. Laoreet blandit auctor et varius dolor elit facilisi enim. Nulla ut ut eu nunc."
        buttonActionText="Crear nuevo pago"
        onPress={createAnotherOrder}
      />
    </>
  )
}

const $labelStyle: TextStyle = {
  color: colors.text,
  fontFamily: typography.primary.normal,
  textTransform: 'none',
  fontSize: 16,
}
