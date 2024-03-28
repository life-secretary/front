import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SubTodoItem} from './SubTodoItem';
import {AddSubTodoButton} from './AddSubTodoButton';
import color from '@/styles/color';

export function SubTodoList({subTodoList}: any): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={subTodoList}
        renderItem={({item}) => <SubTodoItem title={item.title} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.buttonContainer}>
        <AddSubTodoButton />
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
    gap: 20,
  },
});
