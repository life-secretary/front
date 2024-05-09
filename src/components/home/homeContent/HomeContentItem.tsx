import React from 'react';
import {useRecoilValue} from 'recoil';
import {categoryListState} from '@/store/categoryState';

import {StyleSheet, View, Image} from 'react-native';
import {AppText} from '@/components/common/AppText';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {getFormattedDate} from '@/utils';

import HomeContent from '@/models/HomeContent';

type Props = {
  homeContentItem: HomeContent;
};

export function HomeContentItem({homeContentItem}: Props): React.JSX.Element {
  const categories = useRecoilValue(categoryListState);
  const skeletonThumbnail = require('@/assets/images/thumbnailPlaceholder.jpg');

  return (
    <View style={styles.container}>
      <View style={styles.thumbnailContainer}>
        {homeContentItem.imageUrl ? (
          <Image
            source={{uri: homeContentItem.imageUrl}}
            style={styles.thumbnail}
          />
        ) : (
          <Image source={skeletonThumbnail} style={styles.thumbnail} />
        )}
      </View>
      <View style={styles.infoContainer}>
        <View>
          <AppText style={styles.title} isEllipsizeMode={true}>
            {homeContentItem.title}
          </AppText>
        </View>
        <View style={styles.row}>
          <AppText style={styles.subTitle}>
            {categories.find(
              category => category.id === homeContentItem.categoryId,
            )?.title || '카테고리'}
          </AppText>
          <AppText style={[styles.subTitle, styles.separator]}>|</AppText>
          <AppText style={styles.subTitle}>
            {homeContentItem.createdTime
              ? getFormattedDate(new Date(homeContentItem.createdTime), '.')
              : getFormattedDate(new Date(homeContentItem.createdDate), '.')}
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  thumbnailContainer: {
    width: 70,
    height: 50,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  infoContainer: {
    flex: 1,
    gap: 10,
    paddingVertical: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: font.fontWeight.medium,
    lineHeight: 17.9,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 14.32,
    color: color.grey.grey400,
  },
  separator: {
    color: color.grey.grey100,
  },
});
