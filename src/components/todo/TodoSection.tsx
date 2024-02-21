import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';

type Props = {
  todoCount: number;
};

export function TodoSection({todoCount}: Props): React.JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <AppText style={styles.sectionTitle}>
        작은 할일로{'\n'}가볍게 갓생 살기를{'\n'}실천해보세요
      </AppText>
      <View style={styles.sectionRow}>
        <AppText style={styles.sectionText}>나의 할 일</AppText>
        <AppText style={[styles.sectionText, styles.countText]}>
          총 {todoCount}개
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 22,
    paddingHorizontal: 30,
    gap: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#F2F4F7',
  },
  sectionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  countText: {
    color: '#A1ACB9',
  },
});
