import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {AppText} from '../common/AppText';
import {AppInput} from '../common/AppInput';

export function SubTodoForm() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.form}>
        <AppInput hasLabel={true} labelText="할 일 제목" disabled={true} />
        <AppInput
          hasLabel={true}
          labelText="항목 명"
          placeholder="최대 18자 내로 입력 가능해요"
          maxLength={18}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <AppText style={styles.buttonText}>완료</AppText>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
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
  titleText: {
    fontWeight: '600',
    color: '#000E24',
  },
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
  disabledInput: {
    backgroundColor: '#F2F4F7',
  },
});
