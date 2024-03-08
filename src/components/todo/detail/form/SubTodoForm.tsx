import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {AppText} from '../../../common/AppText';

export function SubTodoForm() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.form}>
        <View style={[styles.inputContainer, styles.disabledInput]}>
          <AppText style={[styles.label, styles.titleLabel]}>
            할 일 제목
          </AppText>
          <AppText style={styles.titleText}>금융</AppText>
        </View>
        <View style={styles.inputContainer}>
          <AppText style={[styles.label, styles.itemLabel]}>항목 명</AppText>
          <TextInput
            style={styles.input}
            placeholder="최대 18자 내로 입력 가능해요"
            placeholderTextColor={'#CBD3DC'}
            maxLength={22}
          />
        </View>
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
  titleLabel: {
    color: '#A1ACB9',
  },
  titleText: {
    fontWeight: '600',
    color: '#000E24',
  },
  itemLabel: {
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
  disabledInput: {
    backgroundColor: '#F2F4F7',
  },
});
