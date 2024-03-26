import * as React from 'react';
import {StyleSheet} from 'react-native';
import AppButton from '../common/AppButton';
import {arrowRightDark} from '../../assets/icon';

export function ViewMoreButton(): React.JSX.Element {
  return (
    <AppButton
      text="더보기"
      textStyle={styles.buttonText}
      buttonStyle={styles.button}
      endIcon={arrowRightDark}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 36,
    paddingVertical: 15,
    borderRadius: 6,
    backgroundColor: '#F2F4F7',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});
