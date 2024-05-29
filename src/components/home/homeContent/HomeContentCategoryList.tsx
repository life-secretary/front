import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {homeContentFilterState} from '@/store/homeContentState';

import {StyleSheet, FlatList} from 'react-native';
import {HomeContentCategoryItem} from '@/components/home/homeContent/HomeContentCategoryItem';
import {homeCategoryListState} from '@/store/categoryState';

type homeContentFilter = {
  id: number;
  category: string;
  title: string;
};

export function HomeContentCategoryList(): React.JSX.Element {
  const [homeContentFilter, setHomeContentFilter] = useRecoilState(
    homeContentFilterState,
  );
  const categories = useRecoilValue(homeCategoryListState);
  const defaultCategory = categories.find(item => item.category === 'all');

  const handleHomeContentFilter = (category: homeContentFilter) => {
    setHomeContentFilter(category);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setHomeContentFilter(defaultCategory ? defaultCategory : { category: 'all', id: 0, title: '전체' });
      };
    }, [defaultCategory, setHomeContentFilter]),
  );

  return (
    <FlatList
      scrollsToTop
      data={categories}
      renderItem={({item}) => (
        <HomeContentCategoryItem
          item={{...item}}
          homeContentFilter={homeContentFilter}
          handleHomeContentFilter={handleHomeContentFilter}
        />
      )}
      keyExtractor={item => String(item.id)}
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
