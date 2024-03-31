import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {todoListState} from '@/store/todoState';
import {replaceItemAtIndex} from '@/utils';

import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
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
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [title, onChangeTitle] = React.useState(subTodoItem?.title);
  const [isChecked, setIsChecked] = React.useState(subTodoItem?.isCompleted);
  const [isEditable, setIsEditable] = React.useState(false);
  const navigation = useNavigation();
  const inputRef = React.useRef(null);

  // TODO: spacing 상수 값으로 변경
  const itemWidth = Dimensions.get('window').width - 24 * 2;

  const todoItemIndex = todoList.findIndex(todo => todo.id === todoItem.id);
  const subTodoList = todoItem?.subTodoList;

  const handleInputPress = () => {
    setIsEditable(true);
  };

  const handleInputBlur = () => {
    inputRef?.current.blur();
    setIsEditable(false);
  };

  const editSubTodo = (subTodoId: string) => {
    const subTodoItemIndex = subTodoList?.findIndex(
      (subTodo: object) => subTodo?.id === subTodoId,
    );

    const newSubTodoList = replaceItemAtIndex(subTodoList, subTodoItemIndex, {
      ...subTodoItem,
      title,
    });

    const newTodoList = replaceItemAtIndex(todoList, todoItemIndex, {
      ...todoItem,
      subTodoList: newSubTodoList,
    });

    setTodoList(newTodoList);
  };

  const deleteSubTodo = (subTodoId: string) => {
    const filteredSubTodoList = subTodoList?.filter(
      (subTodo: object) => subTodo?.id !== subTodoId,
    );

    const newTodoList = replaceItemAtIndex(todoList, todoItemIndex, {
      ...todoItem,
      subTodoList: filteredSubTodoList,
    });

    setTodoList(newTodoList);
  };

  // TODO: 수정 완료/취소 동작 구분
  const handleInputSubmit = (id: string) => {
    editSubTodo(id);
    // TODO: 즉시 subtodo list를 update하는 function 필요
    navigation.navigate('Todo');
  };

  const handleDeleteButtonPress = (id: string) => {
    deleteSubTodo(id);
    // TODO: 즉시 subtodo list를 update하는 function 필요
    navigation.navigate('Todo');
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={handleInputBlur}>
        <View style={styles.itemWrapper}>
          <View style={[styles.itemContainer, {width: itemWidth}]}>
            <View style={styles.titleContainer}>
              <View style={styles.titleWrapper}>
                <AppIcon
                  name="hamburger"
                  width={24}
                  height={24}
                />
                <View style={isEditable && styles.inputContainer}>
                  <TextInput
                    ref={inputRef}
                    value={title}
                    style={[styles.input, isEditable && styles.activeText]}
                    editable={isEditable}
                    onChangeText={onChangeTitle}
                    onPressIn={handleInputPress}
                    onBlur={handleInputBlur}
                    onSubmitEditing={() => handleInputSubmit(subTodoItem?.id)}
                  />
                </View>
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
          <AppButton
            text="지우기"
            textStyle={styles.deleteButtonText}
            buttonStyle={styles.deleteButton}
            startIcon={{
              name: 'trash',
              width: 32,
              height: 32,
              styles: { color: '#FFFFFF' }
            }}
            onPressButton={() => handleDeleteButtonPress(subTodoItem?.id)}
          />
        </View>
      </TouchableWithoutFeedback>
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
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    height: '100%',
  },
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
  },
  inputContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: color.grey500,
  },
  input: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeText: {
    color: color.grey700,
  },
  divider: {
    borderWidth: 1,
    borderColor: color.grey200,
    borderStyle: 'dashed',
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
