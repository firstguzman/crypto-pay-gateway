// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import {
  Mulish_700Bold as mulishBold,
  Mulish_300Light as mulishLight,
  Mulish_500Medium as mulishMedium,
  Mulish_400Regular as mulishRegular,
  Mulish_600SemiBold as mulishSemiBold,
} from '@expo-google-fonts/mulish'

export const customFontsToLoad = {
  mulishLight,
  mulishRegular,
  mulishMedium,
  mulishSemiBold,
  mulishBold,
}

const fonts = {
  mulish: {
    light: 'mulishLight',
    normal: 'mulishRegular',
    medium: 'mulishMedium',
    semiBold: 'mulishSemiBold',
    bold: 'mulishBold',
  },
}

export const typography = {
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.mulish,
}
