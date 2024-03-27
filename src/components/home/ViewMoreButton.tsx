import * as React from 'react';
import {StyleSheet} from 'react-native';
import AppButton from '../common/AppButton';
import color from '@/styles/color';

export function ViewMoreButton(): React.JSX.Element {
  const handlePress = () => {};

  return (
    <AppButton
      text="더보기"
      textStyle={styles.buttonText}
      buttonStyle={styles.button}
      endIcon={{
        type: 'stroke',
        name: 'arrowRightDark',
        width: 24,
        height: 24,
      }}
      onPressButton={handlePress}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
    paddingVertical: 15,
    borderRadius: 6,
    backgroundColor: color.grey100,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
