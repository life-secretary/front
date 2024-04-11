import React, {useEffect, useState} from 'react';

import {StyleSheet, View, FlatList} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {SubTodoItem} from '@/components/todo/detail/SubTodoItem';
import {AddSubTodoButton} from '@/components/todo/detail/AddSubTodoButton';
import color from '@/styles/color';
import {font} from '@/styles/font';
import {fetchData} from '@/api/api';

type Props = {
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

export function SubTodoList({todoItem}: Props): React.JSX.Element {
  const [subTodoList, setSubTodoList] = useState([]);
  const parentTodoId = todoItem?.id;

  useEffect(() => {
    async function fetchSubTodoList() {
      const {data, status} = await fetchData(
        `/user-todos/${parentTodoId}/sub`,
        {},
      );

      if (status === 200) {
        setSubTodoList(data.data);
      }
    }

    fetchSubTodoList();
  }, [parentTodoId, subTodoList]);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={subTodoList}
        renderItem={({item}) => (
          <SubTodoItem todoItem={{...todoItem}} subTodoItem={item} />
        )}
        keyExtractor={item => item?.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={EmptyList}
      />
      <AddSubTodoButton todoItem={todoItem} />
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
    backgroundColor: color.main.white,
  },
  listContainer: {
    gap: 20,
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 200,
  },
  emptyListText: {
    fontWeight: font.fontWeight.medium,
    lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey500,
  },
});
