import * as React from 'react';
import {StyleSheet, View, FlatList, Platform} from 'react-native';
import {AppText} from '../../common/AppText';
import {ViewMoreButton} from '../ViewMoreButton';
import {HomeContentsCategoryList} from './HomeContentsCategoryList';
import color from '@/styles/color';

const DUMMY_DATA = [
  {
    id: 1,
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: '경제',
    thumbnail: require('../../../assets/images/thumbnailPlaceholder.jpg'),
    date: '2024. 01. 01',
  },
  {
    id: 2,
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: '문화',
    thumbnail: require('../../../assets/images/thumbnailPlaceholder.jpg'),
    date: '2024. 01. 11',
  },
  {
    id: 3,
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: '자기계발',
    thumbnail: require('../../../assets/images/thumbnailPlaceholder.jpg'),
    date: '2024. 02. 05',
  },
  {
    id: 4,
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: '건강',
    thumbnail: require('../../../assets/images/thumbnailPlaceholder.jpg'),
    date: '2024. 02. 22',
  },
  {
    id: 5,
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: '환경',
    thumbnail: require('../../../assets/images/thumbnailPlaceholder.jpg'),
    date: '2024. 03. 01',
  },
];

type ContentsListProps = {
  title: string;
  data?: object[];
};

export function HomeContentsListWithFilter({
  title,
}: ContentsListProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText style={styles.listTitle}>{title}</AppText>
      <HomeContentsCategoryList />
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
    backgroundColor: color.white,
    ...Platform.select({
      ios: {
        shadowColor: color.shadow,
        shadowOpacity: 0.5,
        shadowRadius: 20,
        shadowOffset: {width: 0, height: 0},
      },
      android: {
        shadowColor: color.shadow,
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
    fontWeight: '700',
    color: color.grey700,
  },
  contents: {
    flexDirection: 'row',
    gap: 10,
  },
  contentsNo: {
    width: 22,
    height: 22,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: color.grey300,
  },
  contentsTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: color.grey700,
  },
});
