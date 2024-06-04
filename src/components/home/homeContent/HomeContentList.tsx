import React from 'react';
import {useRecoilValue} from 'recoil';
import {userInfoState} from '@/store/userInfoState';
// import {userInfoState} from '@/store/login';

import {StyleSheet, View, FlatList, Platform} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {AppDivider} from '@/components/common/AppDivider';
import {AppSpinner} from '@/components/common/AppSpinner';
import {HomeContentItem} from '@/components/home/homeContent/HomeContentItem';
import {ViewMoreButton} from '@/components/home/ViewMoreButton';
import color from '@/styles/color';
import {font} from '@/styles/font';
import spacing from '@/styles/spacing';

import {getFontSize} from '@/utils/font';

import HomeContent from '@/models/HomeContent';

type Props = {
  isLoading: boolean;
  isUsernameUsed?: boolean;
  title: string;
  list: HomeContent[];
};

function EmptyList(): React.JSX.Element {
  return (
    <View style={styles.emptyContainer}>
      <AppText style={styles.emptyText}>추천할 콘텐츠가 없어요 🥲</AppText>
    </View>
  );
}

export function HomeContentList({
  isLoading,
  isUsernameUsed = false,
  title,
  list,
}: Props): React.JSX.Element {
  const userInfo = useRecoilValue(userInfoState);
  const isEmpty = list.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {isUsernameUsed && (
          <AppText style={styles.username}>{userInfo.nickname}님과</AppText>
        )}
        <AppText style={styles.title}>{title}</AppText>
      </View>
      {isLoading ? (
        <AppSpinner />
      ) : isEmpty ? (
        <EmptyList />
      ) : (
        <FlatList
          ItemSeparatorComponent={() => <AppDivider style={styles.divider} />}
          data={list}
          renderItem={({item}) => <HomeContentItem homeContentItem={item} />}
        />
      )}
      {!isEmpty && <ViewMoreButton />}
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
    fontSize: getFontSize(20),
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
  emptyContainer: {
    paddingBottom: 14,
  },
  emptyText: {
    fontWeight: font.fontWeight.medium,
    // lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey500,
  },
});
