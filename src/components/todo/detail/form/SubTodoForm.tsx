import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {AppInput} from '@/components/common/AppInput';
import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {createData} from '@/api/api';
import {
  checkInappropriateKeyword,
  checkSpecialChar,
  formValidation,
} from '@/utils/formValidation';

type Props = {
  todoItem: object;
};

export function SubTodoForm({todoItem}: Props) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const navigation = useNavigation();
  const parentTodoId = todoItem?.id;

  const resetForm = () => {
    setSubTitle('');
  };

  const handleSubmitButtonPress = () => {
    if (checkInputValidation()) {
      addSubTodo();
    }
  };

  const checkInputValidation = useCallback(() => {
    if (checkSpecialChar(subTitle)) {
      setIsInvalid(true);
      setErrorMsg(formValidation.common.specialChar.errorMsg);
      return false;
    }

    if (
      checkInappropriateKeyword(
        formValidation.common.inappropriate.keywords,
        subTitle,
      )
    ) {
      setIsInvalid(true);
      setErrorMsg(formValidation.common.inappropriate.errorMsg);
      return false;
    }

    setIsInvalid(false);
    setErrorMsg('');
    return true;
  }, [subTitle]);

  const addSubTodo = async () => {
    const newSubTodo = {
      title: subTitle,
    };

    const res = await createData(`user-todos/${parentTodoId}/sub`, newSubTodo);

    if (res.status === 200) {
      resetForm();
      navigation.goBack();
    }
  };

  useEffect(() => {
    !subTitle ? setIsEmpty(true) : setIsEmpty(false);

    checkInputValidation();
  }, [checkInputValidation, subTitle]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.form}>
        <AppInput
          hasLabel={true}
          labelText="할 일 제목"
          text={todoItem?.title}
          disabled={true}
          editable={false}
        />
        <AppInput
          hasLabel={true}
          labelText="항목 명"
          placeholder="최대 18자 내로 입력 가능해요"
          text={subTitle}
          maxLength={18}
          error={isInvalid}
          errorMsg={errorMsg}
          onChangeText={setSubTitle}
        />
      </View>
      <AppButton
        text="완료"
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        isDisabled={isEmpty}
        disabledBackgroundColor={color.grey.grey300}
        onPressButton={handleSubmitButtonPress}
      />
    </KeyboardAvoidingView>
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
