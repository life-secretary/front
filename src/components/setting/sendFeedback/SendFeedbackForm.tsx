import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {AppInput} from '@/components/common/AppInput';
import AppButton from '@/components/common/AppButton';
import {AppText} from '@/components/common/AppText';
import AppModal from '@/components/common/modal/AppModal';
import color from '@/styles/color';
import {font} from '@/styles/font';

export function SendFeedbackForm() {
  // const [isValid, setIsValid] = React.useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState('');
  const [contents, onChangeContents] = useState('');
  const navigation = useNavigation();

  const FEEDBACK_STATUS_LIST = [
    {key: 'inconvenience', text: '불편해요'},
    {key: 'request', text: '필요해요'},
    {key: 'cheerup', text: '응원해요'},
  ];

  const resetForm = () => {
    setFeedbackStatus('');
    onChangeContents('');
  };

  const handleSubmitButtonPress = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      navigation.goBack();
      setIsModalVisible(false);
      resetForm();
    }, 2000);
  };

  /** TODO: Form Validation Check 추가
  const checkInputValidation = () => {
  // onChange
  // onBlur
  // onSubmit
  };
  */

  useEffect(() => {
    if (!contents) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [contents, isEmpty]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>인생비서 어떠셨나요?</AppText>
          <AppText style={styles.subTitle}>
            필요로 하는 지식이나 서비스에 대한 의견을{'\n'}자유롭게 적어주세요
          </AppText>
        </View>
        <View style={styles.form}>
          <View>
            <FlatList
              data={FEEDBACK_STATUS_LIST}
              renderItem={({item}) => (
                <AppButton
                  text={item.text}
                  textStyle={[
                    styles.statusText,
                    item.key === feedbackStatus
                      ? styles.selectedButtonText
                      : styles.defaultButtonText,
                  ]}
                  buttonStyle={[
                    styles.statusButton,
                    item.key === feedbackStatus
                      ? styles.selectedButton
                      : styles.defaultButton,
                  ]}
                  onPressButton={() => setFeedbackStatus(item.key)}
                />
              )}
              keyExtractor={item => item.key}
              contentContainerStyle={styles.statusContainer}
            />
          </View>
          <AppInput
            hasLabel={false}
            placeholder="비즈니스 이메일 작성법, 보험 가입 연령 or 이러한 점이 불편해요"
            text={contents}
            isMultiline={true}
            minHeight={154}
            inputStyles={styles.input}
            onChangeText={onChangeContents}
          />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            text="보내기"
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            isDisabled={isEmpty}
            disabledBackgroundColor={color.grey.grey300}
            onPressButton={handleSubmitButtonPress}
          />
        </View>
      </KeyboardAvoidingView>
      <AppModal
        isVisible={isModalVisible}
        backdropColor={color.dimmed.modal}
        backdropOpacity={0.4}>
        <View style={styles.modal}>
          <View style={styles.modalEffectContainer}>
            <Image
              source={require('@/assets/gif/submitSuccess.gif')}
              width={80}
              height={80}
            />
          </View>
          <View style={styles.modalTitleContainer}>
            <AppText style={styles.modalTitle}>내용이 전송되었어요!</AppText>
            <AppText style={styles.modalSubTitle}>
              소중한 의견 반영을 위해 노력 중이에요
            </AppText>
          </View>
        </View>
      </AppModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
    paddingHorizontal: 24,
  },
  titleContainer: {
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: font.fontWeight.bold,
    lineHeight: 28.64,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  subTitle: {
    fontWeight: font.fontWeight.medium,
    lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey500,
  },
  form: {
    flex: 1,
    gap: 20,
    marginTop: 34,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    borderRadius: 10,
    paddingHorizontal: 29,
    paddingVertical: 12,
  },
  defaultButton: {
    borderWidth: 1,
    borderColor: color.grey.grey300,
    backgroundColor: color.main.white,
  },
  selectedButton: {
    backgroundColor: color.main.secondary,
  },
  statusText: {
    fontSize: 14,
    fontWeight: font.fontWeight.medium,
    lineHeight: 16.71,
  },
  defaultButtonText: {
    color: color.grey.grey700,
  },
  selectedButtonText: {
    color: color.main.white,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: color.grey.grey100,
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
    fontWeight: font.fontWeight.bold,
    lineHeight: 19.09,
    color: color.main.white,
  },
  modal: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 52,
    borderRadius: 20,
    gap: 22,
    backgroundColor: color.main.white,
  },
  modalEffectContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  modalTitleContainer: {
    gap: 8,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 21,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  modalSubTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: font.fontWeight.medium,
    lineHeight: 16.71,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey500,
  },
});
