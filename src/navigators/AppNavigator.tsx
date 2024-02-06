import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import React from 'react'
import { useColorScheme } from 'react-native'
import Config from '../config'
import * as Screens from '../screens'
import { colors } from '../theme'
import { navigationRef, useBackButtonHandler } from './navigationUtilities'

export type AppStackParamList = {
  CreatePayment: undefined
  OrderSummary: undefined
}

// /**
//  * This is a list of all the route names that will exit the app if the back button
//  * is pressed while in that screen. Only affects Android.
//  */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
      }}
    >
      <Stack.Screen
        name="CreatePayment"
        component={Screens.CreatePaymentScreen}
      />
      <Stack.Screen
        name="OrderSummary"
        component={Screens.OrderSummaryScreen}
      />
    </Stack.Navigator>
  )
}

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = () => {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <AppStack />
    </NavigationContainer>
  )
}
