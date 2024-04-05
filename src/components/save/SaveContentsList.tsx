import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {SaveContentsItem} from './SaveContentsItem';
import {AppText} from '../common/AppText';
import color from '@/styles/color';
import {SendFeedbackButton} from '../home/SendFeedbackButton';
import {removeItemAtIndex} from '@/utils';
import {AppDivider} from '../common/AppDivider';
import {font} from '@/styles/font';

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
  list: object[];
  mode: string;
  handleButtonPress: Function;
  handleTotalCheckedCount: Function;
};

export function SaveContentsList({
  list,
  mode,
  handleButtonPress,
  handleTotalCheckedCount,
}: Props): React.JSX.Element {
  const [checkedContentsList, setCheckedContentsList] = useState<object[]>([]);

  const addCheckedContentsList = (contents: object) => {
    setCheckedContentsList([...checkedContentsList, contents]);
  };

  const deleteCheckedContentsList = (contents: object) => {
    const itemIndex = checkedContentsList.findIndex(
      item => item.id === contents.id,
    );
    const filteredList = removeItemAtIndex(checkedContentsList, itemIndex);
    setCheckedContentsList(filteredList);
  };

  const handleCheckedContentsList = (contents: object, action: string) => {
    switch (action) {
      case 'ADD':
        addCheckedContentsList(contents);
        break;
      case 'DELETE':
        deleteCheckedContentsList(contents);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    const totalCount = checkedContentsList.length;

    if (totalCount > 0) {
      handleButtonPress('delete');
    }

    if (totalCount === 0 && mode === 'DELETE') {
      handleButtonPress('edit');
    }

    handleTotalCheckedCount(totalCount);
  }, [checkedContentsList, handleTotalCheckedCount, handleButtonPress, mode]);

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={({item}) => (
          <SaveContentsItem
            item={{...item}}
            mode={mode}
            checkedContentsList={checkedContentsList}
            handleButtonPress={handleButtonPress}
            handleCheckedContentsList={handleCheckedContentsList}
          />
        )}
        ItemSeparatorComponent={() => <AppDivider style={styles.divider} />}
        ListEmptyComponent={<EmptyList />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  divider: {
    marginVertical: 16,
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
