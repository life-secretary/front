import * as React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {HomeContentsCategoryItem} from './HomeContentsCategoryItem';

const DUMMY_CATEGORY = [
  {
    id: 'cate1',
    category: 'all',
    title: '전체',
  },
  {
    id: 'cate2',
    category: 'economy',
    title: '경제',
  },
  {
    id: 'cate3',
    category: 'law',
    title: '법',
  },
  {
    id: 'cate4',
    category: 'echo',
    title: '환경',
  },
  {
    id: 'cate5',
    category: 'selfImprovement',
    title: '자기계발',
  },
  {
    id: 'cate6',
    category: 'health',
    title: '건강',
  },
  {
    id: 'cate7',
    category: 'culture',
    title: '문화',
  },
  {
    id: 'cate8',
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
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 8,
    marginBottom: 28,
  },
});
