const palette: Record<string, string> = {
  neutralWhite: 'rgba(245, 245, 245, 1)',
  neutral3: 'rgba(229, 233, 242, 1)',
  neutral4: 'rgba(100, 113, 132, 1)',
  neutral5: 'rgba(192, 204, 218, 1)',
  neutralBlack: 'rgba(0, 0, 0, 1)',

  primaryDarker: 'rgba(3, 90, 197, 1)',
  primaryLighter: 'rgba(3, 90, 197, 1)',
  primaryBrilliant: 'rgba(4, 101, 221, 1)',

  secondaryDarker: 'rgba(21, 187, 224, 1)',

  accentYellow: 'rgba(234, 179, 8, 1)',
  accentGreen: 'rgba(22, 163, 74, 1)',
  accentRed: 'rgba(220, 38, 38, 1)',
} as const

export const colors = {
  palette,

  transparent: 'rgba(0, 0, 0, 0)',

  text: palette.primaryDarker,

  textDim: palette.neutral4,

  texOnBackgroundPrimary: palette.neutralWhite,

  background: palette.neutralWhite,

  backgroundPrimary: palette.primaryDarker,

  border: palette.neutral5,

  separator: palette.neutral5,

  error: palette.accentRed,

  warning: palette.accentYellow,

  success: palette.accentGreen,
}
