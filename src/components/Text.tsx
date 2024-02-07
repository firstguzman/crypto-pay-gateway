import React from 'react'
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from 'react-native'
import { colors, typography } from '../theme'

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = keyof typeof $presets

export interface TextProps extends RNTextProps {
  /**
   * The text to display if not using nested components.
   */
  text?: string
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Children components.
   */
  children?: React.ReactNode
}

export function Text(props: TextProps) {
  const { weight, size, text, children, style: $styleOverride, ...rest } = props

  const content = text || children

  const preset: Presets = props.preset ?? 'default'
  const $styles: StyleProp<TextStyle> = [
    $presets[preset],
    weight && $fontWeightStyles[weight],
    size && $sizeStyles[size],
    $styleOverride,
  ]

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  )
}

const $sizeStyles = {
  xl: { fontSize: 26, lineHeight: 40 } satisfies TextStyle,
  lg: { fontSize: 20, lineHeight: 32 } satisfies TextStyle,
  md: { fontSize: 18, lineHeight: 22 } satisfies TextStyle,
  sm: { fontSize: 16, lineHeight: 20 } satisfies TextStyle,
  xs: { fontSize: 14, lineHeight: 20 } satisfies TextStyle,
  xxs: { fontSize: 12, lineHeight: 16 } satisfies TextStyle,
}

const $fontWeightStyles = Object.entries(typography.primary).reduce(
  (acc, [weight, fontFamily]) => {
    return { ...acc, [weight]: { fontFamily } }
  },
  {},
) as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.normal,
  { color: colors.text },
]

const $presets = {
  default: $baseStyle,

  h2: [
    $baseStyle,
    $sizeStyles.xl,
    $fontWeightStyles.bold,
  ] as StyleProp<TextStyle>,

  h4: [
    $baseStyle,
    $sizeStyles.lg,
    $fontWeightStyles.bold,
  ] as StyleProp<TextStyle>,

  h5: [
    $baseStyle,
    $sizeStyles.md,
    $fontWeightStyles.bold,
  ] as StyleProp<TextStyle>,

  h6: [
    $baseStyle,
    $sizeStyles.sm,
    $fontWeightStyles.normal,
  ] as StyleProp<TextStyle>,

  body: [
    $baseStyle,
    $sizeStyles.xs,
    $fontWeightStyles.normal,
  ] as StyleProp<TextStyle>,

  small: [
    $baseStyle,
    $sizeStyles.xxs,
    $fontWeightStyles.normal,
  ] as StyleProp<TextStyle>,
}
