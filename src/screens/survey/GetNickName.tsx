import React, {useEffect, useState} from 'react';
import {View, TextInput, KeyboardAvoidingView, Platform} from 'react-native';

import {AppText} from '@/components/common/AppText';
import {AppHeader} from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import {useRecoilState} from 'recoil';
import {userInfoState} from '@/store/login';

import {styles} from '@/styles/survey';

const GetNickName = ({navigation}: any) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isError, setIsError] = useState(true);

  console.log(userInfo);

  const onChangeTextInput = ({nativeEvent}: any) => {
    const checkHasSpecialText = new RegExp(
      /[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/ ]/,
      'gim',
    );

    const {text} = nativeEvent;

    if (
      text.match(checkHasSpecialText) !== null ||
      text.length > 6 ||
      text.length === 0
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    setUserInfo(previousValue => {
      return {
        ...previousValue,
        nickname: text,
      };
    });
  };

  const allTextInputFull = () => {
    if (!userInfo) {
      return false;
    }

    return !!userInfo.nickname.length;
  };

  useEffect(() => {
    setIsError(false);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyBoardAvoidingContainer}>
      <View style={styles.container}>
        <AppHeader style={styles.headerContainer}>
          <AppIcon
            name="back"
            width={42}
            height={42}
            onPress={() => navigation.navigate('Agreement')}
          />
        </AppHeader>
        <View style={styles.titleContainer}>
          <View style={styles.textContainer}>
            <AppText style={styles.titleText}>닉네임을 알려주세요</AppText>
            <AppText style={styles.subTitleText}>
              공백없이 6자 내로 입력할 수 있어요 (특수문자 불가)
            </AppText>
          </View>
        </View>
        <TextInput
          value={userInfo.nickname}
          onChange={onChangeTextInput}
          style={[styles.textInput, isError ? styles.textInputError : {}]}
          autoFocus={true}
        />
        <View style={styles.buttonContainer}>
          <AppButton
            text="다음"
            textStyle={styles.nextButtonText}
            buttonStyle={[
              styles.nextButton,
              isError || !allTextInputFull() ? styles.nextButtonDisabled : {},
            ]}
            disabled={isError || !allTextInputFull()}
            onPressButton={
              isError || !allTextInputFull()
                ? () => {}
                : () => navigation.navigate('GetAgeRange')
            }
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GetNickName;
