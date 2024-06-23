import React from 'react';
import {StyleSheet, View, TouchableHighlight, Pressable} from 'react-native';

import {AppText} from '../common/AppText';
import {getFontSize} from '../../utils/font';
import AppIcon from '../common/AppIcon';
import type Todo from '@/models/todo';
import color from '@/styles/color';

export type ToDoListItemProps = {
  /** 아이템 내 카테고리 존재 여부 */
  hasMainCategory?: boolean;

  /** 아이템 data object */
  item: Todo;
};

const ToDoListItem = ({
  hasMainCategory = true,
  index,
  item,
  onPressAddItem,
}: any): React.JSX.Element => {
  return (
    <View style={styles.toDoListItemContainer}>
      <View style={styles.toDoListItemTextContainer}>
        <View style={hasMainCategory ? styles.toDoListItemTextWrapper : styles.toDoListContentListWrapper}>
          {hasMainCategory ? (
            <AppText style={styles.toDoListItemCategory}>
              {item.category ? item.category.title : '기타'}
            </AppText>
          ) : (
            <></>
          )}
          <AppText
            style={
              hasMainCategory
                ? styles.toDoListItemTitleWithCategory
                : styles.toDoListItemTitle
            }>
            {item.title}
          </AppText>
        </View>
        <View style={styles.toDoListItemSeparator} />
      </View>

      {/** NOTE TouchableHighlight + icon = Pressable Button 변경 가능성 있음 */}
      <View style={styles.toDoListItemButtonContainer}>
        <AppIcon 
          name={item.isSaved ? "checkBoxCircle" :"addCircle"}
          width={42} 
          height={42} 
          styles={item.isSaved ? {fill: color.grey.grey500, stroke: color.main.white} : {}}
          onPress={() => onPressAddItem(item, index)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toDoListItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#E7EDF3',
    borderRadius: 10,
    paddingLeft: 16,
  },
  toDoListItemTextContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  toDoListItemTextWrapper: {
    // NOTE 한번 더 고민해야 할 부분
    // 컨텐츠 모달 내 컴포넌트와 검색 탭 내 컴포넌트 padding값 관리 협의 필요
    paddingVertical: 18,
  },
  toDoListContentListWrapper: {
    paddingVertical: 25,
  },
  toDoListItemCategory: {
    alignSelf: 'flex-start',

    fontWeight: '600',
    fontSize: getFontSize(12),
    lineHeight: 15,
    color: '#A1ACB9',

    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: 11,
    backgroundColor: '#F2F4F7',
  },
  toDoListItemTitle: {
    fontWeight: '500',
    fontSize: getFontSize(15),
    lineHeight: 18,
    color: '#40474F',
  },
  toDoListItemTitleWithCategory: {
    fontWeight: '600',
    fontSize: getFontSize(16),
    lineHeight: 20,
    color: '#000E24',
  },
  toDoListItemSeparator: {
    borderWidth: 1,
    borderColor: '#E7EDF3',
    borderStyle: 'dashed',
  },
  toDoListItemButtonContainer: {
    width: '100%',
    height: '100%',

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ToDoListItem;
