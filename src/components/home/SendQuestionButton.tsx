import * as React from 'react';
import {StyleSheet} from 'react-native';
import {AppButton} from '../common/button/AppButton';

export function SendQuestionButton(): React.JSX.Element {
  const handlePress = () => {};

  return (
    <AppButton
      // type="contained"
      textStyle={styles.buttonText}
      buttonStyle={styles.button}
      onPress={handlePress}>
      문의 및 의견 보내기
    </AppButton>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#0B2A4F',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
