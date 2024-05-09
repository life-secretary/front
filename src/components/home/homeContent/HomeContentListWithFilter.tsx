import React, {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  filteredHomeContentListState,
  homeContentFilterState,
} from '@/store/homeContentState';

import {fetchData} from '@/api/api';

import {StyleSheet, View, FlatList, Platform} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {HomeContentCategoryList} from '@/components/home/homeContent/HomeContentCategoryList';
import {ViewMoreButton} from '@/components/home/ViewMoreButton';
import color from '@/styles/color';
import {font} from '@/styles/font';
import spacing from '@/styles/spacing';

type HomeContentItemByFilterType = {
  index: number;
  title: string;
};

function HomeContentItemByFilter({
  index,
  title,
}: HomeContentItemByFilterType): React.JSX.Element {
  return (
    <View style={styles.contents}>
      <AppText style={styles.contentsNo}>{index + 1}</AppText>
      <AppText isEllipsizeMode={true} style={styles.contentsTitle}>
        {title}
      </AppText>
    </View>
  );
}

type Props = {
  categories: object[];
  title: string;
};

export function HomeContentListWithFilter({
  categories,
  title,
}: Props): React.JSX.Element {
  const homeContentFilter = useRecoilValue(homeContentFilterState);
  const [filteredHomeContentList, setFilteredHomeContentList] = useRecoilState(
    filteredHomeContentListState,
  );

  useEffect(() => {
    const getHomeContentFilter = () => {
      if (homeContentFilter?.category === 'all') {
        return null;
      }

      return homeContentFilter;
    };

    const fetchHomeContentListByFilter = async () => {
      const res = await fetchData('/content/popular', {
        categoryId: getHomeContentFilter()?.id,
        size: 5,
      });

      if (res.status === 200) {
        const list = res.data.data;

        setFilteredHomeContentList(list);
      }
    };

    fetchHomeContentListByFilter();
  }, [homeContentFilter, categories, setFilteredHomeContentList]);

  return (
    <View style={styles.container}>
      <AppText style={styles.listTitle}>{title}</AppText>
      <HomeContentCategoryList categories={categories} />
      <FlatList
        data={filteredHomeContentList}
        renderItem={({item, index}) => (
          <HomeContentItemByFilter index={index} title={item.title} />
        )}
        contentContainerStyle={styles.listContainer}
      />
      <ViewMoreButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.layoutPaddingHorizontal,
    paddingHorizontal: 26,
    paddingVertical: 34,
    borderRadius: 14,
    backgroundColor: color.main.white,
    ...Platform.select({
      ios: {
        shadowColor: color.shadow.box,
        shadowOpacity: 0.5,
        shadowRadius: 20,
        shadowOffset: {width: 0, height: 0},
      },
      android: {
        shadowColor: color.shadow.box,
        elevation: 1,
      },
    }),
  },
  listContainer: {
    gap: 20,
  },
  listTitle: {
    marginBottom: 18,
    fontSize: 20,
    fontWeight: font.fontWeight.bold,
    lineHeight: 23.87,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  contents: {
    flexDirection: 'row',
    gap: 10,
  },
  contentsNo: {
    width: 22,
    height: 22,
    textAlign: 'center',
    fontWeight: font.fontWeight.semiBold,
    color: color.grey.grey300,
  },
  contentsTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: font.fontWeight.medium,
    lineHeight: 17.9,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
});
