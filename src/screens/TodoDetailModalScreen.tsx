import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRecoilState} from 'recoil';
import {todoListState} from '../store/todoState';

import {TodoDetail} from '../components/todo/detail/TodoDetail';
import {SubTodoList} from '../components/todo/detail/SubTodoList';
import AppIcon from '../components/common/AppIcon';
import AppButton from '../components/common/AppButton';
import {AppHeader} from '../components/common/AppHeader';
import AppBottomSheet from '../components/common/modal/AppBottomSheet';
import AppConfirmModal from '../components/common/modal/AppConfirmModal';

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

  function removeItemAtIndex(arr: any[], index: number) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }

  return (
    <SafeAreaView style={styles.layout}>
      <AppHeader>
        <View style={styles.headerContainer}>
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
              name="hamburger"
              width={42}
              height={42}
              onPress={() => handleBottomSheetVisible(true)}
            />
          </View>
        </View>
      </AppHeader>
      <View style={styles.container}>
        <TodoDetail {...todoItem} />
        <SubTodoList subTodoList={todoItem.subTodoList} />
      </View>
      <AppBottomSheet
        isVisible={isVisible}
        handleBottomSheetVisible={handleBottomSheetVisible}
        contentsStyle={styles.bottomSheetContainer}>
        <View style={styles.buttonContainer}>
          <AppButton
            text="삭제하기"
            buttonStyle={styles.bottomSheetButton}
            textStyle={styles.bottomSheetButtonText}
            onPressButton={() => handleModalVisible(true)}
          />
          <AppButton
            text="수정하기"
            buttonStyle={styles.bottomSheetButton}
            textStyle={styles.bottomSheetButtonText}
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
            textStyle: {fontWeight: '600', textAlign: 'center'},
            buttonStyle: {
              flex: 1,
              backgroundColor: '#E7EDF3',
              borderRadius: 10,
              paddingVertical: 16,
            },
            onPressButton: () => {
              handleModalVisible(false);
            },
          },
          second: {
            text: '삭제하기',
            textStyle: {
              fontWeight: '600',
              textAlign: 'center',
              color: '#FFFFFF',
            },
            buttonStyle: {
              flex: 1,
              backgroundColor: '#0B2A4F',
              borderRadius: 10,
              paddingVertical: 16,
            },
            onPressButton: () => {
              handleDeleteButtonPress();
            },
          },
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#000E24',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
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
  container: {
    flex: 1,
  },
  completeButton: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  completeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4681F6',
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
    backgroundColor: '#F2F4F7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  bottomSheetButtonText: {
    fontWeight: '500',
    textAlign: 'center',
  },
});
