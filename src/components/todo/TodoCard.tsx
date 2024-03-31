import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';
import {useNavigation} from '@react-navigation/native';
import color from '@/styles/color';
import AppIcon from '../common/AppIcon';

type TodoCardProps = {
  item: object;
};

// TODO: model에 정의
interface TodoItem {
  id: string;
  title: string;
  field: object;
  tags: string[];
  isCompleted: boolean;
  createdDate: string;
  completedDate: string;
  subTodoList: object[];
}

export function TodoCard({item}: TodoCardProps): React.JSX.Element {
  const navigation = useNavigation();
  const todoItem: TodoItem = {
    id: item?.id,
    title: item?.title,
    field: item?.field,
    tags: item?.tags,
    isCompleted: item?.isCompleted,
    createdDate: item?.createdDate,
    completedDate: item?.completedDate,
    subTodoList: item?.subTodoList,
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

  return (
    <Pressable
      onPress={() => {
        moveToScreen('TodoDetailModal', {todoItem});
      }}>
      <View style={styles.cardContainer}>
        <View style={styles.cardTagsRow}>
          {todoItem.tags &&
            todoItem.tags.map((tag: string) => (
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
            styles={{ color: '#A1ACB9' }}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.cardInfoRow}>
          <View style={styles.cardTodoRow}>
            <AppText style={[styles.cardInfoText, styles.light]}>할일 </AppText>
            {todoItem.subTodoList && todoItem.subTodoList.length > 0 ? (
              <>
                <AppText style={[styles.cardInfoText, styles.dark]}>
                  {todoItem.subTodoList.filter(item => item.isCompleted).length}
                </AppText>
                <AppText style={[styles.cardInfoText, styles.light]}>
                  /{todoItem.subTodoList.length}
                </AppText>
              </>
            ) : (
              <AppText style={[styles.cardInfoText, styles.dark]}>1</AppText>
            )}
            <AppText style={[styles.cardInfoText, styles.light]}>개</AppText>
          </View>
          <AppText style={[styles.cardInfoText, styles.cardDate]}>
            생성 {todoItem.createdDate}
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
    backgroundColor: color.white,
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
  defaultTagContainer: {
    backgroundColor: color.grey100,
  },
  myTagContainer: {
    backgroundColor: color.grey300,
  },
  completedTagContainer: {
    backgroundColor: color.grey700,
  },
  cardTag: {
    fontSize: 12,
    fontWeight: '600',
  },
  defaultTag: {
    color: color.grey400,
  },
  myTag: {
    color: color.grey500,
  },
  completedTag: {
    color: color.white,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
  cardTodoRow: {
    flexDirection: 'row',
  },
  light: {
    color: color.grey400,
  },
  dark: {
    color: color.grey700,
  },
  cardDate: {
    color: '#CBD3DC',
  },
});
