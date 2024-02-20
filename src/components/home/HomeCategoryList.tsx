import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {HomeCategoryItem} from './HomeCategoryItem';

const DUMMY_CATEGORY = [
  {
    id: '1',
    category: 'all',
    title: '전체',
    thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg'),
  },
  {
    id: '2',
    category: 'economy',
    title: '경제',
    thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg'),
  },
  {
    id: '3',
    category: 'law',
    title: '법',
    thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg'),
  },
  {
    id: '4',
    category: 'echo',
    title: '환경',
    thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg'),
  },
  {
    id: '5',
    category: 'selfImprovement',
    title: '자기계발',
    thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg'),
  },
  {
    id: '6',
    category: 'health',
    title: '건강',
    thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg'),
  },
  {
    id: '7',
    category: 'culture',
    title: '문화',
    thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg'),
  },
  {
    id: '8',
    category: 'etc',
    title: '기타',
    thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg'),
  },
];

export function HomeCategoryList(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_CATEGORY}
        renderItem={({item}) => (
          <HomeCategoryItem
            title={item.title}
            thumbnail={item.thumbnail}
            category={item.category}
          />
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
    borderWidth: 1,
    marginVertical: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listColumn: {
    gap: 37,
  },
  listRow: {
    gap: 14,
  },
});
