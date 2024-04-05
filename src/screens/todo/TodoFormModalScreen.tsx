import * as React from 'react';
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

export function TodoFormModalScreen({route, navigation}: any) {
  const {headerTitle, form, todoItem, isEditMode} = route.params;
  const defaultCategory = isEditMode
    ? todoItem?.category
    : {key: 'NONE', text: '선택안함'};

  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState(defaultCategory);

  const handleBottomSheetVisible = (arg: boolean) => {
    setIsVisible(arg);
  };

  return (
    <>
      <AppLayout>
        <AppHeader style={styles.header}>
          <AppText style={styles.headerTitle}>{headerTitle}</AppText>
          <View style={styles.button}>
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
        <AppText>{isVisible}</AppText>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {form === 'TODO' ? (
            <TodoForm
              isEditMode={isEditMode}
              todoItem={todoItem}
              handleBottomSheetVisible={handleBottomSheetVisible}
              handleSelectCategory={(arg: object) => setSelectedCategory(arg)}
              selectedCategory={selectedCategory}
              isVisible={isVisible}
            />
          ) : (
            <SubTodoForm todoItem={todoItem} />
          )}
        </KeyboardAvoidingView>
      </AppLayout>
      <AppBottomSheet
        isVisible={isVisible}
        snapPointsArr={['65%']}
        handleBottomSheetVisible={handleBottomSheetVisible}>
        <TodoCategorySelect
          isVisible={isVisible}
          handleSelectCategory={(arg: object) => setSelectedCategory(arg)}
          handleBottomSheetVisible={handleBottomSheetVisible}
        />
      </AppBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 42,
    justifyContent: 'center',
    marginTop: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 23.87,
    color: color.grey.grey700,
  },
  button: {
    position: 'absolute',
    right: 0,
  },
  container: {
    flex: 1,
  },
});
