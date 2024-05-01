import React, {useEffect} from 'react';
import {
  filteredHomeContentsListState,
  homeContentsFilterState,
} from '@/store/homeContentsState';

import {StyleSheet, View, FlatList, Platform} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {HomeContentsCategoryList} from '@/components/home/homeContents/HomeContentsCategoryList';
import {ViewMoreButton} from '@/components/home/ViewMoreButton';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {fetchData} from '@/api/api';
import spacing from '@/styles/spacing';
import {useRecoilState, useRecoilValue} from 'recoil';

type Props = {
  categories: object[];
  title: string;
};

export function HomeContentsListWithFilter({
  categories,
  title,
}: Props): React.JSX.Element {
  const homeContentsFilter = useRecoilValue(homeContentsFilterState);
  const [filteredHomeContentsList, setFilteredHomeContentsList] =
    useRecoilState(filteredHomeContentsListState);

  useEffect(() => {
    const getHomeContentsFilter = () => {
      if (homeContentsFilter?.category === 'all') {
        return null;
      }

      return homeContentsFilter;
    };

    const fetchHomeContentsListByFilter = async () => {
      const res = await fetchData('/content/popular', {
        categoryId: getHomeContentsFilter()?.id,
        size: 5,
      });

      if (res.status === 200) {
        const list = res.data.data;

        setFilteredHomeContentsList(list);
      }
    };

    fetchHomeContentsListByFilter();
  }, [homeContentsFilter, categories, setFilteredHomeContentsList]);

  return (
    <View style={styles.container}>
      <AppText style={styles.listTitle}>{title}</AppText>
      <HomeContentsCategoryList categories={categories} />
      <FlatList
        data={filteredHomeContentsList}
        renderItem={({item, index}) => (
          <View style={styles.contents}>
            <AppText style={styles.contentsNo}>{index + 1}</AppText>
            <AppText isEllipsizeMode={true} style={styles.contentsTitle}>
              {item?.title}
            </AppText>
          </View>
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
