import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {StyleSheet, FlatList} from 'react-native';
import {HomeContentsCategoryItem} from '@/components/home/homeContents/HomeContentsCategoryItem';

type Props = {
  categories: object[];
};

export function HomeContentsCategoryList({
  categories,
}: Props): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleActiveCategory = (category: string) => {
    setActiveCategory(category);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setActiveCategory('all');
      };
    }, []),
  );

  return (
    <FlatList
      scrollsToTop
      data={categories}
      renderItem={({item}) => (
        <HomeContentsCategoryItem
          item={{...item}}
          activeCategory={activeCategory}
          handleActiveCategory={handleActiveCategory}
        />
      )}
      keyExtractor={item => item?.id}
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
