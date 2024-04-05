import React from 'react';

import {StyleSheet, View, Image, ImageSourcePropType} from 'react-native';
import {AppText} from '@/components/common/AppText';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {getFormattedDate} from '@/utils';

type ItemProps = {
  title: string;
  category: string;
  thumbnail: ImageSourcePropType;
  createdDate: string;
};

export function HomeContentsItem({
  title,
  category,
  thumbnail,
  createdDate,
}: ItemProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.thumbnailContainer}>
        <Image source={thumbnail} style={styles.thumbnail} />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <AppText style={styles.title} isEllipsizeMode={true}>
            {title}
          </AppText>
        </View>
        <View style={styles.row}>
          <AppText style={styles.subTitle}>{category}</AppText>
          <AppText style={styles.subTitle}>|</AppText>
          <AppText style={styles.subTitle}>
            {getFormattedDate(new Date(createdDate), '.')}
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
});
