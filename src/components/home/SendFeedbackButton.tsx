import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {StyleSheet, ViewStyle} from 'react-native';
import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {getFontSize} from '@/utils/font';

type Props = {style?: ViewStyle};

export function SendFeedbackButton({style}: Props): React.JSX.Element {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('SettingModal', {menu: {key: 'sendFeedback'}});
  };

  return (
    <AppButton
      style={style}
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
    textAlign: 'center',
    fontSize: getFontSize(14),
    fontWeight: font.fontWeight.bold,
    lineHeight: 16.71,
    color: color.main.white,
  },
});
