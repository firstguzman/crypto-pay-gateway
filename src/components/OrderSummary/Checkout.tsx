import React, { FC, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { colors, spacing } from '../../theme'
import { Screen } from '../Screen'
import { Text } from '../Text'

export const Checkout: FC<any> = () => {
  const [qrSize, setQrSize] = useState<number>()
  return (
    <Screen
      preset="auto"
      safeAreaEdges={['bottom']}
      contentContainerStyle={$container}
    >
      <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
        <Text preset="small" weight="semiBold">
          05:08
        </Text>
      </View>

      <View
        style={{
          borderRadius: 10,
          backgroundColor: colors.background,
          aspectRatio: 1,
          alignItems: 'center',
          alignSelf: 'center',
          marginBottom: spacing.xl,
          justifyContent: 'center',
          marginHorizontal: '15%',
          padding: spacing.lg,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.16,
          shadowRadius: 1.51,
          elevation: 2,
        }}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout
          setQrSize(width - spacing.lg * 2)
        }}
      >
        <QRCode size={qrSize} value="http://awesome.link.qr" />
      </View>

      <View
        style={{
          alignItems: 'center',
          marginBottom: spacing.xl,
        }}
      >
        <View style={{ flexDirection: 'row', marginBottom: spacing.sm }}>
          <Text preset="h4" weight="semiBold">
            Enviar{' '}
            <Text preset="h4" weight="bold">
              108,02 XRP
            </Text>
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: spacing.sm }}>
          <Text preset="body" style={{ textAlign: 'center' }}>
            Xp4Lw2PtQgB7RmedTak143LrXp4Lw2PtQgB7RmedEV731CdTak143LrXp4L
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: spacing.sm }}>
          <Text
            preset="small"
            weight="semiBold"
            style={{ textAlign: 'center' }}
          >
            Etiqueta de destino: 25571 64061
          </Text>
        </View>
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
