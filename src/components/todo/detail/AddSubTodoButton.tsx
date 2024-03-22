import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {useNavigation} from '@react-navigation/native';
import {SubTodoForm} from '@/components/todo/detail/form/SubTodoForm';

export function AddSubTodoButton(): React.JSX.Element {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.buttonContainer}
      onPress={() =>
        navigation.navigate('Form', {
          form: <SubTodoForm />,
          headerTitle: '항목 추가하기',
        })
      }>
      <AppText style={styles.buttonText}>항목 추가하기</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    // flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#E7EDF3',
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000E24',
  },
});
