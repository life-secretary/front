import * as React from 'react';

import {StyleSheet, View, FlatList} from 'react-native';
import {TodoCard} from './TodoCard';
import {AppText} from '../common/AppText';
import {TodoCount} from './TodoCount';

// TODO: 별도의 컴포넌트로 분리
const EmptyList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <AppText style={styles.emptyListText}>
        새로운 할 일을 추가해보세요
      </AppText>
    </View>
  );
};

type TodoListProps = {
  data: object[];
};

export function OngoingTodoList({data}: TodoListProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TodoCount todoCount={data.length} />
      <FlatList
        data={data}
        renderItem={({item}) => <TodoCard {...item} />}
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
