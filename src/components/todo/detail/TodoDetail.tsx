import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../../common/AppText';

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
      <View style={styles.detailContainer}>
        <AppText style={styles.detailText}>
          할일 {subTodoList.length === 0 ? '1' : subTodoList.length}개
        </AppText>
        <AppText style={styles.detailText}>생성 {createdDate}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    gap: 22,
    paddingHorizontal: 24,
    marginBottom: 16,
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
    backgroundColor: '#F2F4F7',
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  titleContainer: {
    gap: 12,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  detailContainer: {
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#C2C2C2',
  },
});
