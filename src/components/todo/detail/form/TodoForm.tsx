import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useSetRecoilState} from 'recoil';
import {bottomSheetVisibleState} from '@/store/bottomSheetState';
import {useNavigation} from '@react-navigation/native';
import OutsidePressHandler from 'react-native-outside-press';
import {createData, updateData} from '@/api/api';

import {StyleSheet, View} from 'react-native';
import {AppInput} from '@/components/common/AppInput';
import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';
import {font} from '@/styles/font';

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
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState(todoItem?.title || '');
  const navigation = useNavigation();
  const categoryInputRef = useRef(null);
  const titleInputRef = useRef(null);

  const isCustomCategory = selectedCategory?.key === 'custom';

  const resetForm = () => {
    setTitle('');
    handleSelectCategory({});
  };

  const handleCategoryInputBlur = (ref: React.MutableRefObject<null>) => {
    ref?.current.blur();
  };

  const handleTitleInputBlur = (ref: React.MutableRefObject<null>) => {
    ref?.current.blur();
  };

  const handleSubmitButtonPress = () => {
    if (checkCategoryInputValidation() && checkTitleInputValidation()) {
      isEditMode ? editTodo() : addTodo();
    }
  };

  // ADD TODO
  const addTodo = async () => {
    let currentCategoryId: any = '';
    let userTag: string = '';

    // TODO: 리팩토링 필요
    if (selectedCategory?.key === 'none') {
      // 유저가 카테고리 선택 안 함
      currentCategoryId = null;
      userTag = '';
    } else if (selectedCategory?.key === 'custom') {
      // 유저가 카테고리 직접 입력
      currentCategoryId = null;
      userTag = selectedCategory?.title;
    } else {
      // 유저가 카테고리 선택
      currentCategoryId = selectedCategory?.id;
      userTag = '';
    }

    const newTodo = {
      title,
      categoryId: +currentCategoryId,
      userTag,
      userId: 1,
    };

    const res = await createData('/user-todos', newTodo);

    if (res.status === 200) {
      resetForm();
      navigation.navigate('Todo');
    }
  };

  // EDIT TODO
  const editTodo = async () => {
    let currentCategoryId: any = '';
    let userTag: string = '';

    // TODO: 리팩토링 필요
    if (selectedCategory?.key === 'none') {
      // 유저가 카테고리 선택 안 함
      currentCategoryId = null;
      userTag = '';
    } else if (selectedCategory?.key === 'custom') {
      // 유저가 카테고리 직접 입력
      currentCategoryId = null;
      userTag = selectedCategory?.title;
    } else {
      // 유저가 카테고리 선택
      currentCategoryId = selectedCategory?.id;
      userTag = '';
    }

    const editedTodo = {
      title,
      userTag,
      categoryId: currentCategoryId && +currentCategoryId,
    };

    const res = await updateData('/user-todos', todoItem?.id, editedTodo);

    if (res.status === 200) {
      resetForm();
      navigation.navigate('Todo');
    }
  };

  const checkCategoryInputValidation = useCallback(() => {
    if (checkSpecialChar(category)) {
      setIsCategoryInvalid(true);
      setCategoryErrorMsg(formValidation.common.specialChar.errorMsg);
      return false;
    }

    if (
      checkInappropriateKeyword(
        formValidation.common.inappropriate.keywords,
        category,
      )
    ) {
      setIsCategoryInvalid(true);
      setCategoryErrorMsg(formValidation.common.inappropriate.errorMsg);
      return false;
    }

    setIsCategoryInvalid(false);
    setCategoryErrorMsg('');
    return true;
  }, [category]);

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
    if (!selectedCategory) {
      setCategory('');
      return;
    }

    if (typeof selectedCategory === 'object') {
      setCategory(selectedCategory?.title);
    } else {
      setCategory(todoItem?.category);
    }
  }, [selectedCategory, todoItem?.category]);

  useEffect(() => {
    if (!title || !selectedCategory) {
      setIsEmpty(true);
      return;
    }

    setIsEmpty(false);
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
    <View style={styles.container}>
      <View style={styles.form}>
        <OutsidePressHandler
          onOutsidePress={() => handleCategoryInputBlur(categoryInputRef)}>
          <AppInput
            ref={categoryInputRef}
            hasLabel={true}
            labelText="분야"
            placeholder="최대 6자 내로 입력 가능해요"
            text={isCustomCategory ? selectedCategory?.title || '' : category}
            onChangeText={(newText: string) =>
              handleSelectCategory({id: null, key: 'custom', title: newText})
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
        </OutsidePressHandler>
        <OutsidePressHandler
          onOutsidePress={() => handleTitleInputBlur(titleInputRef)}>
          <AppInput
            ref={titleInputRef}
            hasLabel={true}
            labelText="할 일 제목"
            placeholder="최대 20자 내로 입력 가능해요"
            text={title}
            maxLength={20}
            onChangeText={setTitle}
            error={isTitleInvalid}
            errorMsg={titleErrorMsg}
          />
        </OutsidePressHandler>
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
    </View>
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
