import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {todoListState} from '@/store/todoState';
import {replaceItemAtIndex} from '@/utils';

import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {AppText} from '../../common/AppText';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import color from '@/styles/color';

type ItemProps = {
  todoItem: object;
  subTodoItem: object;
};

export function SubTodoItem({
  todoItem,
  subTodoItem,
}: ItemProps): React.JSX.Element {
  const navigation = useNavigation();
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [isChecked, setIsChecked] = React.useState(subTodoItem?.isCompleted);

  // TODO: spacing 상수 값으로 변경
  const itemWidth = Dimensions.get('window').width - 24 * 2;

  const deleteSubTodo = (subTodoId: string) => {
    const todoItemIndex = todoList.findIndex(todo => todo.id === todoItem.id);
    const currentSubTodoList = todoItem?.subTodoList;

    const filteredSubTodoList = currentSubTodoList?.filter(
      (subTodo: object) => subTodo?.id !== subTodoId,
    );

    const newList = replaceItemAtIndex(todoList, todoItemIndex, {
      ...todoItem,
      subTodoList: filteredSubTodoList,
    });

    setTodoList(newList);
  };

  const handleDeleteButtonPress = (id: string) => {
    deleteSubTodo(id);
    // TODO: 즉시 subtodo list를 update하는 function 필요
    navigation.navigate('Todo');
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.itemWrapper}>
        <View style={[styles.itemContainer, {width: itemWidth}]}>
          <View style={styles.titleContainer}>
            <View style={styles.titleWrapper}>
              <AppIcon type="stroke" name="hamburger" width={24} height={24} />
              <AppText style={styles.titleText}>{subTodoItem?.title}</AppText>
            </View>
            <View style={styles.divider} />
          </View>
          <View style={styles.checkboxContainer}>
            <BouncyCheckbox
              size={18}
              fillColor={color.grey500}
              iconStyle={{borderWidth: 1.5, marginHorizontal: 12}}
              disableText={true}
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            text="지우기"
            textStyle={styles.deleteButtonText}
            buttonStyle={styles.deleteButton}
            startIcon={{
              type: 'stroke',
              name: 'trashLight',
              width: 32,
              height: 32,
            }}
            onPressButton={() => handleDeleteButtonPress(subTodoItem?.id)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    gap: 12,
  },
  itemContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: color.grey200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    height: '100%',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  divider: {
    borderWidth: 1,
    borderColor: color.grey200,
    borderStyle: 'dashed',
  },
  checkboxContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: '600',
  },
  buttonContainer: {},
  deleteButton: {
    gap: 4,
    borderRadius: 10,
    paddingHorizontal: 17,
    paddingVertical: 12,
    backgroundColor: color.error,
  },
  deleteButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: color.white,
  },
});
