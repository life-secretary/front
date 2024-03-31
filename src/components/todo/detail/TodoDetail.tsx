import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../../common/AppText';
import color from '@/styles/color';

type todoDetailProps = {
  todoItem: object;
};

export function TodoDetail({todoItem}: todoDetailProps): React.JSX.Element {
  const isCompleted = todoItem?.isCompleted;

  const setTagContainerStyles = (tag: string) => {
    switch (tag) {
      case '나의 할 일':
        return styles.myTagContainer;
      case '완료':
        return styles.completedTagContainer;
      default:
        return styles.defaultTagContainer;
    }
  };

  const setTagTextStyles = (tag: string) => {
    switch (tag) {
      case '나의 할 일':
        return styles.myTag;
      case '완료':
        return styles.completedTag;
      default:
        return styles.defaultTag;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.tagRow}>
          {todoItem?.tags &&
            todoItem?.tags.map((tag: string) => (
              <View style={[styles.tagContainer, setTagContainerStyles(tag)]}>
                <AppText style={[styles.tag, setTagTextStyles(tag)]}>
                  {tag}
                </AppText>
              </View>
            ))}
        </View>
        <AppText style={styles.titleText}>{todoItem?.title}</AppText>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <AppText style={[styles.infoText, styles.defaultText]}>할일</AppText>
          {todoItem?.subTodoList.length > 0 ? (
            <View style={styles.todoRow}>
              <AppText style={[styles.infoText, styles.completedText]}>
                {
                  todoItem?.subTodoList.filter(
                    (item: object) => item.isCompleted,
                  ).length
                }
              </AppText>
              <AppText style={[styles.infoText, styles.defaultText]}>
                /{todoItem?.subTodoList.length}개
              </AppText>
            </View>
          ) : (
            <AppText style={[styles.infoText, styles.defaultText]}>1개</AppText>
          )}
        </View>
        <View style={styles.infoRow}>
          <View style={styles.date}>
            <AppText style={[styles.infoText, styles.defaultText]}>
              생성
            </AppText>
            <AppText style={[styles.infoText, styles.defaultText]}>
              {todoItem?.createdDate}
            </AppText>
          </View>
          {isCompleted && (
            <>
              <AppText style={[styles.infoText, styles.defaultText]}>
                &middot;
              </AppText>
              <View style={styles.date}>
                <AppText style={[styles.infoText, styles.defaultText]}>
                  완료
                </AppText>
                <AppText style={[styles.infoText, styles.defaultText]}>
                  {todoItem?.completedDate}
                </AppText>
              </View>
            </>
          )}
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
    borderRadius: 4,
  },
  defaultTagContainer: {
    backgroundColor: color.grey.grey100,
  },
  myTagContainer: {
    backgroundColor: color.grey.grey300,
  },
  completedTagContainer: {
    backgroundColor: color.grey.grey700,
  },
  tag: {
    fontSize: 12,
    fontWeight: '600',
  },
  defaultTag: {
    color: color.grey.grey700,
  },
  myTag: {
    color: color.grey.grey700,
  },
  completedTag: {
    color: color.main.white,
  },
  titleContainer: {
    gap: 12,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    color: color.main.white,
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
    color: color.grey.grey300,
  },
  completedText: {
    color: color.main.white,
  },
  date: {
    flexDirection: 'row',
    gap: 10,
  },
});
