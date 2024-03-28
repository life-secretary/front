import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../../common/AppText';
import color from '@/styles/color';

type todoDetailProps = {
  id: string;
  title: string;
  tags: string[];
  subTodoList: object[];
  createdDate: string;
};

export function TodoDetail({
  title,
  tags,
  subTodoList,
  createdDate,
}: todoDetailProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.tagRow}>
          {tags &&
            tags.map(tag => (
              <View style={styles.tagContainer}>
                <AppText style={styles.tagText}>{tag}</AppText>
              </View>
            ))}
        </View>
        <AppText style={styles.titleText}>{title}</AppText>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <AppText style={[styles.infoText, styles.defaultText]}>할일</AppText>
          {subTodoList.length > 0 ? (
            <View style={styles.todoRow}>
              <AppText style={[styles.infoText, styles.completedText]}>
                {subTodoList.filter((item: object) => item.isCompleted).length}
              </AppText>
              <AppText style={[styles.infoText, styles.defaultText]}>
                /{subTodoList.length}개
              </AppText>
            </View>
          ) : (
            <AppText style={[styles.infoText, styles.defaultText]}>1개</AppText>
          )}
        </View>
        <View style={styles.infoRow}>
          <AppText style={[styles.infoText, styles.defaultText]}>생성</AppText>
          <AppText style={[styles.infoText, styles.defaultText]}>
            {createdDate}
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 22,
    paddingHorizontal: 24,
  },
  headerText: {
    textAlign: 'center',
  },
  tagRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tagContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: color.grey100,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: color.grey700,
  },
  titleContainer: {
    gap: 12,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    color: color.white,
  },
  infoContainer: {
    gap: 6,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  todoRow: {
    flexDirection: 'row',
  },
  infoText: {
    fontSize: 13,
    fontWeight: '500',
  },
  defaultText: {
    color: color.grey300,
  },
  completedText: {
    color: color.white,
  },
});
