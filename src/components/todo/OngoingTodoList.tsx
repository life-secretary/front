import React from 'react';

import {StyleSheet, View, FlatList} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {TodoCard} from '@/components/todo/TodoCard';
import {TodoCount} from '@/components/todo/TodoCount';
import color from '@/styles/color';
import {font} from '@/styles/font';
import {useRecoilValue} from 'recoil';
import {
  filteredTodoListState,
  todoListTotalCountState,
} from '@/store/todoState';

// TODO: Empty 컴포넌트화
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
  const totalTodoCount = useRecoilValue(todoListTotalCountState);
  const list = useRecoilValue(filteredTodoListState);

  return (
    <View style={styles.container}>
      <TodoCount title="나의 할 일" totalTodoCount={totalTodoCount} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        renderItem={({item}) => <TodoCard key={item?.id} item={{...item}} />}
        ListEmptyComponent={<EmptyList />}
        keyExtractor={item => item?.id}
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
