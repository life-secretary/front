import React from 'react';

import {StyleSheet} from 'react-native';
import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {getFontSize} from '@/utils/font';

export function ViewMoreButton(): React.JSX.Element {
  const handlePress = () => {};

  return (
    <AppButton
      text="더보기"
      textStyle={styles.buttonText}
      buttonStyle={styles.button}
      endIcon={{
        name: 'angleRight',
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
    borderRadius: 10,
    gap: 4,
    backgroundColor: color.grey.grey100,
  },
  buttonText: {
    fontSize: getFontSize(15),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 17.9,
    color: color.main.primary,
  },
});
