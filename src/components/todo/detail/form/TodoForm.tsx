import React, {useState, useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {todoListState} from '@/store/todoState';
import {bottomSheetVisibleState} from '@/store/bottomSheetState';
import {useNavigation} from '@react-navigation/native';

import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {AppInput} from '@/components/common/AppInput';
import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {replaceItemAtIndex} from '@/utils';
import {createData} from '@/api/api';

type Props = {
  isEditMode?: boolean;
  todoItem?: object;
  selectedCategory: object | null;
  isVisible: boolean;
  handleSelectCategory: Function;
};

export function TodoForm({
  isEditMode = false,
  todoItem,
  selectedCategory,
  handleSelectCategory,
}: Props) {
  const setIsVisible = useSetRecoilState(bottomSheetVisibleState);
  // const [isValid, setIsValid] = React.useState(true);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [isEmpty, setIsEmpty] = useState(false);
  const [title, setTitle] = useState(todoItem?.title);
  const navigation = useNavigation();

  const itemIndex = todoList.findIndex(
    (item: object) => item.id === todoItem?.id,
  );

  const isCustomCategory = selectedCategory?.key === 'custom';

  const resetForm = () => {
    setTitle('');
    handleSelectCategory({});
  };

  // ADD TODO
  const addTodo = async () => {
    const newTodo = {
      title,
      category: selectedCategory?.title,
      userId: 1,
    };

    const res = await createData('/user-todos', newTodo);

    if (res.status === 200) {
      resetForm();
      navigation.navigate('Todo');
    }
  };

  // EDIT TODO
  const editTodo = () => {
    const newList = replaceItemAtIndex(todoList, itemIndex, {
      ...todoItem,
      title,
      category: selectedCategory,
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

  useEffect(() => {
    if (!title || !selectedCategory) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [title, selectedCategory, isEmpty]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.form}>
          <AppInput
            hasLabel={true}
            labelText="분야"
            placeholder="최대 6자 내로 입력 가능해요"
            text={isCustomCategory ? '' : selectedCategory?.title}
            onChangeText={(newText: string) =>
              handleSelectCategory({key: 'custom', title: newText})
            }
            editable={isCustomCategory}
            icon={{
              name: 'arrowRight',
              width: 36,
              height: 36,
              styles: {color: color.grey.grey400},
              onPress: () => setIsVisible(true),
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
          disabledBackgroundColor={color.grey.grey300}
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
    backgroundColor: color.main.primary,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
    color: color.main.white,
  },
});
