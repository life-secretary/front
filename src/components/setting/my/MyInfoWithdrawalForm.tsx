import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useResetRecoilState} from 'recoil';
import {userState} from '@/store/userState';

import {createData, deleteData, fetchData} from '@/api/api';

import {FlatList, StyleSheet, View} from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppText} from '@/components/common/AppText';
import {AppInput} from '@/components/common/AppInput';
import AppButton from '@/components/common/AppButton';
import AppConfirmModal from '@/components/common/modal/AppConfirmModal';
import color from '@/styles/color';
import {font} from '@/styles/font';
import spacing from '@/styles/spacing';

import {removeItemAtIndex} from '@/utils';
import {getFontSize} from '@/utils/font';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {PROVIDERS, clearAuth, providerKey, userInfoState} from '@/store/login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {unlink} from '@react-native-seoul/kakao-login';

type checkboxItemProps = {
  item: object;
  onPress: Function;
};

export function CheckboxItem({
  item,
  onPress,
}: checkboxItemProps): React.JSX.Element {
  return (
    <View style={styles.itemContainer}>
      <BouncyCheckbox
        size={20}
        disableText
        fillColor={color.main.primary}
        iconStyle={styles.checkbox}
        innerIconStyle={styles.checkbox}
        bounceEffectIn={1}
        bounceEffectOut={1}
        onPress={(isChecked: boolean) => {
          onPress(isChecked, item);
        }}
      />
      <AppText style={styles.itemText}>{item?.reason || item?.text}</AppText>
    </View>
  );
}

type CheckboxItem = {
  id: number;
  reason: string;
};

/*
  회원 탈퇴 사유 유형
  {id: 1, reason: '자주 사용하지 않아요'},
  {id: 2, reason: '앱이 사용하기 불편해요'},
  {id: 3, reason: '원하는 내용이 많이 부족해요'},
  {id: 4, reason: '기타'},
*/

export function MyInfoWithdrawalForm(): React.JSX.Element {
  const resetLoginedUserInfo = useResetRecoilState(userInfoState);
  const resetMyInfo = useResetRecoilState(userState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [step, setStep] = useState(1);
  const [isNoticeChecked, setIsNoticeChecked] = useState(false);
  const [withdrawalReasonTypeList, setWithdrawalReasonTypeList] = useState([]);
  const [checkedReasonList, setCheckedReasonList] = useState<CheckboxItem[]>(
    [],
  );
  const [reasonText, onChangeReasonText] = useState('');
  const navigation = useNavigation();
  const inputRef = useRef(null);

  const NOTICE_CHECKBOX = {
    key: 'notice',
    text: '유의사항을 확인하였으며, 위 내용에 동의합니다',
  };

  const handleInputOutsidePress = () => {
    handleInputBlur();
  };

  const handleInputBlur = () => {
    inputRef?.current.blur();
  };

  const handleModalVisible = (status: boolean) => {
    setIsModalVisible(status);
  };

  const handleCheckboxPress = (isChecked: boolean, item: CheckboxItem) => {
    const itemIndex = checkedReasonList.findIndex(
      checkedItem => checkedItem.id === item.id,
    );

    if (isChecked) {
      setCheckedReasonList([...checkedReasonList, item]);
    } else {
      const newCheckedList = removeItemAtIndex(checkedReasonList, itemIndex);
      setCheckedReasonList([...newCheckedList]);
    }
  };

  const handleNoticeCheckboxPress = (isChecked: boolean) => {
    setIsNoticeChecked(isChecked);
  };

  const handleNextButtonPress = () => {
    setStep(2);
  };

  const handleWithdrawalButtonPress = () => {
    sendWithdrawalReason().then(res => {
      if (res.status === 200) {
        withdrawUser();
      }
    });
  };

  const sendWithdrawalReason = async () => {
    const withdrawalReasons: any = {
      reasonTypeIds: checkedReasonList.map(item => item.id),
    };

    if (isEditable) {
      withdrawalReasons.additionalComment = reasonText;
    }

    const res = await createData('/withdrawal-reasons', withdrawalReasons);

    return res;
  };

  const withdrawUser = async () => {
    try {
      const res = await deleteData('/user', {}, null);

      if (res.status === 200) {
        handleModalVisible(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      const value = await AsyncStorage.getItem(providerKey);
      if (value === PROVIDERS.GOOGLE) {
        await GoogleSignin.signOut();
      } else if (value === PROVIDERS.KAKAO) {
        await unlink();
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  useEffect(() => {
    if (!checkedReasonList || checkedReasonList.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }

    // '기타' 선택 여부 판단
    if (checkedReasonList.findIndex(item => item.id === 4) !== -1) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  }, [checkedReasonList]);

  useEffect(() => {
    const fetchWithdrawalTypeList = async () => {
      const res = await fetchData('/withdrawal-reasons/types', null);

      if (res.status === 200) {
        setWithdrawalReasonTypeList(res.data.data);
      }
    };

    fetchWithdrawalTypeList();
  }, []);

  return (
    <>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        {step === 1 && (
          <>
            <View style={styles.titleContainer}>
              <AppText style={styles.title}>
                정말 떠나실 건가요?{'\n'}탈퇴하시는 이유가 궁금해요
              </AppText>
            </View>
            <View style={styles.form}>
              <View style={styles.listContainer}>
                <FlatList
                  scrollEnabled={false}
                  data={withdrawalReasonTypeList}
                  renderItem={({item}) => {
                    return (
                      <CheckboxItem item={item} onPress={handleCheckboxPress} />
                    );
                  }}
                  keyExtractor={item => item.key}
                  contentContainerStyle={styles.checkboxContainer}
                />
              </View>
              <OutsidePressHandler onOutsidePress={handleInputOutsidePress}>
                <AppInput
                  ref={inputRef}
                  hasLabel={false}
                  placeholder="인생비서팀에게 전하고 싶은 의견을 남겨주세요"
                  text={reasonText}
                  isMultiline={true}
                  minHeight={152}
                  disabled={!isEditable}
                  editable={isEditable}
                  onChangeText={onChangeReasonText}
                />
              </OutsidePressHandler>
            </View>
            <View style={styles.buttonContainer}>
              <AppButton
                text="다음"
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                isDisabled={isEmpty}
                disabledBackgroundColor={color.grey.grey300}
                onPressButton={() => handleNextButtonPress()}
              />
            </View>
          </>
        )}
        {step === 2 && (
          <>
            <View style={styles.titleContainer}>
              <AppText style={styles.subTitle}>
                인생비서를 떠나신다니 아쉬워요
              </AppText>
              <AppText style={styles.subTitle}>
                아래 유의사항 동의 시, 탈퇴가 완료 처리됩니다
              </AppText>
            </View>
            <View style={styles.noticeContainer}>
              <AppText style={styles.noticeTitle}>
                회원 탈퇴 시 유의사항
              </AppText>
              <View style={styles.notice}>
                <AppText style={styles.noticeText}>
                  &bull; 회원탈퇴 진행 시, 해당 아이디는 영구적으로 삭제됩니다.
                </AppText>
                <AppText style={styles.noticeText}>
                  &bull; 탈퇴 시, 위 이메일 아이디 정보로 재가입이 불가능하며
                  처리 후에는 회원님의 개인정보를 복원할 수 없습니다.
                </AppText>
                <AppText style={styles.noticeText}>
                  &bull; 탈퇴 후, 서비스 내 프로필 정보 및 서비스 이용기록은
                  모두 삭제됩니다.
                </AppText>
              </View>
            </View>
            <View style={styles.footer}>
              <CheckboxItem
                item={NOTICE_CHECKBOX}
                onPress={handleNoticeCheckboxPress}
              />
              <View style={styles.noticeButtonContainer}>
                <AppButton
                  text="취소"
                  textStyle={[
                    styles.noticeButtonText,
                    styles.defaultNoticeButtonText,
                  ]}
                  buttonStyle={[
                    styles.noticeButton,
                    styles.defaultNoticeButton,
                  ]}
                  onPressButton={() => navigation.goBack()}
                />
                <AppButton
                  text="탈퇴하기"
                  textStyle={[
                    styles.noticeButtonText,
                    styles.activeNoticeButtonText,
                  ]}
                  buttonStyle={[styles.noticeButton, styles.activeNoticeButton]}
                  isDisabled={!isNoticeChecked}
                  disabledBackgroundColor={color.grey.grey300}
                  onPressButton={handleWithdrawalButtonPress}
                />
              </View>
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
      <AppConfirmModal
        isVisible={isModalVisible}
        type="column"
        title="탈퇴 완료"
        description={
          '필요하시다면 언제든 다시 찾아주세요.\n그동안 이용해 주셔서 감사합니다'
        }
        button={{
          first: {
            text: '확인',
            textStyle: styles.modalButtonText,
            buttonStyle: styles.modalButton,
            onPressButton: () => {
              handleModalVisible(false);
              handleLogout()
              .then(() => {
                clearAuth()
              })
              .then(() => {
                resetLoginedUserInfo();
                resetMyInfo();
                navigation.navigate('Splash');
              });
            },
          },
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
  titleContainer: {
    marginTop: 32,
  },
  title: {
    fontSize: getFontSize(20),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 32,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  subTitle: {
    fontWeight: font.fontWeight.medium,
    lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey500,
    paddingBottom: 4,
  },
  form: {
    flex: 1,
    gap: 14,
  },
  listContainer: {
    marginTop: 20,
  },
  checkboxContainer: {
    gap: 20,
  },
  checkbox: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderBlockColor: color.main.primary,
  },
  itemContainer: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemText: {
    fontSize: getFontSize(15),
    fontWeight: font.fontWeight.medium,
    lineHeight: 17.9,
    color: color.grey.grey700,
  },
  input: {
    minHeight: 152,
  },
  buttonContainer: {
    justifyContent: 'center',
    marginBottom: 28,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: color.main.primary,
  },
  buttonText: {
    fontWeight: font.fontWeight.bold,
    lineHeight: 19.09,
    color: color.main.white,
  },
  noticeContainer: {
    flex: 1,
    marginTop: 40,
  },
  noticeTitle: {
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
    color: color.grey.grey700,
  },
  notice: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderWidth: 1,
    borderRadius: 11,
    borderColor: color.grey.grey300,
    gap: 14,
    marginTop: 20,
  },
  noticeText: {
    fontSize: getFontSize(15),
    fontWeight: font.fontWeight.medium,
    lineHeight: 20,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey600,
  },
  noticeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  noticeButton: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  noticeButtonText: {
    textAlign: 'center',
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
  },
  footer: {
    marginBottom: 31,
    gap: 16,
  },
  defaultNoticeButton: {
    backgroundColor: color.grey.grey200,
  },
  defaultNoticeButtonText: {
    color: color.main.primary,
  },
  activeNoticeButton: {
    backgroundColor: color.main.primary,
  },
  activeNoticeButtonText: {
    color: color.main.white,
  },
  modalButton: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: color.main.primary,
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: getFontSize(15),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 17.9,
    color: color.main.white,
  },
});
