import * as React from 'react';
import {StyleSheet, View, FlatList, Platform} from 'react-native';
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
  isUsernameUsed?: boolean;
  title: string;
};

export function HomeContentsList({
  isUsernameUsed = false,
  title,
}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {isUsernameUsed && (
          <AppText style={styles.username}>$username님과</AppText>
        )}
        <AppText style={styles.title}>{title}</AppText>
      </View>
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
      />
      <ViewMoreButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 26,
    paddingVertical: 34,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#CBD3DC80',
        shadowOpacity: 0.5,
        shadowRadius: 20,
        shadowOffset: {width: 0, height: 0},
      },
      android: {
        shadowColor: '#CBD3DC80',
        elevation: 1,
      },
    }),
  },
  titleContainer: {
    gap: 8,
  },
  title: {
    marginBottom: 28,
    fontSize: 20,
    fontWeight: '700',
    color: '#000E24',
  },
  username: {
    fontWeight: '600',
    color: '#4681F6',
  },
  divider: {
    backgroundColor: '#F2F4F7',
    height: 1,
    marginVertical: 16,
  },
});
