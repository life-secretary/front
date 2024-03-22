import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSetRecoilState} from 'recoil';
import {todoListState} from '../../../../store/todoState';

import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '../../../common/AppText';
import {AppInput} from '@/components/common/AppInput';
import {getFormattedDate, generateRandomId} from '@/utils';

type TodoFormProps = {
  selectedField: object;
  handleBottomSheetVisible: Function;
  handleSelectField: Function;
  isVisible: boolean;
};

export function TodoForm({
  selectedField,
  handleBottomSheetVisible,
  handleSelectField,
  isVisible,
}: TodoFormProps) {
  // const [isValid, setIsValid] = React.useState(true);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const setTodoList = useSetRecoilState(todoListState);
  const navigation = useNavigation();

  const addTodo = () => {
    setTodoList(oldTodoList => [
      ...oldTodoList,
      // TODO: todo item type 정의
      {
        id: generateRandomId(),
        title: title,
        tags: ['나의 할 일', `${selectedField.text}`],
        isCompleted: false,
        createdDate: getFormattedDate(new Date()),
        subTodoList: [],
      },
    ]);
    setTitle('');
    navigation.navigate('Todo');
  };

  /** TODO: Form Validation Check 추가
  const checkInputValidation = () => {
  // onChange
  // onBlur
  // onSubmit
  };
  */

  React.useEffect(() => {
    if (!title && !selectedField) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [title, selectedField]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.form}>
          {isVisible}
          <Pressable onPress={() => handleBottomSheetVisible(true)}>
            <AppInput
              hasLabel={true}
              labelText="분야"
              text={selectedField.text}
              onChangeText={() => handleSelectField}
              disabled={selectedField.key !== 'USER'}
            />
          </Pressable>
          <AppInput
            hasLabel={true}
            labelText="할 일 제목"
            placeholder="최대 20자 내로 입력 가능해요"
            text={title}
            maxLength={20}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, isEmpty && styles.disabled]}
            disabled={isEmpty}
            onPress={addTodo}>
            <AppText style={styles.buttonText}>완료</AppText>
          </Pressable>
        </View>
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
  disabled: {
    backgroundColor: 'lightgray',
  },
});
