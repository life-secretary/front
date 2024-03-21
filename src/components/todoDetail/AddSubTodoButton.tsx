import * as React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SubTodoForm} from './SubTodoForm';
import AppButton from '../common/AppButton';

export function AddSubTodoButton(): React.JSX.Element {
  const navigation: any = useNavigation();
  const iconPath = require('@/assets/icon/icon_add_dark.svg');

  const handlePress = () =>
    navigation.navigate('Form', {
      form: <SubTodoForm />,
      headerTitle: '항목 추가하기',
    });

  return (
    <AppButton
      text="항목 추가하기"
      textStyle={styles.buttonText}
      buttonStyle={styles.button}
      endIcon={iconPath}
      onPress={handlePress}>
      항목 추가하기
    </AppButton>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#E7EDF3',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000E24',
  },
});
