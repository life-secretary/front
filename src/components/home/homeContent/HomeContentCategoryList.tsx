import React, {useCallback, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {homeCategoryListState} from '@/store/categoryState';
import {homeContentFilterState} from '@/store/homeContentState';

import {StyleSheet, FlatList, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {HomeContentCategoryItem} from '@/components/home/homeContent/HomeContentCategoryItem';

type homeContentFilter = {
  id: number;
  category: string;
  title: string;
};

export function HomeContentCategoryList(): React.JSX.Element {
  const [showGradient, setShowGradient] = useState(true);
  const [homeContentFilter, setHomeContentFilter] = useRecoilState(
    homeContentFilterState,
  );
  const categories = useRecoilValue(homeCategoryListState);
  const defaultCategory = categories.find(item => item.category === 'all');
  const scrollViewRef = useRef<any>(null);

  const handleHomeContentFilter = (category: homeContentFilter) => {
    setHomeContentFilter(category);
  };

  const handleScroll = event => {
    const {nativeEvent} = event;

    const bottom =
      nativeEvent.contentOffset.x + nativeEvent.layoutMeasurement.width >=
      nativeEvent.contentSize.width;

    if (bottom) {
      setShowGradient(false);
    } else {
      setShowGradient(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimeout(() => {
          setHomeContentFilter(
            defaultCategory
              ? defaultCategory
              : {category: 'all', id: 0, title: '전체'},
          );
          scrollViewRef?.current.scrollToOffset({offset: 0, animated: true});
        }, 1000);
      };
    }, [defaultCategory, setHomeContentFilter]),
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollViewRef}
        scrollsToTop
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
      {showGradient && (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
          style={styles.gradient}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 28,
  },
  listContainer: {
    gap: 8,
  },
  gradient: {
    position: 'absolute',
    left: '85%',
    right: 0,
    bottom: 0,
    height: '100%',
  },
});
