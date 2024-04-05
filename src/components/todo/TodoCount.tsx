import React from 'react';

import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/common/AppText';
import color from '@/styles/color';
import {font} from '@/styles/font';

type Props = {
  title: string;
  todoCount: number;
};

export function TodoCount({title, todoCount}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>{title}</AppText>
      <View style={styles.countContainer}>
        <AppText style={[styles.text, styles.countText]}>총 </AppText>
        <AppText style={[styles.text, styles.countHighlightText]}>
          {todoCount}
        </AppText>
        <AppText style={[styles.text, styles.countText]}>개</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    borderRadius: 8,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 16.71,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  countText: {
    color: color.grey.grey400,
  },
  countHighlightText: {
    color: color.main.secondary,
  },
});
