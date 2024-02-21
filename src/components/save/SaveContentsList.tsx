import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {SaveContentsItem} from './SaveContentsItem';

export function SaveContentsList({list, isEditMode}: any): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={({item}) => (
          <SaveContentsItem
            title={item.title}
            category={item.category}
            isEditMode={isEditMode}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  listContainer: {
    flex: 1,
    borderWidth: 1,
  },
  divider: {
    backgroundColor: '#F2F4F7',
    height: 1,
    marginVertical: 16,
  },
});
