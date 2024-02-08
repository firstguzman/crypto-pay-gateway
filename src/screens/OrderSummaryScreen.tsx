import React, { FC, useMemo } from 'react'
import {
  ActivityIndicator,
  TextStyle,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { TabBar, TabView } from 'react-native-tab-view'
import { Screen } from '../components'
import { Checkout, PaymentOverview } from '../components/OrderSummary'
import { useGetOrderInfo } from '../hooks/orders.ts/useGetOrderInfo'
import { AppStackScreenProps } from '../navigators'
import { colors, spacing, typography } from '../theme'

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
  const { data: order, isLoading } = useGetOrderInfo(identifier)

  console.log('order', order?.status)

  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'overview', title: 'Resumen del pedido' },
    { key: 'checkout', title: 'Realiza el pago' },
  ])

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
            cryptoFormatted={`${order?.cryptoAmount} ${order?.currencyId}`}
            address={order?.address || ''}
            expiredDate={order?.expiredTime || ''}
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
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  )
}

const $labelStyle: TextStyle = {
  color: colors.text,
  fontFamily: typography.primary.normal,
  textTransform: 'none',
  fontSize: 16,
}
