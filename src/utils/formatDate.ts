import { NativeModules, Platform } from 'react-native'

const LOCALE = Platform.select({
  ios:
    NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0],
  android: NativeModules.I18nManager.localeIdentifier,
})

export const formatDate = (dateString: string) => {
  const inputDate = new Date(dateString)

  const formattedDate = `${inputDate.toLocaleDateString(
    LOCALE.replace('_', '-'),
  )} ${inputDate.toLocaleTimeString(LOCALE.replace('_', '-'), {
    hour: '2-digit',
    minute: '2-digit',
  })}`

  return formattedDate
}
