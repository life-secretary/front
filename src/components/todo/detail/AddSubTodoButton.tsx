import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';
import {font} from '@/styles/font';

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
    <View style={styles.buttonContainer}>
      <AppButton
        text="항목 추가하기"
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        endIcon={{
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
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    marginLeft: -50,
    left: '50%',
    bottom: 53,
  },
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
    borderColor: color.grey.grey200,
    backgroundColor: color.grey.grey100,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 16.71,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
});
