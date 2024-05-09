import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {homeContentFilterState} from '@/store/homeContentState';

import {StyleSheet, FlatList} from 'react-native';
import {HomeContentCategoryItem} from '@/components/home/homeContent/HomeContentCategoryItem';

type Props = {
  categories: object[];
};

export function HomeContentCategoryList({
  categories,
}: Props): React.JSX.Element {
  const [homeContentFilter, setHomeContentFilter] = useRecoilState(
    homeContentFilterState,
  );

  const handleHomeContentFilter = (category: object) => {
    setHomeContentFilter(category);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setHomeContentFilter(categories[0]);
      };
    }, [categories, setHomeContentFilter]),
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
