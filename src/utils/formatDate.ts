import { NativeModules, Platform } from 'react-native'

export const formatDate = (dateString: string) => {
  const inputDate = new Date(dateString)
  let LOCALE = ''
  if (Platform.OS === 'android') {
    LOCALE = NativeModules.I18nManager.localeIdentifier
  } else {
    LOCALE =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
  }

  const formattedDate = `${inputDate.toLocaleDateString(
    LOCALE.replace('_', '-'),
  )} ${inputDate.toLocaleTimeString(LOCALE.replace('_', '-'), {
    hour: '2-digit',
    minute: '2-digit',
  })}`

  return formattedDate
}
