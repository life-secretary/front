import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';

import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppHeader} from '@/components/common/AppHeader';
import {AppText} from '@/components/common/AppText';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';
import AppBottomSheet from '@/components/common/modal/AppBottomSheet';
import AppConfirmModal from '@/components/common/modal/AppConfirmModal';
import {TodoDetail} from '@/components/todo/detail/TodoDetail';
import {SubTodoList} from '@/components/todo/detail/SubTodoList';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {
  bottomSheetModeState,
  bottomSheetVisibleState,
} from '@/store/bottomSheetState';
import {createData, deleteData, fetchData, updateData} from '@/api/api';
import Toast from 'react-native-toast-message';
import {getFormattedDate} from '@/utils';

export function TodoDetailModalScreen({navigation, route}: any) {
  const {todoItem} = route.params;
  const setIsBottomSheetVisible = useSetRecoilState(bottomSheetVisibleState);
  const [bottomSheetMode, setBottomSheetMode] =
    useRecoilState(bottomSheetModeState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessed, setIsSuccessed] = useState(false);
  const [subTodoList, setSubTodoList] = useState([]);
  const isCompleteMode = todoItem?.isDone;
  const todoId = todoItem?.id;

  const handleModalVisible = (status: boolean) => {
    setIsModalVisible(status);
  };

  const handleCloseButtonPress = () => {
    setIsBottomSheetVisible(false);
  };

  const handleEditButtonPress = () => {
    navigation.navigate('TodoForm', {
      form: 'TODO',
      isEditMode: true,
      headerTitle: '할 일 수정',
      todoItem,
    });

    setIsBottomSheetVisible(false);
  };

  const deleteTodo = async () => {
    const res = await deleteData('/user-todos', {}, todoId);

    if (res.status === 200) {
      navigation.navigate('Todo');
      Toast.show({
        type: 'success',
        props: {text: '할 일이 삭제되었어요'},
        position: 'bottom',
        bottomOffset: 20,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const handleDeleteButtonPress = () => {
    deleteTodo();
  };

  const handleRetryButtonPress = () => {
    retryTodo(todoItem?.id);
  };

  const handleCompleteButtonPress = () => {
    completeTodo(todoItem?.id);
  };

  const completeTodo = async (id: number) => {
    const completedTodo = {
      title: todoItem?.title,
      categoryId: todoItem?.categoryId,
      userTag: todoItem?.userTag || '',
      isDone: true,
    };

    const res = await updateData('/user-todos', id, completedTodo);

    if (res.status === 200) {
      navigation.navigate('Todo');
    }
  };

  const retryTodo = async (id: number) => {
    const res = await createData(`/user-todos/retry/${id}`, {});

    if (res.status === 200) {
      // TODO: 완료 투두 리스트에 있는 해당 투두 아이템 제거 필요
      navigation.navigate('Todo');
    }
  };

  const fetchSubTodoList = useCallback(async () => {
    const res = await fetchData(`/user-todos/${todoId}/sub`, {});
    if (res.status === 200) {
      setSubTodoList(res.data.data);
    }
  }, [todoId]);

  const hasNotYetDoneSubTodo = useMemo(() => {
    return subTodoList.some((todo: object) => todo?.isDone === false);
  }, [subTodoList]);

  useEffect(() => {
    fetchSubTodoList();
  }, [fetchSubTodoList, subTodoList]);

  useEffect(() => {
    hasNotYetDoneSubTodo ? setIsSuccessed(false) : setIsSuccessed(true);

    return () => {
      setIsBottomSheetVisible(false);
    };
  }, [hasNotYetDoneSubTodo, setIsBottomSheetVisible]);

  return (
    <View style={[styles.layout, isCompleteMode && styles.completed]}>
      <SafeAreaView>
        <AppHeader style={styles.header}>
          <AppIcon
            name="back"
            width={42}
            height={42}
            styles={{color: color.main.white}}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.headerButtonContainer}>
            {!isCompleteMode && (
              <AppButton
                text="완료"
                buttonStyle={styles.completeButton}
                textStyle={styles.completeButtonText}
                onPressButton={() => {
                  setBottomSheetMode('complete');
                  setIsBottomSheetVisible(true);
                }}
              />
            )}
            <AppIcon
              name="select"
              width={42}
              height={42}
              styles={{color: color.main.white}}
              onPress={() => {
                setBottomSheetMode('editAndDelete');
                setIsBottomSheetVisible(true);
              }}
            />
          </View>
        </AppHeader>
        <TodoDetail todoItem={{...todoItem}} isCompleteMode={isCompleteMode} />
      </SafeAreaView>
      <SubTodoList
        todoItem={{...todoItem}}
        subTodoList={subTodoList}
        isCompleteMode={isCompleteMode}
      />
      {bottomSheetMode === 'editAndDelete' && (
        <AppBottomSheet
          contentsStyle={styles.bottomSheetContainer}
          snapPointsArr={['18%']}>
          <View style={styles.buttonContainer}>
            <AppButton
              text="삭제하기"
              buttonStyle={[styles.bottomSheetButton, styles.lightButton]}
              textStyle={styles.bottomSheetButtonText}
              startIcon={{
                name: 'trash',
                width: 24,
                height: 24,
              }}
              onPressButton={() => handleModalVisible(true)}
            />
            {isCompleteMode ? (
              <AppButton
                text="다시하기"
                buttonStyle={[styles.bottomSheetButton, styles.lightButton]}
                textStyle={styles.bottomSheetButtonText}
                startIcon={{
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
                  name: 'edit',
                  width: 24,
                  height: 24,
                }}
                onPressButton={() => handleEditButtonPress()}
              />
            )}
          </View>
        </AppBottomSheet>
      )}
      {bottomSheetMode === 'complete' && (
        <AppBottomSheet
          contentsStyle={styles.bottomSheetContainer}
          snapPointsArr={isSuccessed ? ['35%'] : ['30%']}>
          <View style={styles.contentsContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.closeButton}>
                <AppIcon
                  name="closeDark"
                  width={36}
                  height={36}
                  onPress={handleCloseButtonPress}
                />
              </View>
              <AppText style={styles.contentsTitle}>
                {isSuccessed
                  ? '목표 달성 성공!\n이렇게 또 한걸음 성장했어요'
                  : '목표를 아직 채우지 못했어요!'}
              </AppText>
              <AppText style={styles.contentsDescription}>
                {isSuccessed
                  ? '목표를 완료 처리 할까요?'
                  : '현재 상태로 완료 처리할까요?'}
              </AppText>
            </View>
            <AppButton
              text="완료하기"
              textStyle={styles.bottomSheetButtonBoldText}
              buttonStyle={[styles.bottomSheetButton, styles.darkButton]}
              onPressButton={handleCompleteButtonPress}
            />
          </View>
        </AppBottomSheet>
      )}
      <AppConfirmModal
        isVisible={isModalVisible}
        type="row"
        title="삭제할까요?"
        description="삭제한 항목은 되돌릴 수 없어요"
        button={{
          first: {
            text: '취소',
            textStyle: {
              ...styles.modalButtonText,
              ...styles.modalFirstButtonText,
            },
            buttonStyle: {...styles.modalButton, ...styles.modalFirstButton},
            onPressButton: () => {
              handleModalVisible(false);
            },
          },
          second: {
            text: '삭제하기',
            textStyle: {
              ...styles.modalButtonText,
              ...styles.modalSecondButtonText,
            },
            buttonStyle: {...styles.modalButton, ...styles.modalSecondButton},
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
    backgroundColor: color.grey.grey700,
  },
  completed: {
    backgroundColor: color.grey.grey600,
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
    textAlign: 'center',
    fontSize: 15,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 17.9,
    color: color.main.secondary,
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
    backgroundColor: color.grey.grey100,
  },
  darkButton: {
    paddingVertical: 16,
    backgroundColor: color.main.primary,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  bottomSheetButtonText: {
    textAlign: 'center',
    fontWeight: font.fontWeight.medium,
    lineHeight: 19.09,
    color: color.grey.grey700,
  },
  bottomSheetButtonBoldText: {
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
    color: color.main.white,
  },
  contentsContainer: {
    gap: 30,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 8,
  },
  contentsTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: font.fontWeight.bold,
    lineHeight: 30,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  contentsDescription: {
    fontSize: 15,
    fontWeight: font.fontWeight.medium,
    lineHeight: 17.9,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey500,
  },
  modalButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 16,
  },
  modalButtonText: {
    textAlign: 'center',
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
  },
  modalFirstButton: {
    backgroundColor: color.grey.grey200,
  },
  modalFirstButtonText: {
    color: color.main.primary,
  },
  modalSecondButton: {
    backgroundColor: color.main.primary,
  },
  modalSecondButtonText: {
    color: color.main.white,
  },
});
