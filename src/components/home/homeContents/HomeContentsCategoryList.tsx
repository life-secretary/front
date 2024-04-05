import * as React from 'react';

import {StyleSheet, FlatList} from 'react-native';
import {HomeContentsCategoryItem} from './HomeContentsCategoryItem';

import {generateRandomId} from '@/utils';

const DUMMY_CATEGORY = [
  {
    id: generateRandomId(),
    category: 'all',
    title: '전체',
  },
  {
    id: generateRandomId(),
    category: 'economy',
    title: '경제',
  },
  {
    id: generateRandomId(),
    category: 'law',
    title: '법',
  },
  {
    id: generateRandomId(),
    category: 'echo',
    title: '환경',
  },
  {
    id: generateRandomId(),
    category: 'selfImprovement',
    title: '자기계발',
  },
  {
    id: generateRandomId(),
    category: 'health',
    title: '건강',
  },
  {
    id: 'cate7',
    category: 'culture',
    title: '문화',
  },
  {
    id: generateRandomId(),
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
    flex: 1,
    gap: 8,
    marginBottom: 28,
  },
});
