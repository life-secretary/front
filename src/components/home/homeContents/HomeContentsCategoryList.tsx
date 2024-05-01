import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {homeContentsFilterState} from '@/store/homeContentsState';

import {StyleSheet, FlatList} from 'react-native';
import {HomeContentsCategoryItem} from '@/components/home/homeContents/HomeContentsCategoryItem';

type Props = {
  categories: object[];
};

export function HomeContentsCategoryList({
  categories,
}: Props): React.JSX.Element {
  const [homeContentsFilter, setHomeContentsFilter] = useRecoilState(
    homeContentsFilterState,
  );

  const handleHomeContentsFilter = (category: object) => {
    setHomeContentsFilter(category);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setHomeContentsFilter(categories[0]);
      };
    }, [categories, setHomeContentsFilter]),
  );

  return (
    <FlatList
      scrollsToTop
      data={categories}
      renderItem={({item}) => (
        <HomeContentsCategoryItem
          item={{...item}}
          homeContentsFilter={homeContentsFilter}
          handleHomeContentsFilter={handleHomeContentsFilter}
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
