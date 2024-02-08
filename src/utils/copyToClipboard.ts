import * as Clipboard from 'expo-clipboard'

export const copyToClipboard = async (value: string) => {
  await Clipboard.setStringAsync(value)
}
