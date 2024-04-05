import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {TodoCard} from './TodoCard';
import {AppText} from '../common/AppText';
import {TodoCount} from './TodoCount';
import color from '@/styles/color';
import {font} from '@/styles/font';

// TODO: 별도의 컴포넌트로 분리
const EmptyList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <AppText style={styles.emptyListText}>완료된 할 일이 없어요</AppText>
    </View>
  );
};

type TodoListProps = {
  data: object[];
};

export function CompletedTodoList({data}: TodoListProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TodoCount title="완료 할 일" todoCount={data.length} />
      <FlatList
        data={data}
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
    marginTop: 22,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontWeight: font.fontWeight.medium,
    lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey500,
  },
});
