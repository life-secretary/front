import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRecoilState} from 'recoil';
import {todoListState} from '../../store/todoState';
import {removeItemAtIndex} from '@/utils';

import {AppHeader} from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';
import AppBottomSheet from '@/components/common/modal/AppBottomSheet';
import AppConfirmModal from '@/components/common/modal/AppConfirmModal';
import {TodoDetail} from '@/components/todo/detail/TodoDetail';
import {SubTodoList} from '@/components/todo/detail/SubTodoList';
import color from '@/styles/color';

export function TodoDetailModalScreen({navigation, route}: any) {
  const {todoItem} = route.params;
  const [isVisible, setIsVisible] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const itemIndex = todoList.findIndex(
    (item: object) => item.id === todoItem?.id,
  );

  const handleBottomSheetVisible = React.useCallback((arg: boolean) => {
    setIsVisible(arg);
  }, []);

  const handleModalVisible = (arg: boolean) => {
    setIsModalVisible(arg);
  };

  const handleEditButtonPress = () => {
    navigation.navigate('TodoForm', {
      form: 'TODO',
      isEditMode: true,
      headerTitle: '할 일 수정',
      todoItem,
    });
    handleBottomSheetVisible(false);
  };

  // TODO: DELETE TODO 호출 위치 고민
  const handleDeleteButtonPress = () => {
    const newList = removeItemAtIndex(todoList, itemIndex);

    setTodoList(newList);
    navigation.navigate('Todo');
  };

  return (
    <View style={styles.layout}>
      <SafeAreaView>
        <AppHeader style={styles.header}>
          <AppIcon
            type="fill"
            name="backLight"
            width={42}
            height={42}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.headerButtonContainer}>
            <AppButton
              text="완료"
              buttonStyle={styles.completeButton}
              textStyle={styles.completeButtonText}
            />
            <AppIcon
              type="stroke"
              name="select"
              width={42}
              height={42}
              onPress={() => handleBottomSheetVisible(true)}
            />
          </View>
        </AppHeader>
        <TodoDetail todoItem={{...todoItem}} />
      </SafeAreaView>
      <SubTodoList todoItem={{...todoItem}} />
      <AppBottomSheet
        isVisible={isVisible}
        handleBottomSheetVisible={handleBottomSheetVisible}
        contentsStyle={styles.bottomSheetContainer}>
        <View style={styles.buttonContainer}>
          <AppButton
            text="삭제하기"
            buttonStyle={styles.bottomSheetButton}
            textStyle={styles.bottomSheetButtonText}
            startIcon={{
              type: 'stroke',
              name: 'trash',
              width: 24,
              height: 24,
            }}
            onPressButton={() => handleModalVisible(true)}
          />
          <AppButton
            text="수정하기"
            buttonStyle={styles.bottomSheetButton}
            textStyle={styles.bottomSheetButtonText}
            startIcon={{
              type: 'stroke',
              name: 'edit',
              width: 24,
              height: 24,
            }}
            onPressButton={() => handleEditButtonPress()}
          />
        </View>
      </AppBottomSheet>
      <AppConfirmModal
        isVisible={isModalVisible}
        type="row"
        title="삭제할까요?"
        description="삭제한 항목은 되돌릴 수 없어요"
        button={{
          first: {
            text: '취소',
            textStyle: styles.modalFirstButtonText,
            buttonStyle: styles.modalFirstButton,
            onPressButton: () => {
              handleModalVisible(false);
            },
          },
          second: {
            text: '삭제하기',
            textStyle: styles.modalSecondButtonText,
            buttonStyle: styles.modalSecondButton,
            onPressButton: () => {
              handleDeleteButtonPress();
            },
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: color.grey700,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  headerButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  completeButton: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  completeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: color.secondary,
  },
  bottomSheetContainer: {
    paddingTop: 23,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  bottomSheetButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    backgroundColor: color.grey100,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  bottomSheetButtonText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  modalFirstButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 16,
    backgroundColor: color.grey200,
  },
  modalFirstButtonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  modalSecondButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 16,
    backgroundColor: color.primary,
  },
  modalSecondButtonText: {
    fontWeight: '600',
    textAlign: 'center',
    color: color.white,
  },
});
