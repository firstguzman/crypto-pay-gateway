import React, { SetStateAction, useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  Modal,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { spacing } from '../theme'
import { Icon } from './Icon'
import { Screen } from './Screen'
import { Text, TextProps } from './Text'
import { TextField } from './TextField'

export interface DropdownProps {
  /**
   * Specifies the value of the selected item.
   */
  value: any
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * The label text to display.
   */
  label?: TextProps['text']
  /**
   * The label text to display.
   */
  searchModalTitle?: TextProps['text']
  /**
   * The placeholder text to display in search abr.
   */
  searchPlaceholder?: TextProps['text']
  /**
   * Variable that holds the items.
   */
  items: any[]
  /**
   * Function to be executed to change selected value.
   */
  onValueChange: (callback: SetStateAction<any>) => void
  /**
   * State to input disable or not
   */
  disabled?: boolean
  /**
   * To change style when error is presented
   */
  error?: boolean
  /**
   * The helper text to display.
   */
  helper?: TextProps['text']
}

export function Dropdown(props: DropdownProps) {
  const {
    value,
    containerStyle,
    label,
    searchModalTitle,
    searchPlaceholder,
    items,
    onValueChange,
    disabled,
    error,
    helper,
  } = props
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [filteredValues, setFilteredValues] = useState<any>(items)

  useEffect(() => {
    setFilteredValues(items)
  }, [items])

  useEffect(() => {
    setFilteredValues(items.filter((element) => element.name.includes(search)))
  }, [search])

  return (
    <>
      <TextField
        infoIndicator
        value={value?.name}
        label={label}
        containerStyle={containerStyle}
        RightAccessory={(props) => (
          <Icon icon="arrowDown" containerStyle={props.style} />
        )}
        LeftAccessory={(props) => (
          <Image
            source={{ uri: value?.imageURL }}
            style={[props.style, { aspectRatio: 1 }]}
          />
        )}
        onPress={() => setOpen(true)}
        editable={disabled}
        status={error ? 'error' : undefined}
        helper={helper}
      />
      <Modal visible={open} animationType="slide">
        <Screen
          safeAreaEdges={['top', 'bottom']}
          contentContainerStyle={$modalContainer}
        >
          <View style={$headerStyle}>
            <Text preset="h5" weight="bold" text={searchModalTitle} />
            <Icon icon="close" onPress={() => setOpen(false)} />
          </View>
          <TextField
            value={search}
            onChangeText={setSearch}
            placeholder={searchPlaceholder}
            LeftAccessory={(props) => (
              <Icon icon="search" containerStyle={props.style} />
            )}
            onPressIn={() => setOpen(true)}
          />
          <FlatList
            data={filteredValues}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ marginTop: spacing.md }}
            renderItem={({ item }) => {
              const isSelected = value.id === item.id

              return (
                <TouchableOpacity
                  style={$itemContainer}
                  onPress={() => {
                    onValueChange(item)
                    setOpen(false)
                  }}
                >
                  <View>
                    <Image
                      source={{ uri: item.imageURL }}
                      style={{ width: 36, height: 36 }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text preset="body" weight="bold">
                      {item.name}
                    </Text>
                    <Text preset="small">{item.symbol}</Text>
                  </View>
                  {isSelected ? (
                    <Icon icon="tickCircle" />
                  ) : (
                    <Icon icon="arrowRight" />
                  )}
                </TouchableOpacity>
              )
            }}
            ListEmptyComponent={() => (
              <Text
                preset="body"
                weight="bold"
                text="Sin resultados encontrados"
                style={{ textAlign: 'center' }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  )
}

const $modalContainer: ViewStyle = { padding: spacing.md, flex: 1 }

const $headerStyle: ViewStyle = {
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginBottom: spacing.md,
}

const $itemContainer: ViewStyle = {
  paddingVertical: spacing.xs,
  flexDirection: 'row',
  gap: spacing.sm,
  alignItems: 'center',
}
