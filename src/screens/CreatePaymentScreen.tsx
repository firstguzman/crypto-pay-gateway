import { FC } from 'react'
import { Text } from 'react-native'
import { Screen } from '../components'

export const CreatePaymentScreen: FC<any> = () => {
  return (
    <Screen preset="fixed" safeAreaEdges={['bottom']}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </Screen>
  )
}
