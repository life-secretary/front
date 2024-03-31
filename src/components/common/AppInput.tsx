import * as React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {AppText} from './AppText';
import color from '@/styles/color';
import AppIcon from './AppIcon';

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
  /** Whether input has error or not */
  error?: boolean;
  /** error message text value */
  errorMsg?: string;
  /** TextInput maxLength number value */
  maxLength?: number;
  icon?: object;
  /** onChangeText Handler */
  onChangeText?: Function;
};

// TODO: 추가 개발 필요
export function AppInput({
  text,
  placeholder,
  placeholderTextColor,
  hasLabel,
  labelText,
  maxLength,
  disabled = false,
  editable = true,
  icon,
  onChangeText,
}: AppInputProps): React.JSX.Element {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.focus,
        disabled && styles.disabled,
      ]}>
      {hasLabel && (
        <AppText style={[styles.label, disabled && styles.disabledText]}>
          {labelText}
        </AppText>
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        defaultValue={text}
        onChangeText={newText => onChangeText && onChangeText(newText)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={maxLength}
        editable={editable}
        style={styles.inputText}
      />
      {icon && !editable && (
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
    fontWeight: '500',
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
    fontSize: 16,
    fontWeight: '600',
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
