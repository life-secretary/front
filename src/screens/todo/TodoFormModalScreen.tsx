import * as React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {AppText} from '../../components/common/AppText';
import AppIcon from '@/components/common/AppIcon';
import {AppHeader} from '../../components/common/AppHeader';
import {AppLayout} from '../../components/common/AppLayout';
import AppBottomSheet from '@/components/common/modal/AppBottomSheet';
import {TodoForm} from '@/components/todo/detail/form/TodoForm';
import {SubTodoForm} from '@/components/todo/detail/form/SubTodoForm';
import {TodoFieldSelect} from '@/components/todo/TodoFieldSelect';
import color from '@/styles/color';

export function TodoFormModalScreen({route, navigation}: any) {
  const {headerTitle, form, todoItem, isEditMode} = route.params;
  const defaultField = isEditMode
    ? todoItem?.field
    : {key: 'NONE', text: '선택안함'};

  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedField, setSelectedField] = React.useState(defaultField);

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
              handleSelectField={(arg: object) => setSelectedField(arg)}
              selectedField={selectedField}
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
        <TodoFieldSelect
          isVisible={isVisible}
          handleSelectField={(arg: object) => setSelectedField(arg)}
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
    fontWeight: '600',
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
