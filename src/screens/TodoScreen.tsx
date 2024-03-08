import * as React from 'react';
import {useRecoilValue} from 'recoil';
import todoListState from '../store/todoListState';

import {Button, Pressable, StyleSheet, View, ScrollView} from 'react-native';
import {AppLayout} from '../components/common/AppLayout';
import {AppHeader} from '../components/common/AppHeader';
import {OngoingTodoList} from '../components/todo/OngoingTodoList';
import {CompletedTodoList} from '../components/todo/CompletedTodoList';
import {TodoTabBar} from '../components/todo/TodoTabBar';
import {TodoTitle} from '../components/todo/TodoTitle';
import {TodoForm} from '../components/todo/detail/form/TodoForm';
import {AppText} from '../components/common/AppText';

export function TodoScreen({navigation}: any): React.JSX.Element {
  const todoList = useRecoilValue(todoListState);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <AppLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppHeader style={styles.header}>
          <TodoTitle text="To Do" style={styles.title} />
          <Pressable
            style={styles.buttonContainer}
            onPress={() =>
              navigation.navigate('Form', {
                form: <TodoForm />,
                headerTitle: '할 일 생성하기',
              })
            }>
            <AppText style={styles.addButton}>+</AppText>
          </Pressable>
        </AppHeader>
        <View style={styles.container}>
          <TodoTabBar
            tabOptions={['진행 중', '완료']}
            selectedIndex={selectedIndex}
            onTabPress={(index: number) => handleIndexChange(index)}
          />
          {selectedIndex === 0 && (
            <OngoingTodoList
              data={todoList.filter(todo => todo.isCompleted === false)}
            />
          )}
          {selectedIndex === 1 && (
            <CompletedTodoList
              data={todoList.filter(todo => todo.isCompleted === true)}
            />
          )}
          <Button
            onPress={() => navigation.navigate('Modal')}
            title="Todo Detail Modal"
          />
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 10,
  },
  addButton: {
    fontSize: 20,
    fontWeight: '700',
  },
});
