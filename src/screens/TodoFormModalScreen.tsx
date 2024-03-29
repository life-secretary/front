import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {AppText} from '../components/common/AppText';
import {AppHeader} from '../components/common/AppHeader';
import {AppLayout} from '../components/common/AppLayout';
import AppBottomSheet from '@/components/common/modal/AppBottomSheet';
import {TodoForm} from '@/components/todo/detail/form/TodoForm';
import {SubTodoForm} from '@/components/todo/detail/form/SubTodoForm';
import {TodoFieldSelect} from '@/components/todo/TodoFieldSelect';

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
          <View style={styles.titleContainer}>
            <AppText style={styles.headerTitle}>{headerTitle}</AppText>
          </View>
          <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              navigation.goBack();
            }}>
            <AppText style={styles.backButton}>X</AppText>
          </Pressable>
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
            <SubTodoForm />
          )}
        </KeyboardAvoidingView>
      </AppLayout>
      <AppBottomSheet
        isVisible={isVisible}
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
  layout: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000E24',
  },
  container: {
    flex: 1,
  },
  titleContainer: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    fontWeight: '700',
  },
});
