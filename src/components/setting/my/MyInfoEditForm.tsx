import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {userState} from '@/store/userState';

import {fetchData, updateData} from '@/api/api';

import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';
import DatePicker from 'react-native-date-picker';
import AppButton from '@/components/common/AppButton';
import {AppInput} from '@/components/common/AppInput';
import color from '@/styles/color';
import {font} from '@/styles/font';
import spacing from '@/styles/spacing';

import {getFormattedDate} from '@/utils';
import {
  // checkInappropriateKeyword,
  checkNumber,
  checkSpaceChar,
  checkSpecialChar,
  formValidation,
} from '@/utils/formValidation';

export function MyInfoEditForm(): React.JSX.Element {
  const [myInfo, setMyInfo] = useRecoilState(userState);

  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [nickname, onChangeNickname] = useState(myInfo.nickname);
  const [birthDate, onChangeBirthDate] = useState(myInfo.birthDate);
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
      editMyInfo();
    }
  };

  const fetchMyInfo = async () => {
    const res = await fetchData('/user', null);

    if (res.status === 200) {
      setMyInfo(res.data);
    }
  };

  const editMyInfo = async () => {
    const newMyInfo = {
      nickname,
      birthDate,
    };

    const res = await updateData('/user', null, newMyInfo);

    if (res.status === 200) {
      fetchMyInfo();
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

    // TODO: 부적절한 단어 체크 2차 개발
    // if (
    //   checkInappropriateKeyword(
    //     formValidation.common.inappropriate.keywords,
    //     nickname,
    //   )
    // ) {
    //   setIsInvalid(true);
    //   setErrorMsg(formValidation.common.inappropriate.errorMsg);
    //   return false;
    // }

    setIsInvalid(false);
    setErrorMsg('');
    return true;
  }, [nickname]);

  useEffect(() => {
    if (!nickname || !birthDate) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }

    checkNicknameInputValidation();
  }, [nickname, birthDate, checkNicknameInputValidation]);

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
              maxLength={6}
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
              text={getFormattedDate(new Date(birthDate), 'kor')}
              onChangeText={onChangeBirthDate}
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
        date={new Date(birthDate)}
        onConfirm={date => {
          setIsDatePickerVisible(false);
          onChangeBirthDate(getFormattedDate(date, '-'));
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
