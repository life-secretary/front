import React, {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {scrapListState, scrapListTotalCountState} from '@/store/scrapState';

import {StyleSheet, View, FlatList} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {AppDivider} from '@/components/common/AppDivider';
import {AppSpinner} from '../common/AppSpinner';
import {ScrapContentItem} from '@/components/scrap/ScrapContentItem';
import {SendFeedbackButton} from '@/components/home/SendFeedbackButton';
import color from '@/styles/color';
import {font} from '@/styles/font';
import spacing from '@/styles/spacing';

const EmptyList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <View style={styles.textContainer}>
        <AppText style={styles.text}>저장된 콘텐츠가 없어요</AppText>
        <AppText style={styles.subText}>
          찾는 콘텐츠가 없다면 의견을 보내주세요
        </AppText>
      </View>
      <SendFeedbackButton />
    </View>
  );
};

type Props = {
  isLoading: boolean;
  isDeleted: boolean;
  mode: string;
  checkedList: object[];
  handleButtonPress: Function;
  handleTotalCheckedCount: Function;
  manipulateCheckedList: Function;
};

export function ScrapContentList({
  isLoading,
  isDeleted,
  mode,
  checkedList,
  handleButtonPress,
  handleTotalCheckedCount,
  manipulateCheckedList,
}: Props): React.JSX.Element {
  const scrapList = useRecoilValue(scrapListState);
  const totalCount = useRecoilValue(scrapListTotalCountState);
  const isEmpty = totalCount === 0;

  const handleCheckedList = (action: string, contents: object) => {
    manipulateCheckedList(action, contents);
  };

  // TODO: 리팩토링 필요
  useEffect(() => {
    if (checkedList.length > 0) {
      handleButtonPress('delete');
    }

    if (checkedList.length === 0 && mode === 'DELETE' && !isDeleted) {
      handleButtonPress('edit');
    }

    handleTotalCheckedCount(totalCount);
  }, [
    checkedList,
    handleTotalCheckedCount,
    handleButtonPress,
    mode,
    totalCount,
    isDeleted,
  ]);

  return (
    <View style={styles.container}>
      {!isEmpty && isLoading ? (
        <View style={styles.spinnerContainer}>
          <AppSpinner color={color.main.primary} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={scrapList}
          renderItem={({item}) => (
            <ScrapContentItem
              content={item}
              mode={mode}
              checkedList={checkedList}
              handleButtonPress={handleButtonPress}
              handleCheckedList={handleCheckedList}
            />
          )}
          ItemSeparatorComponent={() => <AppDivider style={styles.divider} />}
          ListEmptyComponent={<EmptyList />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.layoutPaddingHorizontal,
    paddingBottom: 60,
  },
  divider: {
    marginVertical: 16,
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 28,
    marginTop: 220,
  },
  spinnerContainer: {
    flex: 1,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 21,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  subText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: font.fontWeight.medium,
    lineHeight: 17.9,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey500,
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 6,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    fontWeight: '700',
  },
});
