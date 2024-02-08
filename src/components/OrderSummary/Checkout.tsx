import { StackActions, useNavigation } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { TextStyle, View, ViewStyle } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { colors, spacing } from '../../theme'
import { copyToClipboard } from '../../utils/copyToClipboard'
import { Icon } from '../Icon'
import { Screen } from '../Screen'
import { Text } from '../Text'
import CountdownTimer from './CountdownTimer'

export interface CheckoutProps {
  paymentUri: string
  cryptoAmount: string
  currencyId: string
  address: string
  expiredDate: string
  tag: string
}

export const Checkout: FC<CheckoutProps> = (props) => {
  const [qrSize, setQrSize] = useState<number>()
  const navigation = useNavigation()

  return (
    <Screen
      preset="auto"
      safeAreaEdges={['bottom']}
      contentContainerStyle={$container}
    >
      <View style={$countDownContainer}>
        <Icon icon="timer" />
        <CountdownTimer
          endDate={props.expiredDate}
          onCountDownEnd={() =>
            navigation.dispatch(StackActions.replace('CreatePayment'))
          }
        />
      </View>

      <View
        style={$qrWrapper}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout
          setQrSize(width - spacing.lg * 2)
        }}
      >
        <QRCode size={qrSize} value={props.paymentUri} />
      </View>

      <View style={$informationContainer}>
        <View style={$row}>
          <Text preset="h4" weight="semiBold">
            Enviar{' '}
            <Text preset="h4" weight="bold" style={$nestedText}>
              {`${props.cryptoAmount} ${props.currencyId}`}
            </Text>
          </Text>
          <Icon
            icon="copy"
            onPress={() => copyToClipboard(props.cryptoAmount)}
          />
        </View>

        <View style={$row}>
          <Text preset="body" style={$nestedText}>
            {props.address}
          </Text>
          <Icon icon="copy" onPress={() => copyToClipboard(props.address)} />
        </View>

        {!!props.tag && (
          <View style={$row}>
            <Icon icon="warning" />
            <Text
              preset="small"
              weight="semiBold"
              style={{ textAlign: 'center' }}
            >
              {`Etiqueta de destino: ${props.tag}`}
            </Text>
            <Icon icon="copy" onPress={() => copyToClipboard(props.tag)} />
          </View>
        )}
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
  backgroundColor: colors.cards,
  paddingTop: spacing.lg,
}

const $countDownContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: spacing.xl,
  justifyContent: 'center',
  gap: spacing.xxs,
}

const $qrWrapper: ViewStyle = {
  borderRadius: 10,
  backgroundColor: colors.background,
  aspectRatio: 1,
  alignItems: 'center',
  alignSelf: 'center',
  marginBottom: spacing.xl,
  justifyContent: 'center',
  padding: spacing.lg,
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.16,
  shadowRadius: 1.51,
  elevation: 2,
}

const $informationContainer: ViewStyle = {
  alignItems: 'center',
  marginBottom: spacing.xl,
}

const $row: ViewStyle = {
  flexDirection: 'row',
  marginBottom: spacing.sm,
  alignItems: 'center',
  gap: spacing.xs,
}

const $nestedText: TextStyle = { textAlign: 'center', maxWidth: '80%' }
