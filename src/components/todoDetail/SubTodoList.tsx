import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SubTodoItem} from './SubTodoItem';
import {AddSubTodoButton} from './AddSubTodoButton';

export function SubTodoList({subTodoList}: any): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={subTodoList}
        renderItem={({item}) => <SubTodoItem title={item.title} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.buttonRow}>
        <AddSubTodoButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 22,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  listContainer: {
    gap: 20,
  },
});
