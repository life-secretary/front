import React, {useState} from 'react';

import {StyleSheet, View, TextInput, ViewStyle} from 'react-native';
import {AppText} from './AppText';
import AppIcon from './AppIcon';
import color from '@/styles/color';
import {font} from '@/styles/font';

type AppInputProps = {
  /** Whether has label or not */
  hasLabel: boolean;
  /** label text value */
  labelText?: string;
  /** Whether TextInput is required or not */
  required?: boolean;
  /** Whether TextInput is disabled or not */
  disabled?: boolean;
  /** Whether TextInput is editable or not */
  editable?: boolean;
  /** Whether input box is focused or not */
  focused?: boolean;
  /** TextInput placeholder text value */
  placeholder?: string;
  /** TextInput placeholder text color */
  placeholderTextColor?: string;
  /** TextInput text value */
  text: string;
  /** Whether TextInput is multiline or not */
  isMultiline?: boolean;
  /** TextInput minHeight number value */
  minHeight?: number;
  /** TextInput styles */
  inputStyles?: ViewStyle;
  /** Whether input has error or not */
  error?: boolean;
  /** error message text value */
  errorMsg?: string;
  /** TextInput maxLength number value */
  maxLength?: number;
  /** Icon used inside of TextInput */
  icon?: object;
  /** onChangeText Handler */
  onChangeText?: Function;
};

// TODO: input validation check 추가
export function AppInput({
  text,
  isMultiline = false,
  minHeight,
  placeholder,
  placeholderTextColor,
  hasLabel,
  labelText,
  maxLength,
  disabled = false,
  editable = true,
  icon,
  inputStyles,
  onChangeText,
}: AppInputProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        inputStyles ? inputStyles : styles.container,
        isFocused && styles.focus,
        disabled && styles.disabled,
        minHeight ? {minHeight: minHeight} : null,
      ]}>
      {hasLabel && (
        <AppText style={[styles.label, disabled && styles.disabledText]}>
          {labelText}
        </AppText>
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || color.grey.grey300}
        defaultValue={text}
        multiline={isMultiline}
        maxLength={maxLength}
        editable={editable}
        style={styles.inputText}
        onChangeText={newText => onChangeText && onChangeText(newText)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {icon && (
        <View style={styles.icon}>
          <AppIcon
            name={icon?.name}
            width={icon?.width}
            height={icon?.height}
            styles={icon?.styles}
            onPress={icon?.onPress}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.2,
    borderRadius: 12,
    borderColor: color.grey.grey400,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: font.fontWeight.medium,
    lineHeight: 16.71,
    color: color.grey.grey500,
  },
  focus: {
    borderColor: color.grey.grey600,
  },
  disabled: {
    borderWidth: 0,
    backgroundColor: color.grey.grey100,
  },
  inputText: {
    fontSize: 16, // TextInput에 적용되는 font에는 default size가 적용되지 않음.
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 21,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  disabledText: {
    color: color.grey.grey400,
  },
  icon: {
    position: 'absolute',
    right: 12,
    bottom: 11,
  },
});
