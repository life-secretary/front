import React from 'react';

import {StyleSheet, View, FlatList} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {TodoCard} from '@/components/todo/TodoCard';
import {TodoCount} from '@/components/todo/TodoCount';
import color from '@/styles/color';
import {font} from '@/styles/font';
import {
  filteredTodoListState,
  todoListTotalCountState,
} from '@/store/todoState';
import {useRecoilValue} from 'recoil';

// TODO: 별도의 컴포넌트로 분리
const EmptyList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <AppText style={styles.emptyListText}>완료된 할 일이 없어요</AppText>
    </View>
  );
};

export function CompletedTodoList(): React.JSX.Element {
  const totalTodoCount = useRecoilValue(todoListTotalCountState);
  const list = useRecoilValue(filteredTodoListState);

  return (
    <View style={styles.container}>
      <TodoCount title="완료 할 일" totalTodoCount={totalTodoCount} />
      <FlatList
        data={list}
        renderItem={({item}) => <TodoCard item={{...item}} />}
        keyExtractor={item => item?.id}
        ListEmptyComponent={<EmptyList />}
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
    gap: 16,
    marginTop: 22,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  emptyListText: {
    fontWeight: font.fontWeight.medium,
    lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey500,
  },
});
