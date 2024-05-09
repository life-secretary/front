import React from 'react';

import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/common/AppText';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {getFormattedDate} from '@/utils';

import Todo from '@/models/Todo';
import SubTodo from '@/models/SubTodo';

type Props = {
  todoItem: Todo;
  isCompleteMode: boolean;
};

export function TodoDetail({
  todoItem,
  isCompleteMode,
}: Props): React.JSX.Element {
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
          {todoItem.tagList &&
            todoItem.tagList.map((tag: string) => (
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
          {todoItem.subTodoList && todoItem.subTodoList.length > 0 ? (
            <View style={styles.todoRow}>
              <AppText style={[styles.infoText, styles.completedText]}>
                {
                  todoItem.subTodoList.filter((item: SubTodo) => item.isDone)
                    .length
                }
              </AppText>
              <AppText style={[styles.infoText, styles.defaultText]}>
                /{todoItem.subTodoList.length}개
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
              {getFormattedDate(new Date(todoItem.createdTime), '.')}
            </AppText>
          </View>
          {isCompleteMode && (
            <>
              <AppText style={[styles.infoText, styles.defaultText]}>
                &middot;
              </AppText>
              <View style={styles.date}>
                <AppText style={[styles.infoText, styles.defaultText]}>
                  완료
                </AppText>
                <AppText style={[styles.infoText, styles.defaultText]}>
                  {getFormattedDate(new Date(todoItem.completedTime), '.')}
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
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 14.32,
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
    fontWeight: font.fontWeight.bold,
    lineHeight: 26.25,
    letterSpacing: font.letterSpacing.medium,
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
    fontWeight: font.fontWeight.medium,
    lineHeight: 15.51,
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
