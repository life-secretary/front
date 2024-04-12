import React, {useRef, useState} from 'react';
import {deleteData, updateData} from '@/api/api';

import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import spacing from '@/styles/spacing';
import color from '@/styles/color';
import {font} from '@/styles/font';
import OutsidePressHandler from 'react-native-outside-press';

type ItemProps = {
  todoItem: object;
  subTodoItem: object;
};

export function SubTodoItem({
  todoItem,
  subTodoItem,
}: ItemProps): React.JSX.Element {
  const [title, onChangeTitle] = useState(subTodoItem?.title || '');
  const [isChecked, setIsChecked] = useState(subTodoItem?.isDone || false);
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef(null);

  const itemWidth =
    Dimensions.get('window').width - spacing.layoutPaddingHorizontal * 2;

  const parentTodoId = todoItem?.id;
  const isCompletedMode = todoItem?.isDone;

  const handleOutsidePress = () => {
    handleInputBlur();
  };

  const handleInputPress = () => {
    setIsEditable(true);
  };

  const handleInputBlur = () => {
    inputRef?.current.blur();
    setIsEditable(false);
  };

  const handleCheckboxPress = (status: boolean) => {
    editSubTodo(subTodoItem?.id, status);
    setIsChecked(status);
  };

  const editSubTodo = async (subTodoId: string, isDone?: boolean) => {
    const editedSubTodo = {
      title,
      isDone,
    };

    await updateData(
      `/user-todos/${parentTodoId}/sub`,
      subTodoId,
      editedSubTodo,
    );
  };

  const deleteSubTodo = async (subTodoId: string) => {
    await deleteData(`/user-todos/${parentTodoId}/sub`, {}, subTodoId);
  };

  // TODO: 수정 완료/취소 동작 구분
  const handleInputSubmit = (id: string) => {
    editSubTodo(id);
  };

  const handleDeleteButtonPress = (id: string) => {
    deleteSubTodo(id);
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.itemWrapper}>
        <View style={[styles.itemContainer, {width: itemWidth}]}>
          <View style={styles.titleContainer}>
            <View style={styles.titleWrapper}>
              <AppIcon name="hamburger" width={24} height={24} />
              <View style={isEditable && styles.inputContainer}>
                <OutsidePressHandler onOutsidePress={handleOutsidePress}>
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
                </OutsidePressHandler>
              </View>
            </View>
            <View style={styles.divider} />
          </View>
          <View style={styles.checkboxContainer}>
            <BouncyCheckbox
              size={18}
              fillColor={color.grey.grey500}
              iconStyle={styles.checkbox}
              disableText={true}
              disabled={isCompletedMode}
              isChecked={isChecked}
              onPress={checked => handleCheckboxPress(checked)}
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
            styles: {color: color.main.white},
          }}
          onPressButton={() => handleDeleteButtonPress(subTodoItem?.id)}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: color.grey.grey200,
  },
  titleContainer: {
    width: '80%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: color.grey.grey500,
  },
  input: {
    fontSize: 16,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
    color: color.main.black,
  },
  activeText: {
    color: color.grey.grey700,
  },
  divider: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: color.grey.grey200,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 1.5,
    marginHorizontal: 12,
  },
  deleteButton: {
    gap: 4,
    borderRadius: 10,
    paddingHorizontal: 17,
    paddingVertical: 12,
    backgroundColor: color.state.error,
  },
  deleteButtonText: {
    fontSize: 12,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 14.32,
    letterSpacing: font.letterSpacing.medium,
    color: color.main.white,
  },
});
