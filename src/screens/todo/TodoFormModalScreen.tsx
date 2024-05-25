import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {bottomSheetVisibleState} from '@/store/bottomSheetState';

import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {AppText} from '../../components/common/AppText';
import AppIcon from '@/components/common/AppIcon';
import {AppHeader} from '../../components/common/AppHeader';
import {AppLayout} from '../../components/common/AppLayout';
import AppBottomSheet from '@/components/common/modal/AppBottomSheet';
import {TodoForm} from '@/components/todo/detail/form/TodoForm';
import {SubTodoForm} from '@/components/todo/detail/form/SubTodoForm';
import {TodoCategorySelect} from '@/components/todo/TodoCategorySelect';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {getFontSize} from '@/utils/font';

export function TodoFormModalScreen({route, navigation}: any) {
  const {headerTitle, form, todoItem, isEditMode} = route.params;
  const isVisible = useRecoilValue(bottomSheetVisibleState);

  // TODO: 리팩토링 필요
  const setDefaulCategory = () => {
    if (isEditMode) {
      if (todoItem?.userTag) {
        return {id: null, key: 'custom', title: todoItem?.userTag};
      }

      if (todoItem?.category) {
        return {
          id: todoItem.category?.id,
          key: todoItem.category?.category,
          title: todoItem.category?.title,
        };
      }
    }

    return {id: null, key: 'none', title: '선택안함'};
  };

  const [selectedCategory, setSelectedCategory] = useState(setDefaulCategory());

  return (
    <>
      <AppLayout isPaddingUsed={true}>
        <AppHeader style={styles.header}>
          <View style={styles.titleContainer}>
            <AppText style={styles.title}>{headerTitle}</AppText>
          </View>
          <View style={styles.iconContainer}>
            <AppIcon
              name="closeDark"
              width={42}
              height={42}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </AppHeader>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {form === 'TODO' ? (
            <TodoForm
              isEditMode={isEditMode}
              todoItem={todoItem}
              handleSelectCategory={(category: any) =>
                setSelectedCategory(category)
              }
              selectedCategory={selectedCategory}
              isVisible={isVisible}
            />
          ) : (
            <SubTodoForm todoItem={todoItem} />
          )}
        </KeyboardAvoidingView>
      </AppLayout>
      <AppBottomSheet snapPointsArr={['70%']}>
        <TodoCategorySelect
          handleSelectCategory={(arg: object) => setSelectedCategory(arg)}
        />
      </AppBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-end',
    marginTop: 12, // 아이콘 있는 헤더
    marginBottom: 27,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    height: 24,
    fontSize: getFontSize(20),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 23.87,
    color: color.grey.grey700,
  },
  iconContainer: {},
  container: {
    flex: 1,
  },
});
