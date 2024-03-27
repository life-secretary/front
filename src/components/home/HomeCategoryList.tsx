import * as React from 'react';
import {StyleSheet, View, FlatList, Platform} from 'react-native';
import {HomeCategoryItem} from './HomeCategoryItem';

const DUMMY_CATEGORY = [
  {
    id: '1',
    category: 'all',
    title: '전체',
  },
  {
    id: '2',
    category: 'economy',
    title: '경제',
  },
  {
    id: '3',
    category: 'law',
    title: '법',
  },
  {
    id: '4',
    category: 'eco',
    title: '환경',
  },
  {
    id: '5',
    category: 'selfdev',
    title: '자기계발',
  },
  {
    id: '6',
    category: 'health',
    title: '건강',
  },
  {
    id: '7',
    category: 'culture',
    title: '문화',
  },
  {
    id: '8',
    category: 'etc',
    title: '기타',
  },
];

export function HomeCategoryList(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_CATEGORY}
        renderItem={({item}) => (
          <HomeCategoryItem title={item.title} category={item.category} />
        )}
        keyExtractor={item => item.id}
        horizontal={false}
        numColumns={4}
        columnWrapperStyle={styles.listColumn}
        contentContainerStyle={styles.listRow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#CBD3DC80',
        shadowOpacity: 0.5,
        shadowRadius: 20,
        shadowOffset: {width: 0, height: 0},
      },
      android: {
        shadowColor: '#CBD3DC80',
        elevation: 1,
      },
    }),
  },
  listColumn: {
    gap: 37,
  },
  listRow: {
    gap: 14,
  },
});
