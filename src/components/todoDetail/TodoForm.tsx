import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';
import {AppInput} from '../common/AppInput';

export function TodoForm() {
  return (
    <>
      <View style={styles.form}>
        <AppInput hasLabel={true} labelText="분야" />
        <AppInput
          hasLabel={true}
          labelText="할 일 제목"
          placeholder="최대 22자 내로 입력 가능해요"
          maxLength={22}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <AppText style={styles.buttonText}>완료</AppText>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    borderWidth: 1,
    gap: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#526070',
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  fieldLabel: {
    color: '#A1ACB9',
  },
  fieldText: {
    fontWeight: '600',
    color: '#000E24',
  },
  titleLabel: {
    color: '#526070',
  },
  input: {},
  buttonContainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0B2A4F',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  buttonText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
