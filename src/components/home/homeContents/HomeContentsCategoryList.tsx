import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {StyleSheet, FlatList} from 'react-native';
import {HomeContentsCategoryItem} from '@/components/home/homeContents/HomeContentsCategoryItem';

type Props = {
  categories: object[];
  activeCategory: object;
  setActiveCategory: Function;
};

export function HomeContentsCategoryList({
  categories,
  activeCategory,
  setActiveCategory,
}: Props): React.JSX.Element {
  const handleActiveCategory = (category: object) => {
    setActiveCategory(category);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setActiveCategory(categories[0]);
      };
    }, [categories, setActiveCategory]),
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
