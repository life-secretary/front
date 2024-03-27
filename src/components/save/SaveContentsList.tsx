import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {SaveContentsItem} from './SaveContentsItem';
import {AppText} from '../common/AppText';
import color from '@/styles/color';
import {SendQuestionButton} from '../home/SendQuestionButton';
import {removeItemAtIndex} from '@/utils';

const EmptyList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <View style={styles.textContainer}>
        <AppText style={styles.text}>저장된 콘텐츠가 없어요</AppText>
        <AppText style={styles.subText}>
          찾는 콘텐츠가 없다면 의견을 보내주세요
        </AppText>
      </View>
      <SendQuestionButton />
    </View>
  );
};
export function SaveContentsList({
  list,
  isEditMode,
  changeButtonText,
  handleTotalCheckedCount,
}: any): React.JSX.Element {
  const [checkedContentsList, setCheckedContentsList] = React.useState<
    object[]
  >([]);

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

  const handleCheckedContentsList = (contents: object, mode: string) => {
    switch (mode) {
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

  React.useEffect(() => {
    const totalCount = checkedContentsList.length;
    handleTotalCheckedCount(totalCount);
  }, [checkedContentsList, handleTotalCheckedCount]);

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={({item}) => (
          <SaveContentsItem
            item={{...item}}
            isEditMode={isEditMode}
            changeButtonText={changeButtonText}
            handleCheckedContentsList={handleCheckedContentsList}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListEmptyComponent={<EmptyList />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  divider: {
    backgroundColor: color.grey100,
    height: 1,
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
    fontSize: 18,
    fontWeight: '600',
    color: color.grey700,
  },
  subText: {
    fontSize: 14,
    fontWeight: '500',
    color: color.grey500,
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
