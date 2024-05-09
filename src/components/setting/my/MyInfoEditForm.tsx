import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {updateData} from '@/api/api';

import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AppButton from '@/components/common/AppButton';
import {AppInput} from '@/components/common/AppInput';
import color from '@/styles/color';
import {font} from '@/styles/font';
import spacing from '@/styles/spacing';

import {getFormattedDate} from '@/utils';
import OutsidePressHandler from 'react-native-outside-press';
import {userInfoState} from '@/store/userInfoState';
import {useRecoilValue} from 'recoil';
import {
  checkInappropriateKeyword,
  checkNumber,
  checkSpaceChar,
  checkSpecialChar,
  formValidation,
} from '@/utils/formValidation';

export function MyInfoEditForm(): React.JSX.Element {
  const userInfo = useRecoilValue(userInfoState);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [nickname, onChangeNickname] = useState(userInfo?.nickname);
  const [birthdate, onChangeBirthdate] = useState(userInfo?.birthdate);
  const navigation = useNavigation();
  const nicknameInputRef = useRef(null);
  const birthDateInputRef = useRef(null);

  const moveToBack = () => {
    navigation.goBack();
  };

  const handleInputOutsidePress = (ref: React.MutableRefObject<null>) => {
    handleInputBlur(ref);
  };

  const handleInputBlur = (ref: React.MutableRefObject<null>) => {
    ref?.current.blur();
  };

  const handleBirthdatePress = () => {
    setIsDatePickerVisible(true);
  };

  const handleSubmitButtonPress = () => {
    if (checkNicknameInputValidation()) {
      editUserInfo();
    }
  };

  const editUserInfo = async () => {
    const newUserInfo = {
      nickname,
      birthdate,
    };

    const res = await updateData('/user', userInfo.id, newUserInfo);

    if (res.status === 200) {
      moveToBack();
    }
  };

  const checkNicknameInputValidation = useCallback(() => {
    // 특수문자 체크
    if (checkSpecialChar(nickname)) {
      setIsInvalid(true);
      setErrorMsg(formValidation.common.specialChar.errorMsg);
      return false;
    }

    // 공백 체크
    if (checkSpaceChar(nickname)) {
      setIsInvalid(true);
      setErrorMsg(formValidation.common.spaceChar.errorMsg);
      return false;
    }

    // 숫자 체크
    if (checkNumber(nickname)) {
      setIsInvalid(true);
      setErrorMsg(formValidation.common.number.errorMsg);
      return false;
    }

    // 부적절한 단어 체크
    if (
      checkInappropriateKeyword(
        formValidation.common.inappropriate.keywords,
        nickname,
      )
    ) {
      setIsInvalid(true);
      setErrorMsg(formValidation.common.inappropriate.errorMsg);
      return false;
    }

    setIsInvalid(false);
    setErrorMsg('');
    return true;
  }, [nickname]);

  useEffect(() => {
    if (!nickname || !birthdate) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }

    checkNicknameInputValidation();
  }, [nickname, birthdate, checkNicknameInputValidation]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.form}>
          <OutsidePressHandler
            onOutsidePress={() => handleInputOutsidePress(nicknameInputRef)}>
            <AppInput
              ref={nicknameInputRef}
              hasLabel={true}
              labelText="닉네임"
              placeholder="최대 6자 내로 입력 가능해요"
              text={nickname}
              error={isInvalid}
              errorMsg={errorMsg}
              onChangeText={onChangeNickname}
            />
          </OutsidePressHandler>
          <OutsidePressHandler
            onOutsidePress={() => handleInputOutsidePress(birthDateInputRef)}>
            <AppInput
              ref={birthDateInputRef}
              hasLabel={true}
              editable={false}
              labelText="생년월일"
              text={getFormattedDate(new Date(birthdate), 'kor')}
              onChangeText={onChangeBirthdate}
              icon={{
                name: 'arrowDown',
                width: 24,
                height: 24,
                styles: {color: color.grey.grey400},
                onPress: () => {
                  handleBirthdatePress();
                },
              }}
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
      </KeyboardAvoidingView>
      <DatePicker
        modal
        mode="date"
        locale="kor"
        open={isDatePickerVisible}
        date={new Date(birthdate)}
        onConfirm={date => {
          setIsDatePickerVisible(false);
          onChangeBirthdate(getFormattedDate(date, '-'));
        }}
        onCancel={() => {
          setIsDatePickerVisible(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.layoutPaddingHorizontal,
  },
  form: {
    flex: 1,
    gap: 20,
    marginTop: 32,
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
