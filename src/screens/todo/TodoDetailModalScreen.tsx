import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRecoilState} from 'recoil';
import {todoListState} from '@/store/todoState';
import {removeItemAtIndex} from '@/utils';

import {AppHeader} from '@/components/common/AppHeader';
import {AppText} from '@/components/common/AppText';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';
import AppBottomSheet from '@/components/common/modal/AppBottomSheet';
import AppConfirmModal from '@/components/common/modal/AppConfirmModal';
import {TodoDetail} from '@/components/todo/detail/TodoDetail';
import {SubTodoList} from '@/components/todo/detail/SubTodoList';
import color from '@/styles/color';

export function TodoDetailModalScreen({navigation, route}: any) {
  const {todoItem} = route.params;
  const [isBottomSheetVisible, setIsBottomSheetVisible] = React.useState(false);
  const [bottomSheetMode, setBottomSheetMode] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const isCompleted = todoItem?.isCompleted;

  const itemIndex = todoList.findIndex(item => item.id === todoItem?.id);

  const handleBottomSheetVisible = (status: boolean, mode: string) => {
    setBottomSheetMode(mode);
    setIsBottomSheetVisible(status);
  };

  const handleModalVisible = (arg: boolean) => {
    setIsModalVisible(arg);
  };

  const handleCloseButtonPress = (mode: string) => {
    handleBottomSheetVisible(false, mode);
  };

  const handleEditButtonPress = () => {
    navigation.navigate('TodoForm', {
      form: 'TODO',
      isEditMode: true,
      headerTitle: '할 일 수정',
      todoItem,
    });
    handleBottomSheetVisible(false, 'editAndDelete');
  };

  const deleteTodo = () => {
    const newList = removeItemAtIndex(todoList, itemIndex);

    setTodoList(newList);
  };

  // TODO: DELETE TODO 호출 위치 고민
  const handleDeleteButtonPress = () => {
    deleteTodo();
    navigation.navigate('Todo');
  };

  const handleRetryButtonPress = () => {};

  return (
    <View style={[styles.layout, isCompleted && styles.complete]}>
      <SafeAreaView>
        <AppHeader style={styles.header}>
          <AppIcon
            name="back"
            width={42}
            height={42}
            styles={{ color: '#FFFFFF' }}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.headerButtonContainer}>
            {!isCompleted && (
              <AppButton
                text="완료"
                buttonStyle={styles.completeButton}
                textStyle={styles.completeButtonText}
                onPressButton={() => handleBottomSheetVisible(true, 'complete')}
              />
            )}
            <AppIcon
              name="select"
              width={42}
              height={42}
              onPress={() => handleBottomSheetVisible(true, 'editAndDelete')}
            />
          </View>
        </AppHeader>
        <TodoDetail todoItem={{...todoItem}} />
      </SafeAreaView>
      <SubTodoList todoItem={{...todoItem}} />
      <AppBottomSheet
        isVisible={bottomSheetMode === 'editAndDelete' && isBottomSheetVisible}
        mode={bottomSheetMode}
        handleBottomSheetVisible={handleBottomSheetVisible}
        contentsStyle={styles.bottomSheetContainer}
        snapPointsArr={['18%']}>
        <View style={styles.buttonContainer}>
          <AppButton
            text="삭제하기"
            buttonStyle={[styles.bottomSheetButton, styles.lightButton]}
            textStyle={styles.bottomSheetButtonText}
            startIcon={{
              type: 'stroke',
              name: 'trash',
              width: 24,
              height: 24,
            }}
            onPressButton={() => handleModalVisible(true)}
          />
          {isCompleted ? (
            <AppButton
              text="다시하기"
              buttonStyle={[styles.bottomSheetButton, styles.lightButton]}
              textStyle={styles.bottomSheetButtonText}
              startIcon={{
                type: 'stroke',
                name: 'reload',
                width: 24,
                height: 24,
              }}
              onPressButton={() => handleRetryButtonPress()}
            />
          ) : (
            <AppButton
              text="수정하기"
              buttonStyle={[styles.bottomSheetButton, styles.lightButton]}
              textStyle={styles.bottomSheetButtonText}
              startIcon={{
                type: 'stroke',
                name: 'edit',
                width: 24,
                height: 24,
              }}
              onPressButton={() => handleEditButtonPress()}
            />
          )}
        </View>
      </AppBottomSheet>
      <AppBottomSheet
        isVisible={bottomSheetMode === 'complete' && isBottomSheetVisible}
        handleBottomSheetVisible={handleBottomSheetVisible}
        contentsStyle={styles.bottomSheetContainer}
        snapPointsArr={['30%']}>
        <View style={styles.contentsContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.closeButton}>
              <AppIcon
                type="stroke"
                name="closeDark"
                width={36}
                height={36}
                onPress={() => handleCloseButtonPress('complete')}
              />
            </View>
            <AppText style={styles.contentsTitle}>
              목표를 아직 채우지 못했어요!
            </AppText>
            <AppText style={styles.contentsDescription}>
              현재 상태로 완료 처리할까요?
            </AppText>
          </View>
          <AppButton
            text="완료하기"
            textStyle={styles.bottomSheetButtonBoldText}
            buttonStyle={[styles.bottomSheetButton, styles.darkButton]}
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
  complete: {
    backgroundColor: color.grey600,
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
    paddingHorizontal: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 23,
  },
  bottomSheetButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  lightButton: {
    flex: 1,
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: color.grey100,
  },
  darkButton: {
    paddingVertical: 16,
    backgroundColor: color.primary,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  bottomSheetButtonText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomSheetButtonBoldText: {
    fontWeight: '600',
    color: color.white,
  },
  contentsContainer: {
    gap: 30,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 8,
  },
  contentsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: color.grey700,
  },
  contentsDescription: {
    fontSize: 15,
    fontWeight: '500',
    color: color.grey500,
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
