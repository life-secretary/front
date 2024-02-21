import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {SaveContentsItem} from './SaveContentsItem';
import {AppText} from '../common/AppText';

const EmptyList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <View style={styles.textContainer}>
        <AppText style={styles.text}>저장된 콘텐츠가 없어요</AppText>
        <AppText style={styles.subText}>
          찾는 콘텐츠가 없다면 의견을 보내주세요
        </AppText>
      </View>
      <View style={styles.buttonContainer}>
        <AppText style={styles.button}>문의 및 의견 보내기</AppText>
      </View>
    </View>
  );
};
export function SaveContentsList({list, isEditMode}: any): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={({item}) => (
          <SaveContentsItem
            title={item.title}
            category={item.category}
            isEditMode={isEditMode}
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
    borderWidth: 1,
  },
  listContainer: {
    flex: 1,
    borderWidth: 1,
  },
  divider: {
    backgroundColor: '#F2F4F7',
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
    color: '#000E24',
  },
  subText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#526070',
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
