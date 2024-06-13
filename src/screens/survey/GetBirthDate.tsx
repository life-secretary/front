import React, {useEffect, useState, useRef} from 'react';
import {View, TextInput, KeyboardAvoidingView, Platform} from 'react-native';

import {AppText} from '@/components/common/AppText';
import {AppHeader} from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import {useRecoilState} from 'recoil';
import {userInfoState} from '@/store/login';

import {styles} from '@/styles/survey';

const GetBirthDate = ({navigation}: any) => {
  const currentDate = new Date();
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isError, setIsError] = useState(true);

  const onChangeYearText = ({nativeEvent}: any) => {
    const {text} = nativeEvent;
    const currentYear = currentDate.getFullYear();

    if (
      (text.length === 4 && Number(text) >= Number(currentYear)) ||
      (text.length === 4 && Number(text) <= Number(currentYear) - 150) ||
      (text.length > 0 && text.length < 4)
    ) {
      setIsError(true);
    } else {
      setIsError(false);

      if (text.length === 4 && monthRef.current) {
        monthRef.current.focus();
      }
    }

    setUserInfo(previousValue => {
      return {
        ...previousValue,
        year: text.slice(0, 4),
      };
    });
  };

  const onChangeMonthText = ({nativeEvent}: any) => {
    const {text} = nativeEvent;

    if (
      (text.length === 2 && text[0] > 1) ||
      (text.length > 0 && text.length < 2)
    ) {
      setIsError(true);
    } else {
      setIsError(false);

      if (text.length === 2 && dayRef.current) {
        dayRef.current.focus();
      }
    }

    if (text.length === 0 && yearRef.current) {
      yearRef.current.focus();
    }

    if (text[0] > 1) {
      setUserInfo(previousValue => {
        return {
          ...previousValue,
          month: ('0' + text).slice(0, 2),
        };
      });
    } else {
      setUserInfo(previousValue => {
        return {
          ...previousValue,
          month: text.slice(0, 2),
        };
      });
    }
  };

  const onChangeDayText = ({nativeEvent}: any) => {
    const {text} = nativeEvent;

    if (
      (text.length === 2 && text[0] > 3) ||
      (text.length > 0 && text.length < 2)
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    if (text.length === 0 && monthRef.current) {
      monthRef.current.focus();
    }
    setUserInfo(previousValue => {
      return {
        ...previousValue,
        day: text.slice(0, 2),
      };
    });
  };

  const allTextInputFull = () => {
    console.log('userInfo', userInfo);
    if (!userInfo) {
      return false;
    }

    !!userInfo.year.length && !!userInfo.month.length && !!userInfo.day.length;
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
            onPress={() => navigation.navigate('GetNickName')}
          />
        </AppHeader>
        <View style={styles.titleContainer}>
          <View style={styles.textContainer}>
            <AppText style={styles.titleText}>생년월일을 입력해 주세요</AppText>
            <AppText style={styles.subTitleText}>
              나이에 맞는 정보를 제공해드리기 위해 필요해요
            </AppText>
          </View>
        </View>
        <View
          style={[styles.textInputBirth, isError ? styles.textInputError : {}]}>
          <TextInput
            ref={yearRef}
            keyboardType="numeric"
            placeholder="0000"
            value={userInfo.year}
            onChange={onChangeYearText}
            style={styles.textBirth}
            autoFocus={true}
          />
          <AppText style={styles.textBirth}>년 </AppText>
          <TextInput
            ref={monthRef}
            keyboardType="numeric"
            placeholder="00"
            value={userInfo.month}
            onChange={onChangeMonthText}
            style={styles.textBirth}
          />
          <AppText style={styles.textBirth}>월 </AppText>
          <TextInput
            ref={dayRef}
            keyboardType="numeric"
            placeholder="00"
            value={userInfo.day}
            onChange={onChangeDayText}
            style={styles.textBirth}
          />
          <AppText style={styles.textBirth}>일 </AppText>
        </View>
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
                : () => navigation.navigate('GetGender')
            }
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GetBirthDate;
