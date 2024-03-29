import * as React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';

type AddSubTodoButtonProps = {
  todoItem: object;
};

export function AddSubTodoButton({
  todoItem,
}: AddSubTodoButtonProps): React.JSX.Element {
  const navigation = useNavigation();

  const moveToScreen = (screen: string, params: object) => {
    navigation.navigate(screen, params);
  };

  return (
    <AppButton
      text="항목 추가하기"
      buttonStyle={styles.button}
      textStyle={styles.buttonText}
      endIcon={{
        type: 'stroke',
        name: 'addLight',
        width: 36,
        height: 36,
      }}
      onPressButton={() =>
        moveToScreen('TodoForm', {
          form: 'SUBTODO',
          headerTitle: '항목 추가하기',
          todoItem,
        })
      }
    />
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 6,
    paddingLeft: 27,
    paddingRight: 12,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: color.grey200,
    backgroundColor: color.grey100,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: color.grey700,
  },
});
