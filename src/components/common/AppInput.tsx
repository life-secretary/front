import * as React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {AppText} from './AppText';

type AppInputProps = {
  /** label 존재 여부 */
  hasLabel: boolean;
  /** label text value */
  labelText?: string;
  /** TextInput required 속성 적용 여부 */
  required?: boolean;
  /** TextInput disabled 속성 적용 여부 */
  disabled?: boolean;
  /** input box focus 여부 */
  focused?: boolean;
  /** TextInput placeholder text value */
  placeholder?: string;
  /** input error 발생 여부 */
  error?: boolean;
  /** error message text value */
  errorMsg?: string;
  /** TextInput maxLength number value */
  maxLength?: number;
};

// TODO: 추가 개발 필요
export function AppInput({
  placeholder,
  hasLabel,
  labelText,
  maxLength,
  disabled = false,
}: AppInputProps): React.JSX.Element {
  const [text, setText] = React.useState('');

  return (
    <View style={styles.container}>
      {hasLabel && <AppText style={styles.label}>{labelText}</AppText>}
      <TextInput
        placeholder={placeholder}
        defaultValue={text}
        onChangeText={newText => setText(newText)}
        maxLength={maxLength}
        editable={!disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#A1ACB9',
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#526070',
  },
  focus: {
    borderColor: '#40474F',
  },
});
