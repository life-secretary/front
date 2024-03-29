import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SubTodoItem} from './SubTodoItem';
import {AddSubTodoButton} from './AddSubTodoButton';
import color from '@/styles/color';
import {AppText} from '@/components/common/AppText';

type SubTodoListProps = {
  todoItem: object;
};

const EmptyList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <AppText style={styles.emptyListText}>
        아래에서 세부 항목을 추가할 수 있어요
      </AppText>
    </View>
  );
};

export function SubTodoList({todoItem}: SubTodoListProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={todoItem?.subTodoList}
        renderItem={({item}) => (
          <SubTodoItem title={item.title} isCompleted={item.isCompleted} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={EmptyList}
      />
      <View style={styles.buttonContainer}>
        <AddSubTodoButton todoItem={todoItem} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: color.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 53,
  },
  listContainer: {
    flex: 1,
    gap: 20,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontWeight: '500',
    color: color.grey500,
  },
});
