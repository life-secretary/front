import React, { ReactNode } from 'react';
import {VirtualizedList, View, StyleSheet} from 'react-native';
import { getFontSize } from '@/utils/font';
import { AppText } from '../common/AppText';

import ToDoListItem from './ToDoListItem';

type SearchToDoViewProps = {
  type: string;
  data: Array<{}>; // TODO 타입 구체화
  headerComponent: ReactNode;
  onEndReached: () => void;
  onPressToDo: (id: number) => void;
};

const SearchToDoView = ({
  type,
  data, 
  headerComponent,
  onEndReached,
  onPressToDo,
}: SearchToDoViewProps): React.JSX.Element => {
  const getToDoTabItem = (_data: any, index: any) => { // TODO 타입 구체화
    return data[index];
  };

  const getToDoTabItemCount = () => {
    return data.length;
  };

  const getToDoTabKeyExtractor = (item: any, index: any) => { // TODO 타입 구체화
    const keyName = 'todo' + item.id;

    return keyName;
  };

  return (
    <>
      {
        data.length ?
        <VirtualizedList
        initialNumToRender={8}
        renderItem={({item}) => {
          return <ToDoListItem hasMainCategory={true} item={item} onPressAddItem={onPressToDo} />;
        }}
        keyExtractor={getToDoTabKeyExtractor}
        getItemCount={getToDoTabItemCount}
        getItem={getToDoTabItem}
        ListHeaderComponent={() => headerComponent}
        ListFooterComponent={() => <View style={styles.toDoFooter} />}
        ItemSeparatorComponent={() => <View style={styles.separatorToDo} />}
        style={styles.toDoContainer}
        onEndReached={onEndReached}
      />
      :
      <View style={styles.emptyContainer}>
        <AppText style={styles.emptyTitle}>{type === 'search' ? '검색 결과가 없어요' : '등록된 할 일이 없어요'}</AppText>
        <AppText style={styles.emptySubTitle}>{type === 'search' ? '다른 키워드로 검색해보세요' : '다른 카테고리를 둘러보세요'}</AppText>
      </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  toDoContainer: {
    paddingHorizontal: 24,
  },
  toDoFooter: {
    height: 60,
  },

  separatorToDo: {
    marginVertical: 10,
  },

  emptyContainer: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: getFontSize(18),
    fontWeight: '500',
    lineHeight: 21,
    marginBottom: 8,
    color: '#000E24'
  },
  emptySubTitle: {
    fontSize: getFontSize(15),
    fontWeight: '400',
    color: '#526070'
  },
});

export default SearchToDoView;
