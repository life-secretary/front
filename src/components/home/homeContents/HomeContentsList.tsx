import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {HomeContentsItem} from './HomeContentsItem';
import {AppText} from '../../common/AppText';
import {ViewMoreButton} from '../ViewMoreButton';

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

type Props = {
  titleText: string;
};

export function HomeContentsList({titleText}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText style={styles.listTitle}>{titleText}</AppText>
      <FlatList
        data={DUMMY_DATA}
        renderItem={({item}) => (
          <HomeContentsItem
            title={item.title}
            thumbnail={item.thumbnail}
            category={item.category}
            date={item.date}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
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
    borderWidth: 1,
  },
  listContainer: {
    borderWidth: 1,
  },
  listTitle: {
    marginBottom: 28,
    fontSize: 20,
    fontWeight: '700',
    color: '#000E24',
  },
  divider: {
    backgroundColor: '#F2F4F7',
    height: 1,
    marginVertical: 16,
  },
});
