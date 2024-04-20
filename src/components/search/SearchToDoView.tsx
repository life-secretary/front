import React, { ReactNode } from 'react';
import {VirtualizedList, View, StyleSheet} from 'react-native';

import ToDoListItem from './ToDoListItem';

type SearchToDoViewProps = {
  data: Array<{}>; // TODO 타입 구체화
  headerComponent: ReactNode;
  onEndReached: () => void;
};

const SearchToDoView = ({
  data, 
  headerComponent,
  onEndReached,
}: SearchToDoViewProps): React.JSX.Element => {
  const getToDoTabItem = (_data: any, index: any) => { // TODO 타입 구체화
    return data[index];
  };

  const getToDoTabItemCount = () => {
    return data.length;
  };

  const getToDoTabKeyExtractor = (item: any, index: any) => { // TODO 타입 구체화
    const keyName = 'todo' + item.id;

    return keyName;
  };

  return (
    <VirtualizedList
      initialNumToRender={8}
      renderItem={({item}) => {
        return <ToDoListItem hasMainCategory={true} item={item} />;
      }}
      keyExtractor={getToDoTabKeyExtractor}
      getItemCount={getToDoTabItemCount}
      getItem={getToDoTabItem}
      ListHeaderComponent={() => headerComponent}
      ListFooterComponent={() => <View style={styles.toDoFooter} />}
      ItemSeparatorComponent={() => <View style={styles.separatorToDo} />}
      style={styles.toDoContainer}
      onEndReached={onEndReached}
    />
  );
};

const styles = StyleSheet.create({
  toDoContainer: {
    paddingHorizontal: 24,
  },
  toDoFooter: {
    height: 60,
  },

  separatorToDo: {
    marginVertical: 10,
  },
});

export default SearchToDoView;
