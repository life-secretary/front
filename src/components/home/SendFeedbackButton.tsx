import * as React from 'react';
import {StyleSheet} from 'react-native';
import AppButton from '../common/AppButton';
import color from '@/styles/color';
import {useNavigation} from '@react-navigation/native';

export function SendFeedbackButton(): React.JSX.Element {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('SettingModal', {menu: {key: 'sendFeedback'}});
  };

  return (
    <AppButton
      text="문의 및 의견 보내기"
      textStyle={styles.buttonText}
      buttonStyle={styles.button}
      onPressButton={handleButtonPress}>
      문의 및 의견 보내기
    </AppButton>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: color.main.primary,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: color.main.white,
    textAlign: 'center',
  },
});
