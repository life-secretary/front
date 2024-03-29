import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {todoListState} from '../../../../store/todoState';
import {getFormattedDate, generateRandomId, replaceItemAtIndex} from '@/utils';

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {AppInput} from '@/components/common/AppInput';
import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';
import AppIcon from '@/components/common/AppIcon';

type TodoFormProps = {
  isEditMode?: boolean;
  todoItem?: object;
  selectedField: object;
  handleBottomSheetVisible: Function;
  handleSelectField: Function;
  isVisible: boolean;
};

export function TodoForm({
  isEditMode = false,
  todoItem,
  selectedField,
  handleBottomSheetVisible,
  handleSelectField,
}: TodoFormProps) {
  // const [isValid, setIsValid] = React.useState(true);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [title, setTitle] = React.useState(todoItem?.title);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const navigation = useNavigation();

  const itemIndex = todoList.findIndex(
    (item: object) => item.id === todoItem?.id,
  );

  const resetForm = () => {
    setTitle('');
    handleSelectField({});
  };

  // ADD TODO
  const addTodo = () => {
    setTodoList(oldTodoList => [
      ...oldTodoList,
      // TODO: todo item type 정의
      {
        id: generateRandomId(),
        title: title,
        field: selectedField,
        tags: ['나의 할 일', `${selectedField.text}`],
        isCompleted: false,
        createdDate: getFormattedDate(new Date()),
        completedDate: null,
        subTodoList: [],
      },
    ]);

    resetForm();
    navigation.navigate('Todo');
  };

  // EDIT TODO
  const editTodo = () => {
    const newList = replaceItemAtIndex(todoList, itemIndex, {
      ...todoItem,
      title,
      field: selectedField,
    });

    setTodoList(newList);

    resetForm();
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
    if (title === '' || !selectedField) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [title, selectedField, isEmpty]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.form}>
          {/* TODO: 분야가 제대로 수정되지 않는 버그 */}
          <AppInput
            hasLabel={true}
            labelText="분야"
            text={selectedField.text}
            onChangeText={(newText: string) =>
              handleSelectField({key: 'USER', text: newText})
            }
            editable={selectedField.key === 'USER'}
            icon={{
              type: 'stroke',
              name: 'arrowRight',
              width: 36,
              height: 36,
              styles: { color: '#A1ACB9' },
              onPress: () => handleBottomSheetVisible(true),
            }}
          />
          <AppInput
            hasLabel={true}
            labelText="할 일 제목"
            placeholder="최대 20자 내로 입력 가능해요"
            text={title}
            maxLength={20}
            onChangeText={setTitle}
          />
        </View>
        <AppButton
          text="완료"
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          isDisabled={isEmpty}
          disabledBackgroundColor={color.grey300}
          onPressButton={isEditMode ? editTodo : addTodo}
        />
      </KeyboardAvoidingView>
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
  buttonContainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: color.primary,
  },
  buttonText: {
    fontWeight: '600',
    color: color.white,
  },
});
