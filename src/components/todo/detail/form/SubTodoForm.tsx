import * as React from 'react';
import {useRecoilState} from 'recoil';
import {todoListState} from '@/store/todoState';
import {useNavigation} from '@react-navigation/native';

import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {AppInput} from '@/components/common/AppInput';
import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';

import {generateRandomId, replaceItemAtIndex} from '@/utils';
import {font} from '@/styles/font';

type SubTodoFormProps = {
  todoItem: object;
};

export function SubTodoForm({todoItem}: SubTodoFormProps) {
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [subTitle, setSubTitle] = React.useState('');
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const navigation = useNavigation();

  const itemIndex = todoList.findIndex(
    (item: object) => item.id === todoItem?.id,
  );

  const resetForm = () => {
    setSubTitle('');
  };

  const addSubTodo = () => {
    const newSubTodo = {
      id: generateRandomId(),
      title: subTitle,
      isCompleted: false,
    };

    const newSubTodoList = [...todoItem?.subTodoList, newSubTodo];

    const newList = replaceItemAtIndex(todoList, itemIndex, {
      ...todoItem,
      subTodoList: newSubTodoList,
    });

    setTodoList(newList);

    resetForm();
    navigation.goBack();
  };

  React.useEffect(() => {
    if (subTitle === '') {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [subTitle]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.form}>
        <AppInput
          hasLabel={true}
          labelText="할 일 제목"
          text={todoItem?.title}
          disabled={true}
          editable={false}
        />
        <AppInput
          hasLabel={true}
          labelText="항목 명"
          placeholder="최대 18자 내로 입력 가능해요"
          text={subTitle}
          maxLength={18}
          onChangeText={setSubTitle}
        />
      </View>
      <AppButton
        text="완료"
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        isDisabled={isEmpty}
        disabledBackgroundColor={color.grey.grey300}
        onPressButton={addSubTodo}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    gap: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: color.main.primary,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
    color: color.main.white,
  },
});
