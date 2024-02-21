import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {TodoCard} from './TodoCard';
import {AppText} from '../common/AppText';

const DUMMY_TODO = [
  {
    id: '1',
    title: '나의 미래 준비, 어떻게 시작할까요?',
    tags: ['완료', '경제'],
    subTodoList: [
      {id: '11', title: '노후 예상 비용 계산하기', completed: false},
      {id: '12', title: '월 저축액 계획하기', completed: false},
    ],
    createdDate: '2024.01.01',
  },
];

// const DUMMY_TODO: ArrayLike<any> | null | undefined = [];

const EmptyList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <AppText style={styles.emptyListText}>완료된 할 일이 없어요</AppText>
    </View>
  );
};

export function CompletedTodoList(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_TODO}
        renderItem={({item}) => (
          <TodoCard
            title={item.title}
            tags={item.tags}
            subTodoList={item.subTodoList}
            createdDate={item.createdDate}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<EmptyList />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  listContainer: {
    flex: 1,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontWeight: '500',
    color: '#526070',
  },
});
