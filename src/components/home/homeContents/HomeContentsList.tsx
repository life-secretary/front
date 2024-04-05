import * as React from 'react';

import {StyleSheet, View, FlatList, Platform} from 'react-native';
import {AppText} from '../../common/AppText';
import {AppDivider} from '@/components/common/AppDivider';
import {HomeContentsItem} from './HomeContentsItem';
import {ViewMoreButton} from '../ViewMoreButton';
import color from '@/styles/color';

import {generateRandomId} from '@/utils';
import {font} from '@/styles/font';

type HomeContentsProps = {
  isUsernameUsed?: boolean;
  title: string;
};

export function HomeContentsList({
  isUsernameUsed = false,
  title,
}: HomeContentsProps): React.JSX.Element {
  const DUMMY_DATA = [
    {
      id: generateRandomId(),
      title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
      category: '경제',
      thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
      createdDate: '2024-01-01',
    },
    {
      id: generateRandomId(),
      title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
      category: '문화',
      thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
      createdDate: '2024-01-11',
    },
    {
      id: generateRandomId(),
      title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
      category: '자기계발',
      thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
      createdDate: '2024-02-05',
    },
    {
      id: generateRandomId(),
      title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
      category: '건강',
      thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
      createdDate: '2024-02-22',
    },
    {
      id: generateRandomId(),
      title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
      category: '환경',
      thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
      createdDate: '2024-03-01',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {isUsernameUsed && (
          <AppText style={styles.username}>$username님과</AppText>
        )}
        <AppText style={styles.title}>{title}</AppText>
      </View>
      <FlatList
        ItemSeparatorComponent={() => <AppDivider />}
        data={DUMMY_DATA}
        renderItem={({item}) => (
          <HomeContentsItem
            title={item?.title}
            thumbnail={item?.thumbnail}
            category={item?.category}
            createdDate={item?.createdDate}
          />
        )}
      />
      <ViewMoreButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  titleContainer: {
    gap: 8,
  },
  title: {
    marginBottom: 28,
    fontSize: 20,
    fontWeight: font.fontWeight.bold,
    lineHeight: 23.87,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  username: {
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
    color: color.main.secondary,
  },
});
