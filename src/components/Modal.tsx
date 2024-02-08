import React from 'react'
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  View,
  ViewStyle,
} from 'react-native'
import CloseCircle from '../../assets/illustrations/CloseCircle'
import TickCircle from '../../assets/illustrations/TickCircle'
import { colors, spacing } from '../theme'
import { Button } from './Button'
import { Text } from './Text'

type Presets = keyof typeof $presets

export interface ModalProps extends RNModalProps {
  /**
   * A string representing the title of the modal.
   */
  title?: string
  /**
   * A string representing the description or content of the modal.
   */
  description?: string
  /**
   * A string representing the text for the button action in the modal.
   */
  buttonActionText?: string
  /**
   * A value from the Presets enum that represents a preset icon for the modal.
   */
  preset?: Presets
  /**
   * A callback function that is called when the button in the modal is pressed.
   */
  onPress?: () => void
}

export function Modal(props: ModalProps) {
  const { title, description, buttonActionText, onPress } = props

  const preset: Presets = props.preset ?? 'success'

  const Illustration = $presets[preset]

  return (
    <RNModal transparent={true} {...props}>
      <View style={$modalContainerStyle}>
        <View style={$modalContentStyle}>
          <View style={{ gap: spacing.sm, alignItems: 'center' }}>
            <Illustration />
            <Text preset="h4" text={title} style={{ textAlign: 'center' }} />
            <Text
              preset="body"
              text={description}
              style={{ textAlign: 'center' }}
            />
          </View>

          <Button
            text={buttonActionText}
            onPress={onPress}
            onLongPress={onPress}
          />
        </View>
      </View>
    </RNModal>
  )
}

const $presets = {
  success: TickCircle,
  error: CloseCircle,
}

const $modalContainerStyle: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
}

const $modalContentStyle: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: spacing.md,
  padding: spacing.xl,
  borderColor: colors.border,
  width: '85%',
  height: '45%',
  justifyContent: 'space-between',
  shadowColor: colors.palette.neutralBlack,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.16,
  shadowRadius: 1.51,
  elevation: 4,
}
