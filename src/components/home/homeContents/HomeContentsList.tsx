import React from 'react';

import {StyleSheet, View, FlatList, Platform} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {AppDivider} from '@/components/common/AppDivider';
import {HomeContentsItem} from '@/components/home/homeContents/HomeContentsItem';
import {ViewMoreButton} from '@/components/home/ViewMoreButton';
import color from '@/styles/color';
import {font} from '@/styles/font';
import spacing from '@/styles/spacing';

type HomeContentsProps = {
  isUsernameUsed?: boolean;
  title: string;
  list: object[];
};

export function HomeContentsList({
  isUsernameUsed = false,
  title,
  list,
}: HomeContentsProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {isUsernameUsed && (
          <AppText style={styles.username}>$username님과</AppText>
        )}
        <AppText style={styles.title}>{title}</AppText>
      </View>
      <FlatList
        ItemSeparatorComponent={() => <AppDivider style={styles.divider} />}
        data={list}
        renderItem={({item}) => <HomeContentsItem item={{...item}} />}
      />
      <ViewMoreButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  divider: {
    marginVertical: 16,
  },
});
