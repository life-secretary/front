import React, {useEffect} from 'react';

import {StyleSheet, View, FlatList} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {AppDivider} from '@/components/common/AppDivider';
import {ScrapContentsItem} from '@/components/scrap/ScrapContentsItem';
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
  contentsList: object[];
  mode: string;
  checkedList: object[];
  handleButtonPress: Function;
  handleTotalCheckedCount: Function;
  manipulateCheckedList: Function;
};

export function ScrapContentsList({
  contentsList,
  mode,
  checkedList,
  handleButtonPress,
  handleTotalCheckedCount,
  manipulateCheckedList,
}: Props): React.JSX.Element {
  const totalCount = checkedList.length;

  const handleCheckedList = (action: string, contents: object) => {
    manipulateCheckedList(action, contents);
  };

  useEffect(() => {
    if (totalCount > 0) {
      handleButtonPress('delete');
    }

    if (totalCount === 0 && mode === 'DELETE') {
      handleButtonPress('edit');
    }

    handleTotalCheckedCount(totalCount);
  }, [
    checkedList,
    handleTotalCheckedCount,
    handleButtonPress,
    mode,
    totalCount,
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={contentsList}
        renderItem={({item}) => (
          <ScrapContentsItem
            contents={{...item}}
            mode={mode}
            checkedList={checkedList}
            handleButtonPress={handleButtonPress}
            handleCheckedList={handleCheckedList}
          />
        )}
        ItemSeparatorComponent={() => <AppDivider style={styles.divider} />}
        ListEmptyComponent={<EmptyList />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.layoutPaddingHorizontal,
  },
  divider: {
    marginVertical: 16,
  },
  listContainer: {
    flex: 1,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28,
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
