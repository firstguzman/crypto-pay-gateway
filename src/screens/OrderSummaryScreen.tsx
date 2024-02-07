import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import { colors, spacing, typography } from '../theme'

import { useWindowDimensions } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { Checkout, PaymentOverview } from '../components/OrderSummary'

const renderScene = SceneMap({
  first: PaymentOverview,
  second: Checkout,
})

export const OrderSummaryScreen: FC<any> = () => {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Resumen del pedido' },
    { key: 'second', title: 'Realiza el pago' },
  ])

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.backgroundPrimary }}
      style={{ backgroundColor: colors.background }}
      labelStyle={{
        color: colors.text,
        fontFamily: typography.primary.normal,
        textTransform: 'none',
        fontSize: 16,
      }}
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

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.lg,
}
