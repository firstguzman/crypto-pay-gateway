import React, { FC } from 'react'
import { View, ViewStyle } from 'react-native'
import { colors, spacing } from '../../theme'
import { formatDate } from '../../utils/formatDate'
import { Icon } from '../Icon'
import { Screen } from '../Screen'
import { Text } from '../Text'

const Item = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: spacing.lg,
        overflow: 'visible',
      }}
    >
      <Text preset={'h5'} style={{ textAlign: 'right' }}>
        {label}
      </Text>
      {children}
    </View>
  )
}

const Separator = () => {
  return (
    <View
      style={{ backgroundColor: colors.separator, width: '100%', height: 1 }}
    />
  )
}

export interface PaymentOverviewProps {
  fiatFormatted: string
  currencyId: string
  merchant: string
  creationDate: string
  notes: string
}

export const PaymentOverview: FC<PaymentOverviewProps> = (props) => {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={['bottom']}
      contentContainerStyle={$container}
    >
      <Item label="Importe:">
        <Text preset={'h5'}>{props.fiatFormatted}</Text>
      </Item>

      <Separator />

      <Item label="Moneda seleccionada:">
        <Text preset={'h6'} weight="bold">
          {props.currencyId}
        </Text>
      </Item>

      <Separator />

      <Item label="Comercio:">
        <View
          style={{
            flexDirection: 'row',
            gap: spacing.xxs,
            maxWidth: '65%',
            overflow: 'hidden',
          }}
        >
          <Icon icon="verify" />
          <Text preset={'h6'}>{props.merchant}</Text>
        </View>
      </Item>

      <Item label="Fecha:">
        <Text preset={'h6'} style={{ maxWidth: '50%' }}>
          {formatDate(props.creationDate)}
        </Text>
      </Item>

      <Separator />

      <Item label="Concepto:">
        <Text preset={'h6'} style={{ maxWidth: '50%' }}>
          {props.notes}
        </Text>
      </Item>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
  backgroundColor: colors.cards,
}
