import * as React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {HomeContentsCategoryItem} from './HomeContentsCategoryItem';

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
    category: 'echo',
    title: '환경',
  },
  {
    id: '5',
    category: 'selfImprovement',
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

export function HomeContentsCategoryList(): React.JSX.Element {
  return (
    <FlatList
      data={DUMMY_CATEGORY}
      renderItem={({item}) => (
        <HomeContentsCategoryItem title={item.title} category={item.category} />
      )}
      keyExtractor={item => item.id}
      horizontal={true}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    gap: 8,
    marginBottom: 28,
  },
});
