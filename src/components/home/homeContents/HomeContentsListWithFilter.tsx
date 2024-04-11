import React from 'react';

import {StyleSheet, View, FlatList, Platform} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {HomeContentsCategoryList} from '@/components/home/homeContents/HomeContentsCategoryList';
import {ViewMoreButton} from '@/components/home/ViewMoreButton';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {generateRandomId} from '@/utils';

const DUMMY_DATA = [
  {
    id: generateRandomId(),
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: '경제',
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
    date: '2024-01-01',
  },
  {
    id: generateRandomId(),
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: '문화',
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
    date: '2024-01-11',
  },
  {
    id: generateRandomId(),
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: '자기계발',
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
    date: '2024-02-05',
  },
  {
    id: generateRandomId(),
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: '건강',
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
    date: '2024-02-22',
  },
  {
    id: generateRandomId(),
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: '환경',
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
    date: '2024-03-01',
  },
];

type Props = {
  categories: object[];
  title: string;
  data?: object[];
};

export function HomeContentsListWithFilter({
  categories,
  title,
}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText style={styles.listTitle}>{title}</AppText>
      <HomeContentsCategoryList categories={categories} />
      <FlatList
        data={DUMMY_DATA}
        renderItem={({item, index}) => (
          <View style={styles.contents}>
            <AppText style={styles.contentsNo}>{index + 1}</AppText>
            <AppText isEllipsizeMode={true} style={styles.contentsTitle}>
              {item.title}
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
    marginVertical: 10,
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
