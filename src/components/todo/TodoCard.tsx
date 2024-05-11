import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {AppDivider} from '@/components/common/AppDivider';
import AppIcon from '@/components/common/AppIcon';
import color from '@/styles/color';
import {font} from '@/styles/font';
import {getFormattedDate} from '@/utils';

import Todo from '@/models/Todo';
import SubTodo from '@/models/SubTodo';

type Props = {
  item: Todo;
};

export function TodoCard({item}: Props): React.JSX.Element {
  const navigation = useNavigation();

  const setTagList = () => {
    let list = [];
    let categoryTitle = '';

    if (item?.isDone) {
      list.push('완료');
    }

    if (item.hasOwnProperty('origId')) {
      list.push('나의 할 일');
    }

    if (item.userTag !== null) {
      categoryTitle = item.userTag;
    } else if (item?.category) {
      categoryTitle = item.category?.title;
    } else {
      categoryTitle = null;
    }

    list.push(categoryTitle);

    return list;
  };

  const todoItem: Todo = {
    id: item?.id,
    title: item?.title,
    categoryId: item?.categoryId,
    userTag: item?.userTag,
    tagList: setTagList(),
    origId: item?.origId,
    isDone: item?.isDone,
    createdTime: item?.createdTime,
    completedTime: item?.completedTime,
    subs: item?.subs,
  };

  const moveToScreen = (screen: string, params: object) => {
    navigation.navigate(screen, params);
  };

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

  const handleCardPress = () => {
    moveToScreen('TodoDetailModal', {todoItem});
  };

  return (
    <Pressable
      onPress={() => {
        handleCardPress();
      }}>
      <View style={styles.cardContainer}>
        <View style={styles.cardTagsRow}>
          {todoItem.tagList &&
            todoItem.tagList.map((tag: string) => (
              <View
                style={[styles.cardTagContainer, setTagContainerStyles(tag)]}>
                <AppText style={[styles.cardTag, setTagTextStyles(tag)]}>
                  {tag}
                </AppText>
              </View>
            ))}
        </View>
        <View style={styles.cardTitleRow}>
          <AppText style={styles.cardTitle}>{todoItem.title}</AppText>
          <AppIcon
            name="arrowRight"
            width={36}
            height={36}
            styles={{color: color.grey.grey400}}
          />
        </View>
        <AppDivider />
        <View style={styles.cardInfoRow}>
          <View style={styles.cardTodoRow}>
            <AppText style={[styles.cardInfoText, styles.light]}>할일 </AppText>
            {todoItem.subs && todoItem.subs.length > 0 ? (
              <>
                <AppText style={[styles.cardInfoText, styles.dark]}>
                  {
                    todoItem.subs.filter((subTodo: SubTodo) => subTodo.isDone)
                      .length
                  }
                </AppText>
                <AppText style={[styles.cardInfoText, styles.light]}>
                  /{todoItem.subs.length}
                </AppText>
              </>
            ) : (
              <AppText style={[styles.cardInfoText, styles.dark]}>1</AppText>
            )}
            <AppText style={[styles.cardInfoText, styles.light]}>개</AppText>
          </View>
          <AppText style={[styles.cardInfoText, styles.cardDate]}>
            생성{' '}
            {todoItem.createdTime &&
              getFormattedDate(new Date(todoItem.createdTime), '.')}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    padding: 22,
    gap: 14,
    backgroundColor: color.main.white,
  },
  cardTagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  cardTagContainer: {
    paddingVertical: 3,
    paddingHorizontal: 6,
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
  cardTag: {
    fontSize: 12,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 14.32,
  },
  defaultTag: {
    color: color.grey.grey400,
  },
  myTag: {
    color: color.grey.grey500,
  },
  completedTag: {
    color: color.main.white,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  cardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfoText: {
    fontSize: 13,
    fontWeight: font.fontWeight.medium,
    lineHeight: 15.51,
  },
  cardTodoRow: {
    flexDirection: 'row',
  },
  light: {
    color: color.grey.grey400,
  },
  dark: {
    color: color.grey.grey700,
  },
  cardDate: {
    color: color.grey.grey300,
  },
});
