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
import {AppSpinner} from '../common/AppSpinner';

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
};

export function OngoingTodoList({isLoading}: Props): React.JSX.Element {
  const totalTodoCount = useRecoilValue(todoListTotalCountState);
  const list = useRecoilValue(filteredTodoListState);
  const isEmpty = totalTodoCount === 0;

  return (
    <View style={styles.container}>
      {!isEmpty && isLoading && (
        <View style={styles.emptyListContainer}>
          <AppSpinner color={color.main.primary} />
        </View>
      )}
      {!isLoading &&
        (!isEmpty ? (
          <>
            <TodoCount title="나의 할 일" totalTodoCount={totalTodoCount} />
            <FlatList
              data={list}
              renderItem={({item}) => <TodoCard item={{...item}} />}
              keyExtractor={item => item?.id}
              contentContainerStyle={styles.listContainer}
            />
          </>
        ) : (
          <EmptyList />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
