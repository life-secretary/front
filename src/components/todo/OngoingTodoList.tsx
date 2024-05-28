import React, {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {
  filteredTodoListState,
  todoListTotalCountState,
} from '@/store/todoState';

import {StyleSheet, View, FlatList} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {AppSpinner} from '@/components/common/AppSpinner';
import {TodoCard} from '@/components/todo/TodoCard';
import {TodoCount} from '@/components/todo/TodoCount';
import color from '@/styles/color';
import {font} from '@/styles/font';

import Todo from '@/models/Todo';

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

type Props = {
  isLoading: boolean;
  isFetched: boolean;
};

export function OngoingTodoList({
  isLoading,
  isFetched,
}: Props): React.JSX.Element {
  const [isEmpty, setIsEmpty] = useState(false);
  const totalTodoCount = useRecoilValue(todoListTotalCountState);
  const list = useRecoilValue(filteredTodoListState);

  useEffect(() => {
    if (!isLoading) {
      if (isFetched && totalTodoCount === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    }
  }, [isFetched, isLoading, totalTodoCount]);

  if (isLoading) {
    return (
      <View style={styles.emptyListContainer}>
        <AppSpinner color={color.main.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isEmpty ? (
        <EmptyList />
      ) : (
        <View>
          <TodoCount title="나의 할 일" totalTodoCount={totalTodoCount} />
          <FlatList
            data={list}
            renderItem={({item}) => <TodoCard item={item} />}
            keyExtractor={(item: Todo) => String(item.id)}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
  },
  listContainer: {
    gap: 16,
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 262,
  },
  emptyListText: {
    fontWeight: font.fontWeight.medium,
    lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey500,
  },
});
