import React from 'react';

import {StyleSheet, View} from 'react-native';
import {AppText} from './AppText';
import AppButton from './AppButton';
import {font} from '@/styles/font';
import color from '@/styles/color';

import {getFontSize} from '@/utils/font';

type Props = {error: Error; resetError: () => void};

export function AppErrorFallback({
  error,
  resetError,
}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <AppText style={styles.title}>정보 불러오기를 실패했어요</AppText>
        <AppText style={styles.subTitle}>잠시 후 다시 시도해주세요</AppText>
      </View>
      <AppButton
        buttonStyle={styles.button}
        text={'다시 불러오기'}
        textStyle={styles.buttonText}
        onPressButton={resetError}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.main.white,
  },
  titleContainer: {
    gap: 8,
    marginBottom: 28,
  },
  title: {
    textAlign: 'center',
    fontSize: getFontSize(18),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 21,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: getFontSize(14),
    fontWeight: font.fontWeight.medium,
    lineHeight: 16.71,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey500,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: color.main.secondary,
  },
  buttonText: {
    fontSize: getFontSize(13),
    fontWeight: font.fontWeight.bold,
    lineHeight: 15.51,
    color: color.main.white,
  },
});
