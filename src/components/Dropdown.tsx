import React, { SetStateAction, useState } from 'react'
import {
  Image,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import DropDownPicker, {
  RenderListItemPropsInterface,
} from 'react-native-dropdown-picker'
import { colors, spacing, typography } from '../theme'
import { Currencies } from '../types/currencies'
import { Icon } from './Icon'
import { Text, TextProps } from './Text'

DropDownPicker.setListMode('MODAL')

export interface DropdownProps {
  /**
   * Specifies the value of the selected item.
   */
  value: any
  /**
   * Function to be executed to change selected value.
   */
  onValueChange: (callback: SetStateAction<any>) => void
  /**
   * Variable that holds the items.
   */
  items: any[]
  /**
   * The label text to display.
   */
  label?: TextProps['text']
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps
  /**
   * Style overrides for the dropdown container
   */
  dropdownWrapperStyle?: StyleProp<ViewStyle>
  /**
   * The placeholder text to display.
   */
  placeholder?: TextProps['text']
  /**
   * The placeholder text to display in search abr.
   */
  searchPlaceholder?: TextProps['text']
  /**
   * State to input disable or not
   */
  disabled?: boolean
}

export function Dropdown(props: DropdownProps) {
  const {
    value,
    items,
    label,
    placeholder,
    searchPlaceholder,
    disabled,
    LabelTextProps,
    onValueChange,
    dropdownWrapperStyle: $dropdownWrapperStyleOverride,
  } = props
  const [open, setOpen] = useState(false)

  const $labelStyles = [$labelStyle, LabelTextProps?.style]

  const $dropdownWrapperStyles = [
    $dropdownWrapperStyle,
    $dropdownWrapperStyleOverride,
  ]

  return (
    <>
      {!!label && (
        <View style={$labelStyles}>
          <Text preset="body" weight="bold" text={label} {...LabelTextProps} />
          <Icon icon="infoCircle" />
        </View>
      )}

      <DropDownPicker
        searchable
        disabled={disabled}
        modalAnimationType="slide"
        CloseIconComponent={() => <Icon icon="close" />}
        ArrowDownIconComponent={() => <Icon icon="arrowDown" />}
        ArrowUpIconComponent={() => <></>}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={onValueChange}
        style={$dropdownWrapperStyles}
        dropDownContainerStyle={$dropdownWrapperStyles}
        placeholder={placeholder}
        placeholderStyle={{ color: colors.textDim }}
        textStyle={$inputStyle}
        searchContainerStyle={{ borderBottomWidth: 0 }}
        searchTextInputStyle={$searchInputStyle}
        searchPlaceholder={searchPlaceholder}
        searchPlaceholderTextColor={colors.textDim}
        closeAfterSelecting={true}
        renderListItem={(props: RenderListItemPropsInterface<Currencies>) => {
          return (
            <TouchableOpacity
              style={{
                paddingVertical: spacing.xs,
                paddingHorizontal: spacing.sm,
                flexDirection: 'row',
                gap: spacing.sm,
                alignItems: 'center',
              }}
              onPress={() => props.onPress(props.item)}
            >
              <View>
                <Image
                  source={{ uri: props.item.imageURL }}
                  style={{ width: 36, height: 36 }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text preset="body" weight="bold">
                  {label}
                </Text>
                <Text preset="small">{props.item.symbol}</Text>
              </View>
              {props.isSelected ? (
                <Icon icon="tickCircle" />
              ) : (
                <Icon icon="arrowRight" />
              )}
            </TouchableOpacity>
          )
        }}
      />
    </>
  )
}

const $labelStyle: TextStyle = {
  marginBottom: spacing.xxs,
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.xxs,
}

const $dropdownWrapperStyle: ViewStyle = {
  borderWidth: 1,
  borderRadius: 6,
  backgroundColor: colors.background,
  borderColor: colors.border,
  minHeight: 0,
}

const $inputStyle: TextStyle = {
  flex: 1,
  alignSelf: 'stretch',
  fontFamily: typography.primary.normal,
  color: colors.text,
  fontSize: 16,
  height: 24,
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: spacing.xs,
}

const $searchInputStyle: TextStyle = {
  fontFamily: typography.primary.normal,
  color: colors.textDim,
  fontSize: 14,
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderWidth: 1,
  borderRadius: 6,
  height: 'auto',
  backgroundColor: colors.background,
  borderColor: colors.border,
  overflow: 'hidden',
  marginVertical: 0,
  marginBottom: 0,
}
