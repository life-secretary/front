import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {todoListState} from '@/store/todoState';

import {StyleSheet, View, ScrollView} from 'react-native';
import {AppLayout} from '@/components/common/AppLayout';
import {AppHeader} from '@/components/common/AppHeader';
import {AppTitle} from '@/components/common/AppTitle';
import AppIcon from '@/components/common/AppIcon';
import {TodoTabBar} from '@/components/todo/TodoTabBar';
import {OngoingTodoList} from '@/components/todo/OngoingTodoList';
import {CompletedTodoList} from '@/components/todo/CompletedTodoList';
import color from '@/styles/color';
import {font} from '@/styles/font';

export function TodoScreen({navigation}: any): React.JSX.Element {
  const todoList = useRecoilValue(todoListState);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const moveToScreen = (screen: string, params: object) => {
    navigation.navigate(screen, params);
  };

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
  };

  const handleAddButtonPress = () => {
    moveToScreen('TodoForm', {
      form: 'TODO',
      headerTitle: '할 일 생성하기',
    });
  };

  return (
    <AppLayout style={styles.layout}>
      <AppHeader style={styles.header}>
        <AppTitle text="To Do" style={styles.title} />
        <View style={styles.button}>
          <AppIcon
            name="addDark"
            width={42}
            height={42}
            onPress={() => handleAddButtonPress()}
          />
        </View>
      </AppHeader>
      <View style={styles.container}>
        <TodoTabBar
          tabOptions={['진행 중', '완료']}
          selectedIndex={selectedIndex}
          onTabPress={(index: number) => handleIndexChange(index)}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {selectedIndex === 0 && (
            <OngoingTodoList
              data={todoList.filter(todo => todo?.isDone === false)}
            />
          )}
          {selectedIndex === 1 && (
            <CompletedTodoList
              data={todoList.filter(todo => todo?.isDone === true)}
            />
          )}
        </ScrollView>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: color.grey.grey100,
  },
  container: {
    flex: 1,
  },
  header: {
    minHeight: 42,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: font.fontWeight.bold,
    lineHeight: 23.87,
    letterSpacing: font.letterSpacing.medium,
  },
  button: {
    position: 'absolute',
    right: 0,
  },
});
