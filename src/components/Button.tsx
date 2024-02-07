import React from 'react'
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native'
import { colors, spacing } from '../theme'
import { Text, TextProps } from './Text'

type Presets = keyof typeof $viewPresets

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * The text to display if not using nested components.
   */
  text?: TextProps['text']
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * Display Activity indicator instead Text.
   */
  isLoading?: boolean
  /**
   * Children components.
   */
  children?: React.ReactNode
}

export function Button(props: ButtonProps) {
  const {
    text,
    style: $viewStyleOverride,
    textStyle: $textStyleOverride,
    children,
    disabled,
    isLoading,
    ...rest
  } = props

  const preset: Presets = props.preset ?? 'default'
  const $viewStyle = [
    $viewPresets[preset],
    $viewStyleOverride,
    disabled && { backgroundColor: colors.disabled },
  ]

  return (
    <TouchableOpacity
      style={$viewStyle}
      accessibilityRole="button"
      disabled={disabled}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.texOnBackgroundPrimary} />
      ) : (
        <Text
          text={text}
          preset="h6"
          style={{ color: colors.texOnBackgroundPrimary }}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const $baseViewStyle: ViewStyle = {
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.lg,
  overflow: 'hidden',
}

const $viewPresets = {
  default: [
    $baseViewStyle,
    {
      backgroundColor: colors.backgroundPrimary,
    },
  ] as StyleProp<ViewStyle>,
}
