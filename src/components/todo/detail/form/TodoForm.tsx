import React, {useState, useEffect, useCallback} from 'react';
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
import {
  checkInappropriateKeyword,
  checkSpecialChar,
  formValidation,
} from '@/utils/formValidation';

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
  const [isEmpty, setIsEmpty] = useState(false);
  const [isCategoryInvalid, setIsCategoryInvalid] = useState(false);
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [categoryErrorMsg, setCategoryErrorMsg] = useState('');
  const [titleErrorMsg, setTitleErrorMsg] = useState('');
  const [title, setTitle] = useState(todoItem?.title || '');
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const navigation = useNavigation();

  const itemIndex = todoList.findIndex(
    (item: object) => item.id === todoItem?.id,
  );

  const isCustomCategory = selectedCategory?.key === 'custom';

  const resetForm = () => {
    setTitle('');
    handleSelectCategory({});
  };

  const handleSubmitButtonPress = () => {
    if (checkCategoryInputValidation() && checkTitleInputValidation()) {
      isEditMode ? editTodo() : addTodo();
    }
  };

  // ADD TODO
  const addTodo = async () => {
    let category: any = '';
    if (selectedCategory?.key === 'none') {
      category = null;
    } else {
      category = selectedCategory?.title;
    }

    const newTodo = {
      title,
      category,
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

  const checkCategoryInputValidation = useCallback(() => {
    if (checkSpecialChar(selectedCategory?.title)) {
      setIsCategoryInvalid(true);
      setCategoryErrorMsg(formValidation.common.specialChar.errorMsg);
      return false;
    }

    if (
      checkInappropriateKeyword(
        formValidation.common.inappropriate.keywords,
        selectedCategory?.title,
      )
    ) {
      setIsCategoryInvalid(true);
      setCategoryErrorMsg(formValidation.common.inappropriate.errorMsg);
      return false;
    }

    setIsCategoryInvalid(false);
    setCategoryErrorMsg('');
    return true;
  }, [selectedCategory?.title]);

  const checkTitleInputValidation = useCallback(() => {
    if (checkSpecialChar(title)) {
      setIsTitleInvalid(true);
      setTitleErrorMsg(formValidation.common.specialChar.errorMsg);
      return false;
    }

    if (
      checkInappropriateKeyword(
        formValidation.common.inappropriate.keywords,
        title,
      )
    ) {
      setIsTitleInvalid(true);
      setTitleErrorMsg(formValidation.common.inappropriate.errorMsg);
      return false;
    }

    setIsTitleInvalid(false);
    setTitleErrorMsg('');
    return true;
  }, [title]);

  useEffect(() => {
    !title || !selectedCategory ? setIsEmpty(true) : setIsEmpty(false);

    checkCategoryInputValidation();
    checkTitleInputValidation();
  }, [
    title,
    selectedCategory,
    isEmpty,
    checkTitleInputValidation,
    checkCategoryInputValidation,
  ]);

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
            error={isCategoryInvalid}
            errorMsg={categoryErrorMsg}
          />
          <AppInput
            hasLabel={true}
            labelText="할 일 제목"
            placeholder="최대 20자 내로 입력 가능해요"
            text={title}
            maxLength={20}
            onChangeText={setTitle}
            error={isTitleInvalid}
            errorMsg={titleErrorMsg}
          />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            text="완료"
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            isDisabled={isEmpty}
            disabledBackgroundColor={color.grey.grey300}
            onPressButton={handleSubmitButtonPress}
          />
        </View>
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
