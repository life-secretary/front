import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';

type Props = {
  title: string;
  tags: string[];
  subTodoList: object[];
  createdDate: string;
};

export function TodoCard({
  title,
  tags,
  subTodoList,
  createdDate,
}: Props): React.JSX.Element {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardTagsRow}>
        {tags &&
          tags.map(tag => (
            <View style={styles.cardTagContainer}>
              <AppText style={styles.cardTag}>{tag}</AppText>
            </View>
          ))}
      </View>
      <View style={styles.cardTitleRow}>
        <AppText style={styles.cardTitle}>{title}</AppText>
      </View>
      <View style={styles.divider} />
      <View style={styles.cardInfoRow}>
        <AppText style={[styles.cardInfoText, styles.cardSubTodo]}>
          할일 {subTodoList && subTodoList.length}개
        </AppText>
        <AppText style={[styles.cardInfoText, styles.cardDate]}>
          생성 {createdDate}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 22,
    gap: 14,
  },
  cardTagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  cardTagContainer: {
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  cardTag: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardTitleRow: {},
  cardTitle: {
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F4F7',
  },
  cardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfoText: {
    fontSize: 13,
    fontWeight: '500',
  },
  cardSubTodo: {
    color: '#A1ACB9',
  },
  cardDate: {
    color: '#CBD3DC',
  },
});
