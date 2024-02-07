import React, { FC } from 'react'
import { View, ViewStyle } from 'react-native'
import { colors, spacing } from '../../theme'
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

export const PaymentOverview: FC<any> = () => {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={['bottom']}
      contentContainerStyle={$container}
    >
      <Item label="Importe:">
        <Text preset={'h5'}>56,06 EUR</Text>
      </Item>

      <Separator />

      <Item label="Moneda seleccionada:">
        <Text preset={'h6'} weight="bold">
          XRP
        </Text>
      </Item>

      <Separator />

      <Item label="Comercio:">
        <Text preset={'h6'} style={{ maxWidth: '50%' }}>
          Comercio de pruebas de Semega
        </Text>
      </Item>

      <Item label="Fecha:">
        <Text preset={'h6'} style={{ maxWidth: '50%' }}>
          21/01/2022 08:52
        </Text>
      </Item>

      <Separator />

      <Item label="Concepto:">
        <Text preset={'h6'} style={{ maxWidth: '50%' }}>
          Viajes & Ocio
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
