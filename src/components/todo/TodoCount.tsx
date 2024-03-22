import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';

type Props = {
  todoCount: number;
};

export function TodoCount({todoCount}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>나의 할 일</AppText>
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
    paddingVertical: 14,
    borderRadius: 8,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  countText: {
    color: '#A1ACB9',
  },
  countHighlightText: {
    color: '#4681F6',
  },
});
