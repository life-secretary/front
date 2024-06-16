import React from 'react';

import {StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';
import {font} from '@/styles/font';
import color from '@/styles/color';

export function Empty(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>해당 페이지는 업데이트 예정입니다</AppText>
      <AppText style={[styles.text, styles.subText]}>
        (열심히 제작 중이에요)
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 238,
    gap: 8,
  },
  text: {
    fontWeight: font.fontWeight.medium,
    lineHeight: 19.09,
    textAlign: 'center',
    color: color.grey.grey500,
  },
  subText: {
    color: color.grey.grey400,
  },
});
