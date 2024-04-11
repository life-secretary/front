import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {fetchData} from '@/api/api';
import {useRecoilState, useSetRecoilState} from 'recoil';
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
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const moveToScreen = (screen: string, params: object) => {
    navigation.navigate(screen, params);
  };

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
  };

  const handleAddButtonPress = () => {
    moveToScreen('TodoForm', {
      form: 'TODO',
      headerTitle: '할 일 생성하기',
    });
  };

  useFocusEffect(
    useCallback(() => {
      async function fetchTodoList() {
        const {data} = await fetchData('/user-todos', {
          userId: 1,
        });

        setTodoList(data.data);
      }

      fetchTodoList();
    }, [setTodoList]),
  );

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
          onTabPress={(index: number) => handleTabChange(index)}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {selectedIndex === 0 && <OngoingTodoList />}
            {selectedIndex === 1 && <CompletedTodoList />}
          </View>
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
