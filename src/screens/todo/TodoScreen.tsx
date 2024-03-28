import * as React from 'react';
import {useRecoilValue} from 'recoil';
import {todoListState} from '../../store/todoState';
import {StyleSheet, View, ScrollView} from 'react-native';
import color from '@/styles/color';

import {AppLayout} from '../../components/common/AppLayout';
import {AppHeader} from '../../components/common/AppHeader';
import {OngoingTodoList} from '../../components/todo/OngoingTodoList';
import {CompletedTodoList} from '../../components/todo/CompletedTodoList';
import {TodoTabBar} from '../../components/todo/TodoTabBar';
import AppIcon from '@/components/common/AppIcon';
import {AppTitle} from '@/components/common/AppTitle';

export function TodoScreen({navigation}: any): React.JSX.Element {
  const todoList = useRecoilValue(todoListState);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
  };

  const moveToScreen = (screen: string, params: object) => {
    navigation.navigate(screen, params);
  };

  return (
    <AppLayout style={styles.layout}>
      <AppHeader style={styles.header}>
        <AppTitle text="To Do" style={styles.title} />
        <View style={styles.button}>
          <AppIcon
            type="stroke"
            name="addDark"
            width={42}
            height={42}
            onPress={() =>
              moveToScreen('TodoForm', {
                form: 'TODO',
                headerTitle: '할 일 생성하기',
              })
            }
          />
        </View>
      </AppHeader>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: color.grey100,
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
    fontWeight: '700',
  },
  button: {
    position: 'absolute',
    right: 0,
  },
});
