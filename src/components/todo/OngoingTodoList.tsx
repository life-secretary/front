import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {TodoCard} from './TodoCard';
import {AppText} from '../common/AppText';
import {TodoSection} from './TodoSection';

const DUMMY_TODO = [
  {
    id: '1',
    title: '나의 미래 준비, 어떻게 시작할까요?',
    tags: ['경제'],
    subTodoList: [
      {id: '11', title: '노후 예상 비용 계산하기', completed: false},
      {id: '12', title: '월 저축액 계획하기', completed: false},
    ],
    createdDate: '2024.01.01',
  },
  {
    id: '2',
    title: '사용자가 입력한 할 일 제목 1',
    tags: ['나의 할 일', '건강'],
    subTodoList: [{id: '21', title: '2024 건강검진 하기', completed: false}],
    createdDate: '2024.01.10',
  },
  {
    id: '3',
    title: '사용자가 입력한 할 일 제목 2',
    tags: ['나의 할 일', '자기계발'],
    subTodoList: [
      {id: '31', title: '자격증 취득', completed: false},
      {id: '32', title: '토익 900점 이상', completed: false},
    ],
    createdDate: '2024.01.01',
  },
];

// const DUMMY_TODO: ArrayLike<any> | null | undefined = [];

const EmptyList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <AppText style={styles.emptyListText}>
        새로운 할 일을 추가해보세요
      </AppText>
    </View>
  );
};

export function OngoingTodoList(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TodoSection todoCount={DUMMY_TODO.length} />
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
        ListEmptyComponent={<EmptyList />}
        keyExtractor={item => item.id}
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
    gap: 16,
    marginTop: 22,
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
