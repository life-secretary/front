import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {AppLayout} from '../components/common/AppLayout';
import {AppHeader} from '../components/common/AppHeader';
import {OngoingTodoList} from '../components/todo/OngoingTodoList';
import {CompletedTodoList} from '../components/todo/CompletedTodoList';
import {TodoTabBar} from '../components/todo/TodoTabBar';
import {TodoTitle} from '../components/todo/TodoTitle';

export function TodoScreen(): React.JSX.Element {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <AppLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppHeader>
          <TodoTitle text="To Do" style={styles.title} />
        </AppHeader>
        <View style={styles.container}>
          <TodoTabBar
            tabOptions={['진행 중', '완료']}
            selectedIndex={selectedIndex}
            onTabPress={(index: number) => handleIndexChange(index)}
          />
          {selectedIndex === 0 && <OngoingTodoList />}
          {selectedIndex === 1 && <CompletedTodoList />}
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
